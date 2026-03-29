import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.userHandle}>@your_username</Text>
      
      {/* इंस्टाग्राम जैसा 'Professional Dashboard' बटन */}
      <TouchableOpacity 
        style={styles.monetizationBox} 
        onPress={() => navigation.navigate('Monetization')}
      >
        <View>
          <Text style={styles.boxTitle}>Professional Dashboard</Text>
          <Text style={styles.boxSub}>Tools and resources for creators.</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="gray" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, paddingTop: 60 },
  userHandle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  monetizationBox: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 15, 
    backgroundColor: '#f9f9f9', 
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee'
  },
  boxTitle: { fontWeight: 'bold', fontSize: 14 },
  boxSub: { fontSize: 12, color: 'gray' }
});
