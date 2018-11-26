import React, { Component } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import Moment from 'moment';

export default class YourComplaints extends Component {
     
     data(){
     	Moment.locale('pt');
     	let dt = Moment(this.props.data.DATA_DENUNCIA).format('DD/MM/YYYY HH:mm:ss');
     	return dt;
     }

     render() {
     	return (
     		<View style={styles.area}>
     		  <View style={{width:"100%", flexDirection: 'row'}}>
                <View style={{width:"50%", marginLeft: 5}}>
     		      <Text style={{color:'#FFFFFF', fontSize: 18}}>Delito: {this.props.data.DELITO}</Text>
     		    </View>
     		    <View style={{width:"50%", marginLeft: 5}}>
     		      <Text style={{color:'#FFFFFF', fontSize: 18}}>Categoria: {this.props.data.CATEGORIA}</Text>
     		    </View>
              </View>
              <View style={{width:"100%", flexDirection: 'row'}}>
                <View style={{width:"50%", marginLeft: 5}}>
     		      <Text style={{color:'#FFFFFF', fontSize: 18}}>Cidade: {this.props.data.CIDADE}</Text>
     		    </View>
     		    <View style={{width:"50%", marginLeft: 5}}>
     		      <Text style={{color:'#FFFFFF', fontSize: 18}}>Estado: {this.props.data.ESTADO}</Text>
     		    </View>
              </View>
     		  <Text style={{color:'#FFFFFF', fontSize: 18, marginLeft: 5}}>Data: {this.data()}</Text>
     		</View>
        );
     }

}

const styles = StyleSheet.create({
       area: {
       	  backgroundColor: "#2E8B57",
       	  paddingTop:10,
       	  paddingBottom:10,
       	  borderRadius: 15,
          borderWidth: 0.5,
          borderColor: '#CCCCCC'
       }
});
