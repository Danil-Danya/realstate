<template>
    <div class="blog" v-if="windowWidth >= 580">
        <div class="container">
            <div class="blog__content">
                <div class="blog__slider swiper">
                    <div class="blog__wrapper swiper-wrapper">
                        <div class="blog__item swiper-slide" v-for="blog in 10" :key="blog">
                            <img src="@/assets/images/static/blogcard/blog.jpg" alt="Blog card" class="blog__img">
                            <p class="blog__text">Apartment at Royal Atlantis sets new record at Dh 12,387 per square foot on Palm Jumeirah</p>
                            <div class="blog__initial">
                                <p class="blog__views"><i class="fa-solid fa-eye"></i> 1 456</p>
                                <p class="blog__date">August 30, 2023 18:34</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/assets/styles/pages/post/slider.scss';
</style>

<script>
import Swiper from 'swiper';
import 'swiper/css';

export default {
    data: () => ({
        windowWidth: window.innerWidth
    }),
    
    mounted () {
        let countSlidesFromWinfowWidth = 3.4;

        if (this.windowWidth < 1250) {
            countSlidesFromWinfowWidth = 3;
        }
        if (this.windowWidth < 800) {
            countSlidesFromWinfowWidth = 2;
        }

        const swiper = new Swiper('.blog__slider', {
            slidesPerView: countSlidesFromWinfowWidth,
            spaceBetween: 50,
            loop: true
        })
    }
}

</script>