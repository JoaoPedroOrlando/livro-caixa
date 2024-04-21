import styled, {css} from 'styled-components/native';
import Colors from '../../../assets/colors';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px 20px 20px 20px;
  background-color: ${Colors.palette.header};
`;

export const Title = styled.Text`
  color: ${Colors.primary.white};
  font-size: 18px;
  font-weight: bold;
  text-transform: capitalize;
`;

export const IconContainer = styled.View``;

export const Spacer = styled.View`
    margin:25px;
`;