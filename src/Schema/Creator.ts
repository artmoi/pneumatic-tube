import * as Yup from "yup";


export interface Creator {

}

export const creatorSchema = Yup.object({

});

declare module "./Editable" {

    export enum EditableType {
        Creator = 2,
    }
}
