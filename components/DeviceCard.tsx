import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles';

interface DeviceCardProps {
  device: {
    id: string;
    name: string;
    model: string;
    image?: any; // Путь к изображению (если доступно)
  };
  onDelete: (id: string) => void;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ device, onDelete }) => {
  return (
    <View style={styles.card}>
      {device.image ? (
        <Image source={device.image} style={styles.deviceImage} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>Без изображения</Text>
        </View>
      )}

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