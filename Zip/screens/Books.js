
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
  
  async function  parse_json()
{

      const json_string = await FileSystem.readAsStringAsync(FileSystem.cacheDirectory + 'files.json');
      const json_string_without_curved_brackets = json_string.substring(1, json_string.length - 1);
      const json_string_devided_by_pairs = json_string_without_curved_brackets.split(',');
      
      let dict = {};
      for(let i = 1; i < json_string_devided_by_pairs.length; i++)
      {
          let tmp = json_string_devided_by_pairs[i];
          const tmp_arr = tmp.split(':');
          if(Object.prototype.hasOwnProperty.call(dict, tmp_arr[0]) == false) dict[tmp_arr[0]] = tmp_arr[1];
      }
      return dict;
}


  async function delete_key_from_json(key){
    const path_to_json =  FileSystem.cacheDirectory + 'files.json';
    const json_string = await FileSystem.readAsStringAsync(path_to_json);
    const ind_of_key = json_string.indexOf(key);
    
    if(ind_of_key != -1)
    {
        const ind_of_comma = json_string.indexOf(',', ind_of_key);

        if(ind_of_comma == -1)
        {
            if(json_string[ind_of_key - 1] == ',')
            {
                await FileSystem.writeAsStringAsync(path_to_json, json_string.substring(0, ind_of_key - 1) + '}');
            }
            else{
                await FileSystem.writeAsStringAsync(path_to_json, '{' + '}');
            }
        }
        else{
            await FileSystem.writeAsStringAsync(path_to_json , json_string.substring(0, ind_of_key) + json_string.substring(ind_of_comma + 1))
        }
    }
}


export default function Books({navigation, route})
{
    let dir = route.params.paramKey;
    const x = [];
    //console.log(`keys_of_json_dict: ${keys_of_json_dict}`);
    for(let k in dir)
    {
        x.push([k, dir[k]]);
    }    

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

      return (
        <TouchableWithoutFeedback onPress={() => {
            for(let j = 0; j < x.length; j++) 
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

