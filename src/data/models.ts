export const IMAGE_MAP: Record<string, any> = {
  'Roadgid Tube 4K': require('../../assets/images/roadgid_tube_4k.jpg'),
  'Roadgid MINI 3 Wi-Fi': require('../../assets/images/roadgid_mini_3_wifi.jpg'),
  'Roadgid CityGo 3 Wi-Fi AI': require('../../assets/images/roadgid_citygo_3_wifi_ai.jpg'),
  'Roadgid Blick Combo': require('../../assets/images/roadgid_blick_combo.png'),
  'Roadgid X9 Gibrid GT': require('../../assets/images/roadgid_x9.jpg'),
  'Roadgid OPTIMA GT': require('../../assets/images/roadgid_optima_gt.jpg'),
  'Roadgid Detect Pro Wi-Fi': require('../../assets/images/roadgid_detect_pro.jpg'),
  'Roadgid Detect': require('../../assets/images/roadgid_detect.jpg'),
};

export const ALL_ROADGID_MODELS: Record<
  string,
  { label: string; value: string; image: any }[]
> = {
  'Видеорегистратор': [
    { label: 'Roadgid Tube 4K', value: 'Roadgid Tube 4K', image: IMAGE_MAP['Roadgid Tube 4K'] },
    { label: 'Roadgid MINI 3 Wi-Fi', value: 'Roadgid MINI 3 Wi-Fi', image: IMAGE_MAP['Roadgid MINI 3 Wi-Fi'] },
    { label: 'Roadgid CityGo 3 Wi-Fi AI', value: 'Roadgid CityGo 3 Wi-Fi AI', image: IMAGE_MAP['Roadgid CityGo 3 Wi-Fi AI'] },
  ],
  'Комбо-устройство': [
    { label: 'Roadgid Blick Combo', value: 'Roadgid Blick Combo', image: IMAGE_MAP['Roadgid Blick Combo'] },
    { label: 'Roadgid X9 Gibrid GT', value: 'Roadgid X9 Gibrid GT', image: IMAGE_MAP['Roadgid X9 Gibrid GT'] },
    { label: 'Roadgid OPTIMA GT', value: 'Roadgid OPTIMA GT', image: IMAGE_MAP['Roadgid OPTIMA GT'] },
  ],
  'Радар-детектор': [
    { label: 'Roadgid Detect Pro Wi-Fi', value: 'Roadgid Detect Pro Wi-Fi', image: IMAGE_MAP['Roadgid Detect Pro Wi-Fi'] },
    { label: 'Roadgid Detect', value: 'Roadgid Detect', image: IMAGE_MAP['Roadgid Detect'] },
  ],
};