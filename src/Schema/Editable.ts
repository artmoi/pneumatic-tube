import { File } from "./File";


export enum EditableType {

}

export interface Files {

    [slot: string]: File[];
}

export interface Editable {

    id: string | number;
    type: EditableType;

    files: Files;
}
