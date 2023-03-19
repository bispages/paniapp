import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

data = [
  {
    id: 1,
    lantxt: 'മലയാളം',
  },
  {
    id: 2,
    lantxt: 'English',
  },
  {
    id: 3,
    lantxt: 'हिंदी',
  },
  {
    id: 4,
    lantxt: 'తెలుగు',
  },
  {
    id: 5,
    lantxt: 'ಕನ್ನಡ',
  },
  {
    id: 6,
    lantxt: 'ತಮಿಳು',
  },
  {
    id: 7,
    lantxt: 'বাংলা',
  },
];

const Selectlan = () => {
    const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Select Language</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.languageContainer}>
        {data?.map((item, i) => {
          return (
            <TouchableOpacity 
            key={i} 
            style={styles.sectionDescription}
            onPress={()=>navigation.navigate('accept')}>
              <Text style={styles.language}>{item?.lantxt}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: '#4A4A4A',
    marginVertical: 30,
    lineHeight: 32,
  },
  languageContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  language: {
    fontSize: 24,
    fontWeight: '500',
    color: '#4A4A4A',
    marginVertical: 30,
    lineHeight: 32,
    textAlign: 'center',
  },
  sectionDescription: {
    // backgroundColor:'red',
    width: 250,
    marginVertical: 2,
    borderBottomColor: '2px solid rgba(125, 105, 134, 0.04)',
    borderBottomWidth: 2,
  },
});

export default Selectlan;
