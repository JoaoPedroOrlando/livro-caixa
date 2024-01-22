import React from "react";
import {TouchableOpacity} from "react-native"
import {Container, Title, IconContainer, Spacer} from './styles';

interface HeaderProps {
    title: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onLeftIconPressed?: ()=> void;
    onRightIconPressed?: ()=> void;
}

const Header: React.FC<HeaderProps> = ({ title, leftIcon, rightIcon, onLeftIconPressed, onRightIconPressed }) => {
    return (
      <Container>
        <TouchableOpacity
          onPress={onLeftIconPressed}
        >
            <IconContainer>{leftIcon}</IconContainer>
        </TouchableOpacity>
        <Title>{title}</Title>
        <TouchableOpacity
          onPress={onRightIconPressed}
        >
            <IconContainer>{rightIcon}</IconContainer>
        </TouchableOpacity>
      </Container>
    );
  };
  
  export default Header;