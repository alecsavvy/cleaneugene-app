import React, { Component } from 'react';
import { Button } from './button';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

class Map extends Component{
    constructor(props){
        super(props);
    }

    logoutUser = () => {

    }
    
    render(){
        return(
            <MapView
            initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
        />
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: 'black',
      justifyContent: 'center',
    },
    banner: {
      color: '#98ff98',
      fontWeight: '900',
      fontSize: 40,
      justifyContent: 'center',
    }
  });

export default Map;