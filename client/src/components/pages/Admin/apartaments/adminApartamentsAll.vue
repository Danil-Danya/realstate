<template>
    <div class="admin__container">
        <transition name="apartament">
            <deleteAppartament v-if="modal" 
                :idToDelete="selectedAppartamentId" 
                :nameToDelete="selectedAppartamentName" 
                :imgPathsToDelete="selectedAppartamentImgPaths"
                @closeModal="closeModal" 
            />
        </transition>
        <h2 class="admin__counter">{{ getAppartaments.length }} properties</h2>
        <appartamentSignature/>
        <div class="admin__item"
        :style="index % 2 === 1 ? { background: 'rgba(55, 55, 55, 0.02)' } : {}"
        v-for="(item, index) in apartaments" :key="item">
            <div class="admin__index">
                <h2 class="admin__text-bold">{{ index + 1 }}</h2>
            </div>
            <div class="admin__img">
                <img v-if="item.imgPaths" :src="`/${item.imgPaths.split(',')[0]}`" alt="Img" class="admin__img">
                <img v-else src="@/assets/images/static/admin/default.png" alt="Img" class="admin__img">
            </div>
            <div class="admin__appartaments-names">
                <p class="admin__text-bold">{{ item.name }}</p>
            </div>
            <div class="admin__appartaments-location">
                <p class="admin__text-bold">{{ item.addres }}</p>
            </div>
            <div class="admin__appartaments-beds">
                <p class="admin__text">{{ item.beds }} beds</p>
            </div>
            <div class="admin__appartaments-baths">
                <p class="admin__text">{{ item.baths }} baths</p>
            </div>
            <div class="admin__appartaments-square">
                <p class="admin__text">{{ item.square }} square (ft)</p>
            </div>
            <div class="admin__appartaments-type">
                <p class="admin__text">{{ item.propertyType }}</p>
            </div>
            <div class="admin__appartaments-rent">
                <p class="admin__text" v-if="item.priceForRent">{{ item.priceForRent }} AED (month)</p>
                <p class="admin__text" v-else>Only buy</p>
            </div>
            <div class="admin__appartaments-buy">
                <p class="admin__text" v-if="item.priceForBuy">{{ item.priceForBuy }} AED  (month)</p>
                <p class="admin__text" v-else>Only rent</p>
            </div>
            <div class="admin__icon-container">
                <router-link :to="`/${routerLink}/admin/appartament-edit/${item.name}/${item.id}`" class="admin__icon"><i class="fa-regular fa-pen-to-square"></i></router-link>
                <router-link to="" class="admin__icon" @click="showModal(item.id, item.name, item.imgPaths)"><i class="fa-regular fa-trash-can"></i></router-link>
            </div>
        </div>
        <div class="admin__pages" v-if="Math.ceil(getAppartaments.length / 15) > 1">
            <router-link :to="`/${routerLink}/admin/appartament-disactive/${goToPrevPage()}`">
                <i class="fa-solid fa-angle-left"></i>
            </router-link>
            <div class="pages-links">
                <router-link :to="`/${routerLink}/admin/appartament-disactive/1`" v-if="$route.params.index > 3" class="pages-item">
                    1
                </router-link>
                <div v-if="$route.params.index > 3">...</div>
                <router-link :to="`/${routerLink}/admin/appartament-disactive/${$route.params.index - 2}`" v-if="$route.params.index > 2" class="pages-item">
                    {{ $route.params.index - 2 }}
                </router-link>
                <router-link :to="`/${routerLink}/admin/appartament-disactive/${$route.params.index - 1}`" v-if="$route.params.index > 1" class="pages-item">
                    {{ $route.params.index - 1 }}
                </router-link>
                <div class="pages-select">{{ $route.params.index }}</div>
                <router-link :to="`/${routerLink}/admin/appartament-disactive/${+$route.params.index + 1}`" v-if="$route.params.index < Math.ceil(getAppartaments.length / 15) - 1" class="pages-item">
                        {{ +$route.params.index + 1 }}
                </router-link>
                <router-link :to="`/${routerLink}/admin/appartament-disactive/${+$route.params.index + 2}`" v-if="$route.params.index < (Math.ceil(getAppartaments.length / 15) - 2)" class="pages-item">
                        {{ +$route.params.index + 2 }}
                </router-link>
                <div v-if="$route.params.index < Math.ceil(getAppartaments.length / 15) - 2">...</div>
                <router-link :to="`/${routerLink}/admin/appartament-disactive${Math.ceil(getAppartaments.length / 15)}`" v-if="$route.params.index < Math.ceil(getAppartaments.length / 15)" class="pages-item">
                    {{ Math.ceil(getAppartaments.length / 15) }}
                </router-link>
            </div>
            <router-link :to="`/${routerLink}/admin/appartament-disactive${goToNextPage()}`">
                <i class="fa-solid fa-angle-right"></i>
            </router-link>
        </div>
    </div>
