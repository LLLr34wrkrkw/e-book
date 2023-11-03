import {StyleSheet} from 'react-native';

export default StyleSheet.create({

    stretch: {
      width: 50,
      height: 200,
      resizeMode: 'stretch',
    },
    headline: {
        textAlign: 'center', // <-- the magic
        fontWeight: 'bold',
        fontSize: 20,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#40c8ff',
        
      },
      menu: 
      {
         fontSize: 18,
         height: 30,
         width: "100%",
         backgroundColor: '#40c8ff',
         justifyContent: 'flex-end',
         alignItems: 'flex-end',

      },
      menuOptions:
      {
        backgroundColor: '#f5f5dc',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,

      },
      menuOption: 
      {        
        textAlign: 'center',
        justifyContent: 'center',
        zIndex: 1,
        width: "100%",
        justifyContent: 'center',
        alignItems: 'center'
      },
      scroll:
      {
        flex: 1,
      }
      ,
      test:
      {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: 'white'
      },
      menuProvider:
      {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderBottomColor: 'black',
        height: 50

      }
  });