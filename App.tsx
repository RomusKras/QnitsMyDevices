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
import TabIcon from './components/TabIcon';
import { IMAGE_MAP } from './src/data/models';

const Tab = createBottomTabNavigator();

interface User {
  name: string;
  email: string;
}
interface Device {
  id: string;
  name: string;
  model: string;
  imageKey: string;
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

  // Функция для загрузки устройств конкретного пользователя
  const loadUserDevices = async (userEmail: string) => {
    try {
      const userDevicesKey = `devices_${userEmail}`; // Уникальный ключ для каждого пользователя
      const savedDevices = await AsyncStorage.getItem(userDevicesKey);
      const parsedDevices = savedDevices ? JSON.parse(savedDevices) : [];

      // Добавляем изображения из IMAGE_MAP
      const restoredDevices = parsedDevices.map((device: any) => ({
        ...device,
        image: IMAGE_MAP[device.imageKey] || null,
      }));

      setDevices(restoredDevices);
    } catch (error) {
      console.error('Ошибка при загрузке устройств пользователя:', error);
      setDevices([]);
    }
  };
  // Функция для сохранения устройств конкретного пользователя
  const saveUserDevices = async (userEmail: string, devicesArray: Device[]) => {
    try {
      const userDevicesKey = `devices_${userEmail}`;
      // Сохраняем устройства без поля image (только imageKey)
      const devicesToSave = devicesArray.map(device => ({
        id: device.id,
        name: device.name,
        model: device.model,
        imageKey: device.imageKey,
      }));
      await AsyncStorage.setItem(userDevicesKey, JSON.stringify(devicesToSave));
    } catch (error) {
      console.error('Ошибка при сохранении устройств пользователя:', error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          await loadUserDevices(userData.email);
        } else {
          setUser(null);
          setDevices([]);
        }
      } catch (error) {
        console.error('Ошибка при загрузке пользователя:', error);
        setUser(null);
        setDevices([]);
      }
    };
    getUser();
  }, []);

  const handleRegister = async (regName: string, regEmail: string) => { // Параметры для регистрации
    if (!regName || !regEmail) {
      Alert.alert('Ошибка', 'Пожалуйста, заполните все поля.');
      return;
    }

    try {
      const userData = { name: regName, email: regEmail };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      // Загружаем устройства для этого пользователя (могут быть пустыми, если новый пользователь)
      await loadUserDevices(regEmail);
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      Alert.alert('Ошибка', 'Не удалось зарегистрировать пользователя.');
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
      setDevices([]);
      setDeviceName('');
      setDeviceModel('Видеорегистратор');
    } catch (error) {
      console.error('Ошибка при выходе из аккаунта:', error);
    }
  };

  const handleAddDevice = async ({ name, model }: NewDeviceData) => {
    if (!user) return;
    try {
      const newDevice = {
        id: Date.now().toString(),
        name: name,
        model: model,
        imageKey: name,
      };
      const updatedDevices = [...devices, newDevice];

      // Добавляем изображения для отображения в UI
      const restoredDevices = updatedDevices.map((device: any) => ({
        ...device,
        image: IMAGE_MAP[device.imageKey] || null,
      }));
      setDevices(restoredDevices);

      // Сохраняем устройства для текущего пользователя
      await saveUserDevices(user.email, updatedDevices);
    } catch (error) {
      console.error('Ошибка при добавлении устройства:', error);
      Alert.alert('Ошибка', 'Не удалось добавить устройство.');
    }
  };

  const handleDeleteDevice = async (id: string) => {
    if (!user) return;
    try {
      const updatedDevices = devices.filter((device) => device.id !== id);
      setDevices(updatedDevices);

      // Сохраняем обновленный список устройств для текущего пользователя
      await saveUserDevices(user.email, updatedDevices);
    } catch (error) {
      console.error('Ошибка при удалении устройства:', error);
      Alert.alert('Ошибка', 'Не удалось удалить устройство.');
    }
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