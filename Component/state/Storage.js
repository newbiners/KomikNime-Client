import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('token', jsonValue);
      } catch (e) {
        console.log('Error saving data: ', e);
      }
  };

export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('token');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log(e)
    }
  };


export const removeData = async () => {
  try{
    await AsyncStorage.removeItem('token');
    return "data telah terhapus"
  }catch(error) {
    console.log(error)
  }
}