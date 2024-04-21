import styled from "styled-components/native";
import Colors from "../../../assets/colors";
import { EntryTypeEnum } from "../../database/models/Entry";

export const ItemContainer = styled.Pressable`
    /* height: 50px; */
    margin-bottom: 10px;
    /* border-radius: 10px; */
    font-size: 16px;
    line-height: 20px;
    padding: 8px;
    /* background-color: ${Colors.palette.input};   */
    /* border: 1px solid black; */
    border-bottom-width: 1px;
    border-color: ${Colors.primary.lightGray};
    
`;
export const Row = styled.View`
    display: flex;
    flex-direction: row;
`;

export const TextContainer = styled.View`
    flex:0.8;
    margin-left: 10px;
    justify-content: center;
    /* border: 1px solid black; */
`;

export const Description = styled.Text<{type:EntryTypeEnum}>`
    color: ${(props) => props.type === EntryTypeEnum.INFLOW ? Colors.primary.gray : Colors.primary.gray};
    text-transform: capitalize;
    font-weight: 500;
    font-size: 16px;
    /* border: 1px solid blue; */
`;

export const IconContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;

export const CheckIcon = styled.TouchableOpacity`
    margin-left: 5px;
`;

export const CashText = styled.Text<{type:EntryTypeEnum}>`
    color: ${(props) => props.type === EntryTypeEnum.INFLOW ? Colors.primary.green : Colors.primary.red};
`;