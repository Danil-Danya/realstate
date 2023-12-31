import axios from "axios";

export default {
    state: {
        requests: [],
        request: {}
    },

    actions: {
        async fetchRequest(context, filters) {
            const url = `/${process.env.VUE_APP_API_PATH}/request-get-all`;

            try {
                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    params: filters
                });
                console.log(response);

                const requestData = response.data;
                context.commit('setRequests', requestData);
            }
            catch (error) {
                console.log(`Server error: ${error}`);
            }
        },

        async fetchOneRequest (context, data) {
            const url = `/${process.env.VUE_APP_API_PATH}/request-get-one`;

            try {
                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    params: data
                });

                const requestData = response.data;
                context.commit('setOneRequest', requestData);
            }
            catch (error) {
                console.log(`Server error: ${error}`);
            }
        }
    },

    mutations: {
        setRequests(state, requests) {
            state.requests = requests;
        },

        setOneRequest(state, request) {
            console.log(request);
            state.request = request;
        }
    },

    getters: {
        getRequests(state) {
            return state.requests;
        },
        
        getOneRequests(state) {
            console.log(state.request);
            const request = JSON.parse(JSON.stringify(state.request));
            return request;
        }
    }
}