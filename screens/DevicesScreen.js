import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert, Modal, StyleSheet} from 'react-native';
import styles from '../styles';
import DeviceCard from '../components/DeviceCard';
import CategoryPicker from '../components/CategoryPicker';

// Компонент для модального окна добавления устройства
const AddDeviceModal = ({
                          visible,
                          onClose,
                          deviceName,
                          setDeviceName,
                          deviceModel,
                          setDeviceModel,
                          onSaveDevice, // Новое свойство: функция для сохранения устройства
                        }) => {
  const deviceCategories = [
    { label: 'Видеорегистратор', value: 'Видеорегистратор' },
    { label: 'Комбо-устройство', value: 'Комбо-устройство' },
    { label: 'Радар-детектор', value: 'Радар-детектор' },
  ];

  // Инициализация deviceModel при открытии, если нет значения
  useState(() => {
    if (!deviceModel && deviceCategories.length > 0) {
      setDeviceModel(deviceCategories[0].value);
    }
  }, [deviceModel]);

  const handleSave = () => {
    if (!deviceName || !deviceModel) {
      Alert.alert('Ошибка', 'Введите название устройства и выберите категорию.');
      return;
    }
    onSaveDevice({ name: deviceName, model: deviceModel });
    // Сбрасываем поля после сохранения, чтобы модальное окно было чистым при следующем открытии
    setDeviceName('');
    // setDeviceModel(deviceCategories[0].value); // Можно сбросить или оставить последнее выбранное
    onClose(); // Закрываем модальное окно
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={localStyles.modalOverlay}>
        <View style={localStyles.modalContent}>
          <Text style={localStyles.modalTitle}>Добавить устройство</Text>
          <TextInput
            style={styles.input} // Используем общие стили
            placeholder="Название устройства"
            value={deviceName}
            onChangeText={setDeviceName}
          />
          <CategoryPicker
            selectedValue={deviceModel}
            onValueChange={setDeviceModel}
            items={deviceCategories}
          />
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

const DevicesScreen = ({
                         devices,
                         handleAddDevice, // handleAddDevice теперь вызывается из модального окна
                         handleDeleteDevice,
                         deviceName, // Передаем state для управления полями
                         setDeviceName,
                         deviceModel,
                         setDeviceModel,
                       }) => {
  const [addModalVisible, setAddModalVisible] = useState(false);
  // Функция, которая будет вызываться из модального окна для сохранения
  const saveNewDevice = (newDeviceData) => {
    handleAddDevice(newDeviceData); // Передаем данные обратно в App.js
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Мои устройства</Text>
        <TouchableOpacity style={localStyles.addButton} onPress={() => setAddModalVisible(true)}>
          <Text style={localStyles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DeviceCard device={item} onDelete={handleDeleteDevice} />
        )}
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
    lineHeight: 28, // Для центрирования +
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
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
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
  }
});

export default DevicesScreen;