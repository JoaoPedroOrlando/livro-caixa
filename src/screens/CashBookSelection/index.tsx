import React, { useEffect} from 'react';
import { TouchableWithoutFeedback, Keyboard, FlatList} from 'react-native';
import {  SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from  "@rneui/themed";
//db
import CashBookService from '../../database/services/CashBookService';
//local
import Header from '../../components/Header';
import { 
    Container,
    Body,
 } from './styles';
import Colors from "../../../assets/colors";
import SimpleListItem from '../../components/SimpleListItem';

function CashBookSelectionScreen({ route, navigation }): JSX.Element{
//states------------------------------------------------------  
    const [data, setData] = useState([]);
    const { t } = useTranslation();

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
                console.log("Cashbooks-> ",cashbooks)
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
//helpers ----------------------------------------------------

    const handleSelection = (id:string) =>{
        navigation.navigate({
            name: 'Entry',
            params: { selectedCashBookId: id },
            merge: true,
        });
    }
    
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
                    <SafeAreaView style={{flex:1}}>
                        <FlatList
                            data={data}
                            renderItem={({item}) => {
                                return <SimpleListItem
                                    icon='check'
                                    onIconAction={handleSelection} 
                                    item={{key:item.id,value:item.description}}                                />
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