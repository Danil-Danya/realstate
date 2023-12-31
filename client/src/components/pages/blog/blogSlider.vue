<template>
    <div class="blog__slider">
        <div class="container">
            <div class="blog__slider-content swiper">
                <div class="blog__slider-wrapper swiper-wrapper">
                    <div class="blog__slider-item swiper-slide" v-for="slide in reversedLimitedArray" :key="slide">
                        <div class="blog__slider-img-container">
                            <div class="blog__slider-img-bg"></div>
                            <img src="@/assets/images/site/pages/blog/slider/slide.png" alt="" class="blog__slider-img">
                        </div>
                        <div class="blog__slider-item-content">
                            <h2 class="blog__slider-mark">Latest blog</h2>
                            <p class="blog__slider-text">{{ slide.date }}, {{ slide.time }}</p>
                            <h2 class="blog__slider-title">{{ slide.title }}</h2>
                            <div class="blog__slider-views">
                                <span class="blog__slider-icon blog__slider-text">
                                    <i class="fa-solid fa-eye"></i>
                                </span>
                                <p class="blog__slider-text">{{ slide.views }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/blog/slider.scss';
</style>

<script>
import Swiper from 'swiper';
import { mapActions, mapGetters } from 'vuex';

import 'swiper/css';

export default {
    methods: mapActions(['fetchPost']),
    computed: mapGetters(['getPosts']),

    data: () => ({
        reversedLimitedArray: [],
    }),

    async mounted () {
        await this.fetchPost()

        this.reversedLimitedArray = this.getPosts.slice().reverse().slice(0, 3);

        console.log(this.reversedLimitedArray);

        const swiper = new Swiper('.blog__slider-content', {
            pagination: {
                el: '.swiper-pagination',
            },
            spaceBetween: 40,
        })
    }
}

</script>