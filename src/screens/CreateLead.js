import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createLead } from '../redux/slices/leadSlice';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateLead = ({ navigation }) => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [openCategory, setOpenCategory] = useState(false);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([
    { label: 'Car', value: 'car' },
    { label: 'Bike', value: 'bike' },
    { label: 'Truck', value: 'truck' },
  ]);
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleFileUpload = () => {
    Alert.alert(
      'Upload File',
      'Choose an option',
      [
        { text: 'Camera', onPress: () => handleCamera() },
        { text: 'File Manager', onPress: () => handleFilePicker() },
        { text: 'Cancel', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleCamera = () => {
    launchCamera({ mediaType: 'photo', saveToPhotos: true }, (response) => {
      if (response.didCancel || response.errorCode) return;
      if (response.assets) setFiles((prev) => [...prev, ...response.assets]);
    });
  };

  const handleFilePicker = () => {
    launchImageLibrary({ mediaType: 'photo', selectionLimit: 0 }, (response) => {
      if (response.didCancel || response.errorCode) return;
      if (response.assets) setFiles((prev) => [...prev, ...response.assets]);
    });
  };

  const onSubmit = (data) => {
    dispatch(
      createLead({
        ...data,
        category,
        expiryDate: expiryDate.toISOString().split('T')[0],
        files,
      })
    )
      .unwrap()
      .then(() => {
        Alert.alert('Success', 'Lead created successfully');
        navigation.goBack();
      })
      .catch((error) => Alert.alert('Error', error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create New Lead</Text>
      <Controller
        name="vehicleNo"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Vehicle No"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <DropDownPicker
        open={openCategory}
        value={category}
        items={categories}
        setOpen={setOpenCategory}
        setValue={setCategory}
        setItems={setCategories}
        placeholder="Select a category"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
      <TouchableOpacity
        style={styles.datePickerButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.datePickerText}>
          {expiryDate.toDateString()}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={expiryDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setExpiryDate(selectedDate);
          }}
        />
      )}
      <Controller
        name="remarks"
        control={control}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Remarks"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      <Button title="Upload Files" onPress={handleFileUpload} />
      <FlatList
        data={files}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item.uri }} style={styles.filePreview} />
        )}
        horizontal
        style={styles.fileList}
      />
      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, padding: 8, marginBottom: 12, borderRadius: 4 },
  dropdown: { marginBottom: 12 },
  dropdownContainer: { borderWidth: 1 },
  datePickerButton: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  datePickerText: { fontSize: 16 },
  filePreview: { width: 100, height: 100, marginRight: 8 },
  fileList: { marginVertical: 16 },
});

export default CreateLead;
