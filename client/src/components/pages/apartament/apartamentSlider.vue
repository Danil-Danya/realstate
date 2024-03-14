<template>
    <transition name="apartament-slider">
        <div class="apartament__slider" v-if="dataSlider.slider" @click="changeSlider">
            <div class="apartament__slider-chrest" @click="changeSlider">
                <span><i class="fa-solid fa-xmark" ></i></span>
            </div>
            <div class="apartament__slider-content" ref="slider" v-show="!tale" @click.stop>
                <div class="apartament__slider-container swiper">
                    <div class="apartament__slider-wrapper swiper-wrapper">
                        <div class="apartament__slider-slide swiper-slide" v-if="dataImages.imgPaths" v-for="img in dataImages.imgPaths.split(',')" :key="img">
                            <img :src="`/${img}`" alt="Slide" class="apartament__slider-img" ref="images">
                        </div>
                    </div>
                </div>
            </div>
            <div class="apartament__slider-tale" v-show="tale" @click.stop>
                <div class="apartament__slider-slide" v-if="dataImages.imgPaths" v-for="img in dataImages.imgPaths.split(',')" :key="img">
                    <img :src="`/${img}`" alt="Slide" class="apartament__slider-img-tale" >
                </div>
            </div>
            <div class="apartament__slider-navigation" @click.stop>
                <div class="apartament__slider-buttons">
                    <div class="apartament__button-prev apartament__slider-button">
                        <i class="fa-solid fa-angle-left"></i>
                    </div>
                    <div class="apartament__slider-button apartament__slider-tile" @click="changeLoop" v-if="!tale">
                        <i class="fa-solid fa-table-cells-large"></i>
                    </div>
                    <div class="apartament__slider-button apartament__slider-tile" @click="changeLoop" v-else>
                        <i class="fa-solid fa-tablet"></i>
                    </div>
                </div>
                <div class="apartament__slider-buttons">
                    <div class="apartament__slider-button apartament__slider-fullscreen" @click="changeWindow" v-if="!fullscreen">
                        <i class="fa-solid fa-expand"></i>
                    </div>
                    <div class="apartament__slider-button apartament__slider-default" @click="changeWindow" v-else>
                        <i class="fa-solid fa-minimize"></i>
                    </div>
                    <div class="apartament__button-next apartament__slider-button">
                        <i class="fa-solid fa-angle-right"></i>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/apartament/slider.scss';
</style>

<script>
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css'

export default {
    data: () => ({
        fullscreen: false,
        tale: false
    }),

    props: {
        dataImages: Object,
        dataSlider: Object
    },

    watch: {
        'dataSlider': {
            immediate: true,
            handler(newVal) {
                if (newVal) {
                    this.$nextTick(() => {
                        this.initializeSwiper();
                    });
                }
            }
        },
    },

    methods: {
        changeSlider() {
            this.dataSlider.slider = false;
            this.fullscreen = false;
            this.tale = false;
            this.dataSlider.index = 0;
        },

        changeLoop () {
            this.tale = !this.tale;
            this.initializeSwiper()
        },

        changeWindow() {
            let slider = this.$refs.slider;
            let images = this.$refs.images;

            if (slider && images) {
                images.forEach(img => {
                    img.classList.toggle('apartament__slider-img-fullscrean');
                });

                slider.classList.toggle('apartament__slider-fullscrean');

                this.fullscreen = !this.fullscreen;
            }
        },

        initializeSwiper() {
            const swiper = new Swiper('.apartament__slider-container', {
                modules: [Navigation],
                navigation: {
                    prevEl: '.apartament__button-prev',
                    nextEl: '.apartament__button-next',
                },
                spaceBetween: 50,
                initialSlide: this.dataSlider.index || 0,
            });
        }
    },

    mounted () {
        console.log(this.dataImages);
        console.log(this.dataSlider);
    }
}

</script>