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

export const SheetContainer = styled.View`
    flex: 1;
    padding: 0px 20px 0px 20px;
`;

export const WarnningText = styled.Text`
    font-size: 20px;
    font-weight: 500;
    color: ${Colors.primary.darkGray};
    text-align: center;
    margin-top: 20px;
`;

export const DeleteBtn = styled.TouchableOpacity`
    background-color: ${Colors.disable.red};
    height: 50px;
    flex:0.5;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
`;

export const DeleteBtnText = styled.Text`
    color: ${Colors.primary.white};
    font-size: 20px;
    font-weight: 500;
`;
