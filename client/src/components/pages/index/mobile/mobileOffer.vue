<template>
    <div class="mobile__offer">
        <div class="container">
            <div class="mobile__offer-content">
                <h2 class="title mobile__offer-title">Best offers</h2>
                <div class="mobile__offer-buttons">
                    <button type="button" class="btn btn-dark" ref="rent" @click="selectComb()">Rent</button>
                    <button type="button" class="btn btn-light" ref="buy" @click="selectComb()">Buy</button>
                </div>
                <div class="mobile__offer-buttons-slider swiper">
                    <div class="mobile__button-wrapper swiper-wrapper">
                        <button type="button" v-for="(button, index) in filterButton" 
                         @click="selectButton(index); createFilterList(button)" :key="button" 
                         class="btn btn-light offers__button offers-button swiper-slide"
                        >
                            {{ button }}
                        </button>
                    </div>
                </div>
                <div class="mobile__offer-container">
                    <div class="apartament__mobile-card-container" v-for="(apartament,index) in getAppartaments" :key="apartament">
                        <div class="apartament__mobile-card-info">
                            <div class="apartament__mobile-type">
                                <div class="apartament__mobile-tag">
                                    <p class="apartament__mobile-type-text">{{ apartament.propertyType }}</p>
                                </div>
                            </div>
                            <div class="apartament__mobile-icons">
                                <span class="explore__like tovar__like" @click="setLikedTovar(apartament, index)"><i class="fa-regular fa-heart"></i></span>
                                <span class="explore__like tovar__like" @click="setLikedTovar(apartament, index)" v-if="apartament.liked"><i class="fa-solid fa-heart"></i></span>
                            </div>
                        </div>
                        <div class="apartamemt__mobile-card-content">
                            <div class="apartament__mobile-item" v-if="apartament.imgPaths">
                                <div class="apartament__mobile-images-container">
                                    <router-link :to="`/apartament/${apartament.name}`">
                                        <img :src="`/${apartament.imgPaths.split(',')[0]}`" alt="card" class="apartament__mobile-img" v-if="apartament.imgPaths">
                                        <img src="@/assets/images/static/tovarscard/Card.png" class="apartament__mobile-img" v-else>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <h3 class="explore__name tovar__name">{{ apartament.name }}</h3>
                        <ul class="explore__info-container tovar__container">
                            <li><span class="explore__number tovar__number">{{ apartament.beds }}</span><span class="explore__text tovar__text"> beds</span></li>
                            <li><span class="explore__number tovar__number">{{ apartament.baths }}</span><span class="explore__text tovar__text"> baths</span></li>
                            <li><span class="explore__number tovar__number">{{ apartament.square }}</span><span class="explore__text tovar__text"> square (ft)</span></li>
                        </ul>
                        <p class="explore__location tovar__location explore__text tovar__text"><i class="fa-solid fa-location-dot"></i> {{ apartament.addres }}</p>
                        <div class="explore__price tovar__price">
                            <h3 class="explore__price-title tovar__price-title" v-if="apartament.combSelect === 'Rent' || 'Rent and buy'">{{ apartament.priceForRent }} AED</h3>
                            <h3 class="explore__price-title tovar__price-title" v-else>{{ apartament.priceForNuy }} AED</h3>
                            <p class="explore__text tovar__text explore__term tovar__tern"  v-if="apartament.combSelect === 'Rent' || 'Rent and buy'">month</p>
                        </div>
                    </div>
                </div>
                <div class="mobile__offer-map-container">
                    <router-link to="/map/1" class="mobile__offer-map">All properties</router-link>
                </div>
            </div>
        </div>
    </div>
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
        filterButton: ['Villa', 'Apartament', 'Townhouse'],
        categoryList: []
    }),

    methods: {
        selectButton(index) {
            const seldect = new Select('.offers-button', index);
            seldect.activateSelectButton();
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
                firstSlide: 'true',
                combSelect: this.combSelect,
                propertyType: this.categoryList,
                limit: 6
            }

            await this.fetchAppartaments(data);
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
        }
    },

    computed: {
        ...mapGetters('bestOffer', ['getAppartaments'])
    },
    async mounted() {
        await this.fetchData();

        let tovars = localStorage.getItem('likedTovars');
        !tovars ? tovars = [] : tovars = JSON.parse(tovars);

        console.log(this.getAppartaments);

        this.getAppartaments.forEach((appartamet, index) => {
            tovars.forEach(tovar => {
                if (appartamet.name === tovar) {
                    this.getAppartaments[index].liked = true;
                }
            })
        })

        console.log(this.getAppartaments);

        const swiper = new Swiper('.mobile__offer-buttons-slider ', {
            slidesPerView: 2.1,
            modules: [Navigation],
            spaceBetween: 10,
            loop: false,
        })
    }
}

</script>