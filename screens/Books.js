import {View, Alert,  Image, Text, Button, ScrollView, Platform, RefreshControl , TouchableOpacity, TouchableWithoutFeedback, StyleSheet, TouchableHighlight} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Sharing from "expo-sharing";
import { MenuProvider, MenuContext } from 'react-native-popup-menu';


import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';



import {useEffect, useState} from 'react';
import styles from './css/styles';
  
import parse_json from '../WorkWithJsonFiles/parse_json';
import delete_key_from_json from '../WorkWithJsonFiles/delete_key_from_json';
 import Get_jsonForExtention from '../WorkWithJsonFiles/Get_jsonForExtention';
const jsonForExtension = Get_jsonForExtention();
import create_empty_json from '../WorkWithJsonFiles/create_empty_json';

export default function Books({navigation, route})
{
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
        ],
        {
          cancelable: true
        }
        ); 
       
      }
      }></Button>),}
    );
}, [navigation])
    


    let dirForPdf = route.params.paramKeyForPdf;
    let dirForWeb = route.params.paramKeyForWeb;
    let dirForHtml = route.params.paramKeyForHtml;
    let dirForTxt = route.params.paramKeyForTxt;
    let dirForDocx = route.params.paramKeyForTxt;
    

    let counter = 0;
    const arr = [];
    const views2 = [];
    if(Platform.OS == 'ios')
    {
        const arrForPdfReader = [dirForDocx, dirForHtml, dirForPdf, dirForTxt];
        for(let currentDir of arrForPdfReader)
        {
            for(let [fileName, pathToFile] of Object.entries(currentDir))
            {
                    views2.push(
                            <MenuProvider style={styles.menuProvider} key={fileName + 'pdf' + 'MenuProvider'}>
                                <TouchableWithoutFeedback key={fileName + 'pdf' + 'Touchable'} onPress={() => navigation.navigate('Read', {paramKey: pathToFile})} onLongPress={()=>{arr[counter].open(); counter++}} >
                                
                                    <View key={fileName + fileName}>

                                        <Text numberOfLines={1}  style={styles.headline}> {fileName}</Text>
                                        
                                        <Menu  ref={c => (arr.push(c))} style={styles.menu}  key={fileName + 'Menu' + 'pdf'}> 

                                            <MenuTrigger text="" key={fileName + 'MenuTrigger' + 'pdf'} />

                                            <MenuOptions key={fileName + 'MenuOptions' + 'pdf'} style={styles.menuOptions}>

                                                <MenuOption  key={fileName + 'MenuOption' + 'pdf'} onSelect={() => Sharing.shareAsync('file:' + pathToFile)} text='Share' style={styles.menuOption}>
                                                </MenuOption>
                                            

                                                <MenuOption key={fileName + 'MenuOption2' + 'pdf'} onSelect={async () => {await delete_key_from_json(fileName);dir = await parse_json(); // ?? Fix ??
                                                     navigation.navigate('Home')}} text='Delete' style={styles.menuOption}>
                                                </MenuOption>

                                            </MenuOptions>

                                        </Menu>

                                    </View>

                                </TouchableWithoutFeedback>

                            </MenuProvider>
                     );
            }
            for(let [fileName, pathToFile] of Object.entries(dirForWeb))
            {
                views2.push(
                    <MenuProvider style={styles.menuProvider} key={fileName + 'WebMenuProvider'}>
                    <TouchableWithoutFeedback key={fileName + 'WebTouchableWithoutFeedback'} onPress={() => navigation.navigate('ReadByLink', {paramKey: pathToFile})} onLongPress={()=>{arr[counter].open(); counter++}} >
                    
                        <View key={fileName + 'Web'}>

                            <Text numberOfLines={1}  style={styles.headline}> {fileName}</Text>
                            
                            <Menu  ref={c => (arr.push(c))} style={styles.menu}  key={fileName + 'WebMenu'}> 

                                <MenuTrigger text="" key={fileName + 'WebMenuTrigger'} />

                                <MenuOptions key={fileName + 'WebMenuOptions'} style={styles.menuOptions}>

                                    <MenuOption  key={fileName + 'WebMenuOption'} onSelect={() => Sharing.shareAsync(pathToFile)} text='Share' style={styles.menuOption}>
                                    </MenuOption>
                                

                                    <MenuOption key={fileName + 'WebMenuOption2'} onSelect={async () => {await delete_key_from_json(fileName, 'filesForWeb.json');
                                        navigation.navigate('Home')}} text='Delete' style={styles.menuOption}>
                                    </MenuOption>

                                </MenuOptions>

                            </Menu>

                        </View>

                    </TouchableWithoutFeedback>

                </MenuProvider>
                );
            }

         } /* Android pdf
            else{
                views2.push(
                    <MenuProvider  key={fileName + 'androidMenuProvider'} style={styles.menuProvider}>
                        <TouchableWithoutFeedback  key={fileName + 'androidTouchable'} onPress={async () => {uri = "file:" + x[i][1];
                  await FileSystem.getContentUriAsync(uri).then(cUri => {
                    IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                        data: cUri,
                        flags: 1,
                        type: 'application/pdf'
                     });
                   });}} onLongPress={()=>{arr[i].open()}} >
                        
                            <View key={fileName + 'android'}>

                                <Text  key={fileName + 'androidText'} numberOfLines={1}  style={styles.headline}> {x[i][0]}</Text>
                                
                                <Menu  key={fileName + 'androidMenu'}  ref={c => (arr.push(c))} style={styles.menu} > 

                                    <MenuTrigger  key={fileName + 'androidMenuTrigger'} text="" />

                                    <MenuOptions  key={fileName + 'androidMenuOptions'} style={styles.menuOptions}>

                                        <MenuOption  key={fileName + 'androidOption'} onSelect={() => Sharing.shareAsync('file:' + x[i][1])} text='Share' style={styles.menuOption}>
                                        </MenuOption>
                                    

                                        <MenuOption  key={fileName + 'androidOption2'} onSelect={async () => {await delete_key_from_json(x[i][0]);dir = await parse_json();
                                             navigation.navigate('Home')}} text='Delete' style={styles.menuOption}>
                                        </MenuOption>

                                    </MenuOptions>

                                </Menu>

                            </View>

                        </TouchableWithoutFeedback>

                    </MenuProvider>
             );
            }*/
    }
    else{
        for(let [fileName, pathToFile] of Object.entries(dirForPdf))
        {
            views2.push(
                        <MenuProvider  key={fileName + 'androidMenuProvider'} style={styles.menuProvider}>
                            <TouchableWithoutFeedback  key={fileName + 'androidTouchable'} onPress={async () => {uri = "file:" + pathToFile;
                                    await FileSystem.getContentUriAsync(uri).then(cUri => {
                                    IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                                        data: cUri,
                                        flags: 1,
                                        type: 'application/pdf'
                                    });
                                });}} onLongPress={()=>{arr[counter].open(); counter++}} >
                            
                                <View key={fileName + 'android'}>

                                    <Text  key={fileName + 'androidText'} numberOfLines={1}  style={styles.headline}> {fileName}</Text>
                                    
                                    <Menu  key={fileName + 'androidMenu'}  ref={c => (arr.push(c))} style={styles.menu} > 

                                        <MenuTrigger  key={fileName + 'androidMenuTrigger'} text="" />

                                        <MenuOptions  key={fileName + 'androidMenuOptions'} style={styles.menuOptions}>

                                            <MenuOption  key={fileName + 'androidOption'} onSelect={() => Sharing.shareAsync('file:' + pathToFile)} text='Share' style={styles.menuOption}>
                                            </MenuOption>
                                        

                                            <MenuOption  key={fileName + 'androidOption2'} onSelect={async () => {await delete_key_from_json(fileName);dir = await parse_json();
                                                navigation.navigate('Home')}} text='Delete' style={styles.menuOption}>
                                            </MenuOption>

                                        </MenuOptions>

                                    </Menu>

                                </View>

                            </TouchableWithoutFeedback>

                        </MenuProvider>
                );
        }

        const arrForReadByLink = [dirForHtml, dirForTxt, dirForWeb];
        for(let currentDir of arrForReadByLink)
        {
            for(let [fileName, pathToFile] of Object.entries(currentDir))
            {
                views2.push
                (
                    <MenuProvider style={styles.menuProvider} key={fileName + 'WebMenuProvider'}>
                        <TouchableWithoutFeedback key={fileName + 'WebTouchableWithoutFeedback'} onPress={() => navigation.navigate('ReadByLink', {paramKey: pathToFile})} onLongPress={()=>{arr[counter].open(); counter++}} >
                        
                            <View key={fileName + 'Web'}>

                                <Text numberOfLines={1}  style={styles.headline}> {fileName}</Text>
                                
                                <Menu  ref={c => (arr.push(c))} style={styles.menu}  key={fileName + 'WebMenu'}> 

                                    <MenuTrigger text="" key={fileName + 'WebMenuTrigger'} />

                                    <MenuOptions key={fileName + 'WebMenuOptions'} style={styles.menuOptions}>

                                        <MenuOption  key={fileName + 'WebMenuOption'} onSelect={() => Sharing.shareAsync(pathToFile)} text='Share' style={styles.menuOption}>
                                        </MenuOption>
                                    

                                        <MenuOption key={fileName + 'WebMenuOption2'} onSelect={async () => {await delete_key_from_json(fileName, 'filesForWeb.json');
                                            navigation.navigate('Home')}} text='Delete' style={styles.menuOption}>
                                        </MenuOption>

                                    </MenuOptions>

                                </Menu>

                            </View>

                        </TouchableWithoutFeedback>

                    </MenuProvider>
                );
            }
        }
    }
      return (
        <TouchableWithoutFeedback onPress={() => {
            for(let j = 0; j < counter; j++) 
            {
                arr[j].close();
            }
        }}>
        <ScrollView style={styles.test}>
                 {views2}
        </ScrollView>
        </TouchableWithoutFeedback>
      )

}

