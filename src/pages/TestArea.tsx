import React, { useEffect, useState } from 'react';

import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Text,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import { onAuthStateChanged, getAuth } from '@firebase/auth';
import { getDatabase, ref, onValue, get, child } from 'firebase/database';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import firebase, { fireStore } from '../config/firebase';

interface materialsProps {
  id: number;
  name: string;
}

export function TestArea() {
  const [selectedMaterial, setSelectedMaterial] = useState();
  const [stopFeedback, setStopFeedback] = useState();
  const [buttonsDisable, setButtonDisable] = useState(false);
  const [rampOperating, setRampOperating] = useState(true);
  const [angle, setAngle] = useState(40);

  function getTangent(angleMesured: number): string {
    const tangent = Math.tan((angleMesured * Math.PI) / 180).toPrecision(2);

    return tangent;
  }

  const materials: materialsProps[] = [
    {
      id: 1,
      name: 'EVA',
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

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        const { uid } = user;
        console.log(uid);
      } else {
        // User is signed out
        // ...
      }
    });
  }, [angle]);

  const handleSubir = async () => {
    // setButtonSubirDisable(!buttonSubirDisable);
    const stopFeedbackDatabaseRefference = ref(getDatabase(firebase));

    // verificar valor de "operando"
    get(child(stopFeedbackDatabaseRefference, 'operando'))
      .then(snapshot => {
        if (snapshot.exists()) {
          setRampOperating(Boolean(snapshot.val()));
          console.log(rampOperating);
        } else {
          console.log('No data available');
        }
      })
      .catch(error => {
        console.error(error);
      });

    if (!rampOperating) {
      // mudar para true no firebase
      // mudar rampasobe para on
      // buttonsdisable para on
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.headContainer}>
          <Text>RODAPÉ</Text>
        </View>
        <View style={styles.commandContainer}>
          <View style={styles.subirContent}>
            <TouchableOpacity
              style={styles.subirButton}
              onPress={handleSubir}
              disabled={buttonsDisable}
            >
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

            {rampOperating ? (
              <Text style={styles.angleHeadingText}>{angle}</Text>
            ) : (
              <ActivityIndicator
                size="large"
                color={colors.red}
                style={{ marginTop: 20 }}
              />
            )}
          </View>
          <View>
            {rampOperating ? (
              <Text style={styles.tangentButtonText}>{`Tangente: ${getTangent(
                angle,
              )}`}</Text>
            ) : (
              <ActivityIndicator size="large" color={colors.red} />
            )}

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
    backgroundColor: colors.light_red,
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
    color: colors.heading,
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
    color: colors.heading,
    fontFamily: fonts.complement,
  },
  saveButtonText: {
    fontSize: 24,
    fontFamily: fonts.text,
  },
});

//
