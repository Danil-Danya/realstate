<template>
    <section class="explore">
        <div class="container">
            <h2 class="explore__title">Explore houses in Dubai</h2>
            <div class="explore__container">
                <div class="explore__button" ref="exploreButtons">
                    <div class="explore__button-type">
                        <button type="button" class="btn btn-dark" ref="rent" @click="selectComb()">Rent</button>
                        <button type="button" class="btn btn-light" ref="buy" @click="selectComb()">Buy</button>
                    </div>
                    <span class="explore__stick"></span>                    
                    <span class="explore__prev">
                        <i class="fa-solid fa-chevron-left"></i>
                    </span>
                    <div class="swiper explore__button-swiper" ref="exloreButtonList">
                        <div class="explore__button-list btn-group swiper-wrapper">
                            <div class="swiper-slide explore__button-slide"  v-for="(button, index) in buttons" :key="button">
                                <button type="button" class="btn btn-secondary explore__button-el" ref="btn" @click="selectButton($event, index)">
                                    <p class="explore__button-text">
                                        {{ button.name }}: {{ activeButtons[index].count }}
                                    </p>
                                    <span>
                                        <i class="fa-solid fa-chevron-down"></i>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <ul class="explore__filter-menu" v-for="button in buttons" :key="button" ref="dropdownWindow">
                        <li v-for="(str, index) in button.list" :key="str" @click="setFilter(button.name, index)">
                            <p class="explore__filter-line">{{ str }}</p>
                        </li>
                    </ul>
                    <span class="explore__next" v-show="isNextButtonVisible">
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
                                    <button class="btn btn-secondary explore__button-el" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span>{{ sort }}</span>
                                        <span class="dot"><i class="fa-solid fa-angle-down"></i></span>
                                    </button>
                                    <ul class="dropdown-menu explore__filter-menu">
                                        <li v-for="(sort, index) in sortArray" ref="sort" :key="sort" class="mb-3" @click="selectSort(index)">
                                            <p class="explore__filter-line explore__filter-line-sort">{{ sort }}</p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="explore__content-container">
                            <div class="explore__item tovar__item" v-for="(item, index) in getAppartaments" :key="item" v-if="getAppartaments.length != 0">
                                <router-link :to="`/apartament/${item.name}`">
                                    <img :src="`/${item.imgPaths.split(',')[0]}`" alt="Card" class="explore__item-img tovar__item-img" v-if="item.imgPaths">
                                    <img src="@/assets/images/static/tovarscard/Card.png" alt="Card" class="explore__item-img tovar__item-img" v-else>
                                </router-link>
                                <button class="explore__company tovar__company">{{ item.propertyType }}</button>
                                <span class="explore__like tovar__like" @click="setLikedTovar(item, index)"><i class="fa-regular fa-heart"></i></span>
                                <span class="explore__like tovar__like" @click="setLikedTovar(item, index)" v-if="item.liked"><i class="fa-solid fa-heart"></i></span>
                                <p class="tovar__rate"><i class="fa-solid fa-star"></i> 4.7 (13)</p>
                                <h3 class="explore__name tovar__name">{{ item.name }}</h3>
                                <ul class="explore__info-container tovar__container">
                                    <li><span class="explore__number tovar__number">{{ item.beds }}</span><span class="explore__text tovar__text"> beds</span></li>
                                    <li><span class="explore__number tovar__number">{{ item.baths }}</span><span class="explore__text tovar__text"> baths</span></li>
                                    <li><span class="explore__number tovar__number">{{ item.square }}</span><span class="explore__text tovar__text"> square (ft)</span></li>
                                </ul>
                                <p class="explore__location tovar__location explore__text tovar__text"><i class="fa-solid fa-location-dot"></i> {{ item.addres }}</p>
                                <div class="explore__price tovar__price">
                                    <h3 class="explore__price-title tovar__price-title" v-if="combSelect === 'Rent'">{{ item.priceForRent }} AED</h3>
                                    <h3 class="explore__price-title tovar__price-title" v-else>{{ item.priceForBuy }} AED</h3>
                                    <p class="explore__text tovar__text explore__term tovar__tern"  v-if="combSelect === 'Rent'">month</p>
                                    <p class="explore__text tovar__text explore__term tovar__tern" v-if="combSelect === 'Buy'">for buy</p>
                                </div>
                            </div>
                            <div class="explore__message" v-else>
                                <h2 class="explore__message-title">No records found matching your request</h2>
                            </div>
                        </div>
                    </div>
                    <div class="explore__right">
                        <div class="explore__map"></div>
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
import filters from '@/configs/config.filter.all.json';
import mapStyles from '@/configs/config.map_styles.json';

