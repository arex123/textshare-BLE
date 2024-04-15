import { useState } from "react"
import { PermissionsAndroid, Platform } from "react-native"
import { BleManager } from "react-native-ble-plx"

const bleManager = new BleManager()

const useBluetooth = ()=>{

  const [allDevices,setAllDevices]=useState([])
  const [connectedDevice, setConnectedDevice] = useState(null)


const requestBluetoothPermission = async () => {
    if (Platform.OS === 'ios') {
      return true
    }
    if (Platform.OS === 'android' && PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) {
      const apiLevel = parseInt(Platform.Version.toString(), 10)
  
      if (apiLevel < 31) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        return granted === PermissionsAndroid.RESULTS.GRANTED
      }
      if (PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN && PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT) {
        const result = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        ])
  
        return (
          result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
          result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED
        )
      }
    }
  
    this.showErrorToast('Permission have not been granted')
  
    return false
  }
  


  const isDuplicteDevice = (devices, nextDevice) =>
    devices.findIndex((device) => nextDevice.id === device.id) > -1;

  const scanForPeripherals = async () =>{

   
    
    bleManager.startDeviceScan(null, null, (error, devices) => {
      console.log('52')
      if (error) {
        console.log("error scanForPeripherals: ",error);
      }
      if (devices) {
        setAllDevices((prevState) => {
          if (!isDuplicteDevice(prevState, devices)) {
            return [...prevState, devices];
          }
          return prevState;
        });
      }
    });
    
    // setTimeout(()=>{
    //   console.log("scanning stopped")
    //    bleManager.stopDeviceScan()},5000)
  
  }


  const connectToDevice = async (device) => {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id);
      if (connectedDevice) {
        bleManager.cancelDeviceConnection(connectedDevice.id);
      }
      setConnectedDevice(deviceConnection);
      await deviceConnection.discoverAllServicesAndCharacteristics();
      bleManager.stopDeviceScan();
      startStreamingData(deviceConnection);
    } catch (e) {
      console.log('FAILED TO CONNECT', e);
    }
  };

  const disconnectFromDevice = () => {
    if (connectedDevice) {
      bleManager.cancelDeviceConnection(connectedDevice.id);
      setConnectedDevice(null);
    }
  };

  const startStreamingData = async (device) => {
    if (device) {
      console.log("97: ",device)
      // device.monitorCharacteristicForService(
      //   HEART_RATE_UUID,
      //   HEART_RATE_CHARACTERISTIC,
      //   (error, characteristic) => onHeartRateUpdate(error, characteristic),
      // );
    } else {
      console.log('No Device Connected');
    }
  };

  return {
    requestBluetoothPermission,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    disconnectFromDevice,
    connectedDevice
  }
}

export default useBluetooth