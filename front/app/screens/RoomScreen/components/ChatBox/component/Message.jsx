import { View, Text } from "react-native";
import React from "react";


export default function Message({ item, user }) {
    const status = item.user !== user;

    return (
        <View>
            <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  
                    <View
                        style={
                            status
                                ? {backgroundColor:'pink'}
                                :  { backgroundColor: "rgb(194, 243, 194)" }
                        }
                    >
                        {status?(<Text> {item.user}: {item.text}</Text>):(<Text>{user}: {item.text}</Text>)}
                        
                    </View>
                </View>
                <Text style={{ marginLeft: 40 }}>{item.time}</Text>
            </View>
        </View>
    );
}