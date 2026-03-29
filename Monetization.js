import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MonetizationScreen = () => {
  // डमी डेटा: यहाँ हम टेस्ट कर रहे हैं (Followers 0 हैं लेकिन Views 22,000 हैं)
  const [userData, setUserData] = useState({
    followers: 0, 
    totalViews: 22000, 
    earnings: 550.00, // व्यूज के हिसाब से बनी कमाई
  });

  // शर्तें (Criteria)
  const VIEW_LIMIT = 20000; // 20k व्यूज पर पैसा शुरू
  const FOLLOWER_LIMIT = 1000; // या 1k फॉलोअर्स पर

  // लॉजिक: अगर 20k व्यूज हैं OR 1k फॉलोअर्स हैं, तो बंदा Eligible है
  const isEligible = userData.totalViews >= VIEW_LIMIT || userData.followers >= FOLLOWER_LIMIT;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Creator Earnings</Text>
        <Text style={styles.balance}>₹{userData.earnings}</Text>
        <Text style={styles.balanceSub}>कुल कमाई (Estimated)</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>पैसे कमाने की शर्तें</Text>
        
        {/* व्यूज वाला सेक्शन (आपका खास फीचर) */}
        <View style={styles.statusBox}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Total Video Views</Text>
            <Text style={userData.totalViews >= VIEW_LIMIT ? styles.successText : styles.pendingText}>
              {userData.totalViews} / {VIEW_LIMIT}
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min((userData.totalViews / VIEW_LIMIT) * 100, 100)}%` }]} />
          </View>
          {userData.totalViews >= VIEW_LIMIT && (
            <Text style={styles.bonusNote}>✨ वायरल बोनस अनलॉक! (बिना फॉलोअर्स के कमाई)</Text>
          )}
        </View>

        <View style={styles.divider} />

        {/* फॉलोअर्स वाला सेक्शन */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Followers</Text>
          <Text style={userData.followers >= FOLLOWER_LIMIT ? styles.successText : styles.pendingText}>
            {userData.followers} / {FOLLOWER_LIMIT}
          </Text>
        </View>

        {isEligible ? (
          <TouchableOpacity style={styles.applyBtn}>
            <Text style={styles.applyBtnText}>पैसे निकालें (Withdraw)</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.lockedBox}>
            <Ionicons name="lock-closed" size={16} color="gray" />
            <Text style={styles.lockedText}>20,000 व्यूज होते ही बटन खुल जाएगा</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { backgroundColor: '#1a1a1a', padding: 50, alignItems: 'center' },
  headerTitle: { color: '#aaa', fontSize: 16, marginBottom: 5 },
  balance: { color: '#fff', fontSize: 48, fontWeight: 'bold' },
  balanceSub: { color: '#4cd137', fontSize: 14, fontWeight: '600' },
  card: { backgroundColor: '#fff', margin: 15, borderRadius: 20, padding: 20, elevation: 4 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#2f3640' },
  statusBox: { marginBottom: 10 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { fontSize: 16, color: '#333', fontWeight: '500' },
  successText: { color: 'green', fontWeight: 'bold' },
  pendingText: { color: '#e67e22', fontWeight: 'bold' },
  progressBar: { height: 8, backgroundColor: '#eee', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#4cd137' },
  bonusNote: { color: '#8e44ad', fontSize: 12, marginTop: 8, fontWeight: '600', fontStyle: 'italic' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 20 },
  applyBtn: { backgroundColor: '#4cd137', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  applyBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  lockedBox: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  lockedText: { color: 'gray', marginLeft: 5, fontSize: 14 }
});

export default MonetizationScreen;
  
