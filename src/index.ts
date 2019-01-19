// note: These are the core domain types returned by the ArtMoi API surface area.
// note: Domain types in this library contain no behaviour and only define structure.
export { Creation, creationSchema } from "./Schema/Creation";
export { Creator, creatorSchema } from "./Schema/Creator";
export { Dimensions, dimensionsSchema } from "./Schema/Dimensions";
export { EditableType, Editable } from "./Schema/Editable";
export { File, fileSchema } from "./Schema/File";
export { Medium, mediumSchema } from "./Schema/Medium";

// note: If you're using protoculture, these will help you with configuring the API.
export { ArtMoiApiVariables } from "./ArtMoiApiVariables";
export { artmoiSymbols } from "./ArtMoiSymbols";
export { ArtMoiServiceProvider } from "./ArtMoiServiceProvider";
