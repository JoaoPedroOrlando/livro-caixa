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
import { Entry, EntryTypeEnum } from "../../database/models/Entry";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { formatStrDate } from "../../shared/helpers/date-helper";

interface IEntryItemProps {
    item:Entry;
    onIconAction?: (key:number) => void;
    onDeleteAction?: (key:number) => void;
    onLongPress?: (key:number) => void;
    onPress?: () => void;
    disabled?: boolean;
    enableDelete?:boolean;
}

function EntryItem(
    {item,onPress,onIconAction,onDeleteAction,disabled=false, enableDelete}:IEntryItemProps
):JSX.Element{

    const [optionsVisible, setOptionsVisible] = useState(false);

    const handleDelete = ()=> {
        onDeleteAction(item.id);
    }

    const handleEdit = ()=> {
        onIconAction(item.id);
    }

    return <ItemContainer
        onPress={onPress}
        onLongPress={()=>setOptionsVisible(!optionsVisible)}
    >   
        {
            optionsVisible === false ? (<Row>
                <TextContainer >
                     <Description type = {item.type}>
                           {item.description} 
                    </Description>
                </TextContainer>
                <TextContainer >
                    <Description type = {item.type}>
                        R$ {item.type === EntryTypeEnum.INFLOW ? "" : " -"}
                        {item.value}
                    </Description>
                </TextContainer>
                <TextContainer >
                    <Description type = {item.type}>
                        {formatStrDate(item.dtrecord)}
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
                        onPress={handleEdit}
                        style={{marginRight:20}}
                    >
                        <Icon name= {'pencil'} size={30} color={Colors.primary.darkGray} style={{ opacity: 0.35 }} /> 
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleDelete}
                    >
                        <Icon name= {'delete'} size={30} color={Colors.primary.red} style={{ opacity: 0.35 }} /> 
                    </TouchableOpacity>
                </IconContainer>
            </Row>)
        }
    </ItemContainer>
}

export default EntryItem;