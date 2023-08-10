import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ImageUploadView = () => {
  const [name, setName] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.uri) {
        setImageUri(response.uri);
      }
    });
  };

  const takePhoto = async () => {
    try {
      const options = {
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
      };

      const response = await launchCamera(options);

      if (response.didCancel) {
        console.log('User cancelled camera capture');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.uri) {
        setImageUri(response.uri);
      }
    } catch (error) {
      console.log('Error in taking photo:', error);
    }
  };

  return (
    <View style={styles.formContainer}>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}
      <Pressable onPress={takePhoto} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Take Photo</Text>
      </Pressable>
      <Pressable onPress={selectImage} style={styles.uploadButton}>
        <Text style={styles.uploadButtonText}>Select Image</Text>
      </Pressable>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
    </View>
  );
};

const styles = {
  formContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 20,
  },
};

export default ImageUploadView;
