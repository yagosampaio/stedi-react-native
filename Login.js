import {useState} from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { TextInput } from "react-native-paper";

const sendText=(phoneNumber)=>{
    console.log("PhoneNumber: ", phoneNumber);
    fetch("https://dev.stedi.me/twofactorlogin/" + phoneNumber, {
        method: "POST",
        headers: {
            "content-type":"application/text"
        }
    });
}


const Login = (props) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [oneTimePassword, setOneTimePassword] = useState(null);

    const getToken = async () => {
        const tokenResponse = await fetch('https://dev.stedi.me/twofactorlogin',{
            method: 'POST',
            body:JSON.stringify({oneTimePassword, phoneNumber}),
            headers: {
                'content-type':'application/json'
            }
        });
    
    const tokenResponseString = await tokenResponse.text();
    
    console.log('Token Response String: ' + tokenResponseString)

    const emailResponse = await (await fetch('https://dev.stedi.me/validate/' + tokenResponseString)).text();

    console.log(emailResponse);

    if (tokenResponse.status == 200){
        props.setUserLoggedIn(true);
    }

}


    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                placeholder="208-970-3605"
                placeholderTextColor='#4251f5'
            />
            <TouchableOpacity
                style={styles.button}
                flex="0.8"
                onPress={()=>
                    {console.log('OTP button was clicked');
                    sendText(phoneNumber);
                }}     
            >
            <Text>Send One-Time Password</Text>
            </TouchableOpacity>
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
                    console.log("Code: " + oneTimePassword);
                    console.log('Verify if the OTP is correct');
                    getToken();
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