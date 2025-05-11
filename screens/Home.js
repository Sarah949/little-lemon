import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ImageContext } from './ImageContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { image, firstName, lastName } = useContext(ImageContext);

  const initials = `${firstName?.charAt(0) ?? ''}${lastName?.charAt(0) ?? ''}`.toUpperCase();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Centered Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/Logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Avatar / Initials on top-right */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={styles.avatarContainer}
        >
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.initials}>{initials}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* ...rest of your screen */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    height: 40,
  },
  avatarContainer: {
    position: 'absolute',
    right: 16,
    top: 20,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  placeholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initials: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

