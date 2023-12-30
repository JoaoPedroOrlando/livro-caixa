import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

export const Container = styled.View`
    flex:1;
    background-color: ${Colors.primary.blue};
`;

export const Body = styled.View`
    flex:1;
    background-color: ${Colors.primary.white};
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
