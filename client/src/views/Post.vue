<template>
    <div class="post">
        <postPath/>
        <postContent :dataContent="dataContent"/>
        <postTags :dataTags="dataTags"/>
        <postSlider/>
        <postBlogVue/>
    </div>
</template>

<script>
import postPath from '../components/pages/post/postPath.vue';
import postContent from '../components/pages/post/postContent.vue';
import postTags from '../components/pages/post/postTags.vue';
import postSlider from '../components/pages/post/postSlider.vue';
import postBlogVue from '../components/pages/post/mobile/postBlog.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
    components: {
        postPath,
        postContent,
        postTags,
        postSlider,
        postBlogVue
    },

    data: () => ({
        dataContent: {},
        dataTags: {}
    }),

    methods: mapActions(['fetchOnePost']),
    computed: mapGetters(['getOnePost']),

    async mounted() {
        const data = {
            title: this.$route.params.title
        }

        await this.fetchOnePost(data);

        this.dataContent.imgPaths = this.getOnePost.imgPaths;
        this.dataContent.date = this.getOnePost.date;
        this.dataContent.time = this.getOnePost.time;
        this.dataContent.views = this.getOnePost.views;
        this.dataContent.title = this.getOnePost.title;
        this.dataContent.text = this.getOnePost.text

        this.dataTags.tags = this.getOnePost.tags.split(',');

        console.log(this.getOnePost);
        document.title = this.$route.params.title;
    }
}

</script>