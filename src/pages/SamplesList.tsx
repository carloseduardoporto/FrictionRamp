import { useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';

import {
  Alert,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Sample from '../components/Sample';
import { loadSamples, removeSample, SampleProps } from '../libs/storage';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Params {
  userId: string;
}

export function SamplesList() {
  const [samples, setSamples] = useState<SampleProps[]>([]);
  const routes = useRoute();

  const { userId } = routes.params as Params;

  useEffect(() => {
    async function loadData() {
      const data = await loadSamples(userId);

      setSamples(data);

      return data;
    }

    loadData();
  }, []);

  function handleRemove(sample: SampleProps) {
    Alert.alert('Remover', `Deseja deletar o ensaio?`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            await removeSample(sample.id, userId);

            setSamples(oldData =>
              oldData.filter(item => item.id !== sample.id),
            );
          } catch (error) {
            Alert.alert('Não foi possível remover 😢');
          }
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.headContainer}>
        <Text style={styles.headText}>Ensaios</Text>
      </View>
      <View>
        <FlatList
          data={samples}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Sample
              tgt={item.tgt}
              angle={item.angle}
              material={item.material}
              id={item.id}
              handleRemove={() => handleRemove(item)}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : 50,
  },
  headContainer: {
    width: '100%',
    borderBottomColor: colors.red,
    borderBottomWidth: 1,
    justifyContent: 'flex-end',
    marginTop: 10,
    padding: 10,
    height: 50,
  },
  headText: {
    color: colors.red,
    fontFamily: fonts.heading,
    fontSize: 24,
  },
});
