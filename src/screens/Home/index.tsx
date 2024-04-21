import React from "react";
import {TouchableOpacity} from "react-native";
import { useTranslation } from 'react-i18next';
import { Icon } from  "@rneui/themed";
import {Modal, PaperProvider, Portal } from "react-native-paper";
import i18next from "i18next";
import { useNavigation } from "@react-navigation/native";
//local
import { Container, Body, ModalTitle, ModalText, Spacer, Row } from "./styles";
import Header from "../../components/Header";
import Meassages from "../../../assets/messages";
import Colors from "../../../assets/colors";
import HomeCard from "../../components/HomeCard";

function HomeScreen(): JSX.Element {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const [visible, setModalVisible] = React.useState(false);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    function changeLanguage(lng:string):void{
        i18next.changeLanguage(lng);
        setModalVisible(false);
    }

    return(
        <PaperProvider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={modalContainerStyle}>
                    <ModalTitle>{t('language')} :</ModalTitle>
                    <TouchableOpacity onPress={()=>changeLanguage('en')}>
                        <ModalText>{t('english')}</ModalText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>changeLanguage('ptBr')}>
                        <ModalText>{t('portuguese')}</ModalText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>changeLanguage('es')}>
                        <ModalText>{t('spanish')}</ModalText>
                    </TouchableOpacity>
                </Modal>
            </Portal>
            <Container>
                <Header
                    title={Meassages.appName}
                    rightIcon={
                        <Icon name="ellipsis-vertical"
                            type='ionicon'
                            color={Colors.primary.white}
                        />
                    }
                    onRightIconPressed={showModal}
                />
                <Body>
                    <Spacer/>
                    <Row>
                        <HomeCard
                            icon="book"
                            title={t('entry')} 
                            action={() => {
                                navigation.navigate('Entry');
                              }}                           
                        />
                        <HomeCard
                            icon="plus"
                            title={t('new-cash-book')} 
                            action={() => {
                                navigation.navigate('CashBook');
                              }}                           
                        />
                    </Row>
                </Body>
            </Container>
        </PaperProvider>
    )
}

const modalContainerStyle = {
    backgroundColor: Colors.primary.white, 
    padding: 20,
    marginLeft:20,
    marginRight:20,
    borderRadius: 16
};

export default HomeScreen;