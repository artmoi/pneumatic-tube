import _ from "lodash";
import { Filesystem } from "./Filesystem";
import { Upload } from "./Upload";


const project = require("../package.json");

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

export interface UploadOptions {

    callbacks?: UploadCallbacks;
    scoped?: boolean;
    filesystem?: string;
}

export class UploadService {

    public constructor(
        private filesystems: {[name: string]: Filesystem},
        private defaultFilesystem: string = _.keys(filesystems)[0]
    ) {
    }

    public async upload(upload: Upload, options: UploadOptions = {}) {

        const filesystem = options.filesystem || this.defaultFilesystem
        const callbacks = options.callbacks || {};
        const scoped = options.scoped || false;

        upload.filesystem = filesystem;
        upload.metadata.uploaderVersion = project.version;

        return await this.filesystems[filesystem]
            .uploadDriver
            .upload(upload, callbacks, scoped);
    }
}
