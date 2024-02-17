<template>
    <section class="offers">
        <div class="container" ref="container">
            <h2 class="title offers__title">Best offers</h2>
            <div class="offers__button-container">
                <div class="offers__button-line">
                    <div>
                        <button type="button" class="btn btn-dark" ref="rent" @click="selectComb()">Rent</button>
                        <button type="button" class="btn btn-light" ref="buy" @click="selectComb()">Buy</button>
                    </div>
                    <span class="offers__line"></span>
                    <div class="offers__button-filter-slide">
                        <button type="button" v-for="(button, index) in filterButton" 
                         @click="selectButton(index); createFilterList(button)" :key="button" class="btn btn-light offers-button offers__button">
                                {{ button }}
                        </button>
                    </div>
                </div>
                <div class="offers__button-slider" v-if="initial">
                    <a href="#" class="offers__button-slide offer-prev"><i class="fa-solid fa-chevron-left"></i></a>
                    <a href="#" class="offers__button-slide offer-next"><i class="fa-solid fa-chevron-right"></i></a>
                </div>
            </div>
            <div class="offers__card-slider swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide tovar__item" v-for="(item, index) in getAppartaments" :key="item">
                        <router-link :to="`apartament/${item.name}`" class="tovar__link">
                            <img :src="`/${item.imgPaths.split(',')[0]}`" alt="Card" class="tovar__item-img">
                            <button class="tovar__company">{{ item.propertyType }}</button>
                        </router-link>
                        <span class="explore__like tovar__like" @click="setLikedTovar(item, index)"><i class="fa-regular fa-heart"></i></span>
                        <span class="explore__like tovar__like" @click="setLikedTovar(item, index)" v-if="item.liked"><i class="fa-solid fa-heart"></i></span>
                        <h3 class="tovar__name">{{ item.name }}</h3>
                        <ul class="tovar__container">
                            <li><span class="tovar__number">{{ item.beds }}</span><span class="tovar__text"> beds</span></li>
                            <li><span class="tovar__number">{{ item.baths }}</span><span class="tovar__text"> baths</span></li>
                            <li><span class="tovar__number">{{ item.square }}</span><span class="tovar__text"> square (ft)</span></li>
                        </ul>
                        <div class="tovar__price" v-if="combSelect === 'Rent'">
                            <h3 class="tovar__price-title">{{ item.priceForRent }}</h3>
                            <p class="tovar__text tovar__tern">month</p>
                        </div>
                        <div class="tovar__price" v-if="combSelect === 'Buy'">
                            <h3 class="tovar__price-title">{{ item.priceForBuy }}</h3>
                            <p class="tovar__text tovar__tern">for buy</p>
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
import 'swiper/css';

import { Navigation } from 'swiper/modules';
import { mapGetters, mapActions } from 'vuex';


import Select from '@/scripts/clieked';

export default {
    data: () => ({
        filterButton: ['Villa','Apartament','Townhouse',/*'Cottages','Penthouses'*/],
        combSelect: 'Rent',
        categoryList: [],
        initial: true
    }),

     methods: {
        selectButton(index) {
            const seldect = new Select('.offers-button', index);
            seldect.activateSelectButton();
        },

        setLikedTovar(item, itemIndex) {
            let tovars = localStorage.getItem('likedTovars');

            !tovars ? tovars = [] : tovars = JSON.parse(tovars);

            const index = tovars.indexOf(item.name);

            if (index !== -1) {
                tovars.splice(index, 1);
                this.getAppartaments[itemIndex].liked = false;
            } else {
                tovars.push(item.name);
                this.getAppartaments[itemIndex].liked = true;
            }

            localStorage.setItem('likedTovars', JSON.stringify(tovars));
            console.log(tovars);
        },

        async createFilterList(category) {
            const index = this.categoryList.indexOf(category);

            if (index !== -1) {
                this.categoryList.splice(index, 1);
            } 
            else {
                this.categoryList.push(category);
            }

             await this.fetchData();
        },

        ...mapActions('bestOffer', ['fetchAppartaments']),

        async fetchData() {
            const data = {
                isActive: 'true',
                isSlide: 'true',
                combSelect: this.combSelect,
                propertyType: this.categoryList
            }

            await this.fetchAppartaments(data);

            let swiperCard = new Swiper('.offers__card-slider', {
                slidesPerView: 5,
                modules: [Navigation],
                spaceBetween: 50,
                loop: true,

                navigation: {
                    nextEl: '.offer-next',
                    prevEl: '.offer-prev',
                }
            })

            this.updateSwiper(swiperCard);
        },

        async selectComb() {
            if (this.combSelect === 'Rent') {
                this.combSelect = 'Buy';

                this.$refs.buy.classList.add('btn-dark');
                this.$refs.buy.classList.remove('btn-light');

                this.$refs.rent.classList.add('btn-light');
                this.$refs.rent.classList.remove('btn-dark')
            } 
            else {
                this.combSelect = 'Rent';

                this.$refs.buy.classList.add('btn-light');
                this.$refs.buy.classList.remove('btn-dark');

                this.$refs.rent.classList.add('btn-dark');
                this.$refs.rent.classList.remove('btn-light')
            }

            await this.fetchData();
        },

        updateSwiper (swiperCard) {
            if (window.innerWidth < 1440) {
                swiperCard.params.slidesPerView = 4;
            }
            if (window.innerWidth < 1180) {
                swiperCard.params.slidesPerView = 3;
                console.log(window.innerWidth);
            }
            if (window.innerWidth < 940) {
                swiperCard.params.slidesPerView = 2;
            }

            if (swiperCard.params.slidesPerView >= this.getAppartaments.length) {
                this.initial = false;
            }
        }
    },

    computed: {
        ...mapGetters('bestOffer',['getAppartaments'])
    },
    async mounted () {
        await this.fetchData();

        let tovars = localStorage.getItem('likedTovars');
        !tovars ? tovars = [] : tovars = JSON.parse(tovars);

        this.getAppartaments.forEach((appartamet, index) => {
            tovars.forEach(tovar => {
                if (appartamet.name === tovar) {
                    this.getAppartaments[index].liked = true;
                    console.log('getAppartaments', this.getAppartaments);
                }
            })
        })
    }
}

</script>