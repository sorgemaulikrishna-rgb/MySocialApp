import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image, TouchableOpacity } from 'react-native';

const { height, width } = Dimensions.get('window');

// डमी डेटा (यही डेटा बाद में आपके डेटाबेस से आएगा)
const DUMMY_REELS = [
  { id: '1', user: 'Amit_Vibe', caption: 'आज का मौसम! #vibes', likes: '10K' },
  { id: '2', user: 'Rahul_Tech', caption: 'New App coming soon..', likes: '5K' },
];

const Reels = () => {
  const renderItem = ({ item }) => (
    <View style={styles.reelContainer}>
      {/* वीडियो की जगह ब्लैक बैकग्राउंड और एक डमी आइकॉन */}
      <View style={styles.videoPlaceholder}>
        <Text style={{color: '#555'}}>Video Playing...</Text>
      </View>

      {/* राइट साइड के बटन (Like, Comment, Share) */}
      <View style={styles.rightButtons}>
        <TouchableOpacity style={styles.iconButton}><Text style={styles.iconText}>❤️</Text><Text style={styles.countText}>{item.likes}</Text></TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}><Text style={styles.iconText}>💬</Text><Text style={styles.countText}>45</Text></TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}><Text style={styles.iconText}>✈️</Text></TouchableOpacity>
      </View>

      {/* नीचे का कैप्शन और यूजरनाम */}
      <View style={styles.bottomInfo}>
        <Text style={styles.username}>@{item.user}</Text>
        <Text style={styles.caption}>{item.caption}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={DUMMY_REELS}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      pagingEnabled // इससे रील एक-एक करके स्वाइप होगी (Instagram जैसा)
      showsVerticalScrollIndicator={false}
      snapToInterval={height}
      snapToAlignment="start"
      decelerationRate="fast"
    />
  );
};

const styles = StyleSheet.create({
  reelContainer: { height: height, width: width, backgroundColor: '#000' },
  videoPlaceholder: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#111' },
  rightButtons: { position: 'absolute', right: 15, bottom: 100, alignItems: 'center' },
  iconButton: { marginBottom: 20, alignItems: 'center' },
  iconText: { fontSize: 30 },
  countText: { color: '#fff', fontSize: 12 },
  bottomInfo: { position: 'absolute', left: 15, bottom: 40, width: '80%' },
  username: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  caption: { color: '#fff', fontSize: 14 },
});

export default Reels;
        
