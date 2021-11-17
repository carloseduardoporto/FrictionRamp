import { useNavigation } from '@react-navigation/core';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
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
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { RootStackParamList } from '../routes/stack.routes';

import colors from '../styles/colors';
import firebase from '../config/firebase';

// criar usuario com firebase
// logar usuario com firebase
// enviar senha por email

type loginScreen = StackNavigationProp<RootStackParamList, 'CreateAccount'>;
// parei onde estava tipificando o navigation!

export function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const navigation = useNavigation<loginScreen>();

  const handleLogin = () => {
    const auth = getAuth(firebase);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        const { user } = userCredential;
        console.log(user);
        navigation.navigate('TestArea');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Text style={styles.title}>FrictionRamp</Text>
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
        <Text style={styles.registration}>Esqueci minha senha</Text>
        <TouchableOpacity
          style={styles.buttonLogin}
          activeOpacity={0.6}
          onPress={handleLogin}
        >
          <Text style={styles.textButtonLogin}>Entrar</Text>
        </TouchableOpacity>

        <Text
          style={styles.registration}
          onPress={() => navigation.navigate('CreateAccount')}
        >
          Não tem conta? Cadastre-se
        </Text>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
