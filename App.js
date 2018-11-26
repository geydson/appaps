/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';

import Login  from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Home   from './src/screens/Home';

const Navegador = createStackNavigator({

     Home:{
         screen: Login
     },
     SignUp:{
         screen: SignUp
     },
     TelaHome: {
     	 screen: Home
     }

}, {
	headerMode:'none'
});

export default Navegador;
