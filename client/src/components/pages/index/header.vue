<template>
    <header class="header">
        <div class="container">
            <div class="header__content">
                <div class="header__swiper-container">
                    <div class="swiper header__swiper">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide header__slide" v-for="(slide, index) in getAppartaments" :key="slide">
                                <div class="header__item">
                                    <h1 class="header__title" v-if="index === 0">{{ slide.name.length > 15 ? slide.name.slice(0, 15) + '...' : slide.name }}</h1>
                                    <h2 class="header__title" v-else>{{ slide.name.length > 15 ? slide.name.slice(0, 15) + '...' : slide.name }}</h2>
                                    <p class="header__info">{{ slide.beds }} bedrooms, {{ slide.baths }} bathrooms, {{ slide.square }} square(ft) </p>
                                    <router-link :to="`/apartament/${slide.name}`" class="header__link-text">More details</router-link>
                                    <div class="header__button-container">
                                        <div class="header-prev"><i class="fa-solid fa-chevron-left"></i></div>
                                        <div class="header-next"><i class="fa-solid fa-chevron-right"></i></div>
                                    </div>                                    
                                </div>
                                <img ref="img" class="header__img" :src="`/${slide.imgPaths.split(',')[0]}`" alt="bg">
                                <div class="header__bg"></div>
                                <div class="header__link-container">
                                    <ul>
                                        <li v-if="slide.imgPaths.split(',').length > 1" class="header__link-bg">
                                            <router-link :to="`/apartament/${slide.name}`" class="header__link">
                                                <img :src="`/${slide.imgPaths.split(',')[1]}`" alt="Link" class="header__link-img">
                                                <p class="header__link-length" v-if="slide.imgPaths.split(',').length < 3">+{{ slide.imgPaths.split(',').length }}</p>
                                            </router-link>
                                        </li>
                                        <li v-if="slide.imgPaths.split(',').length > 2" class="header__link-bg">
                                            <router-link :to="`/apartament/${slide.name}`" class="header__link">
                                                <img :src="`/${slide.imgPaths.split(',')[2]}`" alt="Link" class="header__link-img">
                                                <p class="header__link-length" v-if="slide.imgPaths.split(',').length < 4">+{{ slide.imgPaths.split(',').length }}</p>
                                            </router-link>
                                        </li>
                                        <li v-if="slide.imgPaths.split(',').length > 3" class="header__link-bg">
                                            <router-link :to="`/apartament/${slide.name}`" class="header__link">
                                                <img :src="`/${slide.imgPaths.split(',')[3]}`" alt="Link" class="header__link-img">
                                                <p class="header__link-length">+{{ slide.imgPaths.split(',').length }}</p>
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-pagination header__pagination"></div>
                        <div class="swiper-scrollbar"></div>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/index/header.scss';
</style>

<script>
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { mapGetters, mapActions } from 'vuex';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import Swiper styles
export default {
    data: () => ({
        slider: [
            {
                img: require('@/assets/images/site/pages/index/slider/slide1.png'),
                descripton: '3 bedrooms, 1 kitchen, 2 bathrooms',
                name: 'Modern house'
            },
            {
                img: require('@/assets/images/site/pages/index/slider/slide1.png'),
                descripton: '3 bedrooms, 1 kitchen, 2 bathrooms',
                name: 'Modern house'
            },
            {
                img: require('@/assets/images/site/pages/index/slider/slide1.png'),
                descripton: '3 bedrooms, 1 kitchen, 2 bathrooms',
                name: 'Modern house'
            },
        ],
        paginationState: false
    }),
    computed: mapGetters('sliderHomePage', ['getAppartaments']),
    methods: {
        ...mapActions('sliderHomePage', ['fetchAppartaments']),

        async setImgWidth () {
            const img = this.$refs.img;
            const width = window.innerWidth;
            console.log(width);
            
            img.forEach(el => {
                el.style.width = `${width}px`;
            });
        },

        async fetchData () {
            const data = {
                isSlide: 'true',
                isActive: 'true'
            }

            await this.fetchAppartaments(data);
        }
    },
    async mounted () {
        await this.fetchData();
        await this.setImgWidth();
        console.log(this.getAppartaments);

        const swiper = new Swiper('.header__swiper',{
            modules: [Navigation, Pagination, Autoplay],
            loop: true,
            spaceBetween: 50,
            navigation: {
                nextEl: '.header-next',
                prevEl: '.header-prev',
            },

            // autoplay: {
            //     //delay: 5000,
            //     disableOnInteraction: false,
            // },

            scrollbar: {
                el: '.swiper-scrollbar',
            },
        })
    }
};
</script>