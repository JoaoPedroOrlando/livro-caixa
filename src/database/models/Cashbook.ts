interface ICashbookProps{
    createdat?:Date;
    description?:string;
    id?:number;
    updatedat?:Date;
}

export class Cashbook{
    createdat?:Date;
    description?:string;
    id?:number;
    updatedat?:Date
    
    constructor({
        createdat,
        description,
        id,
        updatedat
    }:ICashbookProps){
        this.createdat = createdat;
        this.description = description;
        this.id = id;
        this.updatedat = updatedat;
    }
}