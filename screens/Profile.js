import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaskedTextInput } from 'react-native-mask-text';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import { useContext } from 'react';
import { ImageContext } from './ImageContext';


const ProfileScreen = () => {

  const { image, setImage, firstName, setFirstName, lastName, setLastName } = useContext(ImageContext);

  // const [image, setImage] = useState(null);
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkedStates, setCheckedStates] = useState([false, false, false, false]);
  const initials = `${firstName?.charAt(0) ?? ''}${lastName?.charAt(0) ?? ''}`.toUpperCase();

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const toggleCheckbox = (index) => {
    const updated = [...checkedStates];
    updated[index] = !updated[index];
    setCheckedStates(updated);
  };

  const labels = ['Order statuses', 'Password changes', 'Special offers', 'Newsletter'];

  const handleSaveChanges = async () => {
    try {
      await AsyncStorage.setItem('userImage', image || '');
      await AsyncStorage.setItem('userFirstName', firstName);
      await AsyncStorage.setItem('userLastName', lastName);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPhone', phone);
      await AsyncStorage.setItem('userCheckboxes', JSON.stringify(checkedStates));
      Alert.alert('Success', 'Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      Alert.alert('Error', 'Failed to save changes.');
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  const handleDiscardChanges = async () => {
    try {
      const storedFirstName = await AsyncStorage.getItem('userFirstName');
      const storedLastName = await AsyncStorage.getItem('userLastName');
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPhone = await AsyncStorage.getItem('userPhone');
      const storedImage = await AsyncStorage.getItem('userImage');
      const storedCheckboxes = await AsyncStorage.getItem('userCheckboxes');

      if (storedFirstName) setFirstName(storedFirstName);
      if (storedLastName) setLastName(storedLastName);
      if (storedEmail) setEmail(storedEmail);
      if (storedPhone) setPhone(storedPhone);
      if (storedImage) setImage(storedImage);
      if (storedCheckboxes) setCheckedStates(JSON.parse(storedCheckboxes));
    } catch (error) {
      console.error('Error discarding changes:', error);
    }
  };

  useEffect(() => {
    handleDiscardChanges();
  }, []);

  
const navigation = useNavigation();

const handleLogout = async () => {
  try {
    await AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Onboarding' }],
      })
    );
  } catch (error) {
    console.error('Logout error:', error);
    Alert.alert('Logout Failed', 'Could not complete logout. Please try again.');
  }
};


  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
  <Image
    source={require('../assets/arrow-left-circle.png')}
    style={{ width: 30, height: 30 }}
  />
</TouchableOpacity>

        <View style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center' }}>
          <Image source={require('../assets/Logo.png')} />
        </View>

        <TouchableOpacity onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.initials}>{initials}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Body */}
      <View style={styles.container}>
        <Text style={styles.Title}>Personal information</Text>
        <Text style={styles.Text}>Avatar</Text>

        <View style={styles.footer}>
          <TouchableOpacity onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.initials}>{initials}</Text>
              </View>
            )}
          </TouchableOpacity>

          <Pressable style={styles.button1} onPress={pickImage}>
            <Text style={styles.buttonText1}>Change</Text>
          </Pressable>

          <Pressable style={styles.button2} onPress={handleRemoveImage}>
            <Text style={styles.buttonText2}>Remove</Text>
          </Pressable>
        </View>

        <Text style={styles.Text}>First Name</Text>
        <TextInput style={styles.inputBox} value={firstName} onChangeText={setFirstName} />

        <Text style={styles.Text}>Last Name</Text>
        <TextInput style={styles.inputBox} value={lastName} onChangeText={setLastName} />

        <Text style={styles.Text}>Email</Text>
        <TextInput
          style={styles.inputBox}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
        />

        <Text style={styles.Text}>Phone number</Text>
        <MaskedTextInput
          style={styles.inputBox}
          mask="(999) 999-9999"
          onChangeText={(text, rawText) => setPhone(rawText)}
          value={phone}
          keyboardType="phone-pad"
          placeholder="(123) 456-7890"
        />

        <Text style={styles.Title}>Email notifications</Text>

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

        <Pressable style={styles.button3} onPress={handleLogout}>
          <Text style={styles.buttonText3}>Log out</Text>
        </Pressable>

        <View style={styles.footer}>
          <Pressable style={styles.button4} onPress={handleDiscardChanges}>
            <Text style={styles.buttonText4}>Discard changes</Text>
          </Pressable>

          <Pressable style={styles.button5} onPress={handleSaveChanges}>
            <Text style={styles.buttonText5}>Save changes</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#FFFFFF',
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
    height: 45,
    margin: 12,
    borderWidth: 2,
    borderRadius: 8,
    fontSize: 16,
    borderColor: '#EDEFEE',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  button1: {
    marginRight: 20,
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
    padding: 5,
    marginVertical: 8,
    width: 100,
    borderColor: '#000000',
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
    padding: 5,
    marginVertical: 8,
    backgroundColor: '#F4CE14',
    borderColor: '#EE9972',
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
    padding: 5,
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
    padding: 5,
    borderColor: '#000000',
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
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  placeholder: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    fontSize: 15,
    color: '#fff',
  },
});

export default ProfileScreen;
