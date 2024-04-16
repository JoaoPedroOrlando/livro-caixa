import React, { useCallback, useEffect} from 'react';
import { TouchableWithoutFeedback, Keyboard, FlatList, Text} from 'react-native';
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
    AddBtn,
    SheetContainer,
    WarnningText,
    DeleteBtn,
    DeleteBtnText
 } from './styles';
import Colors from "../../../assets/colors";
import SimpleListItem from '../../components/SimpleListItem';
import { Spacer } from '../Home/styles';
import {sqliteDateFormatter} from '../../../assets/utils/SQLiteDateFormatter';

function CashBookSelectionScreen(): JSX.Element{
//states------------------------------------------------------  
    const [description,setDescription] = useState('');
    const [data, setData] = useState([]);
    const { t } = useTranslation();
    const navigation = useNavigation();

//------------------------------------------------------------
//inputs------------------------------------------------------  
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

//------------------------------------------------------------
//database----------------------------------------------------

    const fetchData = async () => {
        try {
            CashBookService.all()
            .then(cashbooks => {
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
//flatList----------------------------------------------------
   

//------------------------------------------------------------
//bottom-sheet------------------------------------------------

//------------------------------------------------------------
//------------------------------------------------------------

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <Container>
                <Header
                    title={t('cash-book-selection')}
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
                    <SafeAreaView>
                        <FlatList
                            data={data}
                            renderItem={({item}) => {
                                return <>
                                    <Text>{item.desction}</Text>
                                </>
                            }}
                            keyExtractor={item => item.id}
                        />
                    </SafeAreaView>
                </Body>
            </Container>
        </TouchableWithoutFeedback>
    );
};

export default CashBookSelectionScreen;