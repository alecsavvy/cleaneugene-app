import React from 'react';
import { StyleSheet, Text, View, AlertIOS } from 'react-native';
import * as firebase from 'firebase';
import { Input } from './Components/input';
import { Button } from './Components/button';
import Map from './Components/map';
import { KeyboardAwareView } from 'react-native-keyboard-aware-view';
import FirebaseConfig from './Firebase';
import MapView, { Marker } from 'react-native-maps';

firebase.initializeApp(FirebaseConfig);
const databaseRef = firebase.database().ref();

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      loggedIn: false,
      user: {},
      reports: {},
      markers: [{
        title: 'Duck Store',
        coordinates: {
          latitude: 44.045923,
          longitude: -123.078834
        },
      },
      {
        title: 'EMU',
        coordinates: {
          latitude: 44.045062,
          longitude: -123.073715
        },  
      }]
    }
  }

  ComponentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null){
        console.log(user)
      }
    })


  }

  guid = () => {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

  signUpUser = (email, password) => {
    try{
      if (password <= 6){
        alert("please enter 6 characters");
        return;
      }
      firebase.auth().createUserWithEmailAndPassword(email, password);
    } catch (error){
      return console.log(error.toString());
    }
  }

  writePin = (Latitude, Longitude) => {
   var data = JSON.stringify({
    reporter_email: this.state.email,
    date: new Date().toDateString(),
    coordinates: {
      latitude: Latitude,
      longitude: Longitude
    }
  });

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    
    xhr.open("POST", "http://localhost:8000/reports");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "31f2753d-0d97-aec4-293d-e6c0890ed513");
    
    xhr.send(data);
  }
  getAllReports = () => {
    console.log("getAllReports called")
    return fetch('http://207.98.72.251:8000/reports')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.reports;
        console.log("All Reports: ");
        console.log(responseJson.reports);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  setAllReports = () => {
    this.getAllReports()
      .then((data) => {
        this.setState(previousState => {
          return { 
            reports: data[0],
           };
        })
      })
    console.log(this.state.reports);
  }

  loginUser = (email, password) => {
    var logged_user = {};
    try{
      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        console.log(user.email)
        logged_user = user;
      })
      this.setLoggedIn(logged_user);
    } catch(error){
      console.log(error.toString())
    }
    console.log(this.state);
  }

  addPinToList = (latitude, longitude) => {
    var pin_loc = {
      title: "pin_drop",
      coordinates: {
        latitude,
        longitude,
      }
    }
    console.log(pin_loc)
    var new_markers_list = this.state.markers.concat(pin_loc);
    this.setState(previousState => {
      return {
        markers: new_markers_list,
      }
    })
  }

  setLoggedIn = (user) => {
    this.setState(previousState => {
      return { 
        loggedIn: true,
        user: user,
       };
    })
    var allReports = this.getAllReports()
    this.setAllReports();
    console.log("Logged In State: ");
    console.log(this.state.loggedIn);
  }

  dropPin = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var current_longitude = position.coords.longitude;
        var current_latitude = position.coords.latitude;
        console.log("pin dropped at")
        console.log("longitude ", current_longitude)
        console.log("latitude ", current_latitude)
        this.addPinToList(current_latitude, current_longitude)
        this.writePin(current_latitude, current_longitude)
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  logoutUser = () => {
    this.setState({
      email: '',
      password: '',
      loggedIn: false,
    })
    console.log(this.state.loggedIn);
        }

async loginWithFacebook() {
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync
      ('1304761232959382', { permissions: ['public_profile']})

    if(type == 'success'){
      const credential = firebase.auth.FaceBookAuthProvider.credential(token);
      try{
        firebase.auth.signInWithCredential(credential)
      } catch (error){
        console.log(error.toString())
      }
    }
  }

  render() {
    return (
      <KeyboardAwareView animated={true}>
        {!this.state.loggedIn && 
          <View style={styles.container}>
            <Text style={styles.title}>CleanEugene</Text>
            <Input 
              placeholder={"Enter your email!"}
              label={"Email"}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <Input 
              placeholder={"Enter your password!"}
              label={"Password"}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              secureTextEntry
            />
            {/*
            <Button onPress={() => this.loginUser("alecsavvy@outlook.com", "grapes")}> Login! </Button>
            */}
            <Button onPress={() => this.loginUser(this.state.email, this.state.password)}> Login! </Button>
            <Button onPress={() => this.signUpUser(this.state.email, this.state.password)}> Sign Up! </Button>
            {/* 
              Facebook Button, not working yet
              <Button onPress={() => this.loginWithFacebook()}> Login with Facebook! </Button> 
            */}
          </View>
              }
        {this.state.loggedIn && 
          <View style={styles.container}>
            <Text style={styles.map_title}>Map</Text>
            <MapView
              showsUserLocation
              showsMyLocationButton
              followsUserLocation
              style={styles.map}
            >
            {this.state.markers.map((marker,index) => (
              <Marker 
                coordinate={marker.coordinates}
                title={marker.title}
                key={index}
              />
            ))}
            </MapView>
            <View style={styles.report_button}>
              <Button onPress={() => this.dropPin()}> Report </Button>
            </View>
            <View style={styles.logout_button} >
              <Button onPress={() => this.logoutUser()}> Logout </Button>
            </View>
          </View>
        }
      </KeyboardAwareView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  banner: {
    color: '#98ff98',
    fontWeight: '900',
    fontSize: 40,
    bottom: 0,
    position: "absolute",
    justifyContent: 'center',
  },
  title: {
    color: '#98ff98',
    fontWeight: '900',
    fontSize: 40,
    justifyContent: 'center',
  },
  map_title: {
    color: '#98ff98',
    fontWeight: '900',
    fontSize: 40,
    position: 'absolute',
    top: 40,
    left: 40,
    width: 100,
    height: 100,

  },
  logout_button: {
    position: 'absolute',
    top: 0,
    right: 40,
    width: 100,

  },
  map: {
    left: 0,
    right: 0,
    top: 100,
    bottom: 180,
    position: "absolute",
  },
  report_button: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
  }
});
