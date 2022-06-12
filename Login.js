import {useState} from "react";
import { SafeAreaView } from "react-native";
import { TextInput } from "react-native-paper";

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
            />
            <TextInput
                style={styles.input}
                onChangeText={setOneTimePassword}
                value={oneTimePassword}
                placeholder="1234"
                keyboardType="numeric"
                secureTextEntry={true}
                />
        </SafeAreaView>
    );
};