import React from "react";
import {View, Text, TouchableOpacity} from "react-native";
//libs
import { useTranslation } from 'react-i18next';
import { Icon } from  "@rneui/themed";
import {Modal, PaperProvider, Portal } from "react-native-paper";
//local
import { Container, Body, ModalTitle, ModalText } from "./styles";
import Header from "../../components/Header/Header";
import Meassages from "../../../assets/messages";
import Colors from "../../../assets/colors";

function HomeScreen(): JSX.Element {
    const { t } = useTranslation();
    const [visible, setModalVisible] = React.useState(false);

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    return(
        <PaperProvider>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <ModalTitle>{t('language')} :</ModalTitle>
                    <TouchableOpacity>
                        <ModalText>{t('english')}</ModalText>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <ModalText>{t('portuguese')}</ModalText>
                    </TouchableOpacity>
                    <TouchableOpacity>
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
                    <View>
                        {/* <Text>{t('welcome')}</Text> */}
                    </View>
                </Body>
            </Container>
        </PaperProvider>
    )
}

const containerStyle = {
    backgroundColor: Colors.primary.white, 
    padding: 20,
    marginLeft:20,
    marginRight:20,
    borderRadius: 16
};

export default HomeScreen;