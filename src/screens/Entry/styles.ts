import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

export const Container = styled.SafeAreaView`
    flex:1;
    justify-content: flex-end;
    background-color: ${Colors.primary.blue};
`;

export const Footer = styled.View`
    flex:1;
    background-color: beige;
`;

export const Body = styled.View`
    flex:3;
    padding: 10px;
    background-color: ${Colors.primary.white};
    /* border-top-left-radius: 32px;
    border-top-right-radius: 32px; */
`;

export const Spacer = styled.View`
    margin:25px;
`;

export const Row = styled.View`
    display: flex;
    flex-direction: row;
    /* background-color: beige; */
`;

export const SheetContainer = styled.View`
    flex: 1;
    padding: 0px 20px 0px 20px;
`;

export const RadioText = styled.Text`
    text-transform: capitalize;
`;
