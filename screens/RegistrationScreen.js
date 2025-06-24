import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from '../styles';

const RegistrationScreen = ({ handleRegister }) => { // Принимаем handleRegister
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const onRegisterPress = () => {
    handleRegister(name, email); // Передаем локальные стейты
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>
      <TextInput
        style={styles.input}
        placeholder="Имя"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={onRegisterPress}>
        <Text style={styles.buttonText}>Зарегистрироваться</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationScreen;