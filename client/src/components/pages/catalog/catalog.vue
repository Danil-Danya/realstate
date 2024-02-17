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
                                <span>
                                    <i class="fa-solid fa-chevron-down"></i>
                                </span>
                            </button>
                            <ul class="dropdown-menu catalog__filter-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="valute catalog__filter-line" href="#" @click="changeValute(0)">AED</a></li>
                                <li><a class="valute catalog__filter-line" href="#" @click="changeValute(1)">USD</a></li>
                                <li><a class="valute catalog__filter-line" href="#" @click="changeValute(2)">RUB</a></li>
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
                                {{ sort }}
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
            <div class="catalog__card-container">
                <h2 class="catalog__warning" v-if="apartaments.length < 1">{{ notFound }}</h2>
                <div class="tovar__item catalog__item" v-for="(item, index) in apartaments" :key="item">
                    <router-link :to="`/apartament/${item.name}`">
                        <img :src="`/${item.imgPaths.split(',')[0]}`" v-if="item.imgPaths.length != 0" alt="Card" class="tovar__item-img">
                        <img src="@/assets/images/static/tovarscard/Card.png" alt="Card" class="tovar__item-img" v-else>
                    </router-link>
                    <button class="tovar__company">{{ item.propertyType }}</button>
                    <span class="explore__like tovar__like" @click="setLikedTovar(item, index)"><i class="fa-regular fa-heart"></i></span>
                    <span class="explore__like tovar__like" @click="setLikedTovar(item, index)" v-if="item.liked"><i class="fa-solid fa-heart"></i></span>
                    <p class="tovar__rate"><i class="fa-solid fa-star"></i> 4.7 (13)</p>
                    <h3 class="tovar__name">{{ item.name }}</h3>
                    <ul class="tovar__container">
                        <li><span class="tovar__number">{{ item.beds }}</span><span class="tovar__text"> beds</span></li>
                        <li><span class="tovar__number">{{ item.baths }}</span><span class="tovar__text"> baths</span></li>
                        <li><span class="tovar__number">{{ item.square }}</span><span class="tovar__text"> square (ft)</span></li>
                    </ul>
                    <p class="tovar__location tovar__text"><i class="fa-solid fa-location-dot"></i> {{ item.addres }}</p>
                    <div class="tovar__price" v-if="combSelect === 'Rent' || combSelect === 'Rent and buy'">
                        <h3 class="tovar__price-title">
                            {{ Math.round(item.priceForRent * valuteCount, 2) }} {{ valuteSelector }}
                        </h3>
                        <p class="tovar__text tovar__tern">month</p>
                    </div>
                    <div class="tovar__price" v-else>
                        <h3 class="tovar__price-title">
                            {{ Math.round(item.priceForBuy * valuteCount, 2) }} {{ valuteSelector }}
                        </h3>
                        <p class="tovar__text tovar__tern">for buy</p>
                    </div>
                </div>
            </div>
            <div class="admin__pages" v-if="Math.ceil(getAppartaments.length / 15) > 1">
                <router-link :to="`/catalog/${goToPrevPage()}`">
                    <i class="fa-solid fa-angle-left"></i>
                </router-link>
                <div class="pages-links">
                    <router-link :to="`/catalog/1/${queryParametrs}`" v-if="$route.params.index > 3" class="pages-item">
                        1
                    </router-link>
                    <div v-if="$route.params.index > 3">...</div>
                    <router-link :to="`/catalog/${$route.params.index - 2}/${queryParametrs}`" v-if="$route.params.index > 2" class="pages-item">
                        {{$route.params.index - 2}}
                    </router-link>
                    <router-link :to="`/catalog/${$route.params.index - 1}/${queryParametrs}`" v-if="$route.params.index > 1" class="pages-item">
                        {{$route.params.index - 1}}
                    </router-link>
                    <div class="pages-select">{{ $route.params.index }}</div>
                    <router-link :to="`/catalog/${+$route.params.index + 1}/${queryParametrs}`" v-if="$route.params.index < Math.ceil(getAppartaments.length / 15) - 1" class="pages-item">
                            {{ +$route.params.index + 1 }}
                    </router-link>
                    <router-link :to="`/catalog/${+$route.params.index + 2}/${queryParametrs}`" v-if="$route.params.index < (Math.ceil(getAppartaments.length / 15) - 2)" class="pages-item">
                            {{ +$route.params.index + 2 }}
                    </router-link>
                    <div v-if="$route.params.index < Math.ceil(getAppartaments.length / 15) - 1">...</div>
                    <router-link :to="`/catalog/${Math.ceil(getAppartaments.length / 15)}/${queryParametrs}`" v-if="$route.params.index < Math.ceil(getAppartaments.length / 15)" class="pages-item">
                        {{ Math.ceil(getAppartaments.length / 15) }}
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
import Convertor from '@/scripts/valuteConvertor.js';
import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        apartamentsStart: 0,
        combSelect: 'Rent',
        apartamentsEnd: 0,
        apartaments: [],
        valuteSelector: 'AED',
        valuteCount: 1,
        sort: 'Default',
        queryParametrs: '',
        notFound: 'No products matching your request were found',
        sortArray: [
            'Last update', 'Date (new to old)',
            'Date (old to new)', 'Price (cheaper)',
            'Price (expensive)', 'Alphabet (A-z)',
            'Alphabet (Z-a)'
        ],
    }),

    
    computed: mapGetters('appartaments',['getAppartaments']),
    
    methods: {
        ...mapActions('appartaments', ['fetchAppartaments']),

        async selectSort(index) {
            const sortElement = this.$refs.sort[index];
            this.sort = sortElement.textContent;

            await this.fetchData();
        },

        async fetchData () {
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

        async selectSort(index) {
            const sortElement = this.$refs.sort[index];
            this.sort = sortElement.textContent;

            await this.fetchData();
        },
        
        getLinksIndex () {
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

        createLikedLink() {
            let likedUrl = '';

            let tovars = localStorage.getItem('likedTovars');
            !tovars ? tovars = [] : tovars = JSON.parse(tovars);

            tovars.forEach((tovar, index) => {
                if (index === tovars.length - 1) {
                    likedUrl += tovar;
                }
                else {
                    likedUrl += tovar + ',';
                }
            });

            return `/catalog/1/?liked=${encodeURIComponent(likedUrl ? likedUrl : none)}`;
        },

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
            if (index >= this.apartamentsStart && index < this.apartamentsEnd) {
                this.apartaments.push(item);
            }
        });
    }
}

</script>