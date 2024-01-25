import React from 'react';
import { TouchableWithoutFeedback, Keyboard, FlatList, Text, StyleSheet } from 'react-native';
import {  SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from  "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
//local
import Header from '../../components/Header';
import { 
    Input,
    Container,
    Row,
    Body,
    AddBtn
 } from './styles';
 import Colors from "../../../assets/colors";

function CashBookScreen(): JSX.Element{
//inputs------------------------------------------------------  
//------------------------------------------------------------
const [description,setDescription] = useState('');
const [data, setData] = useState([]);
const addItemToList = () => {
    if (description.trim() !== '') {
        setData([...data, { key: getRandomHexCode(), value: description }]);
        setDescription('');
    }
}
const dismissKeyboard = () => {
    Keyboard.dismiss();
};

function getRandomHexCode() {
    // Generate a random number between 0 and 16777215 (0xFFFFFF in hexadecimal)
    const randomDecimal = Math.floor(Math.random() * 16777216);
  
    // Convert the decimal number to hexadecimal and remove the '0x' prefix
    const randomHex = randomDecimal.toString(16).toUpperCase();
  
    // Ensure the hexadecimal code is always 6 digits long by padding with zeros if needed
    return randomHex.padStart(6, '0');
  }
  
//navigation--------------------------------------------------
    const navigation = useNavigation();
//------------------------------------------------------------
//translate---------------------------------------------------
    const { t } = useTranslation();
//------------------------------------------------------------
//CRUD--------------------------------------------------------

//------------------------------------------------------------
    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <Container>
                <Header
                    title={t('new-cash-book')}
                    leftIcon={
                        <Icon name="chevron-back-outline"
                                type='ionicon'
                                color={Colors.primary.white}
                        />
                        }
                    onLeftIconPressed={()=>{
                        navigation.goBack();
                    }}
                />
                <Body>
                    <Row style={{justifyContent:'space-between'}}>
                        <Input
                            style={{flex:0.7}}
                            value={description}
                            placeholder={t('description')}
                            onChangeText={setDescription}
                        />
                        <AddBtn 
                            onPress={addItemToList}
                        >
                            <Icon  
                                name="add"
                                type='ionicon'
                                color={Colors.primary.green}
                                size={30}
                            />
                        </AddBtn>
                    </Row>
                    <SafeAreaView>
                        <FlatList
                            data={data}
                            renderItem={({item}) => <Text>{item.value}</Text>}
                            keyExtractor={item => item}
                        />
                    </SafeAreaView>
                </Body>
            </Container>
        </TouchableWithoutFeedback>
    );
};


const styles = StyleSheet.create({
    listItem: {
      fontSize: 18,
      marginVertical: 5,
    },
  });

export default CashBookScreen;