import * as React from 'react'
import { View , Platform, Button} from 'react-native'
import PDFReader from '@bildau/rn-pdf-reader'
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';

export default function Read({route})
{
  
    if(Platform.OS == "android") 
    {
        return (
            <Button title="Read" onPress={ () =>{
                uri = "file:" + route.params.paramKey;
                  FileSystem.getContentUriAsync(uri).then(cUri => {
                    IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                        data: cUri,
                        flags: 1,
                        type: 'application/pdf'
                     });
                   });
            } } />
        );
    }
    else{
    return (
        <PDFReader
          source={{
            uri: 'file:' + route.params.paramKey
          }}
        />
      )
    }
}


//'file:' + route.params.paramKey