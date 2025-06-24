import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';

const ProfileScreen = ({ user, onLogout }) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Профиль</Text>
      </View>
      {user && (
        <View style={styles.profileContainer}>
          <Text style={styles.subtitle}>Имя: {user.name}</Text>
          <Text style={styles.subtitle}>Email: {user.email}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={onLogout}>
        <Text style={styles.buttonText}>Выйти</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;