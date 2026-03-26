import { registerRootComponent } from 'expo';
import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator 
} from 'react-native';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // --- लॉगिन फंक्शन (Render Server से कनेक्टेड) ---
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "कृपया ईमेल और पासवर्ड डालें!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://social-app-server-32un.onrender.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "स्वागत है! आप लॉगिन हो चुके हैं। ✅");
      } else {
        Alert.alert("Login Failed", data.message || "गलत ईमेल या पासवर्ड।");
      }
    } catch (error) {
      Alert.alert("Error", "सर्वर से कनेक्ट नहीं हो पा रहा। कृपया इंटरनेट चेक करें।");
    } finally {
      setLoading(false);
    }
  };

  // --- गूगल लॉगिन (अभी सिर्फ बटन है, Firebase सेटअप के बाद काम करेगा) ---
  const handleGoogleLogin = () => {
    Alert.alert("Google Login", "Firebase सेटअप के बाद यह काम करना शुरू कर देगा!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>My Social App</Text>
      
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#4285F4', marginTop: 15 }]} 
        onPress={handleGoogleLogin}
      >
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Made with ❤️ by Mauli</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0095f6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footerText: {
    marginTop: 30,
    color: '#888',
    fontSize: 12,
  }
});

registerRootComponent(App);
          
