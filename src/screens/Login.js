import React, { Component } from 'react';
import {View, Text, ImageBackground, TextInput, TouchableHighlight, StyleSheet, Button, Alert, AsyncStorage, Modal} from 'react-native';
import LoadingScreen from '../components/LoadingScreen';

var URL         = 'https://apsapp.000webhostapp.com/class/login.php?action=login';
var URLrecp     = 'https://apsapp.000webhostapp.com/class/login.php?action=recuperar';
var URLnovSenha = 'https://apsapp.000webhostapp.com/class/login.php?action=novasenha';

export default class Login extends Component{

       static navigationOptions = ({navigation}) => ({
       	      header: null
       });

       constructor(props) {
          super(props);
          this.state = {
          	 cpfState:'',
          	 senhaState:'',
             ident: '',
          	 loading: false,
             modalVisible: false,
             cpfRecup:'',
             palaRecup:'',
             idRecup: '',
             modalNovaVisible: false,
             senhaRecup: ''
          };
       	  this.signUpAction     = this.signUpAction.bind(this);
       	  this.logInAction      = this.logInAction.bind(this);
       	  this.entLogin         = this.entLogin.bind(this);
          this.abrirModal       = this.abrirModal.bind(this);
          this.fecharModal      = this.fecharModal.bind(this);
          this.novaSenhaModal   = this.novaSenhaModal.bind(this);
          this.novaSenhaFModal  = this.novaSenhaFModal.bind(this);
          this.recupSenha       = this.recupSenha.bind(this);
          this.atualiSenha      = this.atualiSenha.bind(this);
       }
       
       signUpAction() {

          this.props.navigation.navigate('SignUp');
       }

       logInAction() {
       	  this.setState({cpfState:''});
          this.setState({senhaState:''});
          this.props.navigation.navigate('TelaHome', {resultado: this.state.ident});
       	  this.setState({loading:false});
       }

       entLogin() {
           
         this.setState({loading:true});
           let cpfL = this.state.cpfState;
           let senhaL = this.state.senhaState;
             
           if (cpfL== '' || senhaL == '') {
           	   this.setState({loading:false});
           	   return Alert.alert(
                      'Atenção:',
                      'Login ou Senha vazio!',
                      [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      { cancelable: false }
               );
           }else{
              
                let dados = {
			   	    method: 'POST',
			   	    headers: {
			   	    	Accept: 'application/json',
			   	    	'Content-Type': 'application/json',
			   	    },
			   	    body: JSON.stringify({
			   	    	 user: cpfL,
			   	    	 senha: senhaL
			   	    }),
			   };

			   fetch(URL, dados)
			   .then((response) => response.json())
			       .then((responseJson) => {
                 let resp = responseJson.dados;
                       
			       	   if (resp == 0) {
			       	   	   this.setState({loading:false});
			       	   	   return Alert.alert(
		                      'Atenção:',
		                      'Login ou Senha inválidos!',
		                      [
		                        {text: 'OK', onPress: () => console.log('OK Pressed')},
		                      ],
		                      { cancelable: false }
		                  );
			       	   }else{
                      this.setState({ident: resp});
			       	        resp = resp.toString();
                      AsyncStorage.setItem('ids', resp);
                      this.logInAction();
			       	   }

			       }).catch((error) => {
			       	    this.setState({loading:false});
			       	    return Alert.alert(
		                      'Atenção:',
		                      'Conexão lenta ou sem!',
		                      [
		                        {text: 'OK', onPress: () => console.log('OK Pressed')},
		                      ],
		                      { cancelable: false }
		                );
			       });

           }

       }

       novaSenhaModal(){
            let s = this.state;
            s.modalNovaVisible = true;
            this.setState(s);
       }

       novaSenhaFModal(){
            let s = this.state;
            s.modalNovaVisible = false;
            this.setState(s);
       }


       abrirModal(){
            let s = this.state;
            s.modalVisible = true;
            this.setState(s);
       }

       fecharModal(){
            let s = this.state;
            s.modalVisible = false;
            this.setState(s);
       }

       recupSenha(){
          this.setState({loading:true});
           let cpfR = this.state.cpfRecup;
           let palaR = this.state.palaRecup;
             
           if (cpfR== '' || palaR == '') {
               this.setState({loading:false});
               return Alert.alert(
                      'Atenção:',
                      'Preencha os campos vazios!',
                      [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      { cancelable: false }
               );
           }else{
              
                let dados = {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                 cpf: cpfR,
                 psecreta: palaR
              }),
         };

         fetch(URLrecp, dados)
          .then((response) => response.json())
             .then((responseJson) => {
                 let resp = responseJson.dados;
                       
                 if (resp == 0) {
                     this.setState({loading:false});
                     return Alert.alert(
                          'Atenção:',
                          'Dados inválidos!',
                          [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                          ],
                          { cancelable: false }
                      );
                 }else{
                      this.fecharModal();
                      this.setState({loading:false});
                      this.setState({idRecup: resp});
                      this.novaSenhaModal();
                      
                 }

             }).catch((error) => {
                  this.setState({loading:false});
                  return Alert.alert(
                          'Atenção:',
                          'Conexão lenta ou sem!',
                          [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                          ],
                          { cancelable: false }
                    );
             });

           }

       }

