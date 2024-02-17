<style lang="scss">
.catalog__filter {
    margin-top: 50px !important;

    &-content {
        display: flex;
        align-items: center;

        @include media ($xs) {
            flex-wrap: wrap;
            background: #fff;
        }
    }

    &-container {
        @include media ($xs) {
            flex-wrap: wrap;
            background: #fff;
            padding: 20px 0;
        }
    }

    &-right {
        max-width: 1350px;
        width: 100%;
        display: flex;
        gap: 15px;

        @include media($xs) {
            background: #fff;
                border-bottom: 1px solid rgba(204, 204, 204, 0.4);
        }
    }

    &-menu {
        position: absolute;
        background: #fff;
        z-index: 999;
        width: 245px;
        border-radius: 10px;
        box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.15);
        padding: 15px !important;
        display: flex;
        flex-direction: column;
        gap: 10px;
        display: none;
        border: 0;

        &-active {
            display: flex;
            max-width: 150px;
        }
    }

    &-line {
         cursor: pointer;

        &::after {
            content: '';
            display: block;
            background: #000;
            width: 0px;
            height: 1px;
            transition: all 500ms;
        }

        &:hover {
            &::after {
                width: 100%;
            }
        }
    }

    &-arrow {
        width: 50px;
        height: 50px;
        border: 1px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        cursor: pointer;

        @include media ($md) {
            display: none;
        }
    }

    &-button {
        padding: 5px 20px !important;
        display: block;
        align-items: center;
        border-radius: 10px !important;
        display: flex;
        justify-content: center;
        border: 1px solid rgba(55, 55, 55, 0.20) !important;
        background: #f9f9f9 !important;
        color: #373737 !important;
        font-size: 16px;
        font-style: normal;
        font-weight: 325;
        line-height: normal;
        width: 100%;
        gap: 10px; 
        overflow: hidden;
        margin-bottom: 10px !important;

        &-text {
            overflow: hidden;
            height: 18px;
        }

        @include media ($xs) {
            font-size: 12px !important;
        }

        &-type {
            width: 150px !important;
            display: flex;
            flex-wrap: nowrap;

            &-mobile {
                display: none;

                @include media ($md) {
                    display: flex;
                    justify-content: center;
                }
            }
            
            &-container {
                display: flex;
                justify-content: center;
                margin-bottom: 30px;
            }

            &-desk {
                @include media ($md) {
                    display: none;
                }
            }
        }
    }
}

</style>

<template>
    <div class="catalog__filter">
        <div class="catalog__filter-button-type-container">
            <div class="catalog__filter-button-type catalog__filter-button-type-mobile" v-if="width < 960">
                <button type="button" class="btn btn-dark" ref="rent" @click="selectComb()">Rent</button>
                <button type="button" class="btn btn-light" ref="buy" @click="selectComb()">Buy</button>
            </div>
        </div>
        <div class="catalog__filter-container">
            <div class="container">
                <div class="catalog__filter-content">
                    <div class="catalog__filter-left">
                        <div class="catalog__filter-button-type catalog__filter-button-type-desk"  v-if="width > 960">
                            <button type="button" class="btn btn-dark" ref="rent" @click="selectComb()">Rent</button>
                            <button type="button" class="btn btn-light" ref="buy" @click="selectComb()">Buy</button>
                        </div>
                    </div>
                    <span class="catalog__filter-stick"></span>
                    <span class="catalog__filter-prev catalog__filter-arrow">
                        <i class="fa-solid fa-chevron-left"></i>
                    </span>
                    <div class="catalog__filter-right" ref="sliderContainer">
                        <div class="catalog__filter-slider swiper" ref="slider">
                            <div class="catalog__fitler-wrapper swiper-wrapper">
                                <div class="swiper-slide explore__button-slide"  v-for="(button, index) in buttons" :key="button">
                                    <button type="button" class="btn btn-secondary catalog__filter-button" ref="btn" @click="selectButton($event, index)">
                                        <p class="catalog__filter-button-text">
                                            {{ button.name }}: {{ activeButtons[index].count }}
                                        </p>
                                        <span>
                                            <i class="fa-solid fa-chevron-down"></i>
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span class="catalog__filter-next catalog__filter-arrow">
                        <i class="fa-solid fa-chevron-right"></i>
                    </span>
                    <ul class="catalog__filter-menu" v-for="button in buttons" :key="button" ref="dropdownWindow">
                        <li v-for="(str, index) in button.list" :key="str" @click="setFilter(button.name, index)">
                            <p class="catalog__filter-line">{{ str }}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import filters from '@/configs/config.filter.all.json';

