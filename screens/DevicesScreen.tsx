import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import styles from '../styles';
import DeviceCard from '../components/DeviceCard';
import CategoryPicker from '../components/CategoryPicker';
import { ALL_ROADGID_MODELS } from '../src/data/models';

// Интерфейсы для данных
interface DeviceData {
  id: string;
  name: string;
  model: string;
}

interface AddDeviceModalProps {
  visible: boolean;
  onClose: () => void;
  deviceName: string;
  setDeviceName: (name: string) => void;
  deviceModel: string;
  setDeviceModel: (model: string) => void;
  onSaveDevice: (device: { name: string; model: string }) => void;
}

interface DevicesScreenProps {
  devices: DeviceData[];
  handleAddDevice: (device: { name: string; model: string }) => void;
  handleDeleteDevice: (id: string) => void;
  deviceName: string;
  setDeviceName: (name: string) => void;
  deviceModel: string;
  setDeviceModel: (model: string) => void;
}

const deviceCategories = [
  { label: 'Видеорегистратор', value: 'Видеорегистратор' },
  { label: 'Комбо-устройство', value: 'Комбо-устройство' },
  { label: 'Радар-детектор', value: 'Радар-детектор' },
];

// Компонент модального окна для добавления устройства
const AddDeviceModal: React.FC<AddDeviceModalProps> = ({
                                                         visible,
                                                         onClose,
                                                         deviceName,
                                                         setDeviceName,
                                                         deviceModel,
                                                         setDeviceModel,
                                                         onSaveDevice,
                                                       }) => {

  const [availableModels, setAvailableModels] = useState<{ label: string; value: string; image: any }[]>([]);
  const [selectedModelImage, setSelectedModelImage] = useState<any>(null);
  
  useEffect(() => {
    // Устанавливаем доступные модели при изменении категории
    if (deviceModel) {
      const models = ALL_ROADGID_MODELS[deviceModel] || [];
      setAvailableModels(models);
      // Автоматически выбираем первую модель, если она доступна
      if (models.length > 0) {
        setDeviceName(models[0].value);
        setSelectedModelImage(models[0].image); // Устанавливаем картинку первой модели
      } else {
        setDeviceName('');
        setSelectedModelImage(null); // Сбрасываем картинку
      }
    }
  }, [deviceModel, setDeviceName]);

  useEffect(() => {
    // Обновляем картинку при выборе модели
    const modelData = availableModels.find((model) => model.value === deviceName);
    setSelectedModelImage(modelData?.image || null);
  }, [deviceName, availableModels]);

  const handleSave = () => {
    if (!deviceName || !deviceModel) {
      Alert.alert('Ошибка', 'Выберите категорию и модель устройства.');
      return;
    }
    onSaveDevice({ name: deviceName, model: deviceModel });
    setDeviceName('');
    setDeviceModel('');
    setSelectedModelImage(null);
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={localStyles.modalOverlay}>
        <View style={localStyles.modalContent}>
          <Text style={localStyles.modalTitle}>Добавить устройство</Text>
          {/* Категория устройства */}
          <CategoryPicker
            selectedValue={deviceModel}
            onValueChange={setDeviceModel}
            items={deviceCategories}
          />
          {/* Конкретная модель устройства */}
          <CategoryPicker
            selectedValue={deviceName}
            onValueChange={setDeviceName}
            items={availableModels.map((model) => ({ label: model.label, value: model.value }))}
          />
          {selectedModelImage && (
            <Image
              source={selectedModelImage}
              style={{
                width: 120,
                height: 120,
                borderRadius: 10,
                alignSelf: 'center',
                marginVertical: 20,
              }}
            />
          )}
          <View style={localStyles.modalButtonsContainer}>
            <TouchableOpacity style={[styles.button, localStyles.modalButton]} onPress={onClose}>
              <Text style={styles.buttonText}>Отмена</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, localStyles.modalButton]} onPress={handleSave}>
              <Text style={styles.buttonText}>Сохранить</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Основной экран устройств
const DevicesScreen: React.FC<DevicesScreenProps> = ({
                                                       devices,
                                                       handleAddDevice,
                                                       handleDeleteDevice,
                                                       deviceName,
                                                       setDeviceName,
                                                       deviceModel,
                                                       setDeviceModel,
                                                     }) => {
  const [addModalVisible, setAddModalVisible] = useState(false);

  const saveNewDevice = (newDeviceData: { name: string; model: string }) => {
    handleAddDevice(newDeviceData); // Функция сохранения устройства
  };

  return (
    <View style={styles.container}>
      <View style={localStyles.headerContainer}>
        <Text style={styles.title}>Мои устройства</Text>
        <TouchableOpacity style={localStyles.addButton} onPress={() => setAddModalVisible(true)}>
          <Text style={localStyles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <DeviceCard device={item} onDelete={handleDeleteDevice} />}
      />
      <AddDeviceModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        deviceName={deviceName}
        setDeviceName={setDeviceName}
        deviceModel={deviceModel}
        setDeviceModel={setDeviceModel}
        onSaveDevice={saveNewDevice}
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#6200ee',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    lineHeight: 28,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 15,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
  },
});

export default DevicesScreen;