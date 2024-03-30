import React, { useState } from "react";
import {TouchableOpacity, View} from "react-native";
//local
import { 
    ItemContainer,
    TextContainer,
    IconContainer,
    Description,
    Row,
    CheckIcon
} from './styles';
import Colors from '../../../assets/colors';
import { Entry } from "../../database/models/Entry";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface IEntryItemProps {
    item:Entry;
    onIconAction?: (key:string) => void;
    onDeleteAction?: (key:string) => void;
    onLongPress?: (key:string) => void;
    onPress?: () => void;
    disabled?: boolean;
    enableDelete?:boolean;
}

function EntryItem(
    {item,onPress,onLongPress,onIconAction,onDeleteAction,disabled=false, enableDelete}:IEntryItemProps
):JSX.Element{

    const [optionsVisible, setOptionsVisible] = useState(false);

    return <ItemContainer
        onPress={onPress}
        onLongPress={()=>setOptionsVisible(!optionsVisible)}
    >   
        {
            optionsVisible === false ? (<Row>
                <TextContainer>
                        <Description>
                            {item.description}
                        </Description>
                    </TextContainer>
                    <TextContainer>
                        <Description>
                            {item.value}
                        </Description>
                       </TextContainer>
                </Row>)
            : (<Row style={{justifyContent:"space-between"}}>
                <IconContainer>
                    <CheckIcon
                        onPress={()=>{setOptionsVisible(false)}}
                    >
                        <Icon name= {'check'} size={30} color={Colors.primary.green} style={{ opacity: 0.35 }} /> 
                    </CheckIcon>
                </IconContainer>
                <IconContainer>
                    <TouchableOpacity
                        onPress={()=>{}}
                        style={{marginRight:20}}
                    >
                        <Icon name= {'pencil'} size={30} color={Colors.primary.darkGray} style={{ opacity: 0.35 }} /> 
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>{}}
                    >
                        <Icon name= {'delete'} size={30} color={Colors.primary.red} style={{ opacity: 0.35 }} /> 
                    </TouchableOpacity>
                </IconContainer>
            </Row>)
        }
    </ItemContainer>
}

export default EntryItem;