// Firebase
import * as firebase from 'firebase';
import FirebaseConfig from '../Firebase';

// Firebase only used for authentication
firebase.initializeApp(FirebaseConfig);

export const signUpUser = (email, password) => {
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

export const loginUser = (email, password) => {
    var logged_user = {};
    try{
      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        console.log(user.email)
        logged_user = user;
      })
      setLoggedIn(logged_user);
    } catch(error){
      console.log(error.toString())
    }
    console.log(this.state);
  }

export const setLoggedIn = (user) => {
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

export const logoutUser = () => {
    this.setState({
      email: '',
      password: '',
      loggedIn: false,
    })
    console.log(this.state.loggedIn);
}

// export const loginWithFacebook = () => {
//     const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync
//       ('1304761232959382', { permissions: ['public_profile']})

//     if(type == 'success'){
//       const credential = firebase.auth.FaceBookAuthProvider.credential(token);
//       try{
//         firebase.auth.signInWithCredential(credential)
//       } catch (error){
//         console.log(error.toString())
//       }
//     }
//   }
