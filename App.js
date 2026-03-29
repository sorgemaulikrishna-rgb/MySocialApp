import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// आपकी बनाई हुई Screens को यहाँ Import करें
import HomeScreen from './HomeScreen'; // जो होम पेज का डिजाइन हमने बनाया
import SearchScreen from './search-system'; 
import NotificationScreen from './notification-system';
import ProfileScreen from './profile-system';
import MonetizationScreen from './Monetization';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home-outline';
            else if (route.name === 'Search') iconName = 'search-outline';
            else if (route.name === 'Add') iconName = 'add-circle';
            else if (route.name === 'Earn') iconName = 'cash-outline';
            else if (route.name === 'Profile') iconName = 'person-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF0000',
          tabBarInactiveTintColor: 'gray',
          headerShown: false, // टॉप बार छिपाने के लिए
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Earn" component={MonetizationScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
        }
