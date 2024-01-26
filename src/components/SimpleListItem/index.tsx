import React from 'react';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
//local
import { 
    ItemContainer,
    TextContainer,
    IconContainer,
    Description,
} from './styles';
import Colors from '../../../assets/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IListItemProps {
    item:IListItem;
    onIconAction?: () => void;
    onDeleteAction?: (key:string) => void;
    disabled?: boolean;
    icon?: string;
    enableDelete?:boolean;
}

interface IListItem{
    value:string;
    key:string;
}

function SimpleListItem({item,onIconAction,onDeleteAction,disabled=false,icon, enableDelete}:IListItemProps): JSX.Element{

    const handleDelete = ()=> {
        onDeleteAction(item.key);
    }

    return(
        <ItemContainer>
            <TextContainer>
                <Description>
                    {item.value}
                </Description>
            </TextContainer>
            <IconContainer>
                { icon ? (
                    <TouchableOpacity
                        onPress={onIconAction}
                    >
                        <Icon name= {icon} size={42} color={Colors.primary.darkGray} style={{ opacity: 0.35 }} /> 
                    </TouchableOpacity>
                    ): null 
                }
                { enableDelete ? (
                    <TouchableOpacity
                        onPress={handleDelete}
                    >
                        <Icon name= {'delete'} size={42} color={Colors.primary.red} style={{ opacity: 0.35 }} /> 
                    </TouchableOpacity>
                    ): null
                }
            </IconContainer>
        </ItemContainer>
    )
}

export default SimpleListItem;