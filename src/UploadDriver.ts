import {UploadCallbacks} from "./UploadService";
import {Upload} from "./Upload";


export interface UploadDriver {

    upload(upload: Upload, callbacks?: UploadCallbacks): Promise<void>;
}
