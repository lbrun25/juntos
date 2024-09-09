import {useEffect} from 'react';
import {useNetInfo} from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

export const useShowNoInternetToast = () => {
  const netInfo = useNetInfo();

  useEffect(() => {
    if (!netInfo.isConnected) {
      Toast.show({
        type: 'warning',
        text2: 'Aucune connexion Internet',
        autoHide: false,
        position: 'bottom',
      });
    } else
      Toast.hide();
  }, [netInfo.isConnected]);
};
