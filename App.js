import * as React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/Onboarding';
import HomeScreen from './screens/Home';
import ProfileScreen from './screens/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [hasOnboarded, setHasOnboarded] = useState(null); // Track onboarding state
  const [isLoading, setIsLoading] = useState(true); // Track loading state while AsyncStorage is being checked

  // // 🔧 TEMPORARY: clear AsyncStorage for testing
  // useEffect(() => {
  //   const clearAsyncStorage = async () => {
  //     await AsyncStorage.removeItem('hasOnboarded');
  //     console.log('AsyncStorage cleared');
  //   };
  //   clearAsyncStorage();
  // }, []);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('hasOnboarded');
        console.log('AsyncStorage hasOnboarded value:', value); // Debug log
        setHasOnboarded(value === 'true'); // Set onboarding state based on AsyncStorage value
      } catch (error) {
        console.error('Error reading AsyncStorage:', error);
      } finally {
        setIsLoading(false); // Finished checking AsyncStorage, set loading to false
      }
    };

    checkOnboarding(); // Call the function when app starts
  }, []);

  if (isLoading) {
    // Show splash screen or loading indicator while checking AsyncStorage
    return (
      <View style={styles.splashContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {hasOnboarded ? (
          // If onboarding is completed, show Profile screen
          <Stack.Screen name="Profile" options={{ headerShown: false }} component={ProfileScreen} />
        ) : (
          // If onboarding is not completed, show Onboarding screen
          <Stack.Screen
          name="Onboarding"
          options={{ headerShown: false }}
        >
          {(props) => <OnboardingScreen {...props} onOnboard={() => setHasOnboarded(true)} />}
        </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});


