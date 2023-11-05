import {View, Alert,   Text, Button, ScrollView, Platform, TouchableWithoutFeedback} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from "expo-sharing";
import { MenuProvider } from 'react-native-popup-menu';


import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';



import {useEffect} from 'react';
import styles from './css/styles';
  
import delete_key_from_json from '../WorkWithJsonFiles/delete_key_from_json';
 import Get_jsonForExtention from '../WorkWithJsonFiles/Get_jsonForExtention';
const jsonForExtension = Get_jsonForExtention();
import create_empty_json from '../WorkWithJsonFiles/create_empty_json';
import parse_json from '../WorkWithJsonFiles/parse_json';

export default function Books({navigation, route})
{
    parse_json('filesForTxt.json');
    useEffect(() =>
    {navigation.setOptions(
      {headerRight: 
        () => (<Button title="Delete all" color="red" onPress={() => { 
        Alert.alert('Warning', 'Are you sure that you want to delete all files?', [
          {
            text: 'Delete',
            onPress: () => {
              for(let jsonFile of Object.values(jsonForExtension))
              {
                create_empty_json(jsonFile);
              }
              navigation.navigate('Home');
            }
          }
          ,
          {
            text: 'Cancel',
            onPress: () => {}
          }
        ]
        ); 
       
      }
      }></Button>),}
    );
}, [navigation])
    


    let dirForPdf = route.params.paramKeyForPdf;
    let dirForHtml = route.params.paramKeyForHtml;
    let dirForTxt = route.params.paramKeyForTxt;
    let dirForDocx = route.params.paramKeyForDocx;
    let dirForDoc = route.params.paramKeyForDoc;
    
    
    let counter = 0;
    const arr = [];
    const views2 = [];
    const arrForPdfReader = [dirForDocx,  dirForPdf, dirForTxt, dirForDoc, dirForHtml];
    const extentions = ['Docx',  'Pdf', 'Txt', 'Doc', 'Html'];
    const extentions_without_capital_letter = ['docx', 'pdf', 'txt', 'doc', 'html'];
    const dictForDefiningType = {
        'pdf' : 'application/pdf',
        'html' : 'text/html',
        'docx' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'txt' : 'text/plain',
        'doc' : 'application/msword'
      };
      
      for(let key of arrForPdfReader)
      {
        console.log(key);
      }
    let i = 0;
    let j = 0;
    if(Platform.OS == 'ios')
    {
        
        let current_extention = 0;
        for(let currentDir of arrForPdfReader)
        {
            for(let [fileName, pathToFile] of Object.entries(currentDir))
            {
                let counter = i;
                const const_current_extention = current_extention;
                    views2.push(
                        <TouchableWithoutFeedback style={styles.menuTriggerTouchable} key={fileName + 'pdf' + 'Touchable'} onPress={() => navigation.navigate('Read', {paramKey: pathToFile})} onLongPress={()=>{arr[counter].open();}} >
                            <View style={styles.touchableView}>              
                                <MenuProvider style={styles.menuProvider} key={fileName + 'pdf' + 'MenuProvider'}>
                                
                                            <Menu  ref={c => (arr.push(c))} style={styles.menu}  key={fileName + 'Menu' + 'pdf'}> 
                                            <Text style={styles.menuTriggerText} numberOfLines={1} > {(fileName.lastIndexOf('.') != -1) ? fileName.substring(0, fileName.lastIndexOf('.')) : fileName}</Text>
                                       
                                                    <MenuTrigger key={fileName + 'MenuTrigger' + 'pdf'} style={styles.menuTrigger}>

                                                    </MenuTrigger>
                                                    <MenuOptions key={fileName + 'MenuOptions' + 'pdf'} style={styles.menuOptions}>

                                                        <MenuOption  key={fileName + 'MenuOption' + 'pdf'} onSelect={() => Sharing.shareAsync('file:' + pathToFile)} text="" style={styles.menuOption}><Text style={{fontSize:22}}>Share this file</Text> 
                                                        </MenuOption>
                                                    

                                                        <MenuOption key={fileName + 'MenuOption2' + 'pdf'} onSelect={() => {delete_key_from_json(fileName, jsonForExtension[extentions_without_capital_letter[const_current_extention]]); navigation.navigate('Home')}} text="" style={styles.menuOption}><Text style={{fontSize:22}}>Delete this file</Text>
                                                        </MenuOption>

                                                    </MenuOptions>

                                            </Menu>
                                </MenuProvider>
                            </View>
                        </TouchableWithoutFeedback>
                     );
                     i++;
                 }
                 current_extention++;
        
        }
    }
    else{
                    
        let current_extention = 0;
        for(let currentDir of arrForPdfReader)
        {
            for(let [fileName, pathToFile] of Object.entries(currentDir))
            {
                let counter = j;
                const const_current_extention = current_extention;
                    views2.push(
                        <TouchableWithoutFeedback style={styles.menuTriggerTouchable} key={fileName + 'pdf' + 'Touchable'} onPress={() => {uri = "file:" + pathToFile;
                        FileSystem.getContentUriAsync(uri).then(cUri => {
                        IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                            data: cUri,
                            flags: 1,
                            type: dictForDefiningType[extentions[j]]
                        });
                    });}} onLongPress={()=>{arr[counter].open();}} >
                            <View style={styles.touchableView}>              
                                <MenuProvider style={styles.menuProvider} key={fileName + extentions_without_capital_letter[current_extention] + 'MenuProvider'}>
                                
                                            <Menu  ref={c => (arr.push(c))} style={styles.menu}  key={fileName + 'Menu' + extentions_without_capital_letter[current_extention]}> 
                                            <Text style={styles.menuTriggerText} numberOfLines={1} > {(fileName.lastIndexOf('.') != -1) ? fileName.substring(0, fileName.lastIndexOf('.')) : fileName}</Text>
                                    
                                                    <MenuTrigger key={fileName + 'MenuTrigger' + extentions_without_capital_letter[current_extention]} style={styles.menuTrigger}>

                                                    </MenuTrigger>
                                                    <MenuOptions key={fileName + 'MenuOptions' + extentions_without_capital_letter[current_extention]} style={styles.menuOptions}>

                                                        <MenuOption  key={fileName + 'MenuOption' + extentions_without_capital_letter[current_extention]} onSelect={() => Sharing.shareAsync('file:' + pathToFile)} text="" style={styles.menuOption}><Text style={{fontSize:22}}>Share this file</Text> 
                                                        </MenuOption>
                                                    

                                                        <MenuOption key={fileName + 'MenuOption2' + extentions_without_capital_letter[current_extention]} onSelect={() => {delete_key_from_json(fileName, jsonForExtension[extentions_without_capital_letter[const_current_extention]]); navigation.navigate('Home')}} text="" style={styles.menuOption}><Text style={{fontSize:22}}>Delete this file</Text>
                                                        </MenuOption>

                                                    </MenuOptions>

                                            </Menu>
                                </MenuProvider>
                            </View>
                        </TouchableWithoutFeedback>
                    );
                    j++;
                }
                current_extention++;

        }

    }
      return (
        <TouchableWithoutFeedback onPress={() => {
            for(let k = 0; k < i + j; k++) 
            {
                arr[k].close();
            }
        }}>
        <ScrollView style={styles.test}>
                 {views2}
        </ScrollView>
        </TouchableWithoutFeedback>
      )

}



