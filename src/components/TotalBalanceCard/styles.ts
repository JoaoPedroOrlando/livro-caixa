import styled from "styled-components/native";
import Colors from "../../../assets/colors";

export const CardContainer = styled.TouchableOpacity<{ disabled: boolean }>`
  height: 150px;
  flex: 0.7;
  background-color: ${(props) =>
    props.disabled ? Colors.disable.green : Colors.palette.btnBackground};
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  margin: 6px 3px;
`;

export const CardImage = styled.Image`
  height: 32px;
`;

export const CardText = styled.Text`
  flex: 1;
  margin-left: 7px;
  font-size: 15px;
  /* font-weight: 600; */
  color: ${Colors.primary.white};
`;

export const CardTitle = styled.Text`
  flex: 1;
  margin-left: 7px;
  font-size: 20px;
  font-weight: 400;
  color: ${Colors.primary.white};
`;

export const RowContent = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.primary.white};
`;

export const Row = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;
