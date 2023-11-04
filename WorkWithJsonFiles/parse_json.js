import * as FileSystem from 'expo-file-system';

const parse_json =  async function(name_of_json = 'filesForPdf.json')
{

      const json_string = await FileSystem.readAsStringAsync(FileSystem.cacheDirectory + name_of_json);
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

export default parse_json;