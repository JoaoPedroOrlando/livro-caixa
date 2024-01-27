import React from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//local
import {
    MenuItemContainer,
    MenuDescription
} from './styles';
import Colors from '../../../assets/colors';

interface IMenuItemProps{
    description:string;
    iconName?:string;
    onIconAction?: ()=> void;
}

function MenuItem({description,iconName,onIconAction}:IMenuItemProps):JSX.Element{
    return (
        <MenuItemContainer>
            <TouchableOpacity
                onPress={onIconAction}
            >
                <Icon name= {'delete'} size={42} color={Colors.primary.red} style={{ opacity: 0.35 }} /> 
            </TouchableOpacity>
            <MenuDescription>{description}</MenuDescription>
        </MenuItemContainer>
    )
}

export default MenuItem;