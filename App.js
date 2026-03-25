import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Feather, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function App() {
  const [liked, setLiked] = useState(false);
  const [following, setFollowing] = useState(false);
  
  // लाइक एनीमेशन के लिए
  const lastTap = useRef(null);
  const animatedValue = useRef(new Animated.Value(0)).current;

  // डबल टैप लॉजिक
  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap.current && (now - lastTap.current) < DOUBLE_PRESS_DELAY) {
      setLiked(true);
      animateHeart();
    } else {
      lastTap.current = now;
    }
  };

  const animateHeart = () => {
    Animated.sequence([
      Animated.spring(animatedValue, { toValue: 1, useNativeDriver: true }),
      Animated.spring(animatedValue, { toValue: 0, useNativeDriver: true }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Top Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>NEXT-GEN</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity><Feather name="plus-square" size={24} style={styles.icon} /></TouchableOpacity>
          <TouchableOpacity><Feather name="heart" size={24} style={styles.icon} /></TouchableOpacity>
          <TouchableOpacity><Feather name="send" size={24} style={styles.icon} /></TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 2. Professional Stories Section */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <View key={i} style={styles.storyCircle}>
              <View style={styles.storyBorder}>
                <Image source={{ uri: `https://i.pravatar.cc/150?u=${i+50}` }} style={styles.storyImg} />
              </View>
              <Text style={styles.storyText}>User_{i}</Text>
            </View>
          ))}
        </ScrollView>

        {/* 3. Post Section with Double Tap */}
        <View style={styles.post}>
          <View style={styles.postHeader}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ uri: 'https://i.pravatar.cc/150?u=innovator' }} style={styles.postUserImg} />
              <Text style={styles.postUsername}>innovator_king</Text>
            </View>
            <TouchableOpacity 
              style={[styles.followBtn, following && styles.followingBtn]} 
              onPress={() => setFollowing(!following)}
            >
              <Text style={[styles.followText, following && {color: '#000'}]}>
                {following ? 'Following' : 'Follow'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* पोस्ट इमेज - यहाँ डबल टैप काम करेगा */}
          <TouchableOpacity activeOpacity={1} onPress={handleDoubleTap} style={styles.imageContainer}>
            <Image source={{ uri: 'https://picsum.photos/seed/app/500/500' }} style={styles.postImage} />
            
            {/* स्क्रीन के बीच में बड़ा दिल एनीमेशन */}
            <Animated.View style={[styles.overlayHeart, { transform: [{ scale: animatedValue }] }]}>
              <Ionicons name="heart" size={100} color="white" />
            </Animated.View>
          </TouchableOpacity>
          
          <View style={styles.postActions}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => setLiked(!liked)}>
                <Ionicons name={liked ? "heart" : "heart-outline"} size={28} color={liked ? "red" : "black"} />
              </TouchableOpacity>
              <Feather name="message-circle" size={26} style={{marginLeft: 18}} />
              <Feather name="send" size={26} style={{marginLeft: 18}} />
            </View>
            <Feather name="bookmark" size={26} />
          </View>

          <View style={styles.captionArea}>
            <Text style={{fontWeight: 'bold'}}>{liked ? '1,235 likes' : '1,234 likes'}</Text>
            <Text style={{marginTop: 4}}><Text style={{fontWeight: 'bold'}}>innovator_king</Text> Building the future! 🚀🔥</Text>
          </View>
        </View>
      </ScrollView>

      {/* 4. Bottom Tab Bar */}
      <View style={styles.bottomTab}>
        <Ionicons name="home" size={28} color="black" />
        <Feather name="search" size={28} color="gray" />
        <FontAwesome5 name="video" size={24} color="gray" />
        <Feather name="shopping-bag" size={28} color="gray" />
        <View style={styles.profileMini} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, alignItems: 'center', height: 50 },
  logo: { fontSize: 24, fontWeight: 'bold', letterSpacing: -1 },
  headerIcons: { flexDirection: 'row' },
  icon: { marginLeft: 18 },
  storiesContainer: { paddingVertical: 12, borderBottomWidth: 0.3, borderBottomColor: '#dbdbdb' },
  storyCircle: { alignItems: 'center', marginHorizontal: 10 },
  storyBorder: { width: 72, height: 72, borderRadius: 36, borderWidth: 3, borderColor: '#f09433', padding: 2 },
  storyImg: { width: 62, height: 62, borderRadius: 31 },
  storyText: { fontSize: 11, marginTop: 5 },
  post: { marginTop: 10 },
  postHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10 },
  postUserImg: { width: 38, height: 38, borderRadius: 19, marginRight: 10 },
  postUsername: { fontWeight: 'bold', fontSize: 14 },
  followBtn: { backgroundColor: '#0095f6', paddingVertical: 6, paddingHorizontal: 16, borderRadius: 8 },
  followingBtn: { backgroundColor: '#efefef' },
  followText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
  imageContainer: { width: width, height: 400, justifyContent: 'center', alignItems: 'center' },
  postImage: { width: '100%', height: '100%' },
  overlayHeart: { position: 'absolute', zIndex: 10, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 10 },
  postActions: { flexDirection: 'row', justifyContent: 'space-between', padding: 14 },
  captionArea: { paddingHorizontal: 15, paddingBottom: 20 },
  bottomTab: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, borderTopWidth: 0.5, borderTopColor: '#dbdbdb' },
  profileMini: { width: 28, height: 28, borderRadius: 14, backgroundColor: '#ddd' }
});
