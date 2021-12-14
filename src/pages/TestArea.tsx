import React, { useEffect, useMemo, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
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
  Alert,
} from 'react-native';
import { format } from 'date-fns';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Feather';
import { onAuthStateChanged, getAuth } from '@firebase/auth';
import { getDatabase, ref, get, child, onValue } from 'firebase/database';
import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import firebase from '../config/firebase';
import { loadSamples, SampleProps, saveSample } from '../libs/storage';
import { RootStackParamList } from '../routes/stack.routes';

type loginScreen = StackNavigationProp<RootStackParamList, 'SamplesList'>;

export function TestArea() {
  const navigation = useNavigation<loginScreen>();
  const [samples, setSamples] = useState<SampleProps[]>([]);

  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedSuperficie, setSelectedSuperficie] = useState('');
  const [stopFeedback, setStopFeedback] = useState();
  const [buttonsDisable, setButtonDisable] = useState(false);
  const [rampOperating, setRampOperating] = useState(true);
  const [angle, setAngle] = useState(40);
  const [tgt, setTgt] = useState<string>('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, user => {
      if (user) {
        const { uid } = user;
        console.log(uid);
        setUserId(uid);
      } else {
        navigation.navigate('Login');
      }
    });
  }, []);

  const getTangent = useMemo(() => {
    const tangent = Math.tan((angle * Math.PI) / 180).toPrecision(2);

    setTgt(tangent);

    return tangent;
  }, [angle]);

  const handleSave = async () => {
    try {
      const date = new Date();

      const parsedDate = format(date, 'Pp');

      const data: SampleProps = {
        id: uuidv4(),
        tgt,
        user_id: userId,
        angle: String(angle),
        material: selectedMaterial,
        created_at: parsedDate,
        superficie: selectedSuperficie,
      };

      await saveSample(data);

      Alert.alert('Sucesso', 'Ensaio salvo com sucesso!');
    } catch {
      Alert.alert('Não foi possível salvar');
    }
  };

  const handleMoveToSamplesList = () => {
    navigation.navigate('SamplesList', { userId });
  };

  const materials = [
    {
      id: 4,
      name: '-',
    },
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

  const superficies = [
    {
      id: 1,
      name: 'Máxima',
    },
    {
      id: 2,
      name: 'Mínima',
    },
  ];

  const handleSubir = async () => {
    const databaseReference = ref(getDatabase(firebase));
    const db = getDatabase(firebase);

    setButtonDisable(true);
    setRampOperating(!rampOperating);

    setTimeout(
      () =>
        get(child(databaseReference, 'angulo'))
          .then(snapshot => {
            if (snapshot.exists()) {
              setAngle(snapshot.val());
              setRampOperating(true);
              setButtonDisable(false);
            } else {
              console.log('No data available');
            }
          })
          .catch(error => {
            console.error(error);
          }),
      6000,
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.headContainer}>
          <Text style={styles.headTitle}>MENU OPERACIONAL</Text>
          <TouchableOpacity
            style={styles.headButton}
            onPress={handleMoveToSamplesList}
          >
            <Text style={styles.headButtonText}>Ir para Ensaios</Text>
          </TouchableOpacity>
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
            {rampOperating ? (
              <Text style={styles.tangentButtonText}>
                Tangent: {getTangent}
              </Text>
            ) : (
              <ActivityIndicator size="large" color={colors.red} />
            )}
          </View>
          <View>
            <Text style={styles.materialTitleText}>Material:</Text>
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
            <Picker
              selectedValue={selectedSuperficie}
              onValueChange={itemValue => setSelectedSuperficie(itemValue)}
              style={styles.superficieList}
            >
              {superficies.map(superficie => (
                <Picker.Item
                  label={superficie.name}
                  value={superficie.name}
                  key={superficie.id}
                />
              ))}
            </Picker>

            <TouchableOpacity
              style={styles.saveButton}
              activeOpacity={0.6}
              onPress={handleSave}
            >
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
    height: 140,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.red,
    justifyContent: 'center',
  },
  headTitle: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.red,
  },
  headButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 50,
    width: 180,
    marginTop: 50,
    marginLeft: 200,
  },
  headButtonText: {
    fontSize: 24,
    fontFamily: fonts.text,
    color: colors.shape,
  },

  // meio
  commandContainer: {
    flex: 1,
    padding: 30,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 2,

    borderBottomColor: colors.red,
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
    fontFamily: fonts.complement,
    fontSize: 24,
    color: colors.heading,
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
    fontFamily: fonts.complement,
    fontSize: 24,
    color: colors.heading,
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
    fontFamily: fonts.complement,
    fontSize: 24,
    color: colors.heading,
  },

  footContainer: {
    alignItems: 'center',
    width: '100%',
    height: 190,
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
    fontFamily: fonts.complement,
  },
  angleHeadingText: {
    marginTop: 20,
    fontSize: 24,
    fontFamily: fonts.complement,
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
    marginTop: 10,
    fontSize: 20,
    fontFamily: fonts.complement,
  },
  materialTitleText: {
    fontSize: 20,

    fontFamily: fonts.complement,
    color: colors.heading,
  },
  materialsList: {
    color: colors.heading,
    fontFamily: fonts.complement,
  },
  superficieList: {
    color: colors.heading,
    fontFamily: fonts.complement,
  },
  saveButtonText: {
    fontSize: 24,
    fontFamily: fonts.text,
    color: colors.shape,
  },
});

//
