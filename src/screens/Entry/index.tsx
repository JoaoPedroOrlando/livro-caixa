import React from "react";
import { View } from "react-native";
import { Icon } from  "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
//local
import { Container, Body, Spacer, Row} from "./styles";
import Header from "../../components/Header";
import Colors from "../../../assets/colors";

function EntryScreen():JSX.Element{
    const navigation = useNavigation();
    const { t } = useTranslation();
    
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
            </Body>
        </Container>
    )
}

export default EntryScreen;