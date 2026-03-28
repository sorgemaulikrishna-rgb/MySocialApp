import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// होम स्क्रीन जहाँ वीडियो लिस्ट दिखेगी
function HomeScreen() {
  return (
    <ScrollView style={styles.homeContainer}>
      <View style={styles.videoCard}>
        <View style={styles.thumbnailPlaceholder}>
          <Ionicons name="play-circle" size={50} color="white" />
        </View>
        <Text style={styles.videoTitle}>Welcome to VibeTube - First Video</Text>
        <Text style={styles.videoStats}>1.2M views • 2 hours ago</Text>
      </View>
      
      <View style={styles.videoCard}>
        <View style={styles.thumbnailPlaceholder}>
          <Ionicons name="musical-notes" size={50} color="white" />
        </View>
        <Text style={styles.videoTitle}>Latest Trending Music 2026</Text>
        <Text style={styles.videoStats}>500K views • 5 hours ago</Text>
      </View>
    </ScrollView>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Settings</Text>
      <Text style={{ marginTop: 10 }}>App Version: 1.0.0</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // यह हिस्सा नीचे के आइकन्स को ठीक करेगा
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF0000', // YouTube वाला लाल रंग
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  homeContainer: { flex: 1, backgroundColor: '#f0f0f0' },
  videoCard: { backgroundColor: '#fff', marginBottom: 10, paddingBottom: 10 },
  thumbnailPlaceholder: { 
    width: '100%', 
    height: 200, 
    backgroundColor: '#333', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  videoTitle: { fontSize: 16, fontWeight: 'bold', padding: 10, color: '#000' },
  videoStats: { fontSize: 12, color: 'gray', paddingHorizontal: 10 }
});
    
