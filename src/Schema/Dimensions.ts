import * as Yup from "yup";


export enum Dimension {
    Height = "height",
    Width = "width",
    Depth = "depth",
}

export enum Unit {
    Centimeters = "cm",
    Inches = "in"
}

export interface Dimensions {

    [Dimension.Height]?: number;
    [Dimension.Width]?: number;
    [Dimension.Depth]?: number;

    unit: Unit;
}

export const dimensionsSchema = Yup.object({
    height: Yup.number(),
    width: Yup.number(),
    depth: Yup.number(),
    unit: Yup.string().oneOf([ "cm", "in" ]),
});
