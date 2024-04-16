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


const BleManagerModule = NativeModules.BleManager;
const BleManagerEmitter = new NativeEventEmitter(BleManagerModule);

let dd = { "advertising": { "isConnectable": true, "manufacturerData": { "004c": [Object] }, "manufacturerRawData": { "CDVType": "ArrayBuffer", "bytes": [Array], "data": "AAAATBAGAB2Zgl5Y" }, "rawData": { "CDVType": "ArrayBuffer", "bytes": [Array], "data": "AgEaAgoCC/9MABAGAB2Zgl5YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=" }, "serviceData": {}, "serviceUUIDs": [], "txPowerLevel": 2 },

 "characteristics": [{ "characteristic": "2a00", "properties": [Object], "service": "1800" }, { "characteristic": "2a01", "properties": [Object], "service": "1800" }, { "characteristic": "2a05", "descriptors": [Array], "properties": [Object], "service": "1801" }, { "characteristic": "2a29", "properties": [Object], "service": "180a" }, { "characteristic": "2a24", "properties": [Object], "service": "180a" }, { "characteristic": "8667556c-9a37-4c91-84ed-54ee27d90049", "descriptors": [Array], "properties": [Object], "service": "d0611e78-bbb4-4591-a5f8-487910ae4366" }, { "characteristic": "af0badb1-5b99-43cd-917a-a77bc549e3cc", "descriptors": [Array], "properties": [Object], "service": "9fa480e0-4967-4542-9390-d343dc5d04ae" }, { "characteristic": "2a00", "properties": [Object], "service": "1800" }, { "characteristic": "2a01", "properties": [Object], "service": "1800" }, { "characteristic": "2a05", "descriptors": [Array], "properties": [Object], "service": "1801" }, { "characteristic": "2a29", "properties": [Object], "service": "180a" }, { "characteristic": "2a24", "properties": [Object], "service": "180a" }, { "characteristic": "8667556c-9a37-4c91-84ed-54ee27d90049", "descriptors": [Array], "properties": [Object], "service": "d0611e78-bbb4-4591-a5f8-487910ae4366" }, { "characteristic": "af0badb1-5b99-43cd-917a-a77bc549e3cc", "descriptors": [Array], "properties": [Object], "service": "9fa480e0-4967-4542-9390-d343dc5d04ae" }],
 
 "id": "70:AE:D5:53:86:90", 
 "name": "Aditya’s MacBook Air",
  "rssi": -48, 
  "services": [{ "uuid": "1800" }, { "uuid": "1801" }, { "uuid": "180a" }, { "uuid": "d0611e78-bbb4-4591-a5f8-487910ae4366" }, { "uuid": "9fa480e0-4967-4542-9390-d343dc5d04ae" }, { "uuid": "1800" }, { "uuid": "1801" }, { "uuid": "180a" }, { "uuid": "d0611e78-bbb4-4591-a5f8-487910ae4366" }, { "uuid": "9fa480e0-4967-4542-9390-d343dc5d04ae" }]
 }
