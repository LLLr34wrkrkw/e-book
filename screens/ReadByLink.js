import { Button } from 'react-native';
import { useState } from 'react';
import WebView from 'react-native-webview';

// ...
export default function  ReadByLink  ({route}){
  const [renderedOnce, setRenderedOnce] = useState(false);

  const updateSource = () => {
      setRenderedOnce(true);
   };
  
  return(<WebView
    originWhitelist={['*']}
    allowFileAccess={true}
    source={{uri: "https://www.nytimes.com/live/2023/11/03/world/israel-hamas-war-gaza-news" }}
    domStorageEnabled={true}
    allowUniversalAccessFromFileURLs={true}
    allowFileAccessFromFileURLs={true}
  />)
}