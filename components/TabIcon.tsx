import React from 'react';
import { Text } from 'react-native';

interface TabIconProps {
  focused: boolean;
  color: string;
  size: number;
  routeName: string;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, color, size, routeName }) => {
  let iconName;

  // focused пока не используем для смены иконки
  if (routeName === 'Устройства') {
    iconName = focused ? '📦' : '📦';
  } else if (routeName === 'Профиль') {
    iconName = focused ? '👤' : '👤';
  } else {
    iconName = '';
  }

  return <Text style={{ color: color, fontSize: size, lineHeight: size * 1.2, textAlignVertical: 'center' }}>{iconName}</Text>;
};

export default TabIcon;