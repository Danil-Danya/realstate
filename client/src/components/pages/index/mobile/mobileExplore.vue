<template>
    <div class="explore__mobile">
        <div class="container">
            <div class="explore__mobile-content">
                <h2 class="explore__mobile-title">Explore houses in Dubai</h2>
                <p class="explore__mobile-length">Over 300 houses in Dubai</p>
                <div class="explore__button-type">
                    <button type="button" class="btn btn-dark" ref="rent" @click="selectComb()">Rent</button>
                    <button type="button" class="btn btn-light" ref="buy" @click="selectComb()">Buy</button>
                </div>
            </div>
        </div>
        <div class="explore__mobile-container">
            <div class="container">
                <div class="explore__mobile-slider swiper">
                    <div class="explore__mobile-wrapper swiper-wrapper">
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
                <div class="explore__line"></div>
                <div class="explore__mobile-location">
                    <div class="explore__mobile-sort">
                        <p class="explore__mobile-text">sort by</p>
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
                    <div class="explore__mobile-map">
                        <router-link to="/map" class="explore__mobile-link">Show in map</router-link>
                    </div>
                </div>
                <div class="apartament__mobile-card-container" v-for="(apartament, index) in getAppartaments" :key="apartament">
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
                                    <img :src="`/${apartament.imgPaths.split(',')[0]}`" alt="" class="apartament__mobile-img" v-if="apartament.imgPaths">
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
                    <div class="explore__price tovar__price" v-if="combSelect === 'Rent'">
                        <h3 class="explore__price-title tovar__price-title" v-if="apartament.combSelect === 'Rent' || 'Rent and buy'">{{ apartament.priceForRent }} AED</h3>
                        <h3 class="explore__price-title tovar__price-title" v-else>{{ apartament.priceForNuy }} AED</h3>
                        <p class="explore__text tovar__text explore__term tovar__tern"  v-if="apartament.combSelect === 'Rent' || 'Rent and buy'">month</p>
                    </div>
                    <div class="explore__price tovar__price" v-if="combSelect === 'Buy'">
                        <h3 class="explore__price-title tovar__price-title" v-if="apartament.combSelect === 'Buy' || 'Rent and buy'">{{ apartament.priceForRent }} AED</h3>
                        <h3 class="explore__price-title tovar__price-title" v-else>{{ apartament.priceForNuy }} AED</h3>
                        <p class="explore__text tovar__text explore__term tovar__tern"  v-if="apartament.combSelect === 'Buy' || 'Rent and buy'">for buy</p>
                    </div>
                </div>
            </div>
            <div class="explore__mobile-link-container">
                <router-link to="/catalog/1" class="explore__mobile-link">Explore more</router-link>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/assets/styles/pages/index/explore.scss';
</style>

<script>
import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import { mapActions, mapGetters } from 'vuex';
import 'swiper/css';
import filters from '@/configs/config.filter.all.json';

export default {
    data: () => ({
        combSelect: 'Rent',
        buttons: filters,
        buttonIndex: 0,
        sort: 'Default',
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

    methods: {
        ...mapActions('explore', ['fetchAppartaments']),

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

        async selectSort(index) {
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

            console.log(this.activeButtons.price.max);

            await this.fetchData();
        },

        selectButton(event, index) {
            this.closeSelectButton();
            event.preventDefault();
            event.stopPropagation();

            const element = event.currentTarget;

            const classActive = 'explore__filter-menu-active';
            console.log(event.currentTarget);

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
            const classActive = 'explore__filter-menu-active';
            let dropdownWindow = this.$refs.dropdownWindow;
            console.log(dropdownWindow);

            dropdownWindow.forEach((item) => {
                item.classList.remove(classActive)
            })
        },

        async fetchData() {
            const data = {
                isActive: 'true',
                limit: 4,
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
    },

    computed: {
        ...mapGetters('explore', ['getAppartaments'])
    },

    async mounted () {
        await this.fetchData();
        document.querySelector('body').addEventListener('click', (e) => this.closeSelectButton());

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

        const width = window.innerWidth;

        this.$nextTick(() => {
            const swiper = new Swiper('.explore__mobile-slider', {
                slidesPerView: width > 460 ? 3 : width < 390 ? 2 : 2,
                spaceBetween: 20,
                modules: [Autoplay],
                 autoplay: {
                    delay: 2000,
                    disableOnInteraction: true
                },
                freeMode: true,  
            })
        })


        console.log(width);

        // if (width > 370) {
        //     swiper.params.slidesPerView = 2;
        // }
        // if (width > 500) {
        //     swiper.params.slidesPerView = 3;
        // }
    }
}

</script>