
import { View,Image,TextInput, Text, StyleSheet,TouchableOpacity, Pressable ,Switch} from 'react-native';
import { ScrollView } from 'react-native';
import React, { useState } from 'react';



const ProfileScreen = ({ navigation  }) => {

  const [checkedStates, setCheckedStates] = useState([false, false, false, false]);

  const toggleCheckbox = (index) => {
    const updated = [...checkedStates];
    updated[index] = !updated[index];
    setCheckedStates(updated);
  };

  const labels = ['Order statuses', 'Password changes', 'Special offers', 'Newsletter'];

  return (
      <ScrollView  style={styles.container}>
      {/* header */}
         <View style={styles.header}>
         <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../assets/arrow-left-circle.png')} // Replace with your image path
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
            <View style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center' }}>
             <Image source={require('../assets/Logo.png')} />
             </View>
           <Image source={require('../assets/Profile.png')}  style={{ width: 40, height: 40 }} />
         </View>
   
         <View style={styles.container}>
           <Text style={styles.Title}>Personal information</Text>
           <Text style={styles.Text}>Avatar</Text>

           <View style={styles.footer}>
           <Image source={require('../assets/Profile.png')}  style={{ width: 40, height: 40 }} />
          <Pressable style={styles.button1} >
             <Text style={styles.buttonText1}>changes</Text>
           </Pressable>

           <Pressable style={styles.button2} >
             <Text style={styles.buttonText2}>Remove</Text>
           </Pressable>
           </View>
           
   
           <Text style={styles.Text}>First Name</Text>
           <TextInput
             style={styles.inputBox}/>

           <Text style={styles.Text}>Last Name</Text>
           <TextInput
             style={styles.inputBox}
           />
   
           <Text style={styles.Text}>Email</Text>
           <TextInput
             style={styles.inputBox}
             keyboardType="email-address"
             autoCapitalize="none"
           />
           <Text style={styles.Text}>Phone number</Text>
           <TextInput
             style={styles.inputBox}
             keyboardType="Phone number"
             autoCapitalize="none"/>

          <Text style={styles.Title}>Email notifications</Text>

          <View>
      {labels.map((label, index) => (
        <TouchableOpacity
          key={index}
          style={styles.checkboxContainer}
          onPress={() => toggleCheckbox(index)}
        >
          <View style={[styles.checkbox, checkedStates[index] && styles.checked]}>
            {checkedStates[index] && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>


           <Pressable style={styles.button3} >
             <Text style={styles.buttonText3}>Log out</Text>
           </Pressable>

          <View style={styles.footer}>
          <Pressable style={styles.button4} >
             <Text style={styles.buttonText4}>Discard changes</Text>
           </Pressable>

           <Pressable style={styles.button5} >
             <Text style={styles.buttonText5}>Save changes</Text>
           </Pressable>
           </View>
         </View>
  
         </ScrollView >
      
  );
};

const styles = StyleSheet.create({


  container: {
    flex: 1,
    padding: 0,
    backgroundColor:'#FFFFFF',
  },
  header: {
   flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 10,
  height: 60,
  position: 'relative',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  Title: {
    fontSize: 24,
    padding: 10,
    color: '#000000',
    textAlign: 'left',
  },
  Text: {
    fontSize: 15,
    padding: 10,
    color: '#000000',
    textAlign: 'left',
  },
  inputBox: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#EDEFEE',
    backgroundColor: '#FFFFFF',
  },
  button1: {
    marginRight: 20,
    fontSize: 22,
    padding: 5,
    marginVertical: 8,
    width: 100,
    backgroundColor: '#495E57',
    borderRadius: 8,
  },
  buttonText1: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
  },
  button2: {
    marginRight: 20,
    fontSize: 22,
    padding: 5,
    marginVertical: 8,
    width: 100,
    borderColor:'#000000',
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonText2: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 15,
  },
  button3: {
    margin: 10,
    fontSize: 22,
    padding: 5,
    marginVertical: 8,
    backgroundColor: '#F4CE14',
    borderColor:'#EE9972',
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonText3: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 24,
  },
  button4: {
    margin: 20,
    fontSize: 22,
    padding: 5,
    marginVertical: 8,
    backgroundColor: '#495E57',
    borderRadius: 8,
  },
  buttonText4: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 15,
  },
  button5: {
    margin: 20,
    fontSize: 22,
    padding: 5,
    marginVertical: 8,
    borderColor:'#000000',
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonText5: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#555',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#495E57',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
  },
});

export default ProfileScreen;