const App = () => {
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
    console.log("62")
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
          BleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (peripheral) => {
            console.log('Discovered device:', peripheral);
            // setnewD([...newD,peripheral])
            setnewD((prevDevices) => [...prevDevices, peripheral])
            // Update UI with discovered device information
          });

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

  useEffect(() => {
    // let stopListener = BleManagerEmitter.addListener(
    //   'BleManagerStopScan',
    //   () => {
    //     setIsScanning(false);
    //     console.log('Scan is stopped');
    //   },
    // );
    // BleManagerEmitter.addListener('BleManagerDiscoverPeripheral', (peripheral) => {
    //   console.log('Discovered device:', peripheral);
    //   // Update UI with discovered device information
    // });
    BleManagerEmitter.addListener('BleManagerConnectPeripheral', peripheral => {
      console.log('Connected to:', peripheral);
    });
  }, []);

  const startScan = () => {
    if (!isScanning) {
      BleManager.scan([], 5, true)
        .then(() => {
          console.log('Scanning...');
          setIsScanning(true);

          // setTimeout(() => {
          //   BleManagerEmitter.addListener(
          //     'BleManagerStopScan',
          //     () => {
          //       console.log("newD.length ", newD.length)
          //       setIsScanning(false);
          //       console.log('Scan is stopped');
          //     },
          //   );
          // }, 5000);
          // BleManagerEmitter.addListener('BleManagerDiscoverPeripheral', peripheral => {
          //   console.log('Discovered device:', peripheral);
          //   // Update UI with discovered device information
          // });
        })
        .catch(error => {
          console.error('Scan error:', error);
        });
    }
  };

  const peripherals = new Map()
  const [connectedDevices, setConnectedDevices] = useState([]);

  const handleGetConnectedDevices = () => {
    console.log("92")
    BleManager.getConnectedPeripherals([]).then(results => {
      if (results.length === 0) {
        console.log('No connected bluetooth devices');

      } else {
        console.log('98 bluetooth devices');

        for (let i = 0; i < results.length; i++) {
          let peripheral = results[i];
          // peripheral.connected = true;
          // peripherals.set(peripheral.id, peripheral);
          // setConnectedDevices(Array.from(peripherals.values()));
        }
      }
    }).catch((err) => console.log("handleGetConnectedDevices err: 103 line ", err));
  };

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  /* render list of bluetooth devices */
  const RenderItem = ({ peripheral }) => {
    const { name, rssi, connected } = peripheral;
    return (
      <>
        {name && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <View style={styles.deviceItem}>
              <Text style={styles.deviceName}>{name}</Text>
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
  const [discoveredDevices, setDiscoveredDevices] = useState([]);

  // pair with device first before connecting to it
  const connectToPeripheral = peripheral => {
    BleManager.createBond(peripheral.id)
      .then(() => {
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        setConnectedDevices(Array.from(peripherals.values()));
        setDiscoveredDevices(Array.from(peripherals.values()));
        console.log('BLE device paired successfully');
        BleManager.connect(peripheral.id)
          .then(async () => {
            console.log('Connected to device:', peripheral.id, JSON.stringify(peripheral));
            try {

              let data = await BleManager.retrieveServices(peripheral.id)
              console.log("233 data ,", data)
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
      })
      .catch((e) => {
        console.log('failed to bond', e);
      });
  };

  // const discoverServices = async () => {
  //   try {
  //     const discoveredDevices = await BleManager.connectedDevices();
  //     if (discoveredDevices.length > 0) {
  //       const connectedDevice = discoveredDevices[0]; // Assuming single connection
  //       const servicesAndCharacteristics = await connectedDevice.discoverAllServicesAndCharacteristics();
  //       console.log('Discovered services and characteristics:', servicesAndCharacteristics);
  //       // Process retrieved services and characteristics
  //     } else {
  //       console.log('No connected devices found');
  //     }
  //   } catch (error) {
  //     console.error('Service discovery error:', error);
  //     // Handle discovery errors (optional)
  //   }
  // };
  return (
    <SafeAreaView style={[backgroundStyle, styles.mainBody]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        style={backgroundStyle}
        contentContainerStyle={styles.mainBody}
        contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
            marginBottom: 40,
          }}>
          <View>
            <Text
              style={{
                fontSize: 30,
                textAlign: 'center',
                color: isDarkMode ? Colors.white : Colors.black,
              }}>
              React Native BLE Manager Tutorial
            </Text>
          </View>
          {/* <TouchableOpacity activeOpacity={0.5} style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Scan Bluetooth Devices </Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={startScan}>
            <Text style={styles.buttonTextStyle}>
              {isScanning ? 'Scanning...' : 'Scan Bluetooth Devices'}
            </Text>
          </TouchableOpacity>

        </View>
        {newD.length > 0 ? (
          <FlatList
            data={newD}
            renderItem={({ item }) => <RenderItem peripheral={item} />}
            keyExtractor={(item, index) => `${item.id}-${index}`}
          />
        ) : (
          <Text style={styles.noDevicesText}>No devices Found</Text>
        )}
      </ScrollView>
      {/* list of scanned bluetooth devices */}
      {connectedDevices.length > 0 ? (
        <FlatList
          data={connectedDevices}
          renderItem={({ item }) => <RenderItem peripheral={item} />}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text style={styles.noDevicesText}>No connected devices</Text>
      )}

    </SafeAreaView>
  );
};
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    height: windowHeight,
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
});
export default App;