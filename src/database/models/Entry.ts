interface IEntryProps{
    id?:number;
    description?:string;
    value?:number;
    dtRecord?:Date;
    createdAt?:Date;
    cdCashbook?:number;
    type?:EntryTypeEnum
}

enum EntryTypeEnum{
    INFLOW = "INFLOW", //entrada de recurso
    OUTFLOW = "OUTFLOW" //saída de recurso
}

export class Entry{
    id?:number;
    description?:string;
    value?:number;
    dtRecord?:Date;
    createdAt?:Date;
    cdCashbook?:number;
    type?:EntryTypeEnum;
    constructor({
        createdAt,
        description,
        id,
        dtRecord,
        cdCashbook,
        value,
        type,
    }:IEntryProps){
        this.createdAt = createdAt;
        this.description = description;
        this.id = id;
        this.value = value;
        this.dtRecord = dtRecord;
        this.cdCashbook = cdCashbook;
        this.type = type;
    }
}