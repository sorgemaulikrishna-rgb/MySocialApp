import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function App() {
  return (
    <View style={styles.container}>

      {/* 1. Top Bar - बिल्कुल फोटो जैसा */}
      <View style={styles.topBar}>
        <Text style={styles.logo}>SocialStream</Text>
        <TouchableOpacity>
          <Feather name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 70 }}>
        
        {/* 2. Stories Section - गोल और बॉर्डर के साथ */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <View key={item} style={styles.storyWrapper}>
              <View style={styles.storyCircle}>
                <Image 
                  source={{ uri: `https://i.pravatar.cc/150?u=${item}` }} 
                  style={styles.storyImage} 
                />
              </View>
              <Text style={styles.storyText}>User {item}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 3. Video Section - 20/30 min videos */}
        <View style={styles.videoSection}>
          <Text style={styles.sectionTitle}>20/30 min videos</Text>
          <View style={styles.videoBox}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085' }} 
              style={styles.thumbnail} 
            />
            {/* Play Icon Overlay */}
            <View style={styles.playButton}>
              <Ionicons name="play" size={40} color="white" />
            </View>
          </View>
          <Text style={styles.videoDesc}>New Tech Review - 25:00 min</Text>
        </View>

      </ScrollView>

      {/* 4. Bottom Navigation - फिक्स्ड और प्रोफेशनल */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}><Ionicons name="home-outline" size={26} color="black" /></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Ionicons name="play-circle-outline" size={26} color="black" /></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Ionicons name="add-circle" size={32} color="#FF0000" /></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Ionicons name="search-outline" size={26} color="black" /></TouchableOpacity>
        <TouchableOpacity style={styles.navItem}><Ionicons name="person-outline" size={26} color="black" /></TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 45, // स्टेटस बार के लिए जगह
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
  },

  logo: {
    fontSize: 22,
    fontWeight: '900',
    color: '#000',
    letterSpacing: -1,
  },

  // Stories Styles
  storiesContainer: {
    paddingVertical: 15,
    paddingLeft: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
  },
  storyWrapper: {
    alignItems: 'center',
    marginRight: 15,
  },
  storyCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#FF0000', // इंस्टाग्राम जैसा लाल घेरा
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#eee',
  },
  storyText: {
    fontSize: 11,
    marginTop: 5,
    color: '#333',
  },

  // Video Section Styles
  videoSection: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  videoBox: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
    borderRadius: 15,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    opacity: 0.8,
  },
  playButton: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 50,
    padding: 10,
  },
  videoDesc: {
    marginTop: 10,
    fontSize: 14,
    color: '#555',
  },

  // Bottom Navigation Styles
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#dbdbdb',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
