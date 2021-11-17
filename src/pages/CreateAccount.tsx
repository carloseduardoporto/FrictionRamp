import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { StackNavigationProp } from '@react-navigation/stack';
import firebase from '../config/firebase';
import colors from '../styles/colors';
import { RootStackParamList } from '../routes/stack.routes';

// criar usuario com firebase
// logar usuario com firebase
// enviar senha por email
type loginScreen = StackNavigationProp<RootStackParamList, 'Login'>;

export function CreateAccount() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorCreate, setErrorCreate] = useState<string>('');

  const navigation = useNavigation<loginScreen>();

  const handleCreateAccount = () => {
    if (confirmPassword === password) {
      const auth = getAuth(firebase);

      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const { user } = userCredential;

          console.log(user);
          navigation.navigate('Login');
        })
        .catch((error: { message: React.SetStateAction<string> }) => {
          setErrorCreate(error.message);
          console.log(error.message);
        });
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Text style={styles.title}>Crie sua conta</Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            placeholder="Usuário"
            value={email}
          />

          <TextInput
            style={styles.input}
            onChangeText={text => setPassword(text)}
            secureTextEntry
            placeholder="Senha"
            value={password}
          />

          <TextInput
            style={styles.input}
            onChangeText={text => setConfirmPassword(text)}
            secureTextEntry
            placeholder="Confirme sua senha"
            value={confirmPassword}
          />

          <TouchableOpacity
            style={styles.buttonLogin}
            activeOpacity={0.6}
            onPress={handleCreateAccount}
          >
            <Text style={styles.textButtonLogin}>Criar Conta</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 0 : 50,
  },

  title: {
    fontSize: 48,
    color: colors.red,
    marginBottom: 10,
    fontWeight: 'bold',
  },

  input: {
    width: 300,
    marginTop: 10,
    padding: 10,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: colors.red,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#4d5156',
  },

  buttonLogin: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 50,
    marginTop: 30,
  },

  textButtonLogin: {
    color: colors.white,
  },

  contentAlert: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  warningAlert: {
    paddingLeft: 10,
    color: colors.gray,
    fontSize: 16,
  },
  registration: {
    marginTop: 20,
    color: '#4d5156',
    fontSize: 16,
  },
});
