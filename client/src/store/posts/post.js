import axios from "axios";

export default {
    state: {
        posts: [],
        post: {}
    },

    actions: {
        async fetchPost(context, filters) {
            const url = `/${process.env.VUE_APP_API_PATH}/post-get-all`;
            console.log(filters);
            try {
                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    params: filters
                });

                const postData = response.data;
                context.commit('setPosts', postData);
            } catch (error) {
                console.log(`Server error: ${error}`);
            }
        },

        async fetchOnePost(context, data) {
            const url = `/${process.env.VUE_APP_API_PATH}/post-get-one`;

            try {
                const response = await axios.get(url, {
                    headers: {
                        "Content-Type": 'application/json',
                    },
                    params: data
                });

                const postData = response.data;
                context.commit('setOnePost', postData); 
            }
            catch (error) {
                console.log(`Server error: ${error}`);
            }
        }
    },

    mutations: {
        setPosts(state, posts) { 
            state.posts = posts;
        },

        setOnePost(state, post) { 
            console.log(post);
            state.post = post; 
        }
    },

    getters: {
        getPosts(state) { 
            return state.posts; 
        },

        getOnePost(state) {
            console.log(state.post);
            const post = JSON.parse(JSON.stringify(state.post));
            return post;
        }
    }
}
