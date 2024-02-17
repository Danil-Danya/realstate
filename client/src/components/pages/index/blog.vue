<template>
    <section class="blog">
        <div class="container">
            <h2 class="title blog__title">Blog</h2>
            <div class="blog__content">
                <div class="blog__content">
                    <div class="blog__slider swiper">
                        <div class="blog__wrapper swiper-wrapper">
                            <div class="blog__item blog__content-item swiper-slide" v-for="(blog, index) in getPosts" :key="blog">
                                <router-link :to="`/post/${blog.title}`">
                                    <img :src="`/${firstImages[index]}`" alt="Blog card" class="blog__img blog__content-img">
                                </router-link>
                                <p class="blog__text">{{ blog.title.length < 50 ? blog.title : blog.title.slice(0, 50) + '...' }}</p>
                                <div class="blog__initial" v-if="initial">
                                    <p class="blog__views"><i class="fa-solid fa-eye"></i> {{ blog.views }} </p>
                                    <p class="blog__date">{{ blog.date }}</p>
                                </div>
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
    data: () => ({
        firstImages: [],
        initial: true
    }),

    methods: mapActions(['fetchPost']),
    computed: mapGetters(['getPosts']),

    async mounted () {
        await this.fetchPost();

        this.getPosts.forEach(item => {
            const content = JSON.parse(item.content);

            content.some(obj => {
                if (obj.type === 'IMAGE') {
                    this.firstImages.push(obj.path);
                    return true;
                }
                return false;
            });
        });

        const swiper = new Swiper('.blog__slider', {
            slidesPerView: 3.4,
            spaceBetween: 50,
            loop: true
        })

        if (window.innerWidth < 1440) {
            swiper.params.slidesPerView = 2;
        }

        if (window.innerWidth < 1140) {
            swiper.params.slidesPerView = 1;
        }
    }
}

</script>