       atualiSenha(){
         this.setState({loading:true});
         let idA = this.state.idRecup;
         let senhaA = this.state.senhaRecup;

         if (senhaA== '') {
               this.setState({loading:false});
               return Alert.alert(
                      'Atenção:',
                      'Preencha a senha!',
                      [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      { cancelable: false }
               );
           }else{
              
                let dados = {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                 id: idA,
                 senha: senhaA
              }),
           };

         fetch(URLnovSenha, dados)
         .then((response) => response.json())
             .then((responseJson) => {
                 let resp = responseJson.dados;
                       
                 if (resp == 1) {
                     this.novaSenhaFModal();
                     this.setState({loading:false});
                     return Alert.alert(
                          'Parabéns:',
                          'Senha alterada com sucesso!',
                          [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                          ],
                          { cancelable: false }
                     );
                }

             }).catch((error) => {
                  this.setState({loading:false});
                  return Alert.alert(
                          'Atenção:',
                          'Conexão lenta ou sem!',
                          [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                          ],
                          { cancelable: false }
                    );
             });

           }

       }

       render() {
       	  return (
       	  	   <ImageBackground source={require('../assets/img/fundo_ambiente.jpg')} style={styles.container}>
                   
                  <Modal animationType="slide" visible={this.state.modalVisible}>
                     <View style={styles.modal}>
                        <View style={{marginLeft:"80%",marginBottom:70}}>
                           <Button title="X" onPress={this.fecharModal} />
                        </View>
                        <Text style={{fontSize:20, marginBottom:5}}>CPF:*</Text>
                        <TextInput style={styles.input} placeholder="Digite seu CPF" keyboardType='numeric'  
                        maxLength={11} placeholderTextColor="green" underlineColorAndroid="transparent" onChangeText={(text)=> this.setState({cpfRecup:text})}/>
                        
                        <Text style={{fontSize:20, marginBottom:5}}>Palavra-Chave:*</Text>
                        <TextInput style={styles.input} placeholder="Palavra do cadastro" maxLength={20} placeholderTextColor="green" 
                         underlineColorAndroid="transparent" onChangeText={(text)=> this.setState({palaRecup:text})}/>

                        <TouchableHighlight  style={styles.btRecup} underlayColor="#00b000" 
                        onPress={this.recupSenha}>
                           <Text style={styles.btLoginText}>Recuperar Senha</Text>
                        </TouchableHighlight>
                     </View>
                  </Modal>

                  <Modal animationType="slide" visible={this.state.modalNovaVisible}>
                     <View style={styles.modal}>
                        <View style={{marginLeft:"80%",marginBottom:70}}>
                           <Button title="X" onPress={this.novaSenhaFModal} />
                        </View>
                        
                        <Text style={{fontSize:20, marginBottom:5}}>Nova Senha:</Text>
                        <TextInput style={styles.input} placeholder="Senha" maxLength={32} placeholderTextColor="green" 
                        secureTextEntry={true} underlineColorAndroid="transparent" onChangeText={(text)=> this.setState({senhaRecup:text})}/>

                        <TouchableHighlight  style={styles.btRecup} underlayColor="#00b000" 
                        onPress={this.atualiSenha}>
                           <Text style={styles.btLoginText}>Recuperar Senha</Text>
                        </TouchableHighlight>
                     </View>
                  </Modal>

                  <View style={{marginBottom:40}}>
                     <Text style={{fontWeight:'bold', color:'green', fontSize:35}}>Denúncia</Text>
                     <Text style={{color:'green', fontSize:30, marginLeft: 10}}>Ambiente</Text>
                  </View>
                   
                  <Text style={{fontSize:20, marginBottom:5}}>Login:</Text>
                  <TextInput style={styles.input} placeholder="Digite seu CPF" keyboardType='numeric'  
                  maxLength={11} placeholderTextColor="green" underlineColorAndroid="transparent" onChangeText={(text)=> this.setState({cpfState:text})}/>
                  
                  <Text style={{fontSize:20, marginBottom:5}}>Senha:</Text>
                  <TextInput style={styles.input} placeholder="Senha" maxLength={32} placeholderTextColor="green" 
                  secureTextEntry={true} underlineColorAndroid="transparent" onChangeText={(text)=> this.setState({senhaState:text})}/>

                  <TouchableHighlight  style={styles.btLogin} underlayColor="#00b000" 
                  onPress={this.entLogin}>
                     <Text style={styles.btLoginText}>Entrar</Text>
                  </TouchableHighlight>
                  
                  <View style={{width:"100%", flexDirection: 'row'}}>
                    <View style={{width:"50%", marginLeft: 15}}>
                      <TouchableHighlight onPress={this.signUpAction} style={styles.btSign} underlayColor="transparent">
                         <Text style={styles.btSignText}>Clique aqui e cadastre-se!</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={{width:"50%"}}>
                      <TouchableHighlight onPress={this.abrirModal} style={styles.btSign} underlayColor="transparent">
                         <Text style={styles.btEsqText}>Esqueceu a senha? Clique aqui</Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                  <LoadingScreen visible={this.state.loading} />
               </ImageBackground>
       	  );
       }

}

