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
         
    //     backgroundColor: '#40c8ff',
         justifyContent: 'center',
         alignItems: 'center',

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
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center',
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
        height: 50,
        marginTop: 15

      },
      forUploadBookOptions: 
      {
      backgroundColor: "dodgerblue",
        flex: 1,
        marginVertical: 30,
        borderRadius: 36,
        justifyContent: 'center',
        alignItems: 'center'
      },
      menuTrigger: 
      {
        width: "100%"
      }
      ,
      menuTriggerText:
      {
        color: "white",
        fontSize: 25,
      },
      menuTriggerTouchable:
      {
        backgroundColor: 'green',
        
      },
      touchableView:
      {
        backgroundColor: "dodgerblue",
        marginVertical: 20,
        borderRadius: 30,
        justifyContent: 'center',
      }
  });