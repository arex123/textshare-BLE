import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Platform, PermissionsAndroid } from 'react-native'
import useBluetooth from '../useBluetooth';


const Home = ({ navigation }) => {

  const { requestBluetoothPermission,scanForPeripherals,allDevices,connectToDevice,connectedDevice,disconnectFromDevice } = useBluetooth()


  useEffect(() => {

    requestBluetoothPermission().then((res) =>{
      if(res){
        scanForPeripherals()
       }
      }).catch(err => console.log("erro: ", err))

  }, [])

  const connectMethod = (item)=>{
    connectToDevice(item)
  }
  
  useEffect(()=>{
    
    console.log("coonectddevice useeffect ")
    if(connectedDevice)
    navigation.navigate('Form', { name: connectedDevice.name, deviceId:connectedDevice.id })
  },[connectedDevice])

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      { item.name && <Text style={styles.text} onPress={() =>{connectMethod(item)}}>{item.name}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      {console.log("allDevices len ",allDevices.length)}
     {allDevices && <FlatList
        data={allDevices}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />}
      {/* {allDevices.map((dev,key)=><Text style={styles.text} key={key}>{dev.name}</Text>)} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  item: {
    backgroundColor: 'lightblue',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  }
});

export default Home;
