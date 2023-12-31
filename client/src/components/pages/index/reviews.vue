<template>
    <secrion class="reviews">
        <div class="container">
            <div class="reviews__content">
                <h2 class="title reviews__title">Testimonials</h2>
                <div class="swiper reviews__swiper">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide reviews__slide" v-for="slide in 5" :key="slide">
                            <div class="reviews__slide-container">
                                <div class="reviews__avatar-container">
                                    <img src="@/assets/images/site/pages/index/reviews/avatar.png" alt="Avatar" class="reviews__avatar">
                                </div>
                                <div class="reviews__grade">
                                    <span class="reviews__icon" v-for="star in 5" :key="star">
                                        <i class="fa-solid fa-star"></i>
                                    </span>
                                </div>
                                <p class="reviews__text">If you want real marketing that works and effective implementation - mobile app's got you covered.If you want real marketing that works and effective implementation - mobile app's got you covered.</p>
                                <div class="reviews__initial">
                                    <div>
                                        <p class="reviews__name">Amal Dolgih</p>
                                        <p class="reviews__date">4 moths ago</p>
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

export default {
    mounted () {
        var swiper = new Swiper(".reviews__swiper", { loop: true, slidesPerView: 2.6, spaceBetween: 30 });
    }
}
</script>