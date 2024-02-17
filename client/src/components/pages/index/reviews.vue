<template>
    <secrion class="reviews">
        <div class="container">
            <div class="reviews__content">
                <h2 class="title reviews__title">Testimonials</h2>
                <div class="swiper reviews__swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide reviews__slide" v-for="slide in getReviews" :key="slide">
                            <div class="reviews__slide-container">
                                <div class="reviews__avatar-container">
                                    <img :src="slide.profile_photo_url" alt="Avatar" class="reviews__avatar">
                                </div>
                                <div class="reviews__grade">
                                    <span class="reviews__icon" v-for="star in slide.rating" :key="star">
                                        <i class="fa-solid fa-star"></i>
                                    </span>
                                </div>
                                <p class="reviews__text">{{ slide.text }}</p>
                                <div class="reviews__initial">
                                    <div>
                                        <p class="reviews__name">{{ slide.author_name }}</p>
                                        <p class="reviews__date">{{ slide.relative_time_description }}</p>
                                    </div>
                                    <div>
                                        <p class="reviews__light">from</p>
                                        <img src="@/assets/images/site/pages/index/reviews/google.png" alt="Google logo" class="reviews__google">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </secrion>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/index/reviews.scss';
</style>

<script>
import Swiper from 'swiper'
import 'swiper/css';
import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        windowWidth: window.innerWidth,
        rewievs: []
    }),

    computed: {
        ...mapGetters(['getReviews'])
    },

    methods: {
        ...mapActions(['fetchReviews']),
        handleResize() {
            this.windowWidth = window.innerWidth;
        },
    },

    async mounted () {
        await this.fetchReviews();
        console.log(this.getReviews);
        const swiper = new Swiper(".reviews__swiper", { loop: true, slidesPerView: 2.6, spaceBetween: 30 });

        document.addEventListener('resize', this.handleResize);

        if (this.windowWidth < 1440) {
            swiper.params.slidesPerView = 2;
        }

        if (this.windowWidth < 1140) {
            swiper.params.slidesPerView = 1;
        }
    }
}
</script>