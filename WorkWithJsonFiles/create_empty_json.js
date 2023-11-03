import * as FileSystem from 'expo-file-system';

const create_empty_json = async function (name_of_json)
{
   await FileSystem.writeAsStringAsync(FileSystem.cacheDirectory + name_of_json, '{' + '}');
}

export default create_empty_json;