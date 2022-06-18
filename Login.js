import {useState} from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { TextInput } from "react-native-paper";

const sendText=(phoneNumber)=>{
    console.log("PhoneNumber: ", phoneNumber);
    await fetch("https://dev.stedi.me/twofactorlogin/" + phoneNumber, {
        method: "POST",
        headers: {
            "content-type":"application/text"
        }
    });
}

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [oneTimePassword, setOneTimePassword] = useState(null);

    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                placeholder="208-970-3605"
                placeholderTextColor='#4251f5'
            />
            <TextInput
                style={styles.input}
                onChangeText={setOneTimePassword}
                value={oneTimePassword}
                placeholder="1234"
                keyboardType="numeric"
                placeholderTextColor='#4251f5'
                secureTextEntry={true}
                />
            <TouchableOpacity
                style={styles.button}
                onPress={()=>
                    {console.log('Login button was clicked');
                    sendText(phoneNumber);
                }}     
            >
            <Text>Login</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    margin:{
        marginTop:100
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding:10
    }
});

export default Login;