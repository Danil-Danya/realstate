<template>
    <div class="catalog__card">
        <div class="container">
            <div class="catalog__card-sort">
                <h2 class="catalog__title">{{ getAppartaments.length }} properties found</h2>
                <div class="catalog__card-sort-container">
                    <div class="catalog__card-sort-price">
                        <p class="catalog__card-sort-text">show price in</p>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle catalog__card-dropdown" 
                             type="button" id="dropdownMenuButton1" 
                             data-bs-toggle="dropdown" 
                             aria-expanded="false"
                            >
                                {{ valuteSelector }}
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item valute" href="#" @click="changeValute(0)">AED</a></li>
                                <li><a class="dropdown-item valute" href="#" @click="changeValute(1)">USD</a></li>
                                <li><a class="dropdown-item valute" href="#" @click="changeValute(2)">RUB</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="catalog__card-sort-location">
                        <p class="catalog__card-sort-text">sort by</p>
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle catalog__card-dropdown" 
                             type="button" id="dropdownMenuButton1" 
                             data-bs-toggle="dropdown" 
                             aria-expanded="false"
                            >
                                Location
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item valute" href="#">Location 1</a></li>
                                <li><a class="dropdown-item valute" href="#">Location 2</a></li>
                                <li><a class="dropdown-item valute" href="#">Location 3</a></li>
                            </ul>
                        </div>
                    </div>
                    <p class="catalog__card-map">Show in map</p>
                </div>
            </div>
            <div class="catalog__card-container">
                <div class="tovar__item" v-for="(item) in apartaments" :key="item">
                    <router-link :to="`/apartament/${item.name}`">
                        <img :src="`/${item.imgPaths.split(',')[0]}`" v-if="item.imgPaths.length != 0" alt="Card" class="tovar__item-img">
                        <img src="@/assets/images/static/tovarscard/Card.png" alt="Card" class="tovar__item-img" v-else>
                    </router-link>
                    <button class="tovar__company">{{ item.propertyType }}</button>
                    <span class="explore__like tovar__like"><i class="fa-regular fa-heart"></i></span>
                    <p class="tovar__rate"><i class="fa-solid fa-star"></i> 4.7 (13)</p>
                    <h3 class="tovar__name">{{ item.name }}</h3>
                    <ul class="tovar__container">
                        <li><span class="tovar__number">{{ item.beds }}</span><span class="tovar__text"> beds</span></li>
                        <li><span class="tovar__number">{{ item.baths }}</span><span class="tovar__text"> baths</span></li>
                        <li><span class="tovar__number">{{ item.square }}</span><span class="tovar__text"> square (ft)</span></li>
                    </ul>
                    <p class="tovar__location tovar__text"><i class="fa-solid fa-location-dot"></i> Hera tower, Dubai sports city</p>
                    <div class="tovar__price">
                        <h3 class="tovar__price-title" v-if="item.priceForRent !== undefined && !isNaN(item.priceForRent)">
                            {{ Math.round(item.priceForRent * valuteCount, 2) }} {{ valuteSelector }}
                        </h3>
                        <p class="tovar__text tovar__tern">month</p>
                    </div>
                </div>
            </div>
            <div class="admin__pages">
                <router-link :to="`/catalog/${goToPrevPage()}`">
                    <i class="fa-solid fa-angle-left"></i>
                </router-link>
                <div class="admin__pages-links">
                    <div class="admin__pages-select">{{ $route.params.index }}</div>
                    <router-link :to="`/catalog/${goToNextPage()}`" @click="goToNextPage">
                        {{ goToNextPage() }}
                    </router-link>
                    <p>...</p>
                    <router-link :to="`/catalog/${Math.round(getAppartaments.length / 15)}`">
                        {{ Math.round(getAppartaments.length / 15) }}
                    </router-link>
                </div>
                <router-link to="">
                    <i class="fa-solid fa-angle-right"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/styles/pages/catalog/catalog.scss';
</style>

<script>
import Convertor from '@/scripts/valuteConvertor.js';
import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        apartamentsStart: 0,
        apartamentsEnd: 0,
        apartaments: [],
        valuteSelector: 'AED',
        valuteCount: 1
    }),

    computed: mapGetters('appartaments',['getAppartaments']),

    methods: {
        ...mapActions('appartaments', ['fetchAppartaments']),

        changeValute (index) {
            const select = document.querySelectorAll('.valute')[index];
            this.valuteSelector = select.innerHTML;
            this.valuteConvert();
        },

        async valuteConvert () {
            const convertor = await new Convertor ({
                valuteFrom: 'aed',
                valuteTo: this.valuteSelector.toLowerCase()
            });

            this.valuteCount = await convertor.convertValute();
        },

        goToNextPage() {
            if (Math.round(this.getAppartaments.length / 15) !== +this.$route.params.index) {
                return +this.$route.params.index + 1;
            }
        },
        goToPrevPage() {
            if (+this.$route.params.index !== 1) {
                return +this.$route.params.index - 1;
            }
            else return this.$route.params.index
        }
    },

    watch: {
        '$route.params.index': {
            immediate: true,
            handler(newIndex) {
                this.apartamentsStart = (newIndex - 1) * 15;
                this.apartamentsEnd = newIndex * 15;
                this.apartaments = this.getAppartaments.slice(this.apartamentsStart, this.apartamentsEnd);
            },
        },
    },

    async mounted () {
        await this.valuteConvert()
        await this.fetchAppartaments();

        this.apartamentsStart = (+this.$route.params.index - 1) * 15;
        this.apartamentsEnd = +this.$route.params.index * 15;

        this.getAppartaments.forEach((item, index) => {
            if (index > this.apartamentsStart && index <= this.apartamentsEnd){
                this.apartaments.push(item);
            }
        })

        console.log(this.apartaments);

        console.log(this.apartamentsStart);
        console.log(await this.valuteConvert());
        console.log(this.getAppartaments);
        console.log('valute ' + this.valuteCount);
    }
}

</script>