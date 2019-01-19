

export interface Metadata {

    [key: string]: string;

    uploaderVersion?: string;
}

export interface Upload {

    id: string;
    name: string;
    mimeType: string;
    size: number;

    filesystem?: string;
    metadata?: Metadata;

    data?: Blob;
    progress?: number;
}
