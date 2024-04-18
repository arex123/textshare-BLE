
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './style';

 const DeviceList = ({peripheral}) => {
     const {name, rssi, connected} = peripheral;
     console.log(7,name,rssi)
  return (
    <>
      {rssi && (
        <View style={styles.deviceContainer}>
          <View style={styles.deviceItem}>
            <Text style={styles.deviceName}>{name || "unknown"}</Text>
            <Text style={styles.deviceInfo}>RSSI: {rssi}</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              connected ? disconnect(peripheral) : connect(peripheral)
            }
            style={styles.deviceButton}>
            <Text
              style={[
                styles.scanButtonText,
                {fontWeight: 'bold', fontSize: 16},
              ]}>
              {connected ? 'Disconnect' : 'Connect'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default DeviceList