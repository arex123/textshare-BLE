import React, { useEffect, useState } from 'react';
import {Text, StyleSheet, View, TextInput, Button} from 'react-native';

const Form = ({navigation,route}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    // Add more fields as needed
  });


  useEffect(()=>{
    console.log("route name: ",route.params.name)
    console.log("route id: ",route.params.deviceId)
  },[])

  const handleInputChange = (fieldName, value) => {  
    setFormData({
      ...formData,
      [fieldName]: value
    });
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{route?.params?.name}</Text>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Email" 
          value={formData.email}
          onChangeText={(value)=>handleInputChange('email',value)}
        />
        <TextInput 
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          value={formData.password}
          onChangeText={(value)=>handleInputChange('password',value)}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'flex-start',
    paddingTop:200,
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default Form;
