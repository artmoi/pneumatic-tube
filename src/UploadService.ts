import _ from "lodash";
import { Filesystem } from "./Filesystem";
import { Upload } from "./Upload";
import project from "../package.json";


export interface Usage {

    availableBytes: number;
    usedBytes: number;
    count: number;
}

export interface UploadCallbacks {

    onProgress?(upload: Upload): void;
    onComplete?(upload: Upload): void;
    onFileError?(upload: Upload): void;
}

export class UploadService {

    public constructor(
        private filesystems: {[name: string]: Filesystem},
        private defaultFilesystem: string = _.keys(filesystems)[0]
    ) {
    }

    public async upload(upload: Upload, callbacks?: UploadCallbacks, filesystem = this.defaultFilesystem) {

        upload.filesystem = filesystem;
        upload.metadata.uploaderVersion = project.version;

        await this.filesystems[filesystem]
            .uploadDriver
            .upload(upload, callbacks);
    }
}
