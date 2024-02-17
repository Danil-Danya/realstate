<template>
    <section class="map">
        <div class="container">
            <div class="map__headers">
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
                                    Dafault
                                </button>
                                <ul class="dropdown-menu catalog__filter-menu">
                                    <li v-for="(sort, index) in sortArray" ref="sort" :key="sort" class="mb-3" @click="selectSort(index)">
                                        <p class="catalog__filter-line">{{ sort }}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <router-link class="catalog__card-map" :to="`/catalog/1${queryParametrs}`">Show in list</router-link>
                    </div>
                </div>
            </div>
            <div class="map__content">
                <div class="map-item"></div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" >
//@import '@/assets/styles/pages/catalog/catalog.scss';
.gm-style-iw-c {
    max-width: 300px !important;
}
.catalog {

    &__title {
        font-size: 32px;
        color: #373737;
        font-family: Gotham Bold !important;
        font-size: 20px;
        font-style: normal;
        font-weight: 350;
        line-height: normal;

        @include media ($xs) {
            display: none;
        }
    }

    &__card {
        margin-top: 50px;
        
        &-container {
            display: flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
        } 

        &-dropdown {
            border-radius: 10px !important;
            border: 1px solid rgba(55, 55, 55, 0.20) !important;
            background: #F6F6F6 !important;
            color: #373737 !important;
            font-family: Gotham;
            font-size: 16px;
            font-style: normal;
            font-weight: 325;
            line-height: normal;
            
            &::after {
                display: none;
            }

            &-text {
                max-width: 70px;
                overflow: hidden;
            }
            
            @include media ($xs) {
                display: flex;
                gap: 5px;
                max-width: 86px;
                font-size: 12px;
                height: 30px;
                overflow: hidden;
            }
        }

        
        &-map {
            color: #000;
            font-family: Gotham Bold !important;
            font-size: 22px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;

            @include media ($xs) {
                font-size: 14px;
                border-bottom: 1px solid;
            }
        }
        
        &-sort {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 50px !important;
            flex-wrap: wrap;

            @include media ($md) {
                background: #fff !important;
                margin-bottom: 20px !important;
            }
            
            &-container {
                align-items: center;
                display: flex;
                gap: 80px;
                flex-wrap: wrap;

                @include media ($xs) {
                    gap: 10px;
                    justify-content: space-between;
                }
            }
            
            &-location {
                display: flex;
                gap: 30px;
                align-items: center;

                @include media ($xs) {
                    gap: 10px;
                }
            }
            
            &-price {
                display: flex;
                gap: 30px;
                align-items: center;

                @include media ($xs) {
                    gap: 10px;
                }
            }
        }
    }
}
.map {
    padding: 100px 0;

    @include media ($md) {
        padding: 0;
        background: #fff !important;
    }

    &__mobile {
        display: flex;
        gap: 10px;
        border-radius: 10px;
        background: #fff;
        width: 300px !important;
        height: 120px !important;
        align-items: center;
        box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.15);

        &-img {
            width: 100px;
            height: 100px;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
        }

        &-price {
            display: flex;
            align-items: center;
            gap: 5px;

            &-title {
                font-size: 14px;
                font-family: Gotham Bold !important;
            }

            &-text {
                font-size: 10px;
            }
        }

        &-item {
            display: flex;
            gap: 5px;
            width: 66px !important;
            
            &-text {
                font-size: 10px;
            }
            
            &-title {
                font-size: 12px;
                font-family: Gotham Bold !important;
            }
        }
        
        &-info {
            margin: 10px 0;
            //flex-wrap: wrap;
            max-width: 120px;
            display: flex;
            gap: 5px;
        }

        &-title {
            font-family: Gotham Bold !important;
            font-size: 14px;
            font-weight: 350;
            line-height: 17px;
            letter-spacing: 0em;
            text-align: left;
        }
    }

    &-item {
        width: 100%;
        height: 700px;
        border-radius: 30px;
        box-shadow: 0px 13px 44px 0px rgba(0, 0, 0, 0.20);

        @include media ($xs) {
            border-radius: 0;
        }
    }

}
</style>

<script>
import { mapGetters, mapActions } from 'vuex';
import mapStyles from '@/configs/config.map_styles.json';
import Convertor from '@/scripts/valuteConvertor.js';

export default {
    data: () => ({
        apartamentsStart: 0,
        width: window.innerWidth,
        apartamentsEnd: 0,
        apartaments: [],
        valuteSelector: 'AED',
        valuteCount: 1,
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
        ...mapGetters('appartaments', ['getAppartaments'])
    },
    methods: {
        ...mapActions('appartaments', ['fetchAppartaments']),

        async valuteConvert() {
            const convertor = await new Convertor({
                valuteFrom: 'aed',
                valuteTo: this.valuteSelector.toLowerCase()
            });

            this.valuteCount = await convertor.convertValute();
        },

        changeValute(index) {
            const select = document.querySelectorAll('.valute')[index];
            this.valuteSelector = select.innerHTML;
            this.valuteConvert();
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
        async initMap(ap) {
            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

            let map = document.querySelector('.map-item');

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
                                <h3 class="explore__price-title tovar__price-title">${map.priceForRent ? map.priceForRent : map.priceForBuy} AED</h3>
                                <p class="explore__text tovar__text explore__term tovar__tern">${map.priceForRent ? 'month' : 'for buy'}</p>
                            </div>
                        </div>
                    </div> `


                    let mobileHtml = `
                        <a href="/apartament/${map.name}">
                            <div class="map__mobile" style="max-width: 300px">
                                    <div class="map__img">
                                        <img src="/${map.imgPaths.split(',')[0]}" alt="Card" class="map__mobile-img">
                                    </div>
                                    <div class="map__mobile-content">
                                        <h2 class="map__mobile-title">${map.name}</h2>
                                        <div class="map__mobile-info">
                                            <div class="map__mobile-item">
                                                <h3 class="map__mobile-item-title">${map.beds}</h3>
                                                <p class="map__mobile-item-text">beds</p>
                                            </div>
                                            <div class="map__mobile-item">
                                                <h3 class="map__mobile-item-title">${map.baths}</h3>
                                                <p class="map__mobile-item-text">baths</p>
                                            </div>
                                            <div class="map__mobile-item">
                                                <h3 class="map__mobile-item-title">${map.square}</h3>
                                                <p class="map__mobile-item-text">square (ft)</p>
                                            </div>
                                        </div>
                                        <div class="map__mobile-price">
                                            <h2 class="map__mobile-price-title">${map.priceForRent ? map.priceForRent : map.priceForBuy}</h2>
                                            <div class="map__mobile-price-text">${map.priceForRent ? 'month' : 'for buy'}</div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                            `

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
                    info.setContent(mobileHtml);
                    info.open(myMap, marker);
                })
            })
        }
    },

    watch: {
        '$route.query': {
            immediate: true,
            deep: true,
            async handler(newQuery) {
                await this.fetchData();

                const query = this.$route.query;

                if (query) {
                    this.queryParametrs += '?';
                    for (let parametr in query) {
                        this.queryParametrs += `${parametr}=${query[parametr]}&`;
                    }

                    this.queryParametrs = this.queryParametrs.slice(0, -1);
                }
            },
        },
        'getAppartaments': {
            //immediate: true,
            async handler () {
                this.$nextTick(async () => {
                    await this.initMap(this.getAppartaments);
                })
            }
        }
    },

    async mounted () {
        await this.fetchData();
        console.log(this.getAppartaments);

        const query = this.$route.query;
    }
}
</script>