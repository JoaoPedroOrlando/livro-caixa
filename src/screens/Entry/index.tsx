import React, { useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import {  FlatList, Keyboard, ToastAndroid, TouchableWithoutFeedback, View } from "react-native";
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
    DateBtn,
    ListContainer,
    Title
} from "./styles";
import Header from "../../components/Header";
import Colors from "../../../assets/colors";
import { Cashbook } from "../../database/models/Cashbook";
import { Entry, EntryTypeEnum } from "../../database/models/Entry";
import { sqliteDateFormatter } from "../../../assets/utils/SQLiteDateFormatter";
import { SafeAreaView } from "react-native-safe-area-context";
import EntryItem from "../../components/EntryItem";

function EntryScreen():JSX.Element{
//states------------------------------------------------------
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const [type,setType] = useState(EntryTypeEnum.INFLOW);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date(new Date().getTime()));
    const [show, setShow] = useState(false);
    const [cashbook,setCashbook] = useState<Cashbook | null>(null);
    const [entries,setEntries] = useState<Entry[] | []>([]);
//------------------------------------------------------------
//inputs------------------------------------------------------

    const onChangeNumber = (inputValue)=>{
        const numericValue = inputValue.replace(/[^0-9]/g, '');
        const formattedValue = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2,
        }).format(parseInt(numericValue) / 100);
        setValue(formattedValue);
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

    const saveEntry = async ()=>{
        try{
            const currencyValue = convertCurrencyStringToNumber(value);
            if(
                cashbook == null ||
                currencyValue == null ||
                description == '' ||
                date == null
            ){
                showToast(t('incomplete-data'))
                return;
            }
            const entry:Entry = {
                description,
                createdAt:sqliteDateFormatter(date),
                dtRecord: sqliteDateFormatter(date),
                value: currencyValue,
                type,
                cdCashbook: cashbook.id
            }
            EntryService.create(entry).then(res=>{
                console.log("Save->",res)
            }).catch(error =>{ console.log(error)})
        }catch(error){
            showToast(t('error-saving'));
        }
        
    }

//------------------------------------------------------------
//useEffect---------------------------------------------------
    const fetchCashbookEntries = async (cdCashbook:number) =>{
        try{
            const entries = await EntryService.findByCdCashbook(cdCashbook);
            setEntries(entries);
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
                    setCashbook(lastCashbook);
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
//helpers-----------------------------------------------------

const showToast = (msg:string) => {
    ToastAndroid.showWithGravity(
        t(msg),
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
    );
  };

const convertCurrencyStringToNumber = (currencyString: string): number =>{
    try{
        const cleanedString = currencyString.replace(/[^\d.,]/g, '');
        const dotFormattedString = cleanedString.replace(',', '.');
        const numberValue = parseFloat(dotFormattedString);
        return numberValue;
    }catch(erro){
        return null;
    }

}

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
                    {
                        cashbook ?<Row> 
                            <Title> { cashbook.description } </Title>
                        </Row>
                        :null
                    }
                    <Row style={{justifyContent:'space-around',alignItems:'center'}}>
                        <Input 
                            style={{flex:0.5,marginRight:10}}
                            value={value}
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
                                    <RadioButton value={EntryTypeEnum.INFLOW} color={Colors.primary.gray}/>
                                </RadioContainer>
                                <RadioContainer>
                                    <RadioText>{t('withdrawal')}</RadioText>
                                    <RadioButton value={EntryTypeEnum.OUTFLOW} color={Colors.primary.gray}/>
                                </RadioContainer>
                            </RadioGroupContainer>
                        </RadioButton.Group>
                        <AddBtn 
                            onPress={saveEntry}
                        >
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
                <ListContainer>
                    <SafeAreaView>
                        <FlatList
                            data={entries}
                            renderItem={({item}) => {
                                return <EntryItem
                                    item={item}
                                    enableDelete={true}
                                    onPress={()=>{console.log("Fui clicado")}}
                                    onDeleteAction={()=>{}}
                                    onIconAction={()=>{}}
                                    onLongPress={()=>{console.log("Long press")}}
                                />
                            }}
                            keyExtractor={item => item.id.toString()}
                        />
                    </SafeAreaView>
                </ListContainer>
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