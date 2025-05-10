import * as React from 'react';
import { View, Image, StyleSheet, Text, TextInput, Pressable, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingScreen({ navigation, onOnboard}) {
  const [firstName, setFirstName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleNext = async () => {
    if (isSubmitting) return; // prevent multiple presses
    setIsSubmitting(true);

    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!firstName.trim()) {
      Alert.alert('Validation Error', 'First name cannot be empty.');
    } else if (!nameRegex.test(firstName)) {
      Alert.alert('Validation Error', 'First name must contain only letters.');
    } else if (!email.trim()) {
      Alert.alert('Validation Error', 'Email cannot be empty.');
    } else if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
    } else {
      await AsyncStorage.setItem('hasOnboarded', 'true');
      await AsyncStorage.setItem('userFirstName', firstName);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('hasOnboarded', 'true');
      console.log('Onboarding complete, hasOnboarded set to true'); // Debug log
      // setHasOnboarded(true); 
      // navigation.replace('Home'); // Navigate to Home and prevent going back
      onOnboard(); 
    }
    setIsSubmitting(false);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Image source={require('../assets/Logo.png')} />
      </View>

      <View style={styles.container}>
        <Text style={styles.Text}>Let us get to know you</Text>

        <Text style={styles.Text}>First Name</Text>
        <TextInput
          style={styles.inputBox}
          value={firstName}
          onChangeText={setFirstName}
        />

        <Text style={styles.Text}>Email</Text>
        <TextInput
          style={styles.inputBox}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#CBD2D9',
  },
  container: {
    flex: 1,
    backgroundColor: '#CBD2D9',
    padding: 40,
  },
  header: {
    alignItems: 'center',
    backgroundColor: '#DEE3E9',
    paddingVertical: 30,
  },
  footer: {
    backgroundColor: '#F1F4F7',
    alignItems: 'center',
    paddingVertical: 40,
  },
  Text: {
    fontSize: 24,
    padding: 20,
    color: '#495E57',
    textAlign: 'center',
  },
  inputBox: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    borderRadius: 8,
    padding: 0,
    fontSize: 16,
    borderColor: '#495E57',
    backgroundColor: '#EDEFEE',
  },
  button: {
    alignSelf: 'flex-end',
    marginRight: 20,
    fontSize: 22,
    padding: 5,
    marginVertical: 8,
    width: 100,
    backgroundColor: '#CBD2D9',
    borderRadius: 8,
  },
  buttonText: {
    color: '#495E57',
    textAlign: 'center',
    fontSize: 24,
  },
});

