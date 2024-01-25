import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

export const Input = styled.TextInput`
    height: 50px;
    margin-bottom: 10px;
    border-radius: 10px;
    font-size: 16px;
    line-height: 20px;
    padding: 8px;
    background-color: ${Colors.primary.lightGray};
`;

export const Container = styled.View`
    flex:1;
    justify-content: flex-end;
    background-color: ${Colors.primary.white};
`;

export const Row = styled.View`
    display: flex;
    flex-direction: row;
    /* background-color: beige; */
`;

export const Body = styled.View`
    flex:1;
    padding: 10px;
    background-color: ${Colors.primary.white};
`;

export const AddBtn = styled.TouchableOpacity`
    height: 50px;
    background-color: ${Colors.disable.green};
    align-content: center;
    border-radius:10px;
    padding: 10px;
    flex:0.2;
`;