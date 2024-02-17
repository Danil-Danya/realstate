<template>
    <div class="catalog__card-sort">
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
                            <p class="catalog__card-dropdown-text">
                                {{ valuteSelector }}
                            </p>

                                <span>
                                    <i class="fa-solid fa-chevron-down"></i>
                                </span>
                            </button>
                            <ul class="dropdown-menu catalog__filter-menu" aria-labelledby="dropdownMenuButton1">
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
                                <p class="catalog__card-dropdown-text">
                                    {{ sort }}
                                </p>
                                <span>
                                    <i class="fa-solid fa-chevron-down"></i>
                                </span>
                            </button>
                            <ul class="dropdown-menu catalog__filter-menu">
                                <li v-for="(sort, index) in sortArray" ref="sort" :key="sort" class="mb-3" @click="selectSort(index)">
                                    <p class="catalog__filter-line">{{ sort }}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <router-link class="catalog__card-map" :to="`/map/${queryParametrs}`">Show in map</router-link>
                </div>
            </div>
            <div class="apartament__mobile-card-container" v-for="(apartament, index) in apartaments" :key="apartament" v-if="apartaments.length > 0">
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
                    <div class="apartament__mobile-item">
                        <div class="apartament__mobile-images-container">
                            <router-link :to="`/apartament/${apartament.name}`">
                                <img :src="`/${apartament.imgPaths.split(',')[0]}`" alt="" class="apartament__mobile-img" v-if="apartament.imgPaths.split(',')[0]">
                                <img src="@/assets/images/static/tovarscard/Card.png" alt="" class="apartament__mobile-img" v-else>
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
                <div class="explore__price tovar__price" v-if="combSelect === 'Rent' && apartament.priceForRent > 0">
                    <h3 class="explore__price-title tovar__price-title" v-if="apartament.combSelect === 'Rent' || 'Rent and buy'">{{ Math.round(apartament.priceForRent * valuteCount, 2) }} {{ valuteSelector }}</h3>
                    <h3 class="explore__price-title tovar__price-title" v-else>{{ Math.round(apartament.priceForRent * valuteCount, 2) }} {{ valuteSelector }}</h3>
                    <p class="explore__text tovar__text explore__term tovar__tern"  v-if="apartament.combSelect === 'Rent' || 'Rent and buy'">month</p>
                </div>
                <div class="explore__price tovar__price" v-if="combSelect === 'Buy'">
                    <h3 class="explore__price-title tovar__price-title" v-if="apartament.combSelect === 'Buy' || 'Rent and buy'">{{ Math.round(apartament.priceForBuy * valuteCount, 2) }} {{ valuteSelector }}</h3>
                    <h3 class="explore__price-title tovar__price-title" v-else>{{ Math.round(apartament.priceForBuy * valuteCount, 2) }} {{ valuteSelector }}</h3>
                    <p class="explore__text tovar__text explore__term tovar__tern"  v-if="apartament.combSelect === 'Buy' || 'Rent and buy'">for buy</p>
                </div>
            </div>
            <div class="apartament__mobile-message" v-else>
                <h2 class="catalog__warning">{{ notFound }}</h2>
            </div>
            <div class="admin__pages" v-if="Math.ceil(getAppartaments.length / 15) > 1">
                <router-link :to="`/catalog/${goToPrevPage()}`">
                    <i class="fa-solid fa-angle-left"></i>
                </router-link>
                <div class="pages-links">
                    <router-link :to="`/catalog/1`" v-if="$route.params.index > 3" class="pages-item">
                        1
                    </router-link>
                    <div v-if="$route.params.index > 3">...</div>
                    <router-link :to="`/catalog/${$route.params.index - 2}`" v-if="$route.params.index > 2" class="pages-item">
                        {{ $route.params.index - 2 }}
                    </router-link>
                    <router-link :to="`/catalog/${$route.params.index - 1}`" v-if="$route.params.index > 1" class="pages-item">
                        {{ $route.params.index - 1 }}
                    </router-link>
                    <div class="pages-select">{{ $route.params.index }}</div>
                    <router-link :to="`/catalog/${+$route.params.index + 1}`" v-if="$route.params.index < Math.round(getAppartaments.length / 15) - 1" class="pages-item">
                            {{ +$route.params.index + 1 }}
                    </router-link>
                    <router-link :to="`/catalog/${+$route.params.index + 2}`" v-if="$route.params.index < (Math.round(getAppartaments.length / 15) - 2)" class="pages-item">
                            {{ +$route.params.index + 2 }}
                    </router-link>
                    <div v-if="$route.params.index < Math.ceil(getAppartaments.length / 15) - 1">...</div>
                    <router-link :to="`/catalog/${Math.ceil(getAppartaments.length / 15)}`" v-if="$route.params.index < Math.round(getAppartaments.length / 15)" class="pages-item">
                        {{ Math.round(getAppartaments.length / 15) }}
                    </router-link>
                </div>
                <router-link :to="`/catalog/${goToNextPage()}`">
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
import { mapGetters, mapActions } from 'vuex';
import Convertor from '@/scripts/valuteConvertor.js';


