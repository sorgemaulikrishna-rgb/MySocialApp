import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';

const Reels = () => {
  const [reels, setReels] = useState([]);

  // आपके Backend API से डेटा लाने के लिए (जब आपका सर्वर चालू हो)
  useEffect(() => {
    // यहाँ आप अपने Backend का URL डालेंगे
    // fetch('https://your-api-url.com/reels')
    //   .then(res => res.json())
    //   .then(data => setReels(data));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>VibeTube Reels</Text>
      <FlatList
        data={reels}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.reelCard}>
            <Text style={styles.videoPlaceholder}>Video URL: {item.videoUrl}</Text>
            <Text style={styles.caption}>{item.caption}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{color: 'white', textAlign: 'center'}}>No Reels Found. Connect your Backend API.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingTop: 50 },
  header: { color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  reelCard: { height: Dimensions.get('window').height - 100, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#333' },
  videoPlaceholder: { color: '#00f', marginBottom: 10 },
  caption: { color: '#fff', fontSize: 16 }
});

export default Reels;
          
