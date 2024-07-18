import React, { useEffect, useState, useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { Icon } from "@rneui/themed";
import { Modal, PaperProvider, Portal } from "react-native-paper";
import i18next from "i18next";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
//db
import CashBookService from "../../database/services/CashBookService";
import EntryService from "../../database/services/EntryService";
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
import { Cashbook } from "../../database/models/Cashbook";
import { Entry, EntryTypeEnum } from "../../database/models/Entry";
import { formatStrDate } from "../../shared/helpers/dateHelper";
import { formatNumberToCurrencyStr } from "../../shared/helpers/currencyHelper";

function HomeScreen(): JSX.Element {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [visible, setModalVisible] = useState(false);

  const [cashbook, setCashbook] = useState<Cashbook | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [balance, setBalance] = useState<string>(null);
  const [lastEntry, setLastEntry] = useState<string>(null);

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  function changeLanguage(lng: string): void {
    i18next.changeLanguage(lng);
    setModalVisible(false);
  }

  const fetchLastCashbook = async (): Promise<void> => {
    try {
      const lastCashbook: Cashbook = await CashBookService.findLastCashbook();
      if (lastCashbook) {
        setCashbook(lastCashbook);
        fetchCashbookEntries(lastCashbook.id);
      }
    } catch (error) {
      console.log("error->", error);
    }
  };

  const fetchCashbookEntries = async (cdCashbook: number) => {
    try {
      const entries = await EntryService.findByCdCashbook(cdCashbook);
      await fetchLastEntryDate(cdCashbook);
      if (entries) {
        //console.log(entries);
        setEntries(entries);
        const total = formatNumberToCurrencyStr(fetchTotal(entries));
        //console.log(total);
        setBalance(total.toString());
      }
    } catch (error) {
      setEntries([]);
      console.log(error);
    }
  };

  const fetchLastEntryDate = async (cdCashbook: number) => {
    try {
      const date = await EntryService.findLastDtrecordByCdCashbook(cdCashbook);
      if (date) {
        const dateStr = formatStrDate(date[0]["dtrecord"]);
        setLastEntry(dateStr);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTotal = (entries: Entry[]): number => {
    return entries.reduce((total, entry) => {
      if (entry.type === EntryTypeEnum.INFLOW) {
        return total + entry.value;
      } else {
        return total - entry.value;
      }
    }, 0);
  };

  useFocusEffect(
    useCallback(() => {
      fetchLastCashbook();
      return () => {};
    }, [navigation])
  );

  useEffect(() => {
    fetchLastCashbook();
    return () => {};
  }, []);

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
            {balance && lastEntry && (
              <TotalBalanceCard
                icon="book"
                title={t("entry")}
                action={() => {
                  navigation.navigate("Entry");
                }}
                balance={`${t("balance")}: ${balance}`}
                date={`${t("last-entry")}: ${lastEntry}`}
              />
            )}
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
