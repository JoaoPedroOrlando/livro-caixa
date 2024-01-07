import React, { useCallback, useMemo, useRef, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { View,Text, StyleSheet } from "react-native";
import { Icon } from  "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Button, RadioButton } from "react-native-paper";
//local
import { Container, Body, Spacer, Row, SheetContainer, Footer} from "./styles";
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
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['20%'], []);
    const handleSheetChanges = useCallback((index: number) => {
        // console.log('handleSheetChanges', index);
    }, []);
    const handleClosingSheet = ()=>{
        bottomSheetRef.current?.close();
    }
    const handleOpeningSheet = ()=>{
        bottomSheetRef.current?.expand();
    }
//------------------------------------------------------------
//inputs------------------------------------------------------
    const [number, setNumber] = useState('');
    const [type,setType] = useState(EntryType.ENTRY);
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

    }
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
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose={false}
            >
                <SheetContainer>
                    <Row>
                        <BottomSheetTextInput 
                            value={number}
                            placeholder="R$ 0,00"
                            keyboardType="numeric" 
                            style={styles.input} 
                            onChangeText={onChangeNumber}
                        />
                        <TouchableOpacity onPress={showDatepicker}>
                            <BottomSheetTextInput 
                                value={formatDate(date)}
                                placeholder=""
                                editable={false}
                                style={styles.input} 
                            />
                        </TouchableOpacity>
                    </Row>
                    <Row>
                        <RadioButton.Group onValueChange={onChangeType} value={type}>
                            <View>
                                <Text>{t('entry')}</Text>
                                <RadioButton value={EntryType.ENTRY} />
                            </View>
                            <View>
                                <Text>{t('withdrawal')}</Text>
                                <RadioButton value={EntryType.WITHDRAWAL} />
                            </View>
                        </RadioButton.Group>
                    </Row>
                </SheetContainer>
            </BottomSheet>
        </Container>
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
      backgroundColor: 'rgba(151, 151, 151, 0.25)',
      minWidth:150,
      marginHorizontal:10
    },
  });

export default EntryScreen;