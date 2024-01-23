import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

export const Container = styled.View`
    flex:1;
    justify-content: flex-end;
    background-color: ${Colors.primary.blue};
`;

export const InputsContainer = styled.View`
    /* flex:0.3; */
    background-color: beige;
`;

export const Body = styled.View`
    flex:1;
    padding: 10px;
    background-color: ${Colors.primary.white};
    /* border-top-left-radius: 32px;
    border-top-right-radius: 32px; */
`;

export const Spacer = styled.View`
    margin:10px;
`;

export const Row = styled.View`
    display: flex;
    flex-direction: row;
    /* background-color: beige; */
`;

export const RadioText = styled.Text`
    text-transform: capitalize;
`;

export const RadioGroupContainer = styled.View`
border: 1px solid black;
    display: flex;
    flex-direction: row;
    /* background-color: beige; */
    background-color: ${Colors.primary.lightGray};
    border-radius: 10px;
`;

export const RadioContainer = styled.View`
    margin-left: 5px;
    margin-right: 5px;
`;

export const Input = styled.TextInput`
    margin-top: 8px;
    margin-bottom: 10px;
    border-radius: 10px;
    font-size: 16px;
    line-height: 20px;
    padding: 8px;
    background-color: ${Colors.primary.lightGray};
`;

export const TextStyled = styled.Text`
border: 1px solid black;
    height: 55px;
    margin-top: 8px;
    margin-bottom: 10px;
    border-radius: 10px;
    font-size: 16px;
    line-height: 20px;
    padding: 8px;
    text-align: center;
    background-color: ${Colors.primary.lightGray};
`;

export const AddBtn = styled.TouchableOpacity`
    height: 55px;
    background-color: ${Colors.disable.green};
    align-content: center;
    border-radius:10px;
    padding: 10px;
    border: 1px solid black;
`;