import Swiper from 'swiper';

import { Navigation } from 'swiper/modules';
import { mapActions, mapGetters } from 'vuex';

import 'swiper/css';
import appartamets from '@/store/appartaments/appartamets';

export default {
    data: () => ({
        combSelect: 'Rent',
        buttonIndex: 0,
        sort: 'Default',
        isPrevButtonVisible: true,
        isNextButtonVisible: true,
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
            status: {
                name: 'Status',
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

    methods: {
        ...mapActions('explore', ['fetchAppartaments']),

        async selectSort (index) {
            const sortElement = this.$refs.sort[index];
            this.sort = sortElement.textContent;

            await this.fetchData();
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
        
        async fetchData () {
            const data = {
                isActive: 'true',
                limit: 15,
                disableDefaultUI: true,
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
                sort: {
                    price: this.sort === 'Price (cheaper)' ? 'Price (cheaper)' : 
                    this.sort === 'Price (expensive)' ? 'Price (expensive)' : '',
                    date: this.sort === 'Date (new to old)' ? 'Date (new to old)' : 
                    this.sort === 'Date (old to new)' ? 'Date (old to new)' : '',
                    alphabet: this.sort === 'Alphabet (A-z)' ? 'Alphabet (A-z)' : 
                    this.sort === 'Alphabet (Z-a)' ? 'Alphabet (Z-a)' : '',
                    lastUpdate: this.sort === 'Last update' ? 'Last update' : ','
                    
                }
            }
            
            await this.fetchAppartaments(data);
        },
        
        async setFilter(typeFilter, index) {
            let type = typeFilter.toLowerCase();
            
            if (type === 'bedrooms' || type === 'bathrooms') {
                this.activeButtons[type].count = this.buttons[type].list[index].split(' ')[0];
            }

            if (type === 'locations') {
                this.activeButtons[type].count =  this.buttons[type].list[index];
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
            
            for (let key in this.activeButtons) {
                if (this.activeButtons[key].count === 'default') {
                    this.activeButtons[key].count = 'any';
                }
            }
            
            await this.fetchData();
        },

        async selectComb() {
            if (this.combSelect === 'Rent') {
                this.combSelect = 'Buy';

                this.$refs.buy.classList.add('btn-dark');
                this.$refs.buy.classList.remove('btn-light');

                this.$refs.rent.classList.add('btn-light');
                this.$refs.rent.classList.remove('btn-dark')
            } else {
                this.combSelect = 'Rent';
                
                this.$refs.buy.classList.add('btn-light');
                this.$refs.buy.classList.remove('btn-dark');

                this.$refs.rent.classList.add('btn-dark');
                this.$refs.rent.classList.remove('btn-light')
            }

            await this.fetchData();
        },

        selectButton (event, index) {
            this.closeSelectButton();
            event.preventDefault();
            event.stopPropagation();

            const element = event.currentTarget;
            const lineWidth = this.$refs.exloreButtonList.clientWidth;
            const buttonWidth = this.$refs.exploreButtons.clientWidth;

            const classActive = 'explore__filter-menu-active';

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

        closeSelectButton () {
            const classActive = 'explore__filter-menu-active';
            let dropdownWindow = this.$refs.dropdownWindow;

            dropdownWindow.forEach((item) => {
                item.classList.remove(classActive)
            })
        },

        async initMap(ap) {
            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerView } = await google.maps.importLibrary("marker");
            
            let map = document.querySelector('.explore__map');

            let mapOptions = {
                zoom: 13,
                center: { lat: 25.21448776458042, lng: 55.29115157192866 },
                disableDefaultUI: true,
                styles: mapStyles
            }
            
            let myMap = new google.maps.Map(map, mapOptions)
            //myMap.setOptions({ styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }] })

            let info = new google.maps.InfoWindow()
            
            ap.forEach(map => {
                let priceTag = document.createElement("div");

                priceTag.className = "price-tag";
                priceTag.textContent = String((map.priceForRent ? map.priceForRent : map.priceForBuy) + " AED");

                let contentHTML = `
                        <div class="explore__item explore__item-marker tovar__item">
                            <a href="/apartament/${map.name}">
                            <img src="/${map.imgPaths.split(',')[0]}" alt="Card" class="explore__item-img tovar__item-img">
                            </a>
                            <button class="explore__company tovar__company">${map.propertyType}</button>
                            <span class="explore__like tovar__like"><i class="fa-regular fa-heart"></i></span>
                            <p class="tovar__rate"><i class="fa-solid fa-star"></i> 4.7 (13)</p>
                            <h3 class="explore__name tovar__name">${map.name}</h3>
                            <ul class="explore__info-container tovar__container">
                                <li><span class="explore__number tovar__number">${map.beds}</span><span class="explore__text tovar__text"> beds</span></li>
                                <li><span class="explore__number tovar__number">${map.baths}</span><span class="explore__text tovar__text"> baths</span></li>
                                <li><span class="explore__number tovar__number">${map.square}</span><span class="explore__text tovar__text"> square (ft)</span></li>
                            </ul>
                            <p class="explore__location tovar__location explore__text tovar__text"><i class="fa-solid fa-location-dot"></i> ${map.addres}</p>
                            <div class="explore__price tovar__price">
                                <h3 class="explore__price-title tovar__price-title">${map.priceForRent ? map.priceForRent : map.priceForBuy} AED</h3>
                                <p class="explore__text tovar__text explore__term tovar__tern">${map.priceForRent ? 'month' : 'for buy'}</p>
                            </div>
                        </div>
                    </div > `

                let obj = {
                    map: myMap,
                    position: {
                        lat: Number(map.lat),
                        lng: Number(map.long)
                    },
                    icon: require('@/assets/images/static/map/majak.svg'),
                    content: priceTag,
                    title: String((map.priceForRent ? map.priceForRent : map.priceForBuy) + " AED"),
                }

                let marker = new google.maps.Marker(obj);

                marker.addListener('click', () => {
                    info.close();
                    info.setContent(contentHTML);
                    info.open(myMap, marker);
                })
            })
        }
    },
    computed : {
        ...mapGetters('explore', ['getAppartaments'])
    },

    watch: {
        'getAppartaments': {
            deep: true,
            async handler () {
                this.$nextTick(async () => {
                    await this.initMap(this.getAppartaments);
                })
            }
        },
        'activeButtons': {
            deep: true,
            async handler() {
                for (let key in this.activeButtons) {
                    if (this.activeButtons[key].count === 'default') {
                        this.activeButtons[key].count = 'any';
                    }
                }
            }
        }
    },

    async mounted () {
        await this.fetchData();

        let tovars = localStorage.getItem('likedTovars');
        !tovars ? tovars = [] : tovars = JSON.parse(tovars);

        this.getAppartaments.forEach((appartamet, index) => {
            tovars.forEach(tovar => {
                if (appartamet.name === tovar) {
                    this.getAppartaments[index].liked = true;
                }
            })
        })

        document.querySelector('body').addEventListener('click', (e) => this.closeSelectButton());

        const width = window.innerWidth;

        const swiper = new Swiper('.explore__button-swiper', {
            slidesPerView: 4,
            spaceBetween: 20,
            modules: [ Navigation ],
            navigation: {
                nextEl: '.explore__next',
                prevEl: '.explore__prev'
            },
        })

        if (width < 1000) swiper.params.slidesPerView = 3;
        if (width < 800) swiper.params.slidesPerView = 2;

        await this.$nextTick(async () => await this.initMap(this.getAppartaments))
    } 
}

</script>
