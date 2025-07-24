import { ToastAndroid, Platform } from 'react-native';

const useToast = () => {
  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }
  };

  return { showToast };
};

export default useToast; 