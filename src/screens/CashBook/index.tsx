import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { TouchableWithoutFeedback, Keyboard, FlatList, StyleSheet } from 'react-native';
import {  SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from  "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from '@gorhom/bottom-sheet'
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

function CashBookScreen(): JSX.Element{
//states------------------------------------------------------  
    const [description,setDescription] = useState('');
    const [data, setData] = useState([]);
    const { t } = useTranslation();
    const navigation = useNavigation();
    const [registerToDel, setRegisterToDel] = useState('');
    const [registerToEdit, setRegisterToEdit] = useState('');
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['35%'], []);

//------------------------------------------------------------
//inputs------------------------------------------------------  
    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

//------------------------------------------------------------
//database----------------------------------------------------

    const saveCashBook  = async () => {
        try {
            //editar
            if(registerToEdit){
                const cashbook = data.find(el=> el.id == registerToEdit);
                if(cashbook !== undefined){
                    cashbook.description = description;
                    updateCashBook(registerToEdit,cashbook)
                    .then(cashbook => {
                        fetchData();
                    })
                    .catch( err => console.log(err));
                }
            }else{ //adicionar
                if(description){
                    CashBookService.create({description,createdAt:sqliteDateFormatter(new Date)})
                    .then(cashbook => {
                        fetchData();
                    })
                    .catch( err => console.log(err));
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally{
            setDescription("");
            setRegisterToEdit("");
        }
    };

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

    const deleteCashBook = async (id:string) => {
        try{
            CashBookService
            .remove(id)
            .then((res)=>{
                console.log(res);})
            .catch( err => console.log(err) )
        }catch(error){}
    }

    const updateCashBook = async (id:string, obj:any) =>{
        try{
            CashBookService
            .update(id, obj)
            .then((res)=>{
                console.log("updated --> ",res);})
            .catch( err => console.log(err) )
        }catch(error){}
    }

    useEffect(() => {
        fetchData();
    }, []);

//------------------------------------------------------------
//flatList----------------------------------------------------
   
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

    const handleEdit = (id:string) =>{
        setRegisterToEdit(id);
        const cashbook = data.find(el=>el.id == id);
        if(cashbook == undefined)
            return;
        setDescription(cashbook.description);
    }

//------------------------------------------------------------
//bottom-sheet------------------------------------------------

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
                                    icon='pencil'
                                    item={{key:item.id,value:item.description}}
                                    enableDelete={true}
                                    onDeleteAction={openDeleteWarnning}
                                    onIconAction={handleEdit}
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

export default CashBookScreen;