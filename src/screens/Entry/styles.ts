import styled from 'styled-components/native';
import Colors from '../../../assets/colors';

export const Container = styled.View`
    flex:1;
    background-color: ${Colors.primary.blue};
`;

export const Body = styled.View`
    flex:1;
    padding: 10px;
    background-color: ${Colors.primary.white};
    border-top-left-radius: 32px;
    border-top-right-radius: 32px;
`;

export const Spacer = styled.View`
    margin:25px;
`;

export const Row = styled.View`
    display: flex;
    flex-direction: row;
    /* background-color: beige; */
`;