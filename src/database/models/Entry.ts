interface IEntryProps{
    id?:number;
    description?:string;
    value?:number;
    dtRecord?:Date;
    createdAt?:Date;
    cdCashbook?:number;
}

export class Entry{
    id?:number;
    description?:string;
    value?:number;
    dtRecord?:Date;
    createdAt?:Date;
    cdCashbook?:number;
    
    constructor({
        createdAt,
        description,
        id,
        dtRecord,
        cdCashbook,
        value
    }:IEntryProps){
        this.createdAt = createdAt,
        this.description = description,
        this.id = id,
        this.value = value,
        this.dtRecord = dtRecord,
        this.cdCashbook = cdCashbook
    }
}