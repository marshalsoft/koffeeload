import { NativeModules } from 'react-native';
const {RNBlueTooth} = NativeModules;

export function AESencryptData(data,key,i)
{
    return RNBlueTooth.AESencryption(data,key,i);
};
export function AESdecryptData(data,key,i)
{
    return RNBlueTooth.AESdecryption(data,key,i);
};





