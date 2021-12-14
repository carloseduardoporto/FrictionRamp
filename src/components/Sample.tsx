import React, { useEffect } from 'react';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface Props {
  angle: string;
  tgt: string;
  material: string;
  superficie: string;
  id: string;
  created_at: string;
  handleRemove: () => void;
}

function Sample({
  angle,
  tgt,
  material,
  id,
  superficie,
  created_at,
  handleRemove,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.txt3}>Data: {created_at}</Text>
          <Text style={styles.txt3}>Material: {material}</Text>
          <Text style={styles.txt1}>Ângulo: {angle}º</Text>
          <Text style={styles.txt2}>Tangente: {tgt}</Text>
          <Text style={styles.txt2}>Superfície: {superficie}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleRemove}>
            <Text>Excluir Ensaio</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 360,
    flexDirection: 'row',
    padding: 10,
    borderWidth: 2,
    borderColor: colors.red,
    margin: 10,
  },
  idBox: {
    margin: 10,
  },
  textContainer: {
    justifyContent: 'center',

    width: 300,
  },
  txt1: {
    fontSize: 18,
    fontFamily: fonts.complement,
  },
  txt2: {
    fontSize: 18,
    fontFamily: fonts.complement,
  },
  txt3: {
    fontSize: 18,
    fontFamily: fonts.complement,
  },
  buttonContainer: {
    margin: 10,
    flexDirection: 'row',
    paddingLeft: 160,
    marginRight: 30,
  },
  text: {
    fontFamily: fonts.heading,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 50,
    width: 120,
    marginLeft: 50,
  },
});

export default Sample;
