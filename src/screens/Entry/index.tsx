import React, { useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import {  Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Icon } from  "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { RadioButton } from "react-native-paper";
//db
import CashBookService from "../../database/services/CashBookService";
import EntryService from "../../database/services/EntryService";
//local
import { 
    Container, 
    Body,
    Spacer,
    Row, 
    InputsContainer,
    RadioText,
    RadioGroupContainer,
    RadioContainer,
    Input,
    TextStyled,
    AddBtn,
    DateBtn} from "./styles";
import Header from "../../components/Header";
import Colors from "../../../assets/colors";
import { Cashbook } from "../../database/models/Cashbook";

export enum EntryType{
    WITHDRAWAL = "WITHDRAWAL",
    ENTRY = "ENTRY"
}

function EntryScreen():JSX.Element{
//states------------------------------------------------------
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [number, setNumber] = useState('');
    const [type,setType] = useState(EntryType.ENTRY);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date(new Date().getTime()));
    const [show, setShow] = useState(false);

//------------------------------------------------------------
//inputs------------------------------------------------------

    const onChangeNumber = (inputValue)=>{
        const numericValue = inputValue.replace(/[^0-9]/g, '');
        const formattedValue = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        }).format(parseInt(numericValue) / 100);
        setNumber(formattedValue);
    }
    const onChangeType = (radioValue)=>{
        setType(radioValue)
    }
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };
//------------------------------------------------------------
//date-picker-------------------------------------------------

    const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    const formatDate = (date):string => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };
//------------------------------------------------------------
//CRUD--------------------------------------------------------



//------------------------------------------------------------
//useEffect---------------------------------------------------
    const fetchCashbookEntries = async (cdCashbook:number) =>{
        try{
            const entries = await EntryService.findByCdCashbook(cdCashbook);
            console.log(entries);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {

        const fetchLastCashbook = async () => {
            try{
                const lastCashbook:Cashbook = await CashBookService.findLastCashbook();
                if(lastCashbook){
                    fetchCashbookEntries(lastCashbook.id);
                }
            }catch(error){
                console.log("error->", error);
            }
        };

        fetchLastCashbook();

        // Cleanup function
        return () => {};
    }, []);
//------------------------------------------------------------
//------------------------------------------------------------
    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <Container>
            <Header
                title={t('entry')}
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
                <InputsContainer>
                    <Spacer/>
                    <Row style={{justifyContent:'space-around',alignItems:'center'}}>
                        <Input 
                            style={{flex:0.5,marginRight:10}}
                            value={number}
                            placeholder="R$ 0,00"
                            keyboardType="numeric" 
                            onChangeText={onChangeNumber}
                            enablesReturnKeyAutomatically={true}
                        />
                        <Input 
                            style={{flex:0.5}}
                            value={description}
                            placeholder={t('description')}
                            onChangeText={setDescription}
                        />
                    </Row>
                    
                    <Row style={{justifyContent:'space-between',alignItems:'center'}}>
                        <View>

                        <DateBtn onPress={showDatepicker}>
                            <TextStyled>
                                {formatDate(date)}
                            </TextStyled>
                        </DateBtn>
                        </View>
                        <RadioButton.Group onValueChange={onChangeType} value={type}>
                            <RadioGroupContainer>
                                <RadioContainer>
                                    <RadioText>{t('entry-2')}</RadioText>
                                    <RadioButton value={EntryType.ENTRY} color={Colors.primary.gray}/>
                                </RadioContainer>
                                <RadioContainer>
                                    <RadioText>{t('withdrawal')}</RadioText>
                                    <RadioButton value={EntryType.WITHDRAWAL} color={Colors.primary.gray}/>
                                </RadioContainer>
                            </RadioGroupContainer>
                        </RadioButton.Group>
                        <AddBtn >
                            <Icon  
                                name="add"
                                type='ionicon'
                                color={Colors.primary.green}
                                size={30}
                            />
                        </AddBtn>
                     </Row>
                </InputsContainer>
                <Spacer/>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        is24Hour={true}
                        onChange={onChange}
                    />
                )}
            </Body>
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default EntryScreen;