import Swiper from 'swiper';

import { Navigation } from 'swiper/modules';
import { mapActions, mapGetters } from 'vuex';

import 'swiper/css';

export default {
    data: () => ({
        combSelect: '',
        buttonIndex: 0,
        sort: 'Default',
        isPrevButtonVisible: true,
        isNextButtonVisible: true,
        data: {},
        width: window.innerWidth,
        queryUrl: '',
        sortArray: [
            'Last update', 'Date (new to old)',
            'Date (old to new)', 'Price (cheaper)',
            'Price (expensive)', 'Alphabet (A-z)',
            'Alphabet (Z-a)'
        ],
        buttons: filters,
        activeButtons: {
            bedrooms: {
                name: "Bedrooms",
                count: 'any'
            },
            bathrooms: {
                name: "Bathrooms",
                count: 'any'
            },
            propertyType: {
                name: "Property type",
                count: 'any'
            },
            areas: {
                name: "Areas",
                count: 'any',
                min: 0,
                max: 100000000
            },
            price: {
                name: "Price",
                count: 'any',
                min: 0,
                max: 100000000,
            },
            locations: {
                name: "Locations",
                count: 'any'
            }
        }
    }),

    computed: {
        ...mapGetters('appartaments', ['getAppartaments']),
    },

    methods: {
        ...mapActions('appartaments', ['fetchAppartaments']),
        async selectSort(index) {
            const sortElement = this.$refs.sort[index];
            this.sort = sortElement.textContent;

            await this.fetchData();
        },

        combStyle () {
             if (this.combSelect === 'Rent') {
                 this.$refs.buy.classList.add('btn-light');
                 this.$refs.buy.classList.remove('btn-dark');
 
                 this.$refs.rent.classList.add('btn-dark');
                 this.$refs.rent.classList.remove('btn-light');
            } else {
                this.$refs.buy.classList.add('btn-dark');
                this.$refs.buy.classList.remove('btn-light');

                this.$refs.rent.classList.add('btn-light');
                this.$refs.rent.classList.remove('btn-dark');
            }
        },

        async selectComb() {
            if (this.combSelect === 'Rent') {
                this.combSelect = 'Buy';

                this.$refs.buy.classList.add('btn-dark');
                this.$refs.buy.classList.remove('btn-light');

                this.$refs.rent.classList.add('btn-light');
                this.$refs.rent.classList.remove('btn-dark');
            } else {
                this.combSelect = 'Rent';

                this.$refs.buy.classList.add('btn-light');
                this.$refs.buy.classList.remove('btn-dark');

                this.$refs.rent.classList.add('btn-dark');
                this.$refs.rent.classList.remove('btn-light');
            }

            await this.createQueryData();
        },

        async createQueryData() {
            const linkIndex = this.$route.params.index ? this.$route.params.index : '';
            this.$route.name === 'Catalog' ? '/catalog/' : '/map/'
            let link = '';

            const data = {
                isActive: 'true',
                combSelect: this.combSelect,
                bedrooms: this.activeButtons.bedrooms.count != 'any' ? +this.activeButtons.bedrooms.count : undefined,
                bathrooms: this.activeButtons.bathrooms.count != 'any' ? +this.activeButtons.bathrooms.count : undefined,
                locations: this.activeButtons.locations.count != 'any' ? this.activeButtons.locations.count : undefined,
                propertyType: this.activeButtons.propertyType.count != 'any' ? this.activeButtons.propertyType.count : undefined,
                price: {
                    min: this.activeButtons.price.min,
                    max: this.activeButtons.price.max
                },
                areas: {
                    min: this.activeButtons.areas.min,
                    max: this.activeButtons.areas.max
                },
            }

            for (let parametr in data) {
                if (data[parametr] !== 'any' && data[parametr]) {
                    if (typeof data[parametr] === 'object' && data[parametr].min !== undefined && data[parametr].max !== undefined) {
                        link += `${parametr}=${data[parametr].min},${data[parametr].max}&`;
                    } else {
                        link += `${parametr}=${encodeURIComponent(data[parametr])}&`;
                    }
                }
            }

            link = link.slice(0, -1);
            
            this.$router.push(`${this.queryUrl}?${link}`)
        },

        async setFilter(typeFilter, index) {
            let type = typeFilter.toLowerCase();
            
            if (type === 'bedrooms' || type === 'bathrooms') {
                this.activeButtons[type].count = this.buttons[type].list[index].split(' ')[0];
            }

            if (type === 'locations') {
                this.activeButtons[type].count = this.buttons[type].list[index];
            }

            if (type === 'price') {
                const priceRange = this.buttons[type].list[index].split('to');
                this.activeButtons.price.count = this.buttons[type].list[index];

                const minPrice = !isNaN(parseInt(priceRange[0])) ? parseInt(priceRange[0]) : 5000;
                const maxPrice = !isNaN(parseInt(priceRange[1])) ? parseInt(priceRange[1]) : 500000;

                this.activeButtons.price.min = minPrice;
                this.activeButtons.price.max = maxPrice;
            }

            if (type === 'areas') {
                const areasRange = this.buttons[type].list[index].split('to');
                this.activeButtons.areas.count = this.buttons[type].list[index];

                const minAreas = !isNaN(parseInt(areasRange[0])) ? parseInt(areasRange[0]) : 5000;
                const maxAreas = !isNaN(parseInt(areasRange[1])) ? parseInt(areasRange[1]) : 500;

                this.activeButtons.areas.min = minAreas;
                this.activeButtons.areas.max = maxAreas;
            }

            if (type === 'property type') {
                this.activeButtons['propertyType'].count = this.buttons['propertyType'].list[index];
            }

            this.createQueryData();
        },

        // createQueryLink () {
        //     const linkIndex = this.$route.params.index ? this.$route.params.index : '';
        //     this.queryUrl += linkIndex;

        //     for (let parametr in this.activeButtons) {
        //         if (this.activeButtons[parametr] !== 'any') {
        //             this.queryUrl += `${parametr}=${this.activeButtons[parametr].count}`
        //         }
        //     }

        //     console.log(this.queryUrl);
        // },

        selectButton(event, index) {
            this.closeSelectButton();
            event.preventDefault();
            event.stopPropagation();

            const element = event.currentTarget;

            const classActive = 'catalog__filter-menu-active';

            let dropdownWindow = this.$refs.dropdownWindow;
            let objectIndex = -1;

            for (let key in this.buttons) {
                objectIndex++;

                if (key === index) {
                    dropdownWindow = this.$refs.dropdownWindow[objectIndex];
                }
            }
            dropdownWindow.classList.toggle(classActive);
            dropdownWindow.style = `left: ${element.getBoundingClientRect().x}px;
                                    top: ${(element.getBoundingClientRect().top + window.pageYOffset) + 33}px ;`;
        },

        closeSelectButton() {
            const classActive = 'catalog__filter-menu-active';
            let dropdownWindow = this.$refs.dropdownWindow;

            dropdownWindow.forEach((item) => {
                item.classList.remove(classActive)
            })
        },

        saveFilter() {
            this.activeButtons.bedrooms.count = this.$route.query.bedrooms ? this.$route.query.bedrooms : 'any';
            this.activeButtons.bathrooms.count = this.$route.query.bathrooms ? this.$route.query.bathrooms : 'any';
            this.activeButtons.propertyType.count = this.$route.query.propertyType ? this.$route.query.propertyType : 'any';

            if (this.$route.query.price) {
                const priceRange = this.$route.query.price.split(',');
                this.activeButtons.price.min = priceRange[0];
                this.activeButtons.price.max = priceRange[1];
            }

            if (this.$route.query.areas) {
                const areasRange = this.$route.query.areas.split(',');
                this.activeButtons.areas.min = areasRange[0];
                this.activeButtons.areas.max = areasRange[1];
            }
        },

        swiperInit() {
            const width = window.innerWidth;
            
            if (width > 580) {
                let sliderWidth =  this.$refs.sliderContainer.clientWidth;
                this.$refs.slider.style = `max-width: ${sliderWidth - 130}px;
                                               width: 100%;`;
            }

            if (this.buttons) {
                const swiper = new Swiper('.catalog__filter-slider', {
                    slidesPerView: 4,
                    spaceBetween: 20,
                    modules: [Navigation],
                    navigation: {
                        nextEl: '.catalog__filter-next',
                        prevEl: '.catalog__filter-prev'
                    },
                })

                if (width < 1000) {
                    swiper.params.slidesPerView = 3;
                }
                if (width < 800) {
                    swiper.params.slidesPerView = 2;
                }

                swiper.update();
            }
        }
    },
    
    async mounted () {
        if (this.$route.query.combSelect) {
            this.combSelect = this.$route.query.combSelect ? this.$route.query.combSelect : '';
            this.combStyle();
        }
        this.saveFilter();
        
        console.log('this.combSelect: ', this.combSelect);
        this.swiperInit();
        
        document.querySelector('body').addEventListener('click', (e) => this.closeSelectButton());
        window.addEventListener('resize', this.swiperInit);
    }
}

</script>