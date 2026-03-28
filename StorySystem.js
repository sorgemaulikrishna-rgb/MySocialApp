import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const StorySystem = () => {
  // यह डमी डेटा है, असली डेटा बाद में API से आएगा
  const [stories, setStories] = useState([
    { id: '1', user: 'आपका नाम', image: 'https://via.placeholder.com/150' },
    { id: '2', user: 'दोस्त 1', image: 'https://via.placeholder.com/150' },
    { id: '3', user: 'दोस्त 2', image: 'https://via.placeholder.com/150' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Stories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storyList}>
        {/* अपनी स्टोरी डालने का बटन */}
        <TouchableOpacity style={styles.addStory}>
          <View style={styles.plusIcon}>
            <Ionicons name="add" size={30} color="white" />
          </View>
          <Text style={styles.userText}>Your Story</Text>
        </TouchableOpacity>

        {/* बाकी लोगों की स्टोरीज */}
        {stories.map((item) => (
          <View key={item.id} style={styles.storyCircle}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.userText}>{item.user}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10, backgroundColor: '#fff', borderBottomWidth: 0.5, borderColor: '#dbdbdb' },
  headerText: { fontSize: 18, fontWeight: 'bold', marginLeft: 15, marginBottom: 10 },
  storyList: { paddingLeft: 10 },
  addStory: { alignItems: 'center', marginRight: 15 },
  plusIcon: { width: 60, height: 60, borderRadius: 30, backgroundColor: '#0095f6', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff' },
  storyCircle: { alignItems: 'center', marginRight: 15 },
  image: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#e95950' },
  userText: { fontSize: 12, marginTop: 5, color: '#262626' },
});

export default StorySystem;
