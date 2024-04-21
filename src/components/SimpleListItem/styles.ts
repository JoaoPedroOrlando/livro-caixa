import styled from "styled-components/native";
import Colors from "../../../assets/colors";

export const ItemContainer = styled.View`
    height: 50px;
    margin-bottom: 10px;
    border-radius: 10px;
    font-size: 16px;
    line-height: 20px;
    padding: 8px;
    background-color: ${Colors.palette.input};  
    display: flex;
    flex-direction: row;
    /* border: 1px solid black; */
`;

export const TextContainer = styled.View`
    flex:0.8;
    margin-left: 10px;
    justify-content: center;
    /* border: 1px solid black; */
`;

export const Description = styled.Text`
    color: ${Colors.palette.textColor};
    text-transform: capitalize;
    font-weight: 500;
    font-size: 18px;
    /* border: 1px solid blue; */
`;

export const IconContainer = styled.View`
    flex:0.2;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
`;