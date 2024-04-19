// App.js

import React from 'react';
import {View} from 'react-native';
import BleManagerComponent from './src/BleManagerComponent';
// import BleManagerComponent from './src/BleManager';


const App3 = () => {
    
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <BleManagerComponent />
    </View>
  );
};

export default App3;
