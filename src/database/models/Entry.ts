interface IEntryProps{
    id?:number;
    description?:string;
    value?:number;
    dtrecord?:string;
    createdat?:string;
    cdcashbook?:number;
    type?:EntryTypeEnum
}

export enum EntryTypeEnum{
    INFLOW = "INFLOW", //entrada de recurso
    OUTFLOW = "OUTFLOW" //saída de recurso
}

export class Entry{
    id?:number;
    description?:string;
    value?:number;
    dtrecord?:string;
    createdat?:string;
    cdcashbook?:number;
    type?:EntryTypeEnum;
    constructor({
        createdat,
        description,
        id,
        dtrecord,
        cdcashbook,
        value,
        type,
    }:IEntryProps){
        this.createdat = createdat;
        this.description = description;
        this.id = id;
        this.value = value;
        this.dtrecord = dtrecord;
        this.cdcashbook = cdcashbook;
        this.type = type;
    }
}