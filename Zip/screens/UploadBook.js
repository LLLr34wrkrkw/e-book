import {View, Text, Button, WebView} from 'react-native'
import React from 'react'
//import  DocumentPicker  from 'react-native-document-picker';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from "expo-sharing";


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


async function add_to_json(arr)
{
  const json_ = await FileSystem.readAsStringAsync(FileSystem.cacheDirectory + 'files.json');
  await FileSystem.writeAsStringAsync(FileSystem.cacheDirectory + 'files.json', json_.substring(0, json_.length - 1) + ',' + `${arr[0]}` + ':' + `${arr[1]}` + '}');

  /*
  json_dict[arr[0]] =  arr[1];
  const tmp_arr = [];
  for (let item of Object.entries(json_dict)) {
      tmp_arr.push(item.join(':'));
    }
  const recording_string = '{' + tmp_arr.join(',') + '}';
  await FileSystem.writeAsStringAsync(FileSystem.cacheDirectory + 'files.json', recording_string);
    */
}


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

  return (
    
    
    <View style={{width: "100%", height:"100%"}}>
      <View style={{marginVertical: 0}}>
        <Button title="Select pdf file to upload" style={{fontSize: 40}} onPress={pickFiles}></Button>
      </View>
    </View>
  );
}
/*  <View style={{backgroundColor: 'red', width:"100%", position:"absolute", top:"90%", height:"10%", justifyContent: "center", alignItems: "center"}}>
        <Button title="Upload" onPress={ async () => console.log("Button is empty")}/> 
  </View> */


export default UploadBook;