import axios from "axios"

export default {
    state: {
        reviews: {},
    },

    actions: {
        async fetchReviews(context) {
            const url = `/server-api/reviews-get-all`
            const response = await axios.get(url, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const reviewsData = response.data;
            context.commit('setReviews', reviewsData);
        },
    },

    mutations: {
        setReviews (state, reviews) {
            state.reviews = reviews;
        }
    },

    getters: {
        getReviews (state) {
            return state.reviews
        }
    }
}