import styled from "styled-components/native";
import Colors from "../../../assets/colors";

export const MenuItemContainer = styled.View`
    flex: 1;
    flex-direction: row;
`;

export const MenuDescription = styled.Text`
    color: ${Colors.palette.textColor};
    font-size: 15px;
    text-transform: capitalize;

`;