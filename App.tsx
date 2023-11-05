import { StyleSheet, Text, View, TouchableWithoutFeedback, Button, Alert} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import HomeScreen from './screens/Home'
import BooksScreen from './screens/Books'
import UploadBookScreen from './screens/UploadBook'
import ReadScreen from './screens/Read'



import create_empty_json from './WorkWithJsonFiles/create_empty_json';
import Get_jsonForExtention from './WorkWithJsonFiles/Get_jsonForExtention';
const jsonForExtension = Get_jsonForExtention();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{title:'Ugarit', headerTitleAlign: "center"}}/>
        <Stack.Screen name="Books" component={BooksScreen} options={{title:'Your books', headerTitleAlign: "center"}}/>
        <Stack.Screen name="UploadBook" component={UploadBookScreen} options={{title:'Upload a book', headerTitleAlign: 'center'}}/>
        <Stack.Screen name="Read" component={ReadScreen}/>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
