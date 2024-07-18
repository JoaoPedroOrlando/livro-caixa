import React from "react";
import { View } from "react-native";
import { CardContainer, CardText, RowContent, CardTitle, Row } from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../../assets/colors/index";
import { TouchableOpacity } from "react-native-gesture-handler";

interface ITotalBalanceCardProps {
  title?: string;
  balance?: string;
  action?: () => void;
  disabled?: boolean;
  icon?: string;
  date?: string;
}

const TotalBalanceCard = ({
  title,
  action,
  disabled = false,
  icon,
  balance,
  date,
}: ITotalBalanceCardProps) => {
  return (
    <CardContainer disabled={disabled}>
      <View style={{ margin: 10 }}></View>
      <Row>
        {title && <CardTitle>{title}</CardTitle>}
        {icon && (
          <TouchableOpacity onPress={action}>
            <Icon
              name={icon}
              style={{ marginRight: 10 }}
              size={32}
              color={Colors.primary.white}
            />
          </TouchableOpacity>
        )}
      </Row>
      <RowContent>{balance && <CardText>{balance}</CardText>}</RowContent>
      <Row>
        <CardText>{date}</CardText>
      </Row>
    </CardContainer>
  );
};

export default TotalBalanceCard;
