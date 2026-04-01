import React, { useState, useRef, useCallback } from "react"; // 'import' छोटा होना चाहिए
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  StatusBar
} from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";

// स्क्रीन की पूरी ऊंचाई और चौड़ाई
const { height, width } = Dimensions.get("window");

const videos = [
  { id: "1", url: "https://www.w3schools.com/html/mov_bbb.mp4", user: "User 1", likes: 120, comments: 30 },
  { id: "2", url: "https://www.w3schools.com/html/movie.mp4", user: "User 2", likes: 90, comments: 12 }
];

export default function ReelsScreen() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  // Performance के लिए 'useCallback' का इस्तेमाल करना बेहतर है
  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveVideoIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50
  }).current;

  const renderItem = ({ item, index }) => (
    <View style={styles.container}>
      {/* स्टेटस बार को ट्रांसपेरेंट रखने के लिए */}
      <StatusBar hidden={false} barStyle="light-content" translucent backgroundColor="transparent" />
      
      {/* 🎥 Video Component */}
      <Video
        source={{ uri: item.url }}
        style={styles.video}
        resizeMode="cover"
        shouldPlay={activeVideoIndex === index} // केवल सामने वाला वीडियो चलेगा
        isLooping
        useNativeControls={false} // रील में कंट्रोल्स नहीं होते
        isMuted={false}
      />

      {/* ❤️ Right Side Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconBox} activeOpacity={0.7}>
          <Ionicons name="heart" size={38} color="#fff" />
          <Text style={styles.text}>{item.likes}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox} activeOpacity={0.7}>
          <Ionicons name="chatbubble-ellipses" size={32} color="#fff" />
          <Text style={styles.text}>{item.comments}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBox} activeOpacity={0.7}>
          <Ionicons name="paper-plane" size={32} color="#fff" />
          <Text style={styles.text}>Share</Text>
        </TouchableOpacity>
      </View>

      {/* 👤 Bottom Details */}
      <View style={styles.bottomText}>
        <Text style={styles.username}>@{item.user}</Text>
        <Text style={styles.caption}>Awesome short video 🔥 #viral #coding</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        // रेंडरिंग को फ़ास्ट बनाने के लिए
        removeClippedSubviews={true} 
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: "#000"
  },
  video: {
    flex: 1,
    height: height,
    width: width
  },
  actions: {
    position: "absolute",
    right: 15,
    bottom: 100,
    alignItems: "center"
  },
  iconBox: {
    marginBottom: 20,
    alignItems: "center"
  },
  text: {
    color: "#fff",
    marginTop: 4,
    fontSize: 12,
    fontWeight: '600'
  },
  bottomText: {
    position: "absolute",
    bottom: 60,
    left: 15,
    right: 60 // ताकि टेक्स्ट बटन्स के ऊपर न चढ़े
  },
  username: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5
  },
  caption: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 18
  }
});
