import React, { Component } from 'react';
import {AsyncStorage, View, Text, ImageBackground, TextInput, TouchableHighlight, ScrollView, StyleSheet, Button, BackHandler, FlatList} from 'react-native';
import YourComplaints from '../components/YourComplaints';
import axios from 'axios';

export default class TelaPrincipal extends Component{

      static navigationOptions = ({navigation}) => ({
       	      tabBarLabel:"Suas Denúncias"
       });

       constructor(props) {
          super(props);
          this.state = {
                lista: [],
                identifica: this.props.navigation.state.params.resultado
          };
          this.atualizaTela  = this.atualizaTela.bind(this);
          this.att  = this.att.bind(this);

       }


      UNSAFE_componentWillMount(){

          BackHandler.addEventListener('hardwareBackPress', () => true);
      }

      // componentDidUpdate(prevProps) {
      //   if (this.props !== prevProps) { 
      //     this.att();
      //   }
      // }

      atualizaTela(){
          let ids = this.state.identifica;
          // let dados = {
          //     method: 'POST',
          //     headers: {
          //       Accept: 'application/json',
          //       'Content-Type': 'application/json',
          //     },
          //     body: JSON.stringify({
          //        id:ids
          //     }),
          // };


          axios.get('https://apsapp.000webhostapp.com/class/login.php?action=consultadenuncias&id='+ids
           )
          .then((responseJson) => {
          this.setState({lista: responseJson.data.dados});
          }).catch((error) => { 
              console.log(error.message);
          });

          // try{
          //     const r = await fetch(URL, dados);
          //     const responseJson = await r.json();
          //     let state = this.state;
          //     state.lista = responseJson.dados;
          //     this.setState(state);
          // }catch (error) {
          //   alert.error(error);
          // }


          // fetch(URL, dados)
          //    .then((response) => response.json())
          //    .then((responseJson) => {

          //        let state = this.state;
          //        state.lista = responseJson.dados;
          //        this.setState(state);

          //    });
      }
       
      async att() {
          await this.atualizaTela();
      }

      render() {
       	  return (
       	  	   <ImageBackground source={require('../assets/img/fundo_ecology.jpg')} style={styles.container}>
                  <View style={{marginLeft:"60%", marginTop: 10, marginBottom:5}}>
                        <Button title="Atualizar" onPress={this.att} />
                  </View>
                 <View style={styles.viewFlat}>
                      <FlatList
                          data={this.state.lista}
                          renderItem={({item})=> <YourComplaints data={item} />}
                          keyExtractor={(item, index)=> item.ID}
                      />
                 </View>
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
         viewFlat:{
             width: "90%",
             flex: 1,
             marginTop:10
         }
});