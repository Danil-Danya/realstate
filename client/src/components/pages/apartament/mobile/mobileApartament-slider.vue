<template>
    <div class="apartament__mobile-slider">
        <div class="container">
            <div class="apartament__mobile-links">
                <router-link to="/map" class="apartament__mobile-link">Show in map</router-link>
            </div>
        </div>
        <div class="apartament__mobile-slider-container">
            <div class="apartament__mobile-slider-info">
                <div class="apartament__mobile-type">
                    <div class="apartament__mobile-tag">
                        <p class="apartament__mobile-type-text">{{ dataContent.propertyType }}</p>
                    </div>
                    <div class="apartament__mobile-tag">
                        <p class="apartament__mobile-type-text">{{ dataContent.combSelect }}</p>
                    </div>
                </div>
                <div class="apartament__mobile-icons">
                    <span class="apartament__mobile-icon">
                        <i class="fa-solid fa-share-nodes"></i>
                    </span>
                    <span class="apartament__mobile-icon">
                        <i class="fa-regular fa-heart"></i>
                    </span>
                </div>
            </div>
            <div class="apartamemt__mobile-slider-content swiper">
                <div class="apartament__mobile-wrapper swiper-wrapper">
                    <div class="apartament__mobile-item swiper-slide" v-if="dataImages.imgPaths" v-for="slide in dataImages.imgPaths.split(',')" :key="slide">
                        <div class="apartament__mobile-images-container">
                            <img :src="`http://localhost:5000/${slide}`" alt="" class="apartament__mobile-img">
                        </div>
                    </div>
                </div>
            </div>
            <div class="apartament__mobile-pagination"></div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/apartament/mobile/mobile-slider-apartament.scss';
</style>

<script>
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';


export default {
    data: () => ({
        apartamentSliderImages: [
            require('@/assets/images/site/pages/apartament/preview.png'),
            require('@/assets/images/site/pages/apartament/apartament1 (1).png'),
            require('@/assets/images/site/pages/apartament/apartament1 (2).png'),
            require('@/assets/images/site/pages/apartament/apartament1 (3).png'),
        ]
    }),

    mounted () {
        const swiper = new Swiper('.apartamemt__mobile-slider-content',{
            slidesPerView: 1,
            modules: [Pagination],
            pagination: {
                el: ".apartament__mobile-pagination",
                bulletClass: 'apartament__mobile-pagination-bullet',
                bulletActiveClass: 'apartament__mobile-pagination-bullet-active',
                //dynamicBullets: true,
            },
            loop: true
        })
    },

    props: {
        dataImages: Object,
        dataContent: Object
    }
}

</script>