import React from "react";
import { View } from "react-native";
import { CardContainer, CardText, RowContent, CardTitle, Row } from "./styles";

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
    <CardContainer onPress={action} disabled={disabled}>
      <View style={{ margin: 10 }}></View>
      <Row>{title && <CardTitle>{title}</CardTitle>}</Row>
      <RowContent>{balance && <CardText>{balance}</CardText>}</RowContent>
      <Row>
        <CardText>{date}</CardText>
      </Row>
    </CardContainer>
  );
};

export default TotalBalanceCard;
