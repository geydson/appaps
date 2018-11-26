import React, { Component } from 'react';
import {View, Text, ImageBackground, TextInput, TouchableHighlight, ScrollView, StyleSheet, AsyncStorage, Alert, BackHandler } from 'react-native';
import LoadingScreen from '../components/LoadingScreen';

var URLden = 'https://apsapp.000webhostapp.com/class/login.php?action=denuncias';

export default class Denuncia extends Component{

       static navigationOptions = ({navigation}) => ({
       	      tabBarLabel:"Nova Denuncia"

       });

       constructor(props) {
          super(props);
          this.state = {
            categoria:'',
            delito:'',
            endereco:'',
            cidade:'',
            cep:'',
            estado:'',
            referencia:'',
            ocorrido:'',
            ids:'',
            loading: false
          };
       	  
          this.signHome  = this.signHome.bind(this);
          this.cadDenuncia  = this.cadDenuncia.bind(this);
       }

       UNSAFE_componentWillMount(){
           AsyncStorage.getItem( 'ids' ).then(( value ) => {
      
                let ident = parseInt(value);
                this.setState({ ids:ident });
           });
           BackHandler.addEventListener('hardwareBackPress', () => { 
              this.props.navigation.navigate('Home');
              this.setState({categoria: ''});
              this.setState({delito: ''});
              this.setState({endereco: ''});
              this.setState({cidade: ''});
              this.setState({cep: ''});
              this.setState({estado: ''});
              this.setState({referencia: ''});
              this.setState({ocorrido: ''});
              return true; 
            });

       }

       signHome() {
          this.props.navigation.navigate('Home');
          this.setState({categoria: ''});
          this.setState({delito: ''});
          this.setState({endereco: ''});
          this.setState({cidade: ''});
          this.setState({cep: ''});
          this.setState({estado: ''});
          this.setState({referencia: ''});
          this.setState({ocorrido: ''});
       }
       
       cadDenuncia() {

           this.setState({loading:true});
           let categoria  = this.state.categoria;
           let delito     = this.state.delito;
           let endereco   = this.state.endereco;
           let cidade     = this.state.cidade;
           let cep        = this.state.cep;
           let estado     = this.state.estado;
           let referencia = this.state.referencia;
           let ocorrido   = this.state.ocorrido;
           let id         = this.state.ids;
             
           if (categoria== '' || delito == '' || endereco =='' || cidade == '' || cep == ''|| estado == '' || ocorrido == '') {
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
                  categoria: categoria,
                  delito: delito,
                  endereco: endereco,
                  cidade: cidade,
                  cep: cep,
                  estado: estado,
                  referencia: referencia,
                  ocorrido: ocorrido,
                  id: id
              }),
            };

            fetch(URLden, dadosCad)
            .then((response) => response.json())
              .then((responseJson) => {
                 let resp = responseJson.dados;
                       
                 if (resp == 1) {
                     this.setState({loading:false});
                     return Alert.alert(
                          'Paranbéns!',
                          'Denuncia Realizado com Sucesso!',
                          [
                            {text: 'OK', onPress: () => this.signHome()},
                          ],
                          { cancelable: false }
                      );
                 }

                 if (resp == 0) {
                     this.setState({loading:false});
                     return Alert.alert(
                          'Atenção!',
                          'Ocorreu um erro na inclusão!',
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
       	  	   <ImageBackground source={require('../assets/img/fundo_ecology.jpg')} style={styles.container}>
                 <ScrollView  style={{width:"100%"}}>
                   <View style={{width:"100%", justifyContent:'center', alignItems:'center', marginBottom:20, marginTop:20}}>
                      <Text style={{fontSize:20, marginBottom:5}}>Categoria:*</Text>
                      <TextInput style={styles.input} maxLength={20} value={this.state.categoria} placeholder="Ex: Fauna, Ar, Água, Solo..." 
                      placeholderTextColor="green" underlineColorAndroid="transparent" onChangeText={(text)=> this.setState({categoria:text})} /> 

                      <Text style={{fontSize:20, marginBottom:5}}>Tipo de Delito:*</Text>
                      <TextInput style={styles.input} maxLength={30} value={this.state.delito} placeholderTextColor="green" 
                      underlineColorAndroid="transparent" onChangeText={(text)=> this.setState({delito:text})} />
                      
                      <Text style={{fontSize:20, marginBottom:5}}>Endereço:*</Text>
                      <TextInput style={styles.input} maxLength={150} value={this.state.endereco} placeholderTextColor="green"  
                      underlineColorAndroid="transparent" onChangeText={(text)=> this.setState({endereco:text})} />

                      <Text style={{fontSize:20, marginBottom:5}}>Cidade:*</Text>
                      <TextInput style={styles.input} maxLength={30} value={this.state.cidade} placeholderTextColor="green"  
                      underlineColorAndroid="transparent" onChangeText={(text)=> this.setState({cidade:text})} />

                      <Text style={{fontSize:20, marginBottom:5}}>CEP:*</Text>
                      <TextInput style={styles.input} maxLength={8} value={this.state.cep} placeholderTextColor="green" 
                      keyboardType='numeric' underlineColorAndroid="transparent" onChangeText={(text)=> this.setState({cep:text})} />

                      <Text style={{fontSize:20, marginBottom:5}}>Estado:*</Text>
                      <TextInput style={styles.input} maxLength={2} value={this.state.estado} placeholderTextColor="green" 
                      placeholder="Ex: SP, RJ, MG..." underlineColorAndroid="transparent" onChangeText={(text)=> this.setState({estado:text})} />

                      <Text style={{fontSize:20, marginBottom:5}}>Ponto de Referêcia:</Text>
                      <TextInput style={styles.input} maxLength={50} value={this.state.referencia} placeholderTextColor="green"  
                      underlineColorAndroid="transparent" onChangeText={(text)=> this.setState({referencia:text})} />

                      <Text style={{fontSize:20, marginBottom:5}}>Fato Ocorrido:*</Text>
                      <TextInput style={styles.input} maxLength={150} value={this.state.ocorrido} placeholderTextColor="green"  
                      underlineColorAndroid="transparent" onChangeText={(text)=> this.setState({ocorrido:text})} />

                      <TouchableHighlight onPress={this.cadDenuncia} style={styles.btLogin} underlayColor="#00b000">
                         <Text style={styles.btLoginText}>Enviar Denuncia</Text>
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
         }
});