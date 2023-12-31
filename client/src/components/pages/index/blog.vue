<template>
    <section class="blog">
        <div class="container">
            <h2 class="title blog__title">Blog</h2>
            <div class="blog__content">
                <div class="blog__slider swiper">
                    <div class="blog__wrapper swiper-wrapper">
                        <div class="blog__item swiper-slide" v-for="blog in getPosts" :key="blog">
                            <router-link :to="`/post/${blog.title}`">
                                <img v-if="blog.imgPaths" :src="`/${blog.imgPaths}`" alt="Blog card" class="blog__img">
                            </router-link>
                            <p class="blog__text">
                                {{ blog.title.length < 50 ? blog.title : blog.title.slice(0, 50) + '...' }}
                            </p>
                            <div class="blog__initial">
                                <p class="blog__views"><i class="fa-solid fa-eye"></i> {{ blog.views }}</p>
                                <p class="blog__date">{{ blog.date }}, {{ blog.time }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/index/blog.scss';
</style>

<script>
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { mapGetters, mapActions } from 'vuex';

export default {
    methods: mapActions(['fetchPost']),
    computed: mapGetters(['getPosts']),

    async mounted () {
        await this.fetchPost();
        console.log(this.getPosts);

        const swiper = new Swiper('.blog__slider', {
            slidesPerView: 3.4,
            spaceBetween: 50,
            loop: true
        })
    }
}

</script>