export default {
    data: () => ({
        apartamentsStart: 0,
        apartamentsEnd: 0,
        apartaments: [],
        valuteSelector: 'AED',
        sort: 'Default',
        valuteCount: 1,
        combSelect: 'Rent',
        queryParametrs: '',
        notFound: 'No products matching your request were found',
        sortArray: [
            'Last update', 'Date (new to old)',
            'Date (old to new)', 'Price (cheaper)',
            'Price (expensive)', 'Alphabet (A-z)',
            'Alphabet (Z-a)'
        ],
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

        async fetchData() {
            let data = {};
            console.log(this.$route.query);

            if (this.$route.query) {
                data = {
                    bedrooms: this.$route.query.bedrooms,
                    bathrooms: this.$route.query.bathrooms,
                    propertyType: this.$route.query.propertyType,
                    combSelect: this.$route.query.combSelect,
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

                if (this.$route.query.liked) {
                    const liked = this.$route.query.liked.split(',');
                    data.liked = liked;
                }

                if (this.$route.query.price) {
                    data.price = {
                        min: this.$route.query.price.split(',')[0].split('=')[1],
                        max: this.$route.query.price.split(',')[1].split('=')[1],
                    }
                }
                await this.fetchAppartaments(data);
            }
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

        getLinksIndex() {
            const startIndex = +this.$route.params.index + 1 || 0;
            const pageSize = 15;
            const links = [];
            //const different = Math.round(this.getAppartaments.length / pageSize) - +this.$route.params.index;

            for (let i = startIndex; i < startIndex + Math.round(this.getAppartaments.length / pageSize); i++) {
                if (i < Math.round(this.getAppartaments.length / pageSize) && links.length < 7) {
                    links.push(i);
                }
            }

            return links;
        },

        changeValute(index) {
            const select = document.querySelectorAll('.valute')[index];
            this.valuteSelector = select.innerHTML;
            this.valuteConvert();
        },

        async valuteConvert() {
            const convertor = await new Convertor({
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
        },

        updateApartaments(newIndex, newQuery) {
            this.apartamentsStart = (newIndex - 1) * 15;
            this.apartamentsEnd = newIndex * 15;
            this.apartaments = this.getAppartaments.slice(this.apartamentsStart, this.apartamentsEnd);
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

            if (this.$route.query.liked) {
                this.$router.replace(this.createLikedLink());
            }
        },
    },

    watch: {
        '$route.params.index': {
            immediate: true,
            handler(newIndex) {
                this.apartaments = [];
                this.updateApartaments(newIndex, this.$route.query);
            },
        },
        '$route.query': {
            immediate: true,
            deep: true,
            async handler(newQuery) {
                this.apartaments = [];
                await this.fetchData();
                this.updateApartaments(this.$route.params.index, newQuery);
            },
        },
        'getAppartaments': {
            deep: true,
            handler(newAppartaments) {
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

                this.apartaments = [];

                if (this.apartaments.length <= 15) {
                    this.apartamentsStart = (this.$route.params.index - 1) * 15;
                    this.apartamentsEnd = this.$route.params.index * 15;
                    this.apartaments = newAppartaments.slice(this.apartamentsStart, this.apartamentsEnd);
                }
            },
        },
    },

    async mounted () {
        await this.valuteConvert();
        await this.fetchData();

        const query = this.$route.query;
        if (query) {
            this.queryParametrs += '?';
            for (let parametr in query) {
                this.queryParametrs += `${parametr}=${query[parametr]}&`;
            }

            this.queryParametrs = this.queryParametrs.slice(0, -1);
        }

        if (this.getAppartaments.length < 1) {
            document.querySelector('main').style = 'height: 300px;'
        }

        if (this.$route.query.liked) {
            this.notFound = 'There are currently no products you like';
        }

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

        this.apartaments = [];

        this.apartamentsStart = (+this.$route.params.index - 1) * 15;
        this.apartamentsEnd = +this.$route.params.index * 15;

        this.getAppartaments.forEach((item, index) => {
            if (index > this.apartamentsStart && index <= this.apartamentsEnd) {
                this.apartaments.push(item);
            }
        })
    }
}


</script>