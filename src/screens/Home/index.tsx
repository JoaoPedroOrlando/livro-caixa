import React, { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import { Modal, PaperProvider, Portal } from "react-native-paper";
import i18next from "i18next";
import { useNavigation } from "@react-navigation/native";
//local
import {
  Container,
  Body,
  ModalTitle,
  ModalText,
  Spacer,
  Row,
  Footer,
  Title,
} from "./styles";
import Header from "../../components/Header";
import Messages from "../../../assets/messages";
import Colors from "../../../assets/colors";
import HomeCard from "../../components/HomeCard";
import TotalBalanceCard from "../../components/TotalBalanceCard";

function HomeScreen(): JSX.Element {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [visible, setModalVisible] = React.useState(false);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  function changeLanguage(lng: string): void {
    i18next.changeLanguage(lng);
    setModalVisible(false);
  }

  return (
    <PaperProvider>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={modalContainerStyle}
        >
          <ModalTitle>{t("language")} :</ModalTitle>
          <TouchableOpacity onPress={() => changeLanguage("en")}>
            <ModalText>{t("english")}</ModalText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeLanguage("ptBr")}>
            <ModalText>{t("portuguese")}</ModalText>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeLanguage("es")}>
            <ModalText>{t("spanish")}</ModalText>
          </TouchableOpacity>
        </Modal>
      </Portal>
      <Container>
        <Header
          title={""}
          rightIcon={
            <Icon
              name="ellipsis-vertical"
              type="ionicon"
              color={Colors.palette.btnText}
            />
          }
          onRightIconPressed={showModal}
        />
        <Body>
          <Title>{Messages.appName}</Title>
          <Spacer />
          <Row>
            <TotalBalanceCard
              icon="book"
              title={t("entry")}
              action={() => {
                navigation.navigate("Entry");
              }}
              balance={`${t("balance")} 0,00R$`}
              date="12/03/2024"
            />
          </Row>
        </Body>
        <Footer>
          <Row>
            <HomeCard
              icon="plus"
              title={t("new-cash-book")}
              action={() => {
                navigation.navigate("CashBook");
              }}
            />
            <HomeCard
              icon="book"
              title={t("entry")}
              action={() => {
                navigation.navigate("Entry");
              }}
            />
          </Row>
        </Footer>
      </Container>
    </PaperProvider>
  );
}

const modalContainerStyle = {
  backgroundColor: Colors.primary.white,
  padding: 20,
  marginLeft: 20,
  marginRight: 20,
  borderRadius: 16,
};

export default HomeScreen;
