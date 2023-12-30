import styled, {css} from 'styled-components/native';
import Colors from '../../../assets/colors';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: ${Colors.primary.blue};
`;

export const Title = styled.Text`
  color: ${Colors.primary.white};
  font-size: 18px;
  font-weight: bold;
`;

export const IconContainer = styled.View``;