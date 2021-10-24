import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';

export default function App() {
  const [ image, changeImage ] = useState('')
  const [ loading, setLoading ] = useState(true)

  const fetchCats = async () => {
    setLoading(true);
    const request = await fetch('https://api.thecatapi.com/v1/images/search');
    const resolve = await request.json();
    changeImage(resolve[0].url);
    setLoading(false);
  }

  useEffect(() => {
    fetchCats();
  }, [])


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.text}>App de Gatos</Text>
      { loading
      ? <Image source={{ uri: 'https://i.imgur.com/ly4VZeN.gif' }} style={styles.image} />
      : <Image source={{ uri: image }} style={styles.image} />
      }
    <Pressable style={styles.button} onPress={fetchCats}>
      <Text style={styles.text}>Próximo</Text>
    </Pressable>
    <Text style={{ color: 'white' }}>Desenvolvido por Michael Caxias</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121211',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  image: {
    width: 380,
    height: 380,
    borderRadius: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#ffc107',
  },
});
