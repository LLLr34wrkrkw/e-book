import * as FileSystem from 'expo-file-system';

const delete_key_from_json =  async function(key, name_of_json = 'filesForPdf.json'){
    const path_to_json = FileSystem.cacheDirectory + name_of_json;
    const json_string = await FileSystem.readAsStringAsync(path_to_json);
    const ind_of_key = json_string.indexOf(key);
    
    if(ind_of_key != -1)
    {
        const ind_of_comma = json_string.indexOf(',', ind_of_key);

        if(ind_of_comma == -1)
        {
            if(json_string[ind_of_key - 1] == ',')
            {
                await FileSystem.writeAsStringAsync(path_to_json, json_string.substring(0, ind_of_key - 1) + '}');
            }
            else{
                await FileSystem.writeAsStringAsync(path_to_json, '{' + '}');
            }
        }
        else{
            await FileSystem.writeAsStringAsync(path_to_json , json_string.substring(0, ind_of_key) + json_string.substring(ind_of_comma + 1))
        }
    }
}

export default delete_key_from_json;