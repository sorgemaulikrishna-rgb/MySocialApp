import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.languageSelect}>
        <Text style={styles.languageText}>English (India)</Text>
      </View>

      <View style={styles.mainContent}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/800px-Instagram_logo.svg.png' }}
          style={styles.logo}
        />

        <TextInput
          style={styles.input}
          placeholder="Username, email or mobile number"
          placeholderTextColor="#8e8e8e"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#8e8e8e"
          secureTextEntry
        />

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.facebookLogin}>
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png' }}
            style={styles.facebookIcon}
          />
          <Text style={styles.facebookLoginText}>Continue as Mauli Sorge</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.signupLink}> Sign up.</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  languageSelect: {
    marginBottom: 20,
  },
  languageText: {
    color: '#8e8e8e',
    fontSize: 12,
  },
  mainContent: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 44,
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#262626',
  },
  loginButton: {
    width: '100%',
    height: 44,
    backgroundColor: '#3797f0',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#3797f0',
    fontSize: 12,
    marginTop: 15,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#dbdbdb',
  },
  orText: {
    color: '#8e8e8e',
    marginHorizontal: 10,
    fontSize: 12,
  },
  facebookLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  facebookIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  facebookLoginText: {
    color: '#3797f0',
    fontSize: 14,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderColor: '#dbdbdb',
    paddingTop: 20,
    width: '100%',
  },
  signupText: {
    color: '#262626',
    fontSize: 14,
  },
  signupLink: {
    color: '#3797f0',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
          
