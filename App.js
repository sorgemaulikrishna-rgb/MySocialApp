import React from 'react';
import { StyleSheet, Text, View, ScrollView, HorizontalScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

// मुख्य फीड स्क्रीन (XML के अनुसार)
function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
      {/* 1. Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.logoText}>SocialStream</Text>
        <Ionicons name="search" size={24} color="black" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 2. Stories Section */}
        <View style={{ height: 100 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <View key={i} style={styles.storyCircle}>
                <Ionicons name="person" size={30} color="#ccc" />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 3. Video Section */}
        <Text style={styles.sectionTitle}>20/30 min videos</Text>
        <View style={styles.videoPlaceholder}>
          <Ionicons name="play-circle" size={80} color="white" />
        </View>

        {/* अतिरिक्त वीडियो कार्ड (डिजाइन भरने के लिए) */}
        <View style={styles.videoPlaceholder}>
          <Ionicons name="play-circle" size={80} color="white" />
        </View>
      </ScrollView>
    </View>
  );
}

// बाकी खाली स्क्रीन्स
function PlaceholderScreen({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Feed') iconName = 'apps';
            else if (route.name === 'Reels') iconName = 'play-outline';
            else if (route.name === 'Upload') iconName = 'add-circle-outline';
            else if (route.name === 'Search') iconName = 'search';
            else if (route.name === 'Profile') iconName = 'person-circle-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { height: 60, backgroundColor: '#EEEEEE' } // XML background
        })}
      >
        <Tab.Screen name="Feed" component={HomeScreen} />
        <Tab.Screen name="Reels" component={PlaceholderScreen} />
        <Tab.Screen name="Upload" component={PlaceholderScreen} />
        <Tab.Screen name="Search" component={PlaceholderScreen} />
        <Tab.Screen name="Profile" component={PlaceholderScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  topBar: { flexDirection: 'row', height: 50, paddingHorizontal: 15, alignItems: 'center', justifyContent: 'space-between' },
  logoText: { fontSize: 20, fontWeight: 'bold' },
  storiesContainer: { paddingLeft: 10 },
  storyCircle: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#f0f0f0', borderWidth: 2, borderColor: '#ccc', margin: 8, justifyContent: 'center', alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '600', padding: 15 },
  videoPlaceholder: { width: width - 20, height: 200, backgroundColor: '#CCCCCC', alignSelf: 'center', borderRadius: 10, marginBottom: 20, justifyContent: 'center', alignItems: 'center' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
              
