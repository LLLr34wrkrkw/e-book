import { Button, Platform } from 'react-native';
import { useState } from 'react';
import WebView from 'react-native-webview';

// ...
export default function  ReadByLink  ({route}){
  const [renderedOnce, setRenderedOnce] = useState(false);

  const updateSource = () => {
      setRenderedOnce(true);
   };
  if(Platform.OS == 'android')
  {
    console.log(route.params.paramKey);
    return(<WebView
      originWhitelist={['*']}
      allowFileAccess={true}
      source={{uri:  'file:' + route.params.paramKey}}
      domStorageEnabled={true}
      allowUniversalAccessFromFileURLs={true}
      allowFileAccessFromFileURLs={true}
    />)
  }
  else{
    return(<WebView
      originWhitelist={['*']}
      allowFileAccess={true}
      source={{uri: 'https:' + route.params.paramKey}}
      domStorageEnabled={true}
      allowUniversalAccessFromFileURLs={true}
      allowFileAccessFromFileURLs={true}
    />)
  }
}