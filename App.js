import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// आपकी असली फाइलों के इम्पोर्ट (Paths checked from your file list)
import StorySystem from './StorySystem';
import ReelsScreen from './Reels';
import ProfileScreen from './profile-system';
import SearchScreen from './search-system';
import NotificationScreen from './notification-system';
import MonetizationScreen from './Monetization';

// एक सिंपल होम स्क्रीन अगर आपके पास अलग से Home.js नहीं है
import { View, Text } from 'react-native';
function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome to SocialStream</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// होम स्टैक (फीड + स्टोरीज)
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainFeed" component={HomeScreen} />
      <Stack.Screen name="Stories" component={StorySystem} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Explore') iconName = 'search';
            else if (route.name === 'Reels') iconName = 'play-circle';
            else if (route.name === 'Notifications') iconName = 'notifications';
            else if (route.name === 'Earnings') iconName = 'wallet';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#FF0000', // YouTube Red Look
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Explore" component={SearchScreen} />
        <Tab.Screen name="Reels" component={ReelsScreen} />
        <Tab.Screen name="Notifications" component={NotificationScreen} />
        <Tab.Screen name="Earnings" component={MonetizationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
  }
            
