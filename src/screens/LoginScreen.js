import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(loginUser(data))
      .unwrap()
      .then(() => navigation.navigate('PolicyList'))
      .catch((error) => alert(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />
      <Button title="Login" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, padding: 8, marginBottom: 12, borderRadius: 4 },
});

export default LoginScreen;
