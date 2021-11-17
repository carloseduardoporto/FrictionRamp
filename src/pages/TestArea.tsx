import React, { useRef, useState } from 'react';

import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

export function TestArea() {
  const materials = [
    {
      id: 1,
      name: 'EVGA',
    },
    {
      id: 2,
      name: 'CAMURÇA',
    },
    {
      id: 3,
      name: 'LIXA 100',
    },
  ];

  const [selectedMaterial, setSelectedMaterial] = useState();

  console.log(selectedMaterial);

  const tangent = '60';
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.headContainer}>
          <Text>RODAPÉ</Text>
        </View>
        <View style={styles.commandContainer}>
          <View style={styles.subirContent}>
            <TouchableOpacity style={styles.subirButton}>
              <Icon name="chevron-with-circle-up" size={64} />
            </TouchableOpacity>
            <Text style={styles.subirButtonText}>Subir</Text>
          </View>
          <View style={styles.pararContent}>
            <TouchableOpacity style={styles.pararButton}>
              <Icon2 name="pause-circle" size={64} />
            </TouchableOpacity>
            <Text style={styles.pararButtonText}>Parar</Text>
          </View>
          <View style={styles.descerContent}>
            <TouchableOpacity style={styles.descerButton}>
              <Icon name="chevron-with-circle-down" size={64} />
            </TouchableOpacity>
            <Text style={styles.descerButtonText}>Descer</Text>
          </View>
        </View>
        <View style={styles.footContainer}>
          <View style={styles.angleContainer}>
            <Text style={styles.headingText}>Ângulo</Text>
            <Text style={styles.angleHeadingText}>30º</Text>
          </View>
          <View>
            <Text
              style={styles.tangentButtonText}
            >{`Tangente: ${tangent}`}</Text>
            <Picker
              selectedValue={selectedMaterial}
              onValueChange={itemValue => setSelectedMaterial(itemValue)}
              style={styles.materialsList}
            >
              {materials.map(material => (
                <Picker.Item
                  label={material.name}
                  value={material.name}
                  key={material.id}
                />
              ))}
            </Picker>
            <TouchableOpacity style={styles.saveButton} activeOpacity={0.6}>
              <Text style={styles.saveButtonText}>Salvar Ensaio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
    backgroundColor: 'green',
    height: 140,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  // meio
  commandContainer: {
    flex: 1,
    padding: 30,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // subir
  subirContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subirButton: {
    marginRight: 15,
  },
  subirButtonText: {
    fontFamily: fonts.heading,
    fontSize: 24,
  },

  // parar
  pararContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pararButton: {
    marginRight: 17,
  },
  pararButtonText: {
    fontFamily: fonts.heading,
    fontSize: 24,
  },

  // descer
  descerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descerButton: {
    marginRight: 8,
  },
  descerButtonText: {
    fontFamily: fonts.heading,
    fontSize: 24,
  },

  footContainer: {
    alignItems: 'center',
    width: '100%',
    height: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    marginBottom: 30,
  },
  angleContainer: {
    paddingLeft: 14,
    paddingBottom: 32,
  },
  headingText: {
    fontSize: 24,
    fontFamily: fonts.heading,
  },
  angleHeadingText: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: fonts.text,
    borderBottomWidth: 1,
    borderBottomColor: colors.red,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 50,
    width: 180,
  },
  tangentButtonText: {
    fontSize: 20,
    fontFamily: fonts.heading,
  },
  materialsList: {
    color: colors.green_dark,
    fontFamily: fonts.complement,
  },
  saveButtonText: {
    fontSize: 24,
    fontFamily: fonts.text,
  },
});

//
