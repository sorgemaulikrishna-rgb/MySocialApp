import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

// आपकी मुख्य फाइलों का इम्पोर्ट
import HomeScreen from './App'; // या आपकी मुख्य फीड फाइल
import StorySystem from './StorySystem';
import ReelsScreen from './Reels';
import ProfileScreen from './profile-system';
import SearchScreen from './search-system';
import NotificationScreen from './notification-system';
import MonetizationScreen from './Monetization';

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
            // आपकी फाइलों के अनुसार आइकन्स
            if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Explore') iconName = 'search';
            else if (route.name === 'Reels') iconName = 'play-circle';
            else if (route.name === 'Notifications') iconName = 'notifications';
            else if (route.name === 'Earnings') iconName = 'wallet'; // Monetization के लिए

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#000',
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
        
