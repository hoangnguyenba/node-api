export interface IModel {
    find(params: any, callback: Function);

    findAll(params: any, callback: Function);

    save(data: any, callback: Function);
}


export abstract class BaseModel implements IModel {

    _TABLE_NAME: string = "";
    
    abstract get TABLE_NAME(): string;

    abstract find(params: any, callback: Function);

    abstract findAll(params: any, callback: Function);

    abstract save(data: any, callback: Function);
}