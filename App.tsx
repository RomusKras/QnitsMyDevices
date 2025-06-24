// import { NewAppScreen } from '@react-native/new-app-screen';
// import { StatusBar, useColorScheme} from 'react-native';
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DevicesScreen from './screens/DevicesScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Alert } from 'react-native';
import RegistrationScreen from './screens/RegistrationScreen';
import TabIcon from './components/TabIcon'; // Убедитесь, что путь правильный

const Tab = createBottomTabNavigator();

interface User {
  name: string;
  email: string;
}
interface Device {
  id: string;
  name: string;
  model: string;
  icon: string;
}
interface NewDeviceData {
  name: string;
  model: string;
}

const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [devices, setDevices] = useState<Device[]>([]);
  const [deviceName, setDeviceName] = useState<string>('');
  const [deviceModel, setDeviceModel] = useState<string>('Видеорегистратор'); // Инициализация значением по умолчанию


  useEffect(() => {
    const getUser = async () => {
      const savedUser = await AsyncStorage.getItem('user');
      setUser(savedUser ? JSON.parse(savedUser) : null);
      const savedDevices = await AsyncStorage.getItem('devices');
      setDevices(savedDevices ? JSON.parse(savedDevices) : []);
    };
    getUser();
  }, []);

  const handleRegister = async (regName: string, regEmail: string) => { // Параметры для регистрации
    if (!regName || !regEmail) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
      return;
    }
    const userData = { name: regName, email: regEmail };
    await AsyncStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    setDevices([]);
    setDeviceName('');
    setDeviceModel('Видеорегистратор');
  };

  const handleAddDevice = async ({ name, model }: NewDeviceData) => {
    const newDevice = {
      id: Date.now().toString(),
      name: name,
      model: model,
      icon:
        model.toLowerCase().includes('видеорегистратор') ? '📷' :
          model.toLowerCase().includes('радар-детектор') ? '🛡️' : '📱',
    };
    const updatedDevices = [...devices, newDevice];
    setDevices(updatedDevices);
    await AsyncStorage.setItem('devices', JSON.stringify(updatedDevices));
  };

  const handleDeleteDevice = async (id: string) => {
    const updatedDevices = devices.filter((device) => device.id !== id);
    setDevices(updatedDevices);
    await AsyncStorage.setItem('devices', JSON.stringify(updatedDevices));
  };

  if (!user) {
    return (
      <RegistrationScreen
        handleRegister={handleRegister}
      />
    );
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon
              focused={focused}
              color={color}
              size={size}
              routeName={route.name}
            />
          ),
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#f9f9f9', paddingBottom: 5, paddingTop: 5, height: 60 },
          tabBarLabelStyle: { fontSize: 12 },
        })}
      >
        <Tab.Screen name="Устройства">
          {() => (
            <DevicesScreen
              devices={devices}
              handleAddDevice={handleAddDevice}
              handleDeleteDevice={handleDeleteDevice}
              deviceName={deviceName} // Передаем state в DevicesScreen
              setDeviceName={setDeviceName}
              deviceModel={deviceModel}
              setDeviceModel={setDeviceModel}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Профиль">
          {() => <ProfileScreen user={user} onLogout={logout} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;