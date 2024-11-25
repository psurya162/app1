import React, { useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPolicies } from '../redux/slices/policySlice';

const PolicyList = ({ navigation }) => {
  const { policies, loading, error } = useSelector((state) => state.policy);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);

  const renderPolicy = ({ item }) => (
    <View style={styles.item}>
      <Text>Vehicle No: {item.vehicleNo}</Text>
      <Text>Category: {item.category}</Text>
      <Text>Expiry Date: {item.expiryDate}</Text>
      <Text>Status: {item.status}</Text>
      <Text>Lead Date: {item.leadDate}</Text>
    </View>
  );

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <FlatList data={policies} renderItem={renderPolicy} keyExtractor={(item) => item.id} />
      <Button title="Create New Lead" onPress={() => navigation.navigate('CreateLead')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 12, borderBottomWidth: 1, marginBottom: 8 },
});

export default PolicyList;
