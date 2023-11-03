import {View, Text, Button, WebView, Alert} from 'react-native'
import React from 'react'
//import  DocumentPicker  from 'react-native-document-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing";

import create_empty_json from '../WorkWithJsonFiles/create_empty_json';
// Name of json = name of file + '.json'
import parse_json from '../WorkWithJsonFiles/parse_json';

import add_to_json from '../WorkWithJsonFiles/add_to_json';



const UploadBook =  ({navigation}) => {
    
    const pickFiles = async () => {
    if(false){ //Debug features
    const result__ = await FileSystem.getInfoAsync("file:///var/mobile/Containers/Data/Application/10B728AE-60D7-4A0F-B99A-1F86CD8832E1/Library/Caches/ExponentExperienceData/%2540anonymous%252FExpoBookStorage-a89e683a-9d98-453f-8faa-153b870abffa/something.pdf");
    console.log(result__);
    Sharing.shareAsync("file:///var/mobile/Containers/Data/Application/10B728AE-60D7-4A0F-B99A-1F86CD8832E1/Library/Caches/ExponentExperienceData/%2540anonymous%252FExpoBookStorage-a89e683a-9d98-453f-8faa-153b870abffa/new.pdf");
                            
}  
    const json_file = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + 'files.json');
    if(!json_file.exists)
    {
        await FileSystem.writeAsStringAsync(FileSystem.cacheDirectory + 'files.json', '{' + '}');
    }
     try{
        
      if(true){
      const fileDetails = await DocumentPicker.getDocumentAsync(
        {
          copyTo: 'cachesDirectory',
        });
        const json_dict = await parse_json();
        if(fileDetails.canceled != true && json_dict[`${fileDetails.assets[0].name}`] == undefined)
        {        
            
            const number_of_keys = Object.keys(await parse_json()).length;
            if(true)
            {
                
                const copyImage =  await FileSystem.copyAsync({
                        from: fileDetails.assets[0].uri,
                        to: FileSystem.cacheDirectory + `${number_of_keys + 1}` + '.pdf',
                    });
            }

            
            await add_to_json([`${fileDetails.assets[0].name}`, FileSystem.cacheDirectory.substring(5) + `${number_of_keys + 1}` + '.pdf']);            
        }
    }

        //Sharing.shareAsync(FileSystem.documentDirectory + `${fileDetails.assets[0].name}`);
    }
    catch(error){
      console.log("Error occured" + error);
    }
  }

  // Additional options
  /* <View>
          <Button title="Select link to add an article" onPress={() => Alert.prompt("Adding an article", "Please write down the link of the article", async (link_) => {
            Alert.prompt("Adding an article", "Please name this arcticle", async (name) => await add_to_json([name, link_.substring(6)], 'filesForWeb.json'));
          })}></Button>
      </View>
      
      <View style={{marginVertical: 0}}>
        <Button title="Select pdf fil d" style={{fontSize: 40}} onPress={() => navigation.navigate('Test2')}></Button>
      </View> */
          const views = [];
          views.push(
<View key="UploadOption1" style={{marginVertical: 0}}>
        <Button title="Select pdf file to upload" style={{fontSize: 40}} onPress={pickFiles}></Button>
      </View>
          );
  if(Platform.OS == 'ios')
  {
    views.push(
      <View key="UploadOption2">
          <Button title="Select link to add an article" onPress={() => Alert.prompt("Adding an article", "Please write down the link of the article", async (link_) => {
            Alert.prompt("Adding an article", "Please name this arcticle", async (name) => await add_to_json([name, link_.substring(6)], 'filesForWeb.json'));
          })}></Button>
      </View>
    );
  }
  return (
    
    
    
    <View style={{width: "100%", height:"100%"}}>
      {views}
    </View>
  );
}
/*  <View style={{backgroundColor: 'red', width:"100%", position:"absolute", top:"90%", height:"10%", justifyContent: "center", alignItems: "center"}}>
        <Button title="Upload" onPress={ async () => console.log("Button is empty")}/> 
  </View> */


export default UploadBook;