import styled from "styled-components/native";
import Colors from "../../../assets/colors";

export const CardContainer = styled.TouchableOpacity<{ disabled: boolean }>`
  height: 100px;
  flex-basis: 47.5%;
  background-color: ${props => (props.disabled ? Colors.disable.green : Colors.primary.green)};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  margin: 6px 3px;
`;

export const CardImage = styled.Image`
  height: 64px;
`;

export const CardText = styled.Text`
  margin-top: 8px;
  font-size: 13px;
  font-weight: 600;
  color: ${Colors.primary.white};
`;
