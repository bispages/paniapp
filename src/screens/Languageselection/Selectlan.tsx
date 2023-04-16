import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch } from 'react-redux';

import { dict } from '../../utils/intl';
import { setLanguage } from '../../store/slices/AppStateSlice';

const Selectlan = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Select Language</Text>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.languageContainer}>
        {Object.values(dict)?.map((item, i) => {
          const { language } = item;
          return (
            <TouchableOpacity
              key={language}
              style={styles.sectionDescription}
              onPress={() => {
                dispatch(setLanguage(i));
                navigation.navigate('accept');
              }}>
              <Text style={styles.language}>{language}</Text>
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
    backgroundColor: '#fff',
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
