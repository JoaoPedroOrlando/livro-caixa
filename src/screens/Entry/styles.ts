import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

export const Container = styled.View`
    flex:1;
    justify-content: flex-end;
    background-color: ${Colors.primary.blue};
`;

export const InputsContainer = styled.View`
`;

export const Body = styled.View`
    flex:0.9;
    padding: 10px;
    background-color: ${Colors.primary.white};
`;

export const Footer = styled.View`
    /* padding: 8px 20px 0px 20px;
    padding-top:15px; */
    background-color: ${Colors.primary.lightGray};
    flex:0.1;
`;

// export const Spacer = styled.View`
//     margin:10px;
// `;

export const Row = styled.View`
    display: flex;
    flex-direction: row;
`;

export const RadioText = styled.Text`
    text-transform: capitalize;
`;

export const RadioGroupContainer = styled.View`
    display: flex;
    flex-direction: row;
    background-color: ${Colors.primary.lightGray};
    border-radius: 10px;
    padding: 0px 10px 0px 10px;
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
    height: 55px;
    margin-top: 8px;
    margin-bottom: 10px;
    border-radius: 10px;
    font-size: 16px;
    line-height: 20px;
    padding: 8px;
    text-align: center;
    padding-top:15px;
    background-color: ${Colors.primary.lightGray};
`;

export const AddBtn = styled.TouchableOpacity`
    height: 55px;
    background-color: ${Colors.disable.green};
    align-content: center;
    border-radius:10px;
    align-content: center;
    text-align: center;
    padding: 10px;
    /* border: 1px solid black; */
`;

export const DateBtn = styled.TouchableOpacity`
    border-radius:10px;
    display:flex;
    align-items:center;
    justify-content: center;
    align-content: center;
`;

export const ListContainer = styled.View`
    flex:1;
`;

export const Title = styled.Text`
    font-weight: 700;
    color: ${Colors.primary.darkGray};
    font-size: 18px;
    padding-top: 10px;
    padding-bottom: 10px;
`;

export const TotalText = styled.Text`
    padding: 20px 0px 0px 20px;
    font-weight: 700;
    font-size: 16px;
`;

export const TotalTextValue = styled.Text<{value:number}>`
    padding: 20px 0px 0px 0px;
    color: ${(props) => props.value > 0  ? Colors.primary.green : Colors.primary.red};
    font-weight: 500;
    font-size: 16px;
`;
