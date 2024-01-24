import React from 'react';
import { TouchableWithoutFeedback, Keyboard, FlatList, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from  "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { database } from '../../database/index';
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
import { CashBookModel } from '../../database/models/CashBook';

function CashBookScreen(): JSX.Element{
//inputs------------------------------------------------------  
//------------------------------------------------------------
const [description,setDescription] = useState('');
const [data, setData] = useState([]);
const addItemToList = () => {
    if (description.trim() !== '') {
        setData([...data, { key: String(data.length), value: description }]);
        setDescription('');
    }
}
const dismissKeyboard = () => {
    Keyboard.dismiss();
};    

//navigation--------------------------------------------------
    const navigation = useNavigation();
//------------------------------------------------------------
//translate---------------------------------------------------
    const { t } = useTranslation();
//------------------------------------------------------------
//CRUD--------------------------------------------------------

    async function saveCashBook():Promise<void>{
        try{
            const response = await database.get<CashBookModel>('cashbook').create(cashbook => cashbook.description = description);
            console.log('Salvou!',response);
        }catch(error){
            console.log('Error',error);
        }
    }

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
                    <FlatList
                        data={data}
                        renderItem={({ item }) => <Text style={styles.listItem}>{item.value}</Text>}
                        keyExtractor={(item) => item.key}
                    />
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