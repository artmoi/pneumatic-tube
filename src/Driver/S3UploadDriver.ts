import _ from "lodash";
import axios from "axios";
import { ApiConnection, ConnectionConfiguration, ServerRoute } from "protoculture";
import { v4 as v4uuid } from "uuid";
import { UploadDriver } from "../UploadDriver";
import { UploadCallbacks } from "../UploadService";
import { Upload } from "../Upload";


interface S3Upload extends Upload {
    uploadId?: string;
    metadata: any;
    parts: S3UploadPart[];
}

interface S3UploadPart {
    presignedUploadUri?: string;
    id: string;
    index: number;
    start: number;
    size: number;
    eTag?: string;
    progress: number;
}

type S3UploadInitializerConfiguration = ConnectionConfiguration<{
    "s3.create-multipart-upload": ServerRoute,
    "s3.store-multipart-upload": ServerRoute,
}>;

type S3UploadInitializer = ApiConnection<S3UploadInitializerConfiguration>;

export class S3UploadDriver implements UploadDriver {

    private minimumPartSize = 5242880;

    private uploadInitializer: S3UploadInitializer;

    public constructor(uploadInitializer: S3UploadInitializer) {
        
        this.uploadInitializer = uploadInitializer;
    }

    public async upload(upload: Upload, callbacks: UploadCallbacks = {}) {

        const s3Upload = await this.initialize(upload);

        await this.serialUpload(s3Upload, callbacks);
        await this.complete(s3Upload);

        callbacks.onComplete && callbacks.onComplete(upload);
    }

    private async parallelUpload(s3Upload: S3Upload, callbacks: UploadCallbacks = {}) {

        await Promise.all(s3Upload.parts.map(async (part, index) => {

            await this.handlePart(s3Upload.data, index, s3Upload, callbacks);

            this.reportProgress(s3Upload, callbacks);
        }));
    }

    private async serialUpload(s3Upload: S3Upload, callbacks: UploadCallbacks = {}) {

        await _.reduce(
            s3Upload.parts,
            async (previous: any, part: any, index: any) => {

                await previous;

                await this.handlePart(s3Upload.data, index, s3Upload, callbacks);

                this.reportProgress(s3Upload, callbacks);
            },
            new Promise<void>((resolve) => resolve())
        );
    }

    private async initialize(upload: Upload): Promise<S3Upload> {

        const s3Upload: S3Upload = {
            ...upload,
            parts: this.calculateParts(upload.data),
            metadata: {
                ...upload.metadata,
                id: upload.id,
                mime: upload.mimeType,
                name: upload.name,
                size: upload.data.size,
            },
        };

        const multipartUploadData = await this.uploadInitializer.call("s3.create-multipart-upload", {
            data: {
                s3Upload,
            },
        });

        s3Upload.uploadId = multipartUploadData.uploadId;

        multipartUploadData.presignedUploadUris.forEach((uri: string, index: number) =>
            s3Upload.parts[index].presignedUploadUri = uri);

        return s3Upload;
    }

    private async handlePart(data: Blob, index: number, upload: S3Upload, callbacks: UploadCallbacks) {

        const {start, size, presignedUploadUri} = upload.parts[index];
        const partBytes = data.slice(start, start + size);

        if (!partBytes.size) {

            throw new Error(`Upload of ${upload.id} failed, empty chunk encountered ${index}.`);
        }

        const request = axios.put(presignedUploadUri, partBytes, {
            onUploadProgress: (progressEvent: any) => {

                upload.parts[index].progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);

                this.reportProgress(upload, callbacks);
            },
            headers: {
                "content-type": "binary/octet-stream",
            },
        });

        const response = await request;

        upload.parts[index].eTag = response.headers["etag"];
    }

    private async complete(s3Upload: S3Upload) {

        s3Upload.parts.forEach((part) => {

            if (!part.eTag) {

                throw new Error(`Upload of ${s3Upload.id} failed, missing part ${part.index} (${part.eTag}).`);
            }
        });

        await this.uploadInitializer.call("s3.store-multipart-upload", {
            data: {
                s3Upload,
            },
        });
    }

    private calculateParts(data: Blob): S3UploadPart[] {

        return _
            .range(0, data.size, this.minimumPartSize)
            .map((start: any, index: number) => ({
                id: v4uuid(),
                progress: 0,
                index,
                start,
                size: (this.minimumPartSize + start) > data.size
                    ? data.size - start
                    : this.minimumPartSize,
            })
        );
    }

    private reportProgress(s3Upload: S3Upload, callbacks: UploadCallbacks) {

        s3Upload.progress = _.chain(s3Upload.parts)
            .map("progress")
            .sum()
            .thru((sum: number) => Math.floor(sum / s3Upload.parts.length))
            .value();

        callbacks.onProgress && callbacks.onProgress(s3Upload);
    }
}
