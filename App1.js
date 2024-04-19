import React, { useState, useEffect } from 'react';
import {
  Text,
  View,
  Platform,
  FlatList,
  StatusBar,
  ScrollView,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  NativeModules,
  useColorScheme,
  TouchableOpacity,
  NativeEventEmitter,
  PermissionsAndroid,
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import {
  requestMultiple,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";
import { Buffer } from 'buffer';
import DeviceList from './src/DeviceList';
import { styles } from './src/style';

const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

let dd = {
  "advertising": { "isConnectable": true, "manufacturerData": { "004c": [Object] }, "manufacturerRawData": { "CDVType": "ArrayBuffer", "bytes": [Array], "data": "AAAATBAGAB2Zgl5Y" }, "rawData": { "CDVType": "ArrayBuffer", "bytes": [Array], "data": "AgEaAgoCC/9MABAGAB2Zgl5YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=" }, "serviceData": {}, "serviceUUIDs": [], "txPowerLevel": 2 },

  "characteristics": [{ "characteristic": "2a00", "properties": [Object], "service": "1800" }, { "characteristic": "2a01", "properties": [Object], "service": "1800" }, { "characteristic": "2a05", "descriptors": [Array], "properties": [Object], "service": "1801" }, { "characteristic": "2a29", "properties": [Object], "service": "180a" }, { "characteristic": "2a24", "properties": [Object], "service": "180a" }, { "characteristic": "8667556c-9a37-4c91-84ed-54ee27d90049", "descriptors": [Array], "properties": [Object], "service": "d0611e78-bbb4-4591-a5f8-487910ae4366" }, { "characteristic": "af0badb1-5b99-43cd-917a-a77bc549e3cc", "descriptors": [Array], "properties": [Object], "service": "9fa480e0-4967-4542-9390-d343dc5d04ae" }, { "characteristic": "2a00", "properties": [Object], "service": "1800" }, { "characteristic": "2a01", "properties": [Object], "service": "1800" }, { "characteristic": "2a05", "descriptors": [Array], "properties": [Object], "service": "1801" }, { "characteristic": "2a29", "properties": [Object], "service": "180a" }, { "characteristic": "2a24", "properties": [Object], "service": "180a" }, { "characteristic": "8667556c-9a37-4c91-84ed-54ee27d90049", "descriptors": [Array], "properties": [Object], "service": "d0611e78-bbb4-4591-a5f8-487910ae4366" }, { "characteristic": "af0badb1-5b99-43cd-917a-a77bc549e3cc", "descriptors": [Array], "properties": [Object], "service": "9fa480e0-4967-4542-9390-d343dc5d04ae" }],

  "id": "70:AE:D5:53:86:90",
  "name": "Aditya’s MacBook Air",
  "rssi": -48,
  "services": [{ "uuid": "1800" }, { "uuid": "1801" }, { "uuid": "180a" }, { "uuid": "d0611e78-bbb4-4591-a5f8-487910ae4366" }, { "uuid": "9fa480e0-4967-4542-9390-d343dc5d04ae" }, { "uuid": "1800" }, { "uuid": "1801" }, { "uuid": "180a" }, { "uuid": "d0611e78-bbb4-4591-a5f8-487910ae4366" }, { "uuid": "9fa480e0-4967-4542-9390-d343dc5d04ae" }]
}


let dd1 = {
  "characteristics": [
    { "properties": { "Read": "Read" }, "characteristic": "2a00", "service": "1800" },
    { "properties": { "Read": "Read" }, "characteristic": "2a01", "service": "1800" },
    { "descriptors": [{ "value": null, "uuid": "2902" }], "properties": { "Indicate": "Indicate" }, "characteristic": "2a05", "service": "1801" },
    { "properties": { "Read": "Read" }, "characteristic": "2a29", "service": "180a" },
    { "properties": { "Read": "Read" }, "characteristic": "2a24", "service": "180a" },
    { "descriptors": [{ "value": null, "uuid": "2900" }, { "value": null, "uuid": "2902" }], "properties": { "ExtendedProperties": "ExtendedProperties", "Notify": "Notify", "Write": "Write" }, "characteristic": "8667556c-9a37-4c91-84ed-54ee27d90049", "service": "d0611e78-bbb4-4591-a5f8-487910ae4366" }, { "descriptors": [{ "value": null, "uuid": "2900" }, { "value": null, "uuid": "2902" }], "properties": { "ExtendedProperties": "ExtendedProperties", "Notify": "Notify", "Write": "Write" }, "characteristic": "af0badb1-5b99-43cd-917a-a77bc549e3cc", "service": "9fa480e0-4967-4542-9390-d343dc5d04ae" },
    { "properties": { "Read": "Read" }, "characteristic": "2a00", "service": "1800" },
    { "properties": { "Read": "Read" }, "characteristic": "2a01", "service": "1800" },
    { "descriptors": [{ "value": null, "uuid": "2902" }], "properties": { "Indicate": "Indicate" }, "characteristic": "2a05", "service": "1801" },
    { "properties": { "Read": "Read" }, "characteristic": "2a29", "service": "180a" },
    { "properties": { "Read": "Read" }, "characteristic": "2a24", "service": "180a" },
    { "descriptors": [{ "value": null, "uuid": "2900" }, { "value": null, "uuid": "2902" }], "properties": { "ExtendedProperties": "ExtendedProperties", "Notify": "Notify", "Write": "Write" }, "characteristic": "8667556c-9a37-4c91-84ed-54ee27d90049", "service": "d0611e78-bbb4-4591-a5f8-487910ae4366" }, { "descriptors": [{ "value": null, "uuid": "2900" }, { "value": null, "uuid": "2902" }], "properties": { "ExtendedProperties": "ExtendedProperties", "Notify": "Notify", "Write": "Write" }, "characteristic": "af0badb1-5b99-43cd-917a-a77bc549e3cc", "service": "9fa480e0-4967-4542-9390-d343dc5d04ae" }],

  "services": [{ "uuid": "1800" }, { "uuid": "1801" }, { "uuid": "180a" }, { "uuid": "d0611e78-bbb4-4591-a5f8-487910ae4366" }, { "uuid": "9fa480e0-4967-4542-9390-d343dc5d04ae" }, { "uuid": "1800" }, { "uuid": "1801" }, { "uuid": "180a" }, { "uuid": "d0611e78-bbb4-4591-a5f8-487910ae4366" }, { "uuid": "9fa480e0-4967-4542-9390-d343dc5d04ae" }],

  "advertising": {
    "manufacturerData": { "004c": { "bytes": [16, 6, 10, 29, 18, 240, 120, 120], "data": "EAYKHRLweHg=", "CDVType": "ArrayBuffer" } },

    "txPowerLevel": 12, "serviceData": {}, "isConnectable": true, "serviceUUIDs": [], "manufacturerRawData": { "bytes": [0, 0, 0, 76, 16, 6, 10, 29, 18, 240, 120, 120], "data": "AAAATBAGCh0S8Hh4", "CDVType": "ArrayBuffer" },

    "rawData": { "bytes": [2, 1, 26, 2, 10, 12, 11, 255, 76, 0, 16, 6, 10, 29, 18, 240, 120, 120, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], "data": "AgEaAgoMC/9MABAGCh0S8Hh4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=", "CDVType": "ArrayBuffer" }
  },

  "name": "Aditya’s MacBook Air", "rssi": -58,
  "id": "70:AE:D5:53:86:90"
}


const App1 = () => {

  useEffect(() => {
    // turn on bluetooth if it is not on
    BleManager.enableBluetooth().then(() => {
      console.log('Bluetooth is turned on!');
    });

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          ).then(result => {
            if (result) {
              requestBluetoothPermission()
              console.log('User accept');

            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }

  }, []);

  const [newD, setnewD] = useState([])

  const requestBluetoothPermission = async () => {

    try {
      const grantedScan = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        {
          title: 'Bluetooth Scanning Permission',
          message: 'Your app needs permission to scan for Bluetooth devices.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      const grantedConnect = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: 'Bluetooth Connection Permission',
          message: 'Your app needs permission to connect to Bluetooth devices.',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      if (grantedScan === PermissionsAndroid.RESULTS.GRANTED && grantedConnect === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Bluetooth connection permission granted');
        // Proceed with GATT service interaction
        BleManager.start({ showAlert: false }).then(() => {
          console.log('BleManager initialized');
          // handleGetConnectedDevices();
          // BleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (peripheral) => {
          //   console.log("135 length of devices found: ",newD.length,peripheral)
          //   setnewD((prevDevices) => [...prevDevices, peripheral])
          //   // Update UI with discovered device information
          // });

        });
      } else {
        console.log('Bluetooth connection permission denied');
        // Handle permission denial (optional)
      }
    } catch (err) {
      console.warn('Error requesting Bluetooth connection permission:', err);
    }
  };

  const [isScanning, setIsScanning] = useState(false);


  const startScan = () => {
    
    
    if (!isScanning) {
      console.log("155",isScanning)

      setTimeout(() => {
        BleManager.stopScan().then(() => {
          console.log("Scan stopped");
          
        }).catch((e) => console.log("error while stoping scan: ", e));
        setIsScanning(false)
      }, 2000)

      BleManager.scan([], 2, false)
        .then(() => {
          console.log('Scanning...');
          setIsScanning(true);

          BleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (peripheralObj) => {

            console.log(peripheralObj)
            let exist = discoveredDevices.some((obj) => obj.id == peripheralObj.id)
            if (!exist)
              setDiscoveredDevices((prev) => [...prev, peripheralObj])
          });


        })
        .catch(error =>
          console.error('Scan error:', error)
        )
    }
  };

  const peripherals = new Map()
  const [connectedDevices, setConnectedDevices] = useState([]);


  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [discoveredDevices, setDiscoveredDevices] = useState([]);

  let [peripheralId, setPeripheralId] = useState("70:AE:D5:53:86:90")
  let [serviceUUID, setServiceUUID] = useState("9fa480e0-4967-4542-9390-d343dc5d04ae")
  let [characteristicUUID, setCharacterUUID] = useState("af0badb1-5b99-43cd-917a-a77bc549e3cc")
  // pair with device first before connecting to it
  const connectToPeripheral = async peripheral => {
    // setIsScanning(false)  
    console.log("peripheral.id ", peripheral.id)

    BleManager.connect(peripheral.id)
      .then(async () => {
        console.log('Connected to device:', peripheral.id);
        try {
          let data = await BleManager.retrieveServices(peripheral.id)
          console.log(data)


          // writeData(peripheralId, serviceUUID, characteristicUUID, "Hello From Aditya")

        } catch (e) {
          console.log("eooooor,", e)
        }
        // discoverServices()
        // Perform actions with the connected device
        // const data = 'Hello, Bluetooth Device!';
        // BleManager.write(peripheral.id, serviceUUID, characteristicUUID, data)
        //   .then(() => {
        //     console.log('Data sent:', data);
        //   })
        //   .catch(error => {
        //     console.error('Write error:', error);
        //   });
      })
      .catch(error => {
        console.error('Connection error:', error);
        if (error.errorCode === 'PeripheralDisconnected') {
          console.log('Device disconnected.');
        } else {
          console.log('Connection failed for an unknown reason.');
        }
      });

    // BleManager.createBond(peripheral.id)
    //   .then(() => {
    //     console.log(269)
    //     peripheral.connected = true;
    //     peripherals.set(peripheral.id, peripheral);
    //     setConnectedDevices(Array.from(peripherals.values()));
    //     setDiscoveredDevices(Array.from(peripherals.values()));
    //     console.log('BLE device paired successfully');
    //     BleManager.connect(peripheral.id)
    //       .then(async () => {
    //         console.log('Connected to device:', peripheral.id);
    //         try {
    //           let data = await BleManager.retrieveServices(peripheral.id)


    //           // writeData(peripheralId, serviceUUID, characteristicUUID, "Hello From Aditya")

    //         } catch (e) {
    //           console.log("eooooor,", e)
    //         }
    //         // discoverServices()
    //         // Perform actions with the connected device
    //         // const data = 'Hello, Bluetooth Device!';
    //         // BleManager.write(peripheral.id, serviceUUID, characteristicUUID, data)
    //         //   .then(() => {
    //         //     console.log('Data sent:', data);
    //         //   })
    //         //   .catch(error => {
    //         //     console.error('Write error:', error);
    //         //   });
    //       })
    //       .catch(error => {
    //         console.error('Connection error:', error);
    //         if (error.errorCode === 'PeripheralDisconnected') {
    //           console.log('Device disconnected.');
    //         } else {
    //           console.log('Connection failed for an unknown reason.');
    //         }
    //       });
    //   })
    //   .catch((e) => {
    //     console.log('failed to bond::', e);
    //   });
  };


  const writeData = (pid, sid, cid, msg) => {

    const buffer = Buffer.from(msg);
    console.log("$$$ buffer", buffer)
    console.log("$$$ buffer", buffer.toJSON().data)
    BleManager.write(
      pid,
      sid,
      cid,
      // encode & extract raw `number[]`.
      // Each number should be in the 0-255 range as it is converted from a valid byte.
      buffer.toJSON().data
    )
      .then(() => {
        // Success code
        console.log("Write: " + data);
      })
      .catch((error) => {
        // Failure code
        console.log("329 error writing: ", error);
      });
  }

  const disconnectFromPeripheral = peripheral => {
    BleManager.removeBond(peripheral.id)
      .then(() => {
        peripheral.connected = false;
        peripherals.set(peripheral.id, peripheral);
        setConnectedDevices(Array.from(peripherals.values()));
        setDiscoveredDevices(Array.from(peripherals.values()));
        Alert.alert(`Disconnected from ${peripheral.name}`);
      })
      .catch(() => {
        console.log('fail to remove the bond');
      });
  };



  /* render list of bluetooth devices */
  const RenderItem = ({ peripheral }) => {
    const { name, rssi, connected } = peripheral;
    return (
      <>
        {rssi && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <View style={styles.deviceItem}>
              <Text style={styles.deviceName}>{name || "unknown"}</Text>
              <Text style={styles.deviceInfo}>RSSI: {rssi}</Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                connected
                  ? disconnectFromPeripheral(peripheral)
                  : connectToPeripheral(peripheral)
              }
              style={styles.deviceButton}>
              <Text
                style={[
                  styles.scanButtonText,
                  { fontWeight: 'bold', fontSize: 16 },
                ]}>
                {connected ? 'Disconnect' : 'Connect'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <ScrollView>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={{ pdadingHorizontal: 20 }}>
          <Text
            style={[
              styles.title,
              { color: isDarkMode ? Colors.white : Colors.black },
            ]}>
            Bluetooth App
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.scanButton}
            onPress={startScan}>
            <Text style={styles.scanButtonText}>
              {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
            </Text>
          </TouchableOpacity>
          <Text
            style={[
              styles.subtitle,
              { color: isDarkMode ? Colors.white : Colors.black },
            ]}>
            Discovered Devices:
          </Text>
          {discoveredDevices.length > 0 ? (
            <FlatList
              data={discoveredDevices}
              renderItem={({ item }) => (
                <RenderItem peripheral={item} />
              )}
              keyExtractor={(item, index) => item.id + index}
            />
          ) : (
            <Text style={styles.noDevicesText}>No Bluetooth devices found</Text>
          )}
          <Text
            style={[
              styles.subtitle,
              { color: isDarkMode ? Colors.white : Colors.black },
            ]}>
            Connected Devices:
          </Text>
          {connectedDevices.length > 0 ? (
            <FlatList
              data={connectedDevices}
              renderItem={({ item }) => (
                <RenderItem peripheral={item} />
              )}
              keyExtractor={(item, index) => item.id + index}
            />
          ) : (
            <Text style={styles.noDevicesText}>No connected devices</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>

  );
};
const windowHeight = Dimensions.get('window').height;
export default App1;