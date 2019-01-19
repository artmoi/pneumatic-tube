import "./Extension/ServiceProvider";
import _ from "lodash";
import { ServiceProvider } from "protoculture";
import { artmoiOauthConfiguration, artmoiApiConfiguration } from "./ArtMoiApiConfiguration";
import { ArtMoiApiVariables } from "./ArtMoiApiVariables";
import { artmoiSymbols } from "./ArtMoiSymbols";


export class ArtMoiServiceProvider extends ServiceProvider {

    public async boot() {

        this.configureConnections();
    }

    private configureConnections() {

        this.configureApiConnection("oauth", artmoiOauthConfiguration);
        this.configureApiConnection("api", artmoiApiConfiguration);
        this.configureApiConnection((context) => {
            
            const variables = context.container.get<ArtMoiApiVariables>(artmoiSymbols.ApiVariables);

            return {
                "oauth": {
                    axiosConfiguration: {
                        baseURL: variables.ARTMOI_API_BASE_URI,
                        data: {
                            "client_id": variables.ARTMOI_API_CLIENT_ID,
                            "client_secret": variables.ARTMOI_API_CLIENT_SECRET,
                        },
                    },
                },
                "api": {
                    axiosConfiguration: {
                        baseURL: `${variables.ARTMOI_API_BASE_URI}/api`,
                    },
                },
            };
        });
    }
}
