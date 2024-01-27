import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

export const Container = styled.View`
    flex:1;
    background-color: ${Colors.palette.header};
`;

export const Body = styled.View`
    flex:1;
    padding: 10px;
    background-color: ${Colors.palette.bkColor};
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
`;

export const ModalTitle = styled.Text`
    font-weight:600;
    font-size: 18px;
`;

export const ModalText = styled.Text`
    padding: 15px 0px 0px 0px;
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
