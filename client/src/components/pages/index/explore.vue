<template>
    <section class="explore">
        <div class="container">
            <h2 class="explore__title">Explore houses in Dubai</h2>
            <div class="explore__container">
                <div class="explore__button">
                    <div class="explore__button-type">
                        <button type="button" class="btn btn-dark">Rent</button>
                        <button type="button" class="btn btn-light">Buy</button>
                    </div>
                    <span class="explore__stick"></span>                    
                    <div class="swiper explore__button-swiper">
                        <div class="explore__button-list btn-group swiper-wrapper">
                            <div class="swiper-slide explore__button-slide"  v-for="(button, index) in buttons" :key="button">
                                <button type="button" class="btn btn-secondary explore__button-el" @click="selectButton(index)" ref="btn">{{ button.name }}</button>
                            </div>
                        </div>
                    </div>
                    <span class="explore__next">
                        <i class="fa-solid fa-chevron-right"></i>
                    </span>
                </div>
                <div class="explore__content">
                    <div class="explore__left">
                        <div class="explore__filter">
                            <h3 class="explore__title-filter">Over 300 houses in Dubai</h3>
                            <div class="explore__filter-buttons">
                                <p class="explore__filter-text">sort by</p>
                                <div class="dropdown">
                                    <button class="btn btn-secondary explore__button-el" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                                        <span>Location</span>
                                        <span class="dot"><i class="fa-solid fa-angle-down"></i></span>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="explore__content-container">
                            <div class="explore__item tovar__item" v-for="item in getAppartaments" :key="item">
                                <img :src="`/${item.imgPaths.split(',')[0]}`" alt="Card" class="explore__item-img tovar__item-img">
                                <button class="explore__company tovar__company">{{ item.propertyType }}</button>
                                <span class="explore__like tovar__like"><i class="fa-regular fa-heart"></i></span>
                                <p class="tovar__rate"><i class="fa-solid fa-star"></i> 4.7 (13)</p>
                                <h3 class="explore__name tovar__name">{{ item.name }}</h3>
                                <ul class="explore__info-container tovar__container">
                                    <li><span class="explore__number tovar__number">{{ item.beds }}</span><span class="explore__text tovar__text"> beds</span></li>
                                    <li><span class="explore__number tovar__number">{{ item.baths }}</span><span class="explore__text tovar__text"> baths</span></li>
                                    <li><span class="explore__number tovar__number">{{ item.square }}</span><span class="explore__text tovar__text"> square (ft)</span></li>
                                </ul>
                                <p class="explore__location tovar__location explore__text tovar__text"><i class="fa-solid fa-location-dot"></i> {{ item.addres }}</p>
                                <div class="explore__price tovar__price">
                                    <h3 class="explore__price-title tovar__price-title" v-if="item.combSelect === 'Rent' || 'Rent and buy'">{{ item.priceForRent }} AED</h3>
                                    <h3 class="explore__price-title tovar__price-title" v-else>{{ item.priceForNuy }} AED</h3>
                                    <p class="explore__text tovar__text explore__term tovar__tern"  v-if="item.combSelect === 'Rent' || 'Rent and buy'">month</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="explore__right">
                        <iframe 
                            class="explore__map"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5031.915269539556!2d34.793992!3d50.906!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4129018b81f9f811%3A0xa6ca7199006f26e2!2z0J3QsNGG0ZbQvtC90LDQu9GM0L3QuNC5INCw0LrQsNC00LXQvNGW0YfQvdC40Lkg0YLQtdCw0YLRgCDQtNGA0LDQvNC4INGC0LAg0LzRg9C30LjRh9C90L7RlyDQutC-0LzQtdC00ZbRlyDRltC8LiDQnC7QoS7QqdC10L_QutGW0L3QsA!5e0!3m2!1sru!2s!4v1701029225342!5m2!1sru!2s"
                            width="600" height="450" 
                            style="border:0;" 
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
@import '@/assets/styles/pages/index/explore.scss';
</style>

<script>
import Swiper from 'swiper';
import Select from '@/scripts/clieked.js';

import { Navigation } from 'swiper/modules';
import { mapActions, mapGetters } from 'vuex';

import 'swiper/css';

export default {
    data: () => ({
        select: new Select('.explore__button-el'),
        buttons: [
            {
                selected: false,
                name: 'Dates: Any'
            },
            {
                selected: false,
                name: 'Guest: Any'
            },
            {
                selected: false,
                name: 'Bedrooms: Any'
            },
            {
                selected: false,
                name: 'Beds: Any'
            },
            {
                selected: false,
                name: 'Bathrooms: Any'
            },
            {
                selected: false,
                name: 'Property type'
            },
            {
                selected: true,
                name: 'Location'
            },
            {
                selected: true,
                name: 'Rating: Any'
            },
            {
                selected: false,
                name: 'Projects'
            },
            {
                selected: false,
                name: 'Projects'
            },
            {
                selected: false,
                name: 'Projects'
            },
            {
                selected: false,
                name: 'Projects'
            },
            {
                selected: false,
                name: 'Projects'
            },
        ]
    }),

    methods: {
        selectButton (index) {
            const seldect = new Select('.explore__button-el', index);
            seldect.activateSelectButton();
        },
        ...mapActions('explore', ['fetchAppartaments']),
        
        async fetchData () {
            const data = {
                isActive: 'true',
                limit: 15
            }

            await this.fetchAppartaments(data);
        }
    },
    computed : {
        ...mapGetters('explore', ['getAppartaments'])
    },

    async mounted () {
        await this.fetchData();
        console.log(this.getAppartaments);

        const buttons = this.$refs.btn;

        const swiper = new Swiper('.explore__button-swiper', {
            slidesPerView: 5.2,
            spaceBetween: 20,
            modules: [ Navigation ],
            navigation: {
                nextEl: '.explore__next',
            },
        })
    }
}

</script>
