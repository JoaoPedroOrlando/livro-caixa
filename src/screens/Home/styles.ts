import styled from "styled-components/native";
import Colors from "../../../assets/colors";

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.palette.header};
`;

export const Body = styled.View`
  flex: 0.7;
  padding: 10px;
  background-color: ${Colors.palette.bkColor};
  /* border-top-left-radius: 32px;
  border-top-right-radius: 32px; */
`;

export const Footer = styled.View`
  flex: 0.3;
  background-color: ${Colors.palette.bkColor};
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 15px;
`;

export const ModalTitle = styled.Text`
  font-weight: 600;
  font-size: 18px;
`;

export const Title = styled.Text`
  padding: 10px;
  font-weight: 600;
  font-size: 32px;
  color: ${Colors.palette.btnText};
`;

export const ModalText = styled.Text`
  padding: 15px 0px 0px 0px;
`;

export const Spacer = styled.View`
  margin: 25px;
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
