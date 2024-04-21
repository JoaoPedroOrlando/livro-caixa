import React, { useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import {  FlatList, Keyboard, ToastAndroid, TouchableWithoutFeedback, View } from "react-native";
import { Icon } from  "@rneui/themed";
import { useTranslation } from "react-i18next";
import { RadioButton } from "react-native-paper";
//db
import CashBookService from "../../database/services/CashBookService";
import EntryService from "../../database/services/EntryService";
//local
import { 
    Container, 
    Body,
    Row, 
    InputsContainer,
    RadioText,
    RadioGroupContainer,
    RadioContainer,
    Input,
    TextStyled,
    AddBtn,
    DateBtn,
    ChangeCashbookBtn,
    ListContainer,
    Title,
    Footer,
    TotalText,
    TotalTextValue 
} from "./styles";
import Header from "../../components/Header";
import Colors from "../../../assets/colors";
import { Cashbook } from "../../database/models/Cashbook";
import { Entry, EntryTypeEnum } from "../../database/models/Entry";
import { sqliteDateFormatter } from "../../../assets/utils/SQLiteDateFormatter";
import { SafeAreaView } from "react-native-safe-area-context";
import EntryItem from "../../components/EntryItem";
import { formatNumberToCurrencyStr, formatStringToCurrencyStr } from "../../shared/helpers/currencyHelper";

function EntryScreen({ navigation, route }):JSX.Element{
//states------------------------------------------------------
    // const navigation = useNavigation();
    const { t } = useTranslation();
    const [value, setValue] = useState('');
    const [type,setType] = useState(EntryTypeEnum.INFLOW);
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date(new Date().getTime()));
    const [show, setShow] = useState(false);
    const [cashbook,setCashbook] = useState<Cashbook | null>(null);
    const [entries,setEntries] = useState<Entry[] >([]);
    const [updateOperationId,setUpdateOperationId] = useState < number | null >(null);
//------------------------------------------------------------
//inputs------------------------------------------------------

    const onChangeNumber = (inputValue)=>{
        setValue(formatStringToCurrencyStr(inputValue));
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
    const onSaveEntry = (): void => {
        if(updateOperationId !== null){
            updateEntry();
            setUpdateOperationId(null);
        }else{
            saveEntry();
        }
    }

    const onEditEntry = (entry:Entry): void => {
        setUpdateOperationId(entry.id);
        setDescription(entry.description);
        setDate(new Date(entry.dtrecord));
        setType(entry.type);
        setValue(formatStringToCurrencyStr(entry.value.toString()));
    }

    
    const saveEntry = async ():Promise<void> =>{
        try{
            const currencyValue = convertCurrencyStringToNumber(value);
            if(
                cashbook == null ||
                currencyValue == null ||
                description.trim() == '' ||
                date == null
            ){
                showToast(t('incomplete-data'))
                return;
            }
            const entry:Entry = {
                description,
                createdat:sqliteDateFormatter(date),
                dtrecord: sqliteDateFormatter(date),
                value: currencyValue,
                type,
                cdcashbook: cashbook.id
            }
            EntryService.create(entry).then(res=>{
                resetInputs();
                fetchCashbookEntries(cashbook.id);
            }).catch(error =>{ console.log(error)})
        }catch(error){
            showToast(t('error-saving'));
        }
        
    }

    const updateCashbookAfterSelection = async(cashbook:Cashbook): Promise<void> => {
        try{
            CashBookService.update(cashbook.id,cashbook).then((res)=>{});
        }catch(error){

        }
    }

    const updateEntry = async():Promise<void> => {
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
                id: updateOperationId,
                description,
                createdat:sqliteDateFormatter(date),
                dtrecord: sqliteDateFormatter(date),
                value: currencyValue,
                type,
                cdcashbook: cashbook.id
            }
            EntryService.update(entry.id,entry).then(res=>{
                resetInputs();
                fetchCashbookEntries(cashbook.id);
            }).catch(error =>{ console.log(error)})
        }catch(error){
            showToast(t('error-saving'));
        }
    }

    const resetInputs = ():void => {
        setDate(new Date());
        setDescription('');
        setValue(formatStringToCurrencyStr("0"));
        setType(EntryTypeEnum.INFLOW);
    }

    const fetchSelectedCashbook = async (id:string):Promise<void> => {
        try{
            const cashbook:Cashbook = await CashBookService.find(parseInt(id));
            if(cashbook){
                console.log(cashbook)
                setCashbook(cashbook);
                fetchCashbookEntries(cashbook.id);
                updateCashbookAfterSelection(cashbook);
            }
        }catch(error){
            console.log("error->", error);
        }
    };

    const deleteEntry = async (id:number):Promise<void> => {
        try{
            EntryService
            .remove(id)
            .then((res)=>{
                console.log("Entry deleted ->",res);
                fetchCashbookEntries(cashbook.id);
            })
            .catch( err => console.log(err) )
        }catch(error){}
    }

//------------------------------------------------------------
//useEffect---------------------------------------------------
    const fetchCashbookEntries = async (cdCashbook:number) =>{
        try{
            const entries = await EntryService.findByCdCashbook(cdCashbook);
            setEntries(entries);
        }catch(error){
            setEntries([]);
            console.log(error);
        }
    }

    useEffect(() => {

        const fetchLastCashbook = async ():Promise<void> => {
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

    useEffect(() => {
        if(route.params?.selectedCashBookId){
            fetchSelectedCashbook(route.params?.selectedCashBookId);
        }
    }, [route.params?.selectedCashBookId]);

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
        const normalizedString = cleanedString.replace(/\./g, '').replace(',', '.');
        const numberValue = parseFloat(normalizedString);
        return numberValue;
    }catch(erro){
        return null;
    }

}

const fetchTotal = (): number => {
    return entries.reduce((total,entry)=>{ 
        if(entry.type === EntryTypeEnum.INFLOW){
            return total + entry.value;
        }else {
            return total - entry.value;
        }
    },0);
}

const getFormatedTotalValue = (): string => {
    return formatNumberToCurrencyStr(fetchTotal());
}

const navigateToSelectionCashbook = () => {
    navigation.navigate('CashBookSelection');
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
                    {
                        cashbook ? <Row> 
                            <Title> { cashbook.description } </Title>
                            <ChangeCashbookBtn
                                onPress={navigateToSelectionCashbook}
                            >
                                <Icon  
                                    name="caret-forward-outline"
                                    type='ionicon'
                                    color={Colors.primary.gray}
                                    size={20}
                                />
                            </ChangeCashbookBtn>
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
                            onPress={onSaveEntry}
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
                <ListContainer>
                    <SafeAreaView>
                        <FlatList
                            horizontal={false} 
                            data={entries}
                            renderItem={({item}) => {
                                return <EntryItem
                                    item={item}
                                    enableDelete={true}
                                    onPress={()=>{}}
                                    onDeleteAction={deleteEntry}
                                    onEditAction={onEditEntry}
                                    onLongPress={()=>{}}
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
            <Footer>
                <Row>
                <TotalText>
                    Total:{" "}
                </TotalText>
                <TotalTextValue value={fetchTotal()}>
                {getFormatedTotalValue()}
                </TotalTextValue>
                </Row>
            </Footer>
        </Container>
        </TouchableWithoutFeedback>
    )
}

export default EntryScreen;