<template>
    <section class="line swiper">
        <div class="line__content swiper-wrapper">
            <div class="line__item swiper-slide" v-for="item in 20" :key="item">
                <p class="line__text">we have reason to be proud</p>
                <span class="line__dot"></span>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
@import '@/assets/styles/pages/index/line.scss';
</style>

<script>
import Swiper from 'swiper';
import { Mousewheel, Autoplay } from 'swiper/modules';

export default {
    mounted () {
        const mySwiper = new Swiper('.line', {
            modules: [ Mousewheel, Autoplay ],
            direction: 'horizontal',
            slidesPerView: 9,
            mousewheel: true,
            freeMode: true, 
            loop: true,
            allowTouchMove: (swiper, event) => event.type === 'mousemove',
        });
    }
}


</script>