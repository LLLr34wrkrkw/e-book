import * as FileSystem from 'expo-file-system';

const add_to_json = async function(arr, name_of_json = 'files.json')
{
  const json_ = await FileSystem.readAsStringAsync(FileSystem.cacheDirectory + name_of_json);
  await FileSystem.writeAsStringAsync(FileSystem.cacheDirectory + name_of_json, json_.substring(0, json_.length - 1) + ',' + `${arr[0]}` + ':' + `${arr[1]}` + '}');

  /*
  json_dict[arr[0]] =  arr[1];
  const tmp_arr = [];
  for (let item of Object.entries(json_dict)) {
      tmp_arr.push(item.join(':'));
    }
  const recording_string = '{' + tmp_arr.join(',') + '}';
  await FileSystem.writeAsStringAsync(FileSystem.cacheDirectory + 'files.json', recording_string);
    */
}

export default add_to_json;

