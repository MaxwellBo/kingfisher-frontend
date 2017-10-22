import firebase from 'react-native-firebase';

// The only way of maintaining a consistent firebase instance over all components
// is to store it in a global variable.
const configurationOptions = {
    persistence: true
  };

export const fbi = new firebase(configurationOptions);