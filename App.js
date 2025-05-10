import * as React from 'react';
import { Text, View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/Onboarding';
import ProfileScreen from './screens/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

const Stack = createNativeStackNavigator();

export default function App() {
  const [hasOnboarded, setHasOnboarded] = useState(false); // Default to false
  const [isLoading, setIsLoading] = useState(true); // Track loading state while AsyncStorage is being checked

  // Check onboarding status from AsyncStorage when the app starts
  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const value = await AsyncStorage.getItem('hasOnboarded');
        console.log('AsyncStorage hasOnboarded value:', value); // Debug log
        
        if (value === null || value !== 'true') {
          setHasOnboarded(false); // Force onboarding if not completed
        } else {
          setHasOnboarded(true); // Onboarding already completed
        }
      } catch (error) {
        console.error('Error reading AsyncStorage:', error);
      } finally {
        setIsLoading(false); // Finished checking AsyncStorage, set loading to false
      }
    };

    checkOnboarding(); // Call the function when app starts
  }, []);

  // Show splash screen or loading indicator while checking AsyncStorage
  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Handle navigation logic
  return (
<NavigationContainer>
  <Stack.Navigator initialRouteName={hasOnboarded ? 'Profile' : 'Onboarding'}>
    <Stack.Screen
      name="Onboarding"
      options={{ headerShown: false }}
    >
      {(props) => (
        <OnboardingScreen
          {...props}
          onOnboard={async () => {
            setHasOnboarded(true);
            await AsyncStorage.setItem('hasOnboarded', 'true');
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Profile' }],
            });
          }}
        />
      )}
    </Stack.Screen>
    <Stack.Screen
      name="Profile"
      options={{ headerShown: false }}
      component={ProfileScreen}
    />
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








