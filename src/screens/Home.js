import React, { Component } from 'react';
import { createTabNavigator } from 'react-navigation';

// import Login from './src/screens/Login';
import TelaPrincipal from './TelaPrincipal';
import Denuncia from './Denuncia';

const Navegador = createTabNavigator({

     Home:{
         screen: TelaPrincipal
     },
     Denuncia:{
         screen: Denuncia
     }

},{
	tabBarPosition: 'bottom',
	tabBarOptions:{
		tabStyle:{
			backgroundColor: '#006400'
		}
	}
});

export default Navegador;
