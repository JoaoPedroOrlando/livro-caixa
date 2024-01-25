import React, { useCallback, useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard, FlatList, Text, StyleSheet } from 'react-native';
import {  SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from  "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
//db
import CashBookService from '../../database/services/CashBookService';
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
//database----------------------------------------------------
// Define an async function inside useCallback

const saveCashBook  = async () => {
    try {
        console.log("description ===>",description);
        if(description.length > 0 ){
            console.log("entrou");
            CashBookService.create({description})
            .then(cashbook => {
                console.log("salvou!",cashbook);
                fetchData();
            })
            .catch( err => console.log(err) )
        }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchData = async () => {
    try {

        // CashBookService.removeAll()
        // .then(cashbooks => {
        //     console.log(cashbooks);
        // })
        // .catch( err => console.log(err) )

        CashBookService.all()
        .then(cashbooks => {
            console.log("buscou do banco:",cashbooks);
            setData(cashbooks);
        })
        .catch( err => console.log(err) )
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

useEffect(() => {
   fetchData();
  }, []);
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
                            onPress={saveCashBook}
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
                            renderItem={({item}) => <Text>{item.description}</Text>}
                            keyExtractor={item => item.id}
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