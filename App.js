import React from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>SocialStream</Text>
      </View>
      <View style={styles.body}>
        <Text>आपका सोशल मीडिया ऐप तैयार हो रहा है!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 60, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderColor: '#eee', marginTop: 40 },
  logo: { fontSize: 24, fontWeight: 'bold', color: '#e91e63' },
  body: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});
         
