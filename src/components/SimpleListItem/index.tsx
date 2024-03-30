import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
//local
import { 
    ItemContainer,
    TextContainer,
    IconContainer,
    Description,
} from './styles';
import Colors from '../../../assets/colors';

interface IListItemProps {
    item:IListItem;
    onIconAction?: (key:string) => void;
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

    const handleIconPressed = ()=>{
        onIconAction(item.key);
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
                        onPress={handleIconPressed}
                        style={{marginRight:10}}
                    >
                        <Icon name= {icon} size={30} color={Colors.primary.darkGray} style={{ opacity: 0.35 }} /> 
                    </TouchableOpacity>
                    ): null 
                }
                { enableDelete ? (
                    <TouchableOpacity
                        onPress={handleDelete}
                    >
                        <Icon name= {'delete'} size={30} color={Colors.primary.red} style={{ opacity: 0.35 }} /> 
                    </TouchableOpacity>
                    ): null
                }
            </IconContainer>
        </ItemContainer>
    )
}

export default SimpleListItem;