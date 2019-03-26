import _ from "lodash";
import { Filesystem } from "./Filesystem";
import { Upload } from "./Upload";
import { v4 as v4uuid } from "uuid";


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

    fileName?: string;
    callbacks?: UploadCallbacks;
    scoped?: boolean;
    filesystem?: string;
    mimeType?: string;
}

export class UploadService {

    public constructor(
        private filesystems: {[name: string]: Filesystem},
        private defaultFilesystem: string = _.keys(filesystems)[0]
    ) {
    }

    public async upload(data: Blob | File, options: UploadOptions = {}) {

        const callbacks = options.callbacks || {};
        const scoped = options.scoped || false;

        const upload = this.createUpload(data, options);

        return await this.filesystems[upload.filesystem]
            .uploadDriver
            .upload(upload, callbacks, scoped);
    }

    private createUpload(data: Blob | File, options: UploadOptions = {}): Upload {

        const filesystem = options.filesystem || this.defaultFilesystem
        const name = options.fileName || (data as File).name || undefined;
        const mimeType = options.mimeType || data.type || undefined;

        return {
            id: v4uuid(),
            size: data.size,
            filesystem: filesystem,
            metadata: {
                uploaderVersion: project.version,
            },
            data,
            name,
            mimeType,
        };
    }
}
