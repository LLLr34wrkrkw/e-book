
import {View, Button, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Text, Image, StatusBar} from 'react-native';
import * as FileSystem from 'expo-file-system';
console.warn = () => {};

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
    try{
    return (
        <SafeAreaView style={[styles.wholePage, {flexDirection: 'column'}]}>

            <View style={{flex: 8}}>
              <Image style={{     height: sizeOfOmage,
        width: win.width}} source={require('../images/Guy_reading_a_book.png')} />
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
                    dir = await parse_json();
                    navigation.navigate('Books', {paramKey: dir});
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
      backgroundColor: '#e8800c',
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
      borderRadius: 20,
    },
    mainContent:
    {
      fontSize: 30,

    },
 
  });