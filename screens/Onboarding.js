import * as React from 'react';
import { View, Image, StyleSheet,Text, TextInput, Pressable } from 'react-native';

export default function Onboardingscreen(){
    return(
        <View style={styles.wrapper}>

            <View style={styles.header}>
            <Image  source={require('../assets/Logo.png')} />
            </View>

            <View style={styles.container}>
            <Text style={styles.Text}>Let us get to know you</Text>
            <Text style={styles.Text}>First Name</Text>
            <TextInput
            style={styles.inputBox}/>
            <Text style={styles.Text}>Email</Text>
            <TextInput
            style={styles.inputBox}/>
            </View>

            <View style={styles.footer}>
            <Pressable 
            style={styles.button}>
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
    container:{
        flex: 1,
        backgroundColor: '#CBD2D9',
        padding:40,
    },
    header: {
        alignItems: 'center',
        backgroundColor: '#DEE3E9',
        alignItems: 'center',
        paddingVertical: 30,
  
      },
      footer: {
        backgroundColor: '#F1F4F7',
        alignItems: 'center',
        paddingVertical: 40,
      },
    Text:{
        fontSize: 24,
        padding:20,
        color: '#495E57',
        textAlign: 'center',
    },
    inputBox:{
        height: 40,
        margin: 12,
        borderWidth: 2,
        borderRadius: 8,
        padding:0,
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
        width:100,
        backgroundColor: '#CBD2D9',
        borderRadius: 8,
      },
      buttonText: {
        color: '#495E57',
        textAlign: 'center',
        fontSize: 24,
      },
});