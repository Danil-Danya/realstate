import axios from "axios";

export default {
    state: {
        users: []
    },

    actions: {
        async fetchUsers (context) {
            const url = `http://localhost:5000/${process.env.VUE_APP_API_PATH}/get-users`;

            const response = await axios.get(url, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            const usersData = response.data;

            context.commit('setUsers', usersData);
        }
    },

    mutations: {
        setUsers (state, usersData) {
            state.users = usersData;
        }
    },

    getters: {
        getUsers (state) {
            return state.users;
        }
    }
}