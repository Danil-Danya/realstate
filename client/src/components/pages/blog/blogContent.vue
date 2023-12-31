<template>
    <div class="blog__content">
        <div class="container">
            <div class="blog__content-content">
                <div class="blog__content-container">
                    <div class="blog__content-top">
                        <h1 class="blog__title">All blogs</h1>
                    </div>
                    <div class="blog__content-catalog">
                        <div class="blog__item blog__content-item" v-for="blog in getPosts" :key="blog">
                            <router-link :to="`/post/${blog.title}`">
                                <img :src="`/${blog.imgPaths}`" alt="Blog card" class="blog__img blog__content-img">
                            </router-link>
                            <p class="blog__text">{{ blog.title.length < 50 ? blog.title : blog.title.slice(0, 50) + '...' }}</p>
                            <div class="blog__initial">
                                <p class="blog__views"><i class="fa-solid fa-eye"></i> 1 456</p>
                                <p class="blog__date">August 30, 2023 18:34</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/blog/content.scss';
</style>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    methods: mapActions(['fetchPost']),
    computed: mapGetters(['getPosts']),

    async mounted() {
        await this.fetchPost()
    }
}

</script>