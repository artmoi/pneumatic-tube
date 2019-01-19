import { Method, ApiConnection, ConnectionConfiguration, ServerRoute } from "protoculture";


declare module "protoculture/lib/Data/ApiConnections" {

    export interface ConfiguredConnections {

        "oauth": ApiConnection<typeof artmoiOauthConfiguration>;
        "api": ApiConnection<typeof artmoiApiConfiguration>;
    }
}

// declare module "protoculture/lib/Data/ApiConnection" {

//     export interface ApiConnection<Configuration extends ConnectionConfiguration<any>> {

//         // todo: Overloading the call method is one way to get the response type in there.
//     }
// }

export const artmoiOauthConfiguration = {
    routes: {
        "password-grant": {
            name: "password-grant",
            method: Method.POST,
            path: "oauth/token",
            data: {
                "grant_type": "password",
            },
        },
    },
};

export const artmoiApiConfiguration = {
    routes: {

        "identity": {
            name: "identity",
            method: Method.GET,
            path: "/api/identity",
        },
        "geography.get": {
            name: "geography.get",
            method: Method.GET,
            path: "/api/geography",
        },
        "billing-profile.update": {
            name: "billing-profile.update",
            method: Method.PUT,
            path: "/api/billing-profile/{id}",
            parameters: [
                "id",
            ],
        },
        "billing-profile.sync-addons-to-stripe": {
            name: "billing-profile.sync-addons-to-stripe",
            method: Method.POST,
            path: "/api/billing-profile/sync-addons-to-stripe",
        },
        "session.store": {
            name: "session.store",
            method: Method.POST,
            path: "/login",
        },
        "token.create.implicit": {
            name: "token.create.implicit",
            method: Method.GET,
            path: "/oauth/authorize",
            data: {
                "response_type": "token",
            },
        },
        "creation.list": {
            name: "creation.list",
            method: Method.GET,
            path: "/api/creation",
        },
        "creation.files.store": {
            name: "creation.files.store",
            method: Method.POST,
            path: "/api/creation/{id}/files",
            parameters: [
                "id",
            ],
        },
        "creation.images.index": {
            name: "creation.images.index",
            method: Method.GET,
            path: "/api/creation/{id}/images",
            parameters: [
                "id",
            ],
        },
        "creation.images.store": {
            name: "creation.images.store",
            method: Method.PUT,
            path: "/api/creation/{id}/images",
            parameters: [
                "id",
            ],
        },
        "collection.files.store": {
            name: "collection.files.store",
            method: Method.POST,
            path: "/api/collection/{id}/files",
            parameters: [
                "id",
            ],
        },
        "creator.files.store": {
            name: "creator.files.store",
            method: Method.POST,
            path: "/api/creator/{id}/files",
            parameters: [
                "id",
            ],
        },
        "file.create-multipart-upload": {
            name: "file.create-multipart-upload",
            method: Method.POST,
            path: "/api/file/create-multipart-upload",
        },
        "file.store-multipart-upload": {
            name: "file.store-multipart-upload",
            method: Method.POST,
            path: "/api/file/store-multipart-upload",
        },
        "file.download": {
            name: "file.download",
            method: Method.GET,
            path: "/api/file/{id_hash}/download",
            parameters: [
                "id_hash",
            ],
        },
        "file.index": {
            name: "file.index",
            method: Method.GET,
            path: "/api/file",
        },
        "file.store": {
            name: "file.store",
            method: Method.POST,
            path: "/api/file",
        },
        "file.update": {
            name: "file.update",
            method: Method.PUT,
            path: "/api/file/{id_hash}",
            parameters: [
                "id_hash",
            ],
        },
        "file.destroy": {
            name: "file.destroy",
            method: Method.DELETE,
            path: "/api/file/{id_hash}",
            parameters: [
                "id_hash",
            ],
        },
        "files.bulk-destroy": {
            name: "files.bulk-destroy",
            method: Method.DELETE,
            path: "/api/file",
        },
        "file.usage": {
            name: "file.usage",
            method: Method.GET,
            path: "/api/file/usage",
        },
        "file.mime-types": {
            name: "file.mime-types",
            method: Method.GET,
            path: "/api/file/mime-types",
        },
        "creation.files.index": {
            name: "creation.files.index",
            method: Method.GET,
            path: "/api/creation/{id}/files",
            parameters: [
                "id",
            ],
        },
        "collection.files.index": {
            name: "collection.files.index",
            method: Method.GET,
            path: "/api/collection/{id}/files",
            parameters: [
                "id",
            ],
        },
        "creator.files.index": {
            name: "creator.files.index",
            method: Method.GET,
            path: "/api/creator/{id}/files",
            parameters: [
                "id",
            ],
        },
        "creation.files.destroy": {
            name: "creation.files.destroy",
            method: Method.DELETE,
            path: "/api/creation/{creationId}/files/{fileId}",
            parameters: [
                "creationId",
                "fileId",
            ],
        },
        "collection.files.destroy": {
            name: "collection.files.destroy",
            method: Method.DELETE,
            path: "/api/collection/{collectionId}/files/{fileId}",
            parameters: [
                "collectionId",
                "fileId",
            ],
        },
        "creator.files.destroy": {
            name: "creator.files.destroy",
            method: Method.DELETE,
            path: "/api/creator/{creatorId}/files/{fileId}",
            parameters: [
                "creatorId",
                "fileId",
            ],
        },
        "creation.files.bulk-destroy": {
            name: "creation.files.bulk-destroy",
            method: Method.DELETE,
            path: "/api/creation/files",
        },
        "collection.files.bulk-destroy": {
            name: "collection.files.bulk-destroy",
            method: Method.DELETE,
            path: "/api/collection/files",
        },
        "creator.files.bulk-destroy": {
            name: "creator.files.bulk-destroy",
            method: Method.DELETE,
            path: "/api/creator/files",
        },
        "s3.create-upload": {
            name: "s3.create-upload",
            method: Method.POST,
            path: "file/create-upload",
            authorizationType: "oauth2",
        },
        "s3.create-multipart-upload": {
            name: "s3.create-multipart-upload",
            method: Method.POST,
            path: "file/create-multipart-upload",
            authorizationType: "oauth2",
        },
        "s3.store-multipart-upload": {
            name: "s3.store-multipart-upload",
            method: Method.POST,
            path: "file/store-multipart-upload",
            authorizationType: "oauth2",
        },
        "creator.index": {
            name: "creator.index",
            method: Method.GET,
            path: "creator",
            authorizationType: "oauth2",
        },
        "medium.index": {
            name: "medium.index",
            method: Method.GET,
            path: "medium",
            authorizationType: "oauth2",
        },
    },
};
