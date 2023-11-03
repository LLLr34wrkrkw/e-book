import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
export default function  ReadByLink  ({route}){
  return <WebView source={{ uri: 'https:' + route.params.paramKey }} style={{ flex: 1 }} />;
}