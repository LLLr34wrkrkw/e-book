import {View, Image, Text, Button, ScrollView, Platform, RefreshControl , TouchableOpacity, TouchableWithoutFeedback, StyleSheet, TouchableHighlight} from 'react-native';
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

import styles from './css/styles';
  
import parse_json from '../WorkWithJsonFiles/parse_json';
import delete_key_from_json from '../WorkWithJsonFiles/delete_key_from_json';
 


export default function Books({navigation, route})
{
    let dir = route.params.paramKey;
    let dirForWeb = route.params.paramKeyForWeb;
    const x = [];
    //console.log(`keys_of_json_dict: ${keys_of_json_dict}`);
    for(let k in dir)
    {
        x.push([k, dir[k]]);
    }    
    const xForWeb = [];

    for(let k in dirForWeb)
    {
        xForWeb.push([k, dirForWeb[k]]);
    }
    console.log(xForWeb);
      const arr = [];
      const views2 = [];
      for(let i = 0; i < x.length; i++)
      {
            if(Platform.OS == 'ios')
            {
          views2.push(
                            <MenuProvider style={styles.menuProvider} key={`${i}` + 'a'}>
                                <TouchableWithoutFeedback key={`${i}` + 'b'} onPress={() => navigation.navigate('Read', {paramKey: x[i][1]})} onLongPress={()=>{arr[i].open()}} >
                                
                                    <View key={`${i}`}>

                                        <Text numberOfLines={1}  style={styles.headline}> {x[i][0]}</Text>
                                        
                                        <Menu  ref={c => (arr.push(c))} style={styles.menu}  key={`${i}` + 'c'}> 

                                            <MenuTrigger text="" key={`${i}` + 'd'} />

                                            <MenuOptions key={`${i}` + 'e'} style={styles.menuOptions}>

                                                <MenuOption  key={`${i}` + 'f'} onSelect={() => Sharing.shareAsync('file:' + x[i][1])} text='Share' style={styles.menuOption}>
                                                </MenuOption>
                                            

                                                <MenuOption key={`${i}` + 'f2'} onSelect={async () => {await delete_key_from_json(x[i][0]);dir = await parse_json();
                                                     navigation.navigate('Home')}} text='Delete' style={styles.menuOption}>
                                                </MenuOption>

                                            </MenuOptions>

                                        </Menu>

                                    </View>

                                </TouchableWithoutFeedback>

                            </MenuProvider>
                     );
            } 
            else{
                views2.push(
                    <MenuProvider  key={`${i}` + 'androidMenuProvider'} style={styles.menuProvider}>
                        <TouchableWithoutFeedback  key={`${i}` + 'androidTouchable'} onPress={async () => {uri = "file:" + x[i][1];
                  await FileSystem.getContentUriAsync(uri).then(cUri => {
                    IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                        data: cUri,
                        flags: 1,
                        type: 'application/pdf'
                     });
                   });}} onLongPress={()=>{arr[i].open()}} >
                        
                            <View key={`${i}` + 'android'}>

                                <Text  key={`${i}` + 'androidText'} numberOfLines={1}  style={styles.headline}> {x[i][0]}</Text>
                                
                                <Menu  key={`${i}` + 'androidMenu'}  ref={c => (arr.push(c))} style={styles.menu} > 

                                    <MenuTrigger  key={`${i}` + 'androidMenuTrigger'} text="" />

                                    <MenuOptions  key={`${i}` + 'androidMenuOptions'} style={styles.menuOptions}>

                                        <MenuOption  key={`${i}` + 'androidOption'} onSelect={() => Sharing.shareAsync('file:' + x[i][1])} text='Share' style={styles.menuOption}>
                                        </MenuOption>
                                    

                                        <MenuOption  key={`${i}` + 'androidOption2'} onSelect={async () => {await delete_key_from_json(x[i][0]);dir = await parse_json();
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
    console.log(xForWeb);
    for(let i = 0; i < xForWeb.length; i++)
    {
        views2.push(
            <MenuProvider style={styles.menuProvider} key={`${i}` + 'WebMenuProvider'}>
            <TouchableWithoutFeedback key={`${i}` + 'WebTouchableWithoutFeedback'} onPress={() => navigation.navigate('ReadByLink', {paramKey: xForWeb[i][1]})} onLongPress={()=>{arr[i + x.length].open()}} >
            
                <View key={`${i}` + 'Web'}>

                    <Text numberOfLines={1}  style={styles.headline}> {xForWeb[i][0]}</Text>
                    
                    <Menu  ref={c => (arr.push(c))} style={styles.menu}  key={`${i}` + 'WebMenu'}> 

                        <MenuTrigger text="" key={`${i}` + 'WebMenuTrigger'} />

                        <MenuOptions key={`${i}` + 'WebMenuOptions'} style={styles.menuOptions}>

                            <MenuOption  key={`${i}` + 'WebMenuOption'} onSelect={() => Sharing.shareAsync(xForWeb[i][1])} text='Share' style={styles.menuOption}>
                            </MenuOption>
                        

                            <MenuOption key={`${i}` + 'WebMenuOption2'} onSelect={async () => {await delete_key_from_json(xForWeb[i][0], 'filesForWeb.json');
                                 navigation.navigate('Home')}} text='Delete' style={styles.menuOption}>
                            </MenuOption>

                        </MenuOptions>

                    </Menu>

                </View>

            </TouchableWithoutFeedback>

        </MenuProvider>
        );
    }

      return (
        <TouchableWithoutFeedback onPress={() => {
            for(let j = 0; j < x.length + xForWeb.length; j++) 
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

