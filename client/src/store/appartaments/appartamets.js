import axios from "axios";

export default () => ({
    namespaced: true,
    state: {
        appartaments: [],
        currentAppartament: {}
    },

    actions: {
        async fetchAppartaments(context, filters) {
            const url = `/${process.env.VUE_APP_API_PATH}/appartament-get-all`;

            try {
                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    params: filters
                });
                const appartamentData = response.data;

                context.commit('setAppartaments', appartamentData);
            } catch (error) {
                console.log(`Server error: ${error}`);
            }
        },

        async fetchOneAppartament(context, data) {
            const url = `/${process.env.VUE_APP_API_PATH}/appartament-get-one`;

            try {
                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    params: data
                });

                const appartamentData = response.data;
                context.commit('setCurrentAppartament', appartamentData);
            } catch (error) {
                console.log(`Server error: ${error}`);
            }
        }
    },

    mutations: {
        setAppartaments(state, appartaments) {
            state.appartaments = appartaments;
        },

        setCurrentAppartament(state, appartament) {
            state.currentAppartament = appartament;
        }
    },

    getters: {
        getAppartaments(state) {
            return state.appartaments;
        },

        getOneAppartament(state) {
            return state.currentAppartament;
        }
    }
});
