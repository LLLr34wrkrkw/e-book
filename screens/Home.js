import {View, Button, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Text, Image, StatusBar} from 'react-native';
import * as FileSystem from 'expo-file-system';
console.warn = () => {};

import parse_json from '../WorkWithJsonFiles/parse_json';
import create_empty_json from '../WorkWithJsonFiles/create_empty_json';
import Get_jsonForExtention from '../WorkWithJsonFiles/Get_jsonForExtention';
const jsonForExtention = Get_jsonForExtention();


export default function Home({navigation})
{ const win = Dimensions.get('window');
const ratio = win.width / 1656;

let sizeOfOmage = 0;
if(Platform.OS == 'ios')
{
  sizeOfOmage = 480;
}
else{
  sizeOfOmage = 500;
}
/*    <View style={{flex: 8}}>
              <Image style={{     height: sizeOfOmage,
        width: win.width}} source={require('../images/book.png')} />
            </View>
*/
    try{
    return (
        <SafeAreaView style={[styles.wholePage, {flexDirection: 'column'}]}>

            <View style={{flex: 6}}>
            </View>
            <View style={{flex: 1}}>
                <TouchableOpacity style={styles.forBooks} onPress={() => navigation.navigate('UploadBook')} >

                <View style={styles.viewForBooksAndUploadBook}>
                    <Text style={styles.mainContent}>Upload book</Text>
                  </View>
                </TouchableOpacity>
            </View>


            <View style={{flex: 1}}>
            <TouchableOpacity style={styles.forBooks} onPress={
                async () =>{
           
                    for(let jsonFile of Object.values(jsonForExtention))
                    {
                      const json_file_info = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + jsonFile);
                      if(!json_file_info.exists)
                      {
                          await FileSystem.writeAsStringAsync(FileSystem.cacheDirectory + jsonFile, '{' + '}');
                        
                      }
                    }
                    
                    
                    dirForPdf = await parse_json(jsonForExtention['pdf']);
                    
                    dirForHtml = await parse_json(jsonForExtention['html']);
                    
                    dirForTxt = await parse_json(jsonForExtention['txt']);
                   
                    dirForDocx = await parse_json(jsonForExtention['docx']);
                    console.log(dirForDocx);
                    dirForDoc = await parse_json(jsonForExtention['doc']);
                    
                    navigation.navigate('Books', {paramKeyForPdf: dirForPdf,  paramKeyForHtml: dirForHtml, paramKeyForTxt: dirForTxt, paramKeyForDocx: dirForDocx, paramKeyForDoc: dirForDoc});
            }
                 } >
                  <View style={styles.viewForBooksAndUploadBook}>
                    <Text style={styles.mainContent}>Books</Text>
                  </View>
            </TouchableOpacity>
            
            </View>

         
         </SafeAreaView>
    )
                }
                catch(err)
                {
                    console.log("Error that is annoying me: " + err);
                }
   

}

const styles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    btn:
    {
        width: 200,
        
    },
    forBooks:
    {
      width: Dimensions.get('window').width,
      textAlign: 'center', 
      fontSize: 50,
      
    },
    scrollView: {
      marginHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    wholePage:
    {
      height: "100%",
      flexDirection: 'column-reverse'
    }
    ,
    viewForBooksAndUploadBook:
    {
      backgroundColor: 'dodgerblue',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      borderRadius: 20,
      
    },
    mainContent:
    {
      fontSize: 30,
      color: "white"

    },
 
  });
