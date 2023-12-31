import {View, Text, Button, WebView, Alert, Platform, TouchableWithoutFeedback} from 'react-native'
import React from 'react'

//import  DocumentPicker  from 'react-native-document-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing";

import create_empty_json from '../WorkWithJsonFiles/create_empty_json';
// Name of json = name of file + '.json'
import parse_json from '../WorkWithJsonFiles/parse_json';
import styles from './css/styles';

import add_to_json from '../WorkWithJsonFiles/add_to_json';
import Get_jsonForExtention from '../WorkWithJsonFiles/Get_jsonForExtention';
const jsonForExtention = Get_jsonForExtention();

async function copyFileToCache(extention_of_file, fileDetails)
{
  const dictForDefiningNeededJson = {
    'pdf' : 'filesForPdf.json',
    'txt' : 'filesForTxt.json',
    'doc' : 'filesForDoc.json',
    'docx' : 'filesForDocx.json',
    'html' : 'filesForHtml.json'
  };
  const json_dict = await parse_json(jsonForExtention[extention_of_file]);
  if((fileDetails.canceled != true) && (json_dict[`${fileDetails.assets[0].name}`] == undefined))
  {        
      
      const number_of_keys = Object.keys(json_dict).length;
      const copyImage =  await FileSystem.copyAsync({
              from: fileDetails.assets[0].uri,
              to: FileSystem.cacheDirectory + `${number_of_keys + 1}` + '.' + extention_of_file,
          });

          
      await add_to_json([`${fileDetails.assets[0].name}`, FileSystem.cacheDirectory.substring(5) + `${number_of_keys + 1}` + '.' + extention_of_file], dictForDefiningNeededJson[extention_of_file]);            
  }
}

const UploadBook =  ({navigation}) => {
    

   

    const pickFiles = async (neededExtention="") => {
     
    for(let jsonFile of Object.values(jsonForExtention))
    {
      const json_file_info = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + jsonFile);
      if(!json_file_info.exists)
      {
          await FileSystem.writeAsStringAsync(FileSystem.cacheDirectory + jsonFile, '{' + '}');
      }
    }
    
    const dictForDefiningType = {
      'pdf' : 'application/pdf',
      'html' : 'text/html',
      'docx' : 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'txt' : 'text/plain',
      'doc' : 'application/msword'
    };

     try{
        

      const fileDetails = await DocumentPicker.getDocumentAsync
      (
          {
            copyTo: 'cachesDirectory',
            type: dictForDefiningType[neededExtention]
          }
      );
        
      
        await copyFileToCache(neededExtention, fileDetails);
        
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



    for(let extention_of_file of Object.keys(jsonForExtention))
    {
    
          views.push(
            <TouchableWithoutFeedback key={extention_of_file + "Touchable"} onPress={()=>pickFiles(extention_of_file)}>
              <View key={extention_of_file} style={styles.forUploadBookOptions}>
                      <Text style={{fontSize: 20, color:"white"}}>Select {extention_of_file} file to upload</Text>
              </View>      
            </TouchableWithoutFeedback>
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