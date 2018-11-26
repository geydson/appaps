import React, { Component } from 'react';
import {View, Text, ImageBackground, TextInput, TouchableHighlight, StyleSheet, Alert, ScrollView, BackHandler} from 'react-native';
import LoadingScreen from '../components/LoadingScreen';

var URLcad = 'https://apsapp.000webhostapp.com/class/login.php?action=cadastro';

export default class SignUp extends Component{

       static navigationOptions = ({navigation}) => ({
       	      header: null
       });

       constructor(props) {
          super(props);
          this.state = {
                 cpf: '',
                 nome: '',
                 sobrenome: '',
                 palavraC: '',
                 senha: '',
                 loading: false
          };
       	  this.signInAction = this.signInAction.bind(this);
          this.cadLogin = this.cadLogin.bind(this);
       }

       componentWillMount(){

           BackHandler.addEventListener('hardwareBackPress', () => { 
              this.props.navigation.navigate('Home');
              this.setState({cpf: ''});
              this.setState({nome: ''});
              this.setState({sobrenome: ''});
              this.setState({palavraC: ''});
              this.setState({senha: ''});
              return true; 
            });

       }
       
       signInAction() {
          this.setState({cpf:''});
          this.setState({nome:''});
          this.setState({sobrenome:''});
          this.setState({palavraC:''});
          this.setState({senha:''});
          this.props.navigation.goBack();
       }

       validCPF (cpf) {
     
           cpf = cpf.replace(/\.|\-/g,'');

           if( cpf == ''){
               // return Alert.alert(
               //          'Atenção:',
               //          'Nenhum CPF digitado!',
               //          [
               //            {text: 'OK', onPress: () => console.log('OK Pressed')},
               //          ],
               //          { cancelable: false }
               //        );
                return false;
           }
           if(cpf.length != 11 || 
              cpf == "00000000000" || 
              cpf == "11111111111" || 
              cpf == "22222222222" || 
              cpf == "33333333333" || 
              cpf == "44444444444" || 
              cpf == "55555555555" || 
              cpf == "66666666666" || 
              cpf == "77777777777" || 
              cpf == "88888888888" || 
              cpf == "99999999999" ){
              
              this.setState({cpf:''});
              return Alert.alert(
                        'Atenção:',
                        'CPF Inválido!',
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        { cancelable: false }
                      );
              // return false;
           }
           var add = 0;
           var rev;
           for(var i = 0; i < 9; i++){
              add += parseInt(cpf.charAt(i)) * (10 - i);
           }
           rev = 11 - (add % 11);
           if(rev == 10 || rev == 11){
              rev = 0;
           } 
           if(rev != parseInt(cpf.charAt(9))){
               this.setState({cpf:''});
               return Alert.alert(
                      'Atenção:',
                      'CPF Inválido!',
                      [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      { cancelable: false }
               );
           }
           add = 0;
           for (var i = 0; i < 10; i++) {
               add += parseInt(cpf.charAt(i)) * (11 - i);
           }
           rev = 11 - (add % 11);
           if (rev == 10 || rev == 11) {
                rev = 0;
           }
           if (rev != parseInt(cpf.charAt(10))) {
               this.setState({cpf:''});
               return Alert.alert(
                      'Atenção:',
                      'CPF Inválido!',
                      [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      { cancelable: false }
               );
           }

           this.setState({cpf: cpf});
       }

       cadLogin() {
           
           this.setState({loading:true});
           let cpfL = this.state.cpf;
           let senhaL = this.state.senha;
           let palavraL = this.state.palavraC;
           let nomeL = this.state.nome;
           let sobrenomeL = this.state.sobrenome;
             
           if (cpfL== '' || senhaL == '' || palavraL =='' || nomeL == '') {
               this.setState({loading:false});
               return Alert.alert(
                      'Atenção:',
                      'Preecha os campos com (*)!',
                      [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      { cancelable: false }
               );
           }else{
              
            let dadosCad = {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                 user: cpfL,
                 senha: senhaL,
                 palavra: palavraL,
                 nome: nomeL,
                 sobrenome: sobrenomeL
              }),
            };

            fetch(URLcad, dadosCad)
            .then((response) => response.json())
              .then((responseJson) => {
                 let resp = responseJson.dados;
                       
                 if (resp == 1) {
                     this.setState({loading:false});
                     return Alert.alert(
                          'Parabéns!',
                          'Cadastro Realizado com Sucesso!',
                          [
                            {text: 'OK', onPress: () => this.signInAction()},
                          ],
                          { cancelable: false }
                      );
                 }else{
                      this.setState({loading:false});
                      return Alert.alert(
                          'Atenção:',
                          'CPF já cadastrado!',
                          [
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                          ],
                          { cancelable: false }
                      );
                 }

             }).catch((error) => {
                 this.setState({loading:false});
                 // alert(error);
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
                 <ScrollView  style={{width:"100%"}}>
                   <View style={{width:"100%", justifyContent:'center', alignItems:'center', marginBottom:20, marginTop:20}}>
                   <View style={{marginBottom:40}}>
                      <Text style={{fontWeight:'bold', color:'green', fontSize:35}}>Cadastro</Text>
                   </View>
                  
                  <Text style={{fontSize:20, marginBottom:5}}>Nome:*</Text>
                  <TextInput style={styles.input} placeholder="Digite seu nome" maxLength={50} 
                  placeholderTextColor="green" underlineColorAndroid="transparent" 
                  onChangeText={(text)=> this.setState({nome:text})} value={this.state.nome}/> 
                  
                  <Text style={{fontSize:20, marginBottom:5}}>Sobrenome:</Text>
                  <TextInput style={styles.input} placeholder="Digite seu Sobrenome" maxLength={50} 
                  placeholderTextColor="green" underlineColorAndroid="transparent" 
                  onChangeText={(text)=> this.setState({sobrenome:text})} value={this.state.sobrenome}/> 


                  <Text style={{fontSize:20, marginBottom:5}}>CPF:*</Text>
                  <TextInput style={styles.input} placeholder="Digite seu CPF" keyboardType='numeric' 
                  onEndEditing={( cpf : any )=> this.validCPF(cpf.nativeEvent.text )} maxLength={11} 
                  placeholderTextColor="green" underlineColorAndroid="transparent"/>
                  
                  <Text style={{fontSize:20, marginBottom:5}}>Palavra-Chave:*</Text>
                  <TextInput style={styles.input} placeholder="Palavra para recuperar senha..." 
                  maxLength={20} placeholderTextColor="green" underlineColorAndroid="transparent" 
                  onChangeText={(text)=> this.setState({palavraC:text})} value={this.state.palavraC}/> 

                  <Text style={{fontSize:20, marginBottom:5}}>Senha:*</Text>
                  <TextInput style={styles.input} placeholder="Senha" maxLength={32} 
                  placeholderTextColor="green" secureTextEntry={true} underlineColorAndroid="transparent" 
                  onChangeText={(text)=> this.setState({senha:text})} value={this.state.senha}/>
                  
                  <TouchableHighlight onPress={this.cadLogin} style={styles.btLogin} underlayColor="#00b000">
                     <Text style={styles.btLoginText}>Realizar o Cadastro</Text>
                  </TouchableHighlight>

                  <TouchableHighlight onPress={this.signInAction} style={styles.btSign} underlayColor="transparent">
                     <Text style={styles.btSignText}>Já possui cadastro? Clique aqui</Text>
                  </TouchableHighlight>
                  </View>
                 </ScrollView>
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
         	marginTop: 50
         },
         btSignText:{
         	color: "#002a00",
         	fontSize: 15
         }
});