<template>
    <div class="blog__slider">
        <h2 class="blog__slider-mark">Latest blog</h2>
        <div class="blog__slider-content swiper">
            <div class="blog__slider-wrapper swiper-wrapper">
                <div class="blog__slider-item swiper-slide" v-for="(item, index) in reversedLimitedArray" :key="item">
                    <div class="blog__slider-img-container">
                        <div class="blog__slider-img-bg"></div>
                        <img :src="`/${item.imgPaths}`" alt="" class="blog__slider-img">
                    </div>
                    <div class="blog__slider-item-content">
                        <h2 class="blog__slider-title">{{ item.title }}</h2>
                        <div class="blog__slider-info">
                            <div class="blog__slider-views">
                                <span class="blog__slider-icon blog__slider-text">
                                    <i class="fa-solid fa-eye"></i>
                                </span>
                                <p class="blog__slider-text">{{item.views}}</p>
                            </div>
                            <p class="blog__slider-text">{{ item.date }}, {{ item.time }}</p>
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

    async mounted() {
        await this.fetchPost()

        this.reversedLimitedArray = this.getPosts.slice().reverse().slice(0, 3);

        console.log(this.reversedLimitedArray);

        this.$nextTick(() => {
            const swiper = new Swiper('.blog__slider-content', {
                pagination: {
                    el: '.swiper-pagination',
                },
                spaceBetween: 40,
            })
        });
    }
}

</script>