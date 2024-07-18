import React from "react";
import { CardContainer, CardText } from "./styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../../assets/colors/index";

interface IHomeCardProps {
  title?: string;
  action?: () => void;
  disabled?: boolean;
  icon?: string;
}

const HomeCard = ({
  title,
  action,
  disabled = false,
  icon,
}: IHomeCardProps) => {
  return (
    <CardContainer onPress={action} disabled={disabled}>
      {icon && (
        <Icon
          name={icon}
          size={42}
          color={Colors.primary.white}
          style={{ opacity: 0.35 }}
        />
      )}
      <CardText>{title}</CardText>
    </CardContainer>
  );
};

export default HomeCard;
