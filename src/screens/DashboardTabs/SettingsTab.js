import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SettingsTab() {
  return (
    <View style={styles.container}>
      <Text>Settings Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
