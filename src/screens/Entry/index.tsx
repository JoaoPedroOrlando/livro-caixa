import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import {  StyleSheet, Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Icon } from  "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { RadioButton } from "react-native-paper";
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
    AddBtn} from "./styles";
import Header from "../../components/Header";
import Colors from "../../../assets/colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export enum EntryType{
    WITHDRAWAL = "WITHDRAWAL",
    ENTRY = "ENTRY"
}

function EntryScreen():JSX.Element{
//navigation--------------------------------------------------
    const navigation = useNavigation();
//------------------------------------------------------------
//translate---------------------------------------------------
    const { t } = useTranslation();
//------------------------------------------------------------
//bottom-sheet------------------------------------------------
    // const bottomSheetRef = useRef<BottomSheet>(null);
    // const snapPoints = useMemo(() => ['25%'], []);
    // const [sheetIndex,setSheetIndex] = useState(0);
    // const handleSheetChanges = useCallback((index: number) => {
    //     // console.log('handleSheetChanges', index);
    // }, []);
    // const handleClosingSheet = ()=>{
    //     bottomSheetRef.current?.close();
    // }
    // const handleOpeningSheet = ()=>{
    //     bottomSheetRef.current?.expand();
    // }
//------------------------------------------------------------
//inputs------------------------------------------------------
    const [number, setNumber] = useState('');
    const [type,setType] = useState(EntryType.ENTRY);
    const [description, setDescription] = useState('');

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
    const [date, setDate] = useState(new Date(new Date().getTime()));
    const [show, setShow] = useState(false);

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
                    
                    <Row style={{justifyContent:'space-evenly',alignItems:'center',borderColor:'black',borderWidth:1}}>
                        <View>

                        <TouchableOpacity onPress={showDatepicker} style={{borderRadius:10}}>
                            <TextStyled>
                                {formatDate(date)}
                            </TextStyled>
                        </TouchableOpacity>
                        </View>
                        <RadioButton.Group onValueChange={onChangeType} value={type}>
                            <RadioGroupContainer>
                                <RadioContainer>
                                    <RadioText>{t('entry')}</RadioText>
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

const styles = StyleSheet.create({
    input: {
      marginTop: 8,
      marginBottom: 10,
      borderRadius: 10,
      fontSize: 16,
      lineHeight: 20,
      padding: 8,
      backgroundColor: Colors.primary.lightGray,
      minWidth:150,
      marginHorizontal:10
    },
  });

export default EntryScreen;