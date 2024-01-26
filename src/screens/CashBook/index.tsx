import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { TouchableWithoutFeedback, Keyboard, FlatList, Text, StyleSheet } from 'react-native';
import {  SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from  "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetTextInput } from '@gorhom/bottom-sheet'
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

function CashBookScreen(): JSX.Element{
//inputs------------------------------------------------------  
//------------------------------------------------------------
    const [description,setDescription] = useState('');
    const [data, setData] = useState([]);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

//navigation--------------------------------------------------
    const navigation = useNavigation();

//------------------------------------------------------------
//translate---------------------------------------------------
    const { t } = useTranslation();

//------------------------------------------------------------
//database----------------------------------------------------

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
        } finally{
            setDescription("");
        }
    };

    const fetchData = async () => {
        try {
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

    const deleteCashBook = async (id:string) => {
        try{
            CashBookService
            .remove(id)
            .then((res)=>{
                console.log(res);})
            .catch( err => console.log(err) )
        }catch(error){}
    }

    useEffect(() => {
        fetchData();
    }, []);

//------------------------------------------------------------
//FlatList----------------------------------------------------
    const [registerToDel, setRegisterToDel] = useState('');

    const openDeleteWarnning = (key:string)=>{
        setRegisterToDel(key);
        handleOpeningSheet();
    }

    const handleDelete = ()=>{
        try{
            deleteCashBook(registerToDel)
        }catch(error){

        } finally{
            fetchData();
            setTimeout(()=>{},1000);
            handleClosingSheet();
        }
    }
//------------------------------------------------------------
//bottom-sheet------------------------------------------------
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['35%'], []);
    const [sheetIndex,setSheetIndex] = useState(0);
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
                            renderItem={({item}) => {
                                return <SimpleListItem
                                    item={{key:item.id,value:item.description}}
                                    enableDelete={true}
                                    onDeleteAction={openDeleteWarnning}
                                />
                            }}
                            keyExtractor={item => item.id}
                        />
                    </SafeAreaView>
                </Body>
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    enablePanDownToClose={true}
                >
                    <SheetContainer>
                        <WarnningText>
                            {t('want-to-delete')}
                        </WarnningText>
                        <Spacer/>
                        <Row style={{justifyContent:'center'}}>
                            <DeleteBtn
                                onPress={handleDelete}
                            >
                                <DeleteBtnText>
                                    {t('delete')}
                                </DeleteBtnText>
                            </DeleteBtn>
                        </Row>
                    </SheetContainer>
                </BottomSheet>
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