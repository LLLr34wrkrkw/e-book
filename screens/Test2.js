import * as React from 'react'
import { View , Platform, Button, Text, TextInput} from 'react-native'
import PDFReader from '@bildau/rn-pdf-reader'
import * as FileSystem from 'expo-file-system';
import * as IntentLauncher from 'expo-intent-launcher';
let text = '';

export default function NewReminderScreen({ navigation }) {
const [value, onChangeText] = React.useState('click to add reminder.')

function textChangeHandler(event){
  onChangeText(event.target.value)
   text = event.target.value;
  }

    return (
        <TextInput
        style={{height: 40, borderColor: 'white', borderWidth: 0, color:'#595959', fontSize:20, marginHorizontal:5}}
        onChange={textChangeHandler}
        value = {value}
        />   
    )
}