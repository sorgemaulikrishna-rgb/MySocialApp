import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// टैब नेविगेटर बनाना
const Tab = createBottomTabNavigator();

// --- 1. लॉगिन स्क्रीन का कोड ---
function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("गलती", "कृपया ईमेल और पासवर्ड भरें");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://social-app-server-32un.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (data.status === 'success') {
        onLoginSuccess(); // लॉगिन सफल होने पर अंदर भेजें
      } else {
        Alert.alert("गलती", "ईमेल या पासवर्ड गलत है");
      }
    } catch (error) {
      Alert.alert("एरर", "सर्वर से कनेक्ट नहीं हो पा रहा है!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.logoText}>VibeTube</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        onChangeText={setEmail} 
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        onChangeText={setPassword} 
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>
    </View>
  );
}

// --- 2. मुख्य ऐप का कोड (लॉगिन के बाद जो दिखेगा) ---
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Reels') iconName = 'play-circle';
          else if (route.name === 'Profile') iconName = 'person';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        headerShown: true,
      })}
    >
      <Tab.Screen name="Home" component={() => <View style={styles.center}><Text>Home Screen</Text></View>} />
      <Tab.Screen name="Reels" component={() => <View style={styles.center}><Text>Reels Screen</Text></View>} />
      <Tab.Screen name="Profile" component={() => <View style={styles.center}><Text>Profile Screen</Text></View>} />
    </Tab.Navigator>
  );
}

// --- 3. मेन ऐप एक्सपोर्ट ---
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainTabs />
      ) : (
        <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />
      )}
    </NavigationContainer>
  );
}

// --- स्टाइल्स ---
const styles = StyleSheet.create({
  loginContainer: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#fff' },
  logoText: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: 'red' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 15, marginBottom: 15, borderRadius: 8, fontSize: 16 },
  button: { backgroundColor: 'red', padding: 15, alignItems: 'center', borderRadius: 8, marginTop: 10 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
    
