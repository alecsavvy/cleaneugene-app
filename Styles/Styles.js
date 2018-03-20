import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
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