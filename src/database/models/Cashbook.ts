interface ICashbookProps{
    createdat?:Date;
    description?:string;
    id?:number;
}

export class Cashbook{
    createdat?:Date;
    description?:string;
    id?:number;
    
    constructor({
        createdat,
        description,
        id
    }:ICashbookProps){
        this.createdat = createdat,
        this.description = description,
        this.id = id
    }
}