</template>


<script>
import deleteAppartament from '@/components/reused/deleteAppartament.vue';
import appartamentSignature from '@/components/reused/appartamentSignature.vue';
import Convertor from '@/scripts/valuteConvertor.js';
import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        routerLink: process.env.VUE_APP_ADMIN_ROUTER,
        modal: false,
        selectedAppartamentId: null,
        selectedAppartamentName: null,
        selectedAppartamentImgPaths: null,
        priceForRentUSD: [],
        priceForBuyUSD: [],
        apartamentsStart: 0,
        apartamentsEnd: 0,
        apartaments: [],
    }),

    components: {
        deleteAppartament,
        appartamentSignature
    },

    methods: {
        ...mapActions('appartaments', ['fetchAppartaments']),

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

        goToNextPage() {
            if (Math.ceil(this.getAppartaments.length / 15) !== +this.$route.params.index) {
                return +this.$route.params.index + 1;
            }
            else return this.$route.params.index
        },

        goToPrevPage() {
            if (+this.$route.params.index !== 1) {
                return +this.$route.params.index - 1;
            }
            else return this.$route.params.index
        },

        async convertValute(price, type) {
            const convertor = new Convertor({
                valuteFrom: 'aed',
                valuteTo: 'usd',
                date: this.getDate(),
                count: price
            });

            const convert = await convertor.convertValute();

            type === rent ? this.priceForRent.push(convert) : this.priceForBuy.push(convert);
        },

        showModal(id, name, imgPaths) {
            this.modal = true;
            this.selectedAppartamentId = id;
            this.selectedAppartamentName = name;
            this.selectedAppartamentImgPaths = imgPaths;
        },

        closeModal() {
            this.modal = false;
            this.selectedAppartamentId = null;
            this.selectedAppartamentName = null;
            this.selectedAppartamentImgPaths = null;
        },

        getDate () {
            const date = new Date();
            return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
        },

        // filterItemsInPages() {
        //     return this.getAppartaments.filter((item, index) =>  {
        //         if (index > this.currentPage && index < this.currentPage * 15) {
        //             return item
        //         }
        //     });
        // }
    },

    watch: {
        '$route.params.index': {
            immediate: true,
            handler(newIndex) {
                this.apartaments = [];

                if (this.apartaments.length <= 15) {
                    this.apartamentsStart = (newIndex - 1) * 15;
                    this.apartamentsEnd = newIndex * 15;
                    this.apartaments = this.getAppartaments.slice(this.apartamentsStart, this.apartamentsEnd);
                }
            },
        },
        'getAppartaments': {
            deep: true,
            handler(newAppartaments) {
                this.apartaments = [];
                
                if (this.apartaments.length <= 15) {
                    this.apartamentsStart = (this.$route.params.index - 1) * 15;
                    this.apartamentsEnd = this.$route.params.index * 15;
                    this.apartaments = newAppartaments.slice(this.apartamentsStart, this.apartamentsEnd);
                }
                console.log(this.apartaments);
            },
        },
    },

    computed:{
        ...mapGetters('appartaments',['getAppartaments']),
    },

    async mounted() {
        await this.fetchAppartaments();
        console.log(this.apartaments);

        this.apartamentsStart = (+this.$route.params.index - 1) * 15;
        this.apartamentsEnd = +this.$route.params.index * 15;
        this.apartaments = [];

        this.getAppartaments.forEach((item, index) => {
            if (this.apartaments.length < 15) {
                if (index + 1 > this.apartamentsStart && index <= this.apartamentsEnd) {
                    this.apartaments.push(item);
                }
            }
            
            if (this.getAppartaments.length < 15) {
                this.apartaments.push(item);
            }
        })


        document.title = 'Admin panel - all apartaments';
    }
}

</script>