const styles = StyleSheet.create({
         container:{
         	flex: 1,
         	justifyContent: 'center',
         	alignItems: 'center',
         	resizeMode: 'contain'
         },
         input:{
         	width: "90%",
         	height: 50,
         	backgroundColor: 'rgba(255, 255, 255, 0.8)',
         	borderRadius: 5,
         	color: '#000000',
         	fontSize: 17,
         	marginBottom: 30
         },
         btLogin:{
         	width: "90%",
         	height: 50,
         	borderRadius: 5,
         	borderWidth: 0.5,
         	backgroundColor: "#009800",
         	borderColor: "#FFFFFF",
         	justifyContent: 'center',
         	alignItems: 'center'
         },
         btLoginText: {
         	color: "#FFFFFF",
         	fontSize: 20
         },
         btSign:{
         	width: "90%",
         	height: 50,
         	backgroundColor: "transparent",
         	justifyContent: 'center',
         	alignItems: 'center',
         	marginTop: 60
         },
         btSignText:{
         	color: "#00008B",
         	fontSize: 15,
          textAlign: 'center'
         },
         btEsqText:{
          color: "#00008B",
          fontSize: 15,
          textAlign: 'center'
         },
         modal:{
             flex: 1,
             backgroundColor: '#8FBC8F',
             paddingTop:40,
             alignItems: 'center'
         },
          btRecup:{
          width: "90%",
          height: 50,
          borderRadius: 5,
          borderWidth: 0.5,
          marginTop: 40,
          backgroundColor: "#009800",
          borderColor: "#FFFFFF",
          justifyContent: 'center',
          alignItems: 'center'
         }
});