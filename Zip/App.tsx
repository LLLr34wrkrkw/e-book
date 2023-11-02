import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import HomeScreen from './screens/Home'
import BooksScreen from './screens/Books'
import UploadBookScreen from './screens/UploadBook'
import ReadScreen from './screens/Read'

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{title:'eBook', headerTitleAlign: "center"}}/>
        <Stack.Screen name="Books" component={BooksScreen} />
        <Stack.Screen name="UploadBook" component={UploadBookScreen} />
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
