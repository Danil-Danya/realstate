<template>
    <div class="blog__slider">
        <div class="container">
            <div class="blog__slider-content swiper" pagination="true">
                <div class="blog__slider-wrapper swiper-wrapper">
                    <div class="blog__slider-item swiper-slide" v-for="(slide, index) in reversedLimitedArray" :key="slide">
                        <div class="blog__slider-img-container">
                            <div class="blog__slider-img-bg"></div>
                            <img :src="`/${img[index]}`" alt="" class="blog__slider-img">
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
                <div class="post-pagination"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/blog/slider.scss';

    .post-pagination {
        position: absolute;
        width: 300px !important;
        display: flex;
        justify-content: center;
        z-index: 99;
        gap: 10px;
        left: calc((100% / 2) - 150px) !important;
    }

    .post-bullet {
        display: block !important;
        background: #ffffff6b !important;
        width: 10px !important;
        height: 10px !important;
        border-radius: 100%;
        

        &-active {
            display: block !important;
            background: #fff !important;
            width: 60px !important;
            height: 10px !important ;
            border-radius: 30px;
            transition: 300ms;
        }
    }
</style>

<script>
import { mapActions, mapGetters } from 'vuex';

import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default {
    methods: mapActions(['fetchPost']),
    computed: mapGetters(['getPosts']),

    data: () => ({
        reversedLimitedArray: [],
        img: []
    }),

    async mounted () {
        await this.fetchPost()

        this.reversedLimitedArray = this.getPosts.slice().reverse().slice(0, 3);

        this.reversedLimitedArray.forEach((arr) => {
            const content = JSON.parse(arr.content);
            console.log(content);
            content.forEach(element => {
                if (element.type === 'IMAGE') {
                    this.img.push(element.path);
                }
            });
        })

        this.$nextTick(() => {
            const swiper = new Swiper('.blog__slider-content', {
                modules: [Pagination],
                pagination: {
                    el: '.post-pagination',
                    bulletClass: 'post-bullet',
                    bulletActiveClass: 'post-bullet-active',
                },
                spaceBetween: 40,
            })
        })
        console.log(this.img);
    }
}

</script>