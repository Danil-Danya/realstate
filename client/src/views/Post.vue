<template>
    <div class="post">
        <postPath/>
        <postContent :dataContent="dataContent"/>
        <postTags :dataTags="dataTags"/>
        <postSlider :posts="posts"/>
        <postBlogVue :posts="posts"/>
    </div>
</template>

<script>
import postPath from '../components/pages/post/postPath.vue';
import postContent from '../components/pages/post/postContent.vue';
import postTags from '../components/pages/post/postTags.vue';
import postSlider from '../components/pages/post/postSlider.vue';
import postBlogVue from '../components/pages/post/mobile/postBlog.vue';

import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';

export default {
    components: {
        postPath,
        postContent,
        postTags,
        postSlider,
        postBlogVue, 
    },
    
    data: () => ({
        dataContent: {},
        dataTags: {},
        posts: []
    }),

    methods: {
        ...mapActions(['fetchOnePost']),
        ...mapActions(['fetchPost']),
    },
    computed: {
        ...mapGetters(['getPosts']),
        ...mapGetters(['getOnePost']),
    },

    async mounted() {
        const data = {
            title: this.$route.params.title
        }

        await this.fetchOnePost(data);
        await this.fetchPost();

        this.dataContent.date = this.getOnePost.date;
        this.dataContent.time = this.getOnePost.time;
        this.dataContent.views = this.getOnePost.views;
        this.dataContent.title = this.getOnePost.title;
        this.dataContent.content = JSON.parse(this.getOnePost.content);

        this.dataTags.tags = this.getOnePost.tags.split(',');
        
        this.posts = this.getPosts
        document.title = this.$route.params.title;
        

        const url = '/server-api/post-views';
        const dataViews = {
            id: this.getOnePost.id
        }

        if (localStorage.getItem('viewed') != this.getOnePost.id) {
            axios.put(url, dataViews);
            localStorage.setItem('viewed', this.getOnePost.id);
        }
    }
}

</script>