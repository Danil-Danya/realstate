<template>
    <div class="blog__slider">
        <h2 class="blog__slider-mark">Latest blog</h2>
        <div class="blog__slider-content swiper">
            <div class="blog__slider-wrapper swiper-wrapper">
                <div class="blog__slider-item swiper-slide" v-for="(item, index) in reversedLimitedArray" :key="item">
                    <div class="blog__slider-img-container">
                        <div class="blog__slider-img-bg"></div>
                        <img :src="`/${img[index]}`" alt="" class="blog__slider-img">
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
        <div class="post-pagination-mobile"></div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/blog/slider.scss';

    .post-pagination-mobile {
        position: absolute;
        width: 300px !important;
        display: flex;
        justify-content: center;
        gap: 10px;
        bottom: auto !important;
        left: calc((100% / 2) - 150px) !important;
        margin-top: 15px !important;
    }

    .post-bullet-mobile {
        display: block !important;
        background: #2e2e2e !important;
        width: 10px !important;
        height: 10px !important;
        border-radius: 100%;
        transition: 300ms;

    }
    .post-bullet-active-mobile {
        display: block !important;
        background: #303030 !important;
        width: 60px !important;
        height: 10px !important ;
        border-radius: 30px;
        transition: 300ms;
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

    async mounted() {
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

        console.log(this.reversedLimitedArray);

        this.$nextTick(() => {
            const swiper = new Swiper('.blog__slider-content', {
                modules: [Pagination],
                pagination: {
                    el: '.post-pagination-mobile',
                    bulletClass: 'post-bullet-mobile',
                    bulletActiveClass: 'post-bullet-active-mobile',
                },
                spaceBetween: 40,
            })
        });
    }
}

</script>