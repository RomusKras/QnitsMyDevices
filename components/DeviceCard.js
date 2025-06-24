import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles'; // Подключаем стили из общего файла

const DeviceCard = ({ device, onDelete }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.deviceIcon}>{device.icon}</Text>
      <View style={styles.deviceDetails}>
        <Text style={styles.deviceName}>{device.name}</Text>
        <Text style={styles.deviceModel}>{device.model}</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(device.id)}>
        <Text style={styles.deleteButton}>Удалить</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DeviceCard;