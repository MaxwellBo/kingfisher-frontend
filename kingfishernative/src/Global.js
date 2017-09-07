import firebase from 'react-native-firebase';

const configurationOptions = {
    persistence: true
  };

export const fbi = new firebase(configurationOptions);