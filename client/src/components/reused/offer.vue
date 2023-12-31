<template>
    <section class="offers">
        <div class="container" ref="container">
            <h2 class="title offers__title">Best offers</h2>
            <div class="offers__button-container">
                <div class="offers__button-line">
                    <div>
                        <button type="button" class="btn btn-dark">Rent</button>
                        <button type="button" class="btn btn-light">Buy</button>
                    </div>
                    <span class="offers__line"></span>
                    <div class="offers__button-filter-slide">
                        <button type="button" v-for="(button, index) in filterButton" 
                        @click="selectButton(index)" :key="button" class="btn btn-light offers__button offers-button">
                                {{ button }}
                        </button>
                    </div>
                </div>
                <div class="offers__button-slider">
                    <a href="#" class="offers__button-slide offer-prev"><i class="fa-solid fa-chevron-left"></i></a>
                    <a href="#" class="offers__button-slide offer-next"><i class="fa-solid fa-chevron-right"></i></a>
                </div>
            </div>
            <div class="offers__card-slider swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide tovar__item" v-for="item in getAppartaments" :key="item">
                        <router-link :to="`apartament/${item.name}`">
                            <img :src="`/${item.imgPaths.split(',')[0]}`" alt="Card" class="tovar__item-img">
                        </router-link>
                        <button class="tovar__company">{{ item.propertyType }}</button>
                        <span class="explore__like tovar__like"><i class="fa-regular fa-heart"></i></span>
                        <p class="tovar__rate"><i class="fa-solid fa-star"> </i> 4.7 (13)</p>
                        <h3 class="tovar__name">{{ item.name }}</h3>
                        <ul class="tovar__container">
                            <li><span class="tovar__number">3</span><span class="tovar__text"> beds</span></li>
                            <li><span class="tovar__number">3</span><span class="tovar__text"> baths</span></li>
                            <li><span class="tovar__number">3, 170</span><span class="tovar__text"> square (ft)</span></li>
                        </ul>
                        <p class="tovar__location tovar__text"><i class="fa-solid fa-location-dot"></i> Hera tower, Dubai sports city</p>
                        <div class="tovar__price">
                            <h3 class="tovar__price-title">70 000 AED</h3>
                            <p class="tovar__text tovar__tern">month</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/index/offers.scss';
</style>

<script>
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { mapGetters, mapActions } from 'vuex';


import Select from '@/scripts/clieked';

export default {
    data: () => ({
        filterButton: ['Villa','Apartment','Townhouse']
    }),

     methods: {
        selectButton(index) {
            const seldect = new Select('.offers-button', index);
            seldect.activateSelectButton();
        },

        ...mapActions('bestOffer', ['fetchAppartaments']),

        async fetchData() {
            const data = {
                isActive: 'true',
                firstSlide: 'true'
            }

            await this.fetchAppartaments(data);
        }
    },

    computed: {
        ...mapGetters('bestOffer',['getAppartaments'])
    },
    async mounted () {
        await this.fetchData();

        console.log(this.getAppartaments);

        const swiper = new Swiper('.offers__card-slider', {
            slidesPerView: this.$refs.container.clientWidth > 1440 ? 5 : 4,
            modules: [Navigation],
            spaceBetween: 50,
            loop: true,

            navigation: {
                nextEl: '.offer-next',
                prevEl: '.offer-prev',
            }
        })
    }
}

</script>