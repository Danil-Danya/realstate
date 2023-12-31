<template>
    <div class="admin__container">
        <transition name="apartament">
            <deleteAppartament v-if="modal" :idToDelete="selectedAppartamentId" :nameToDelete="selectedAppartamentName"
                :imgPathsToDelete="selectedAppartamentImgPaths" @closeModal="closeModal" 
            />
        </transition>
        <h2 class="admin__counter">{{ getAppartaments.length }} properties</h2>
        <appartamentSignature />
        <div class="admin__item" :style="index % 2 === 1 ? { background: 'rgba(55, 55, 55, 0.02)' } : {}"
            v-for="(item, index) in getAppartaments" :key="item">
            <div class="admin__index">
                <h2 class="admin__text-bold">{{ index + 1 }}</h2>
            </div>
            <div class="admin__img">
                <img v-if="item.imgPaths" :src="`/${item.imgPaths.split(',')[0]}`" alt="Img"
                    class="admin__img">
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
                <p class="admin__text" v-if="item.priceForBuy">{{ item.priceForBuy }} AED (month)</p>
                <p class="admin__text" v-else>Only rent</p>
            </div>
            <div class="admin__icon-container">
                <router-link to="" class="admin__icon"><i class="fa-regular fa-pen-to-square"></i></router-link>
                <router-link to="" class="admin__icon" @click="showModal(item.id, item.name, item.imgPaths)"><i
                        class="fa-regular fa-trash-can"></i></router-link>
            </div>
        </div>
        <div class="admin__pages-container">
            <div class="admin__pages">
                <router-link :to="prevPageLink">
                    <i class="fa-solid fa-angle-left"></i>
                </router-link>
                <div class="admin__pages-links">
                    <div class="admin__pages-select">{{ currentPage }}</div>
                    <router-link v-for="pageNumber in filteredVisiblePages" :key="pageNumber" class="admin__pages-link"
                        :to="`${pageLink}/${pageNumber - 1}`">
                        {{ pageNumber }}
                    </router-link>
                    <p v-if="shouldDisplayDots">...</p>
                </div>
                <router-link :to="nextPageLink">
                    <i class="fa-solid fa-angle-right"></i>
                </router-link>
            </div>
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
        priceForBuyUSD: []
    }),

    components: {
        deleteAppartament,
        appartamentSignature
    },

    methods: {
        ...mapActions('appartaments', ['fetchAppartaments']),

        async fetchData() {
            const filters = {
                isActive: 'false'
            };
            await this.fetchAppartaments(filters);
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

        getIndex() {
            return this.$route.params.index;
        },

        getMaxItem() {
            return +this.getIndex() + 1 * 15;
        },

        getMinItem() {
            return this.getIndex() * 15;
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

        getDate() {
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

    computed: {
        ...mapGetters('appartaments', ['getAppartaments']),
        pageLink() {
            return `/${this.routerLink}/admin/appartament-disactive`;
        },

        currentPage() {
            return +this.getIndex() + 1;
        },

        totalPages() {
            return Math.ceil(this.getAppartaments.length / 15);
        },

        filteredVisiblePages() {
            return this.visiblePages.filter(page => page !== this.currentPage);
        },

        prevPageLink() {
            return this.currentPage > 1 ? `${this.pageLink}/${this.currentPage - 2}` : this.pageLink;
        },

        nextPageLink() {
            return this.currentPage < this.totalPages ? `${this.pageLink}/${this.currentPage}` : `${this.pageLink}/${this.totalPages - 1}`;
        },

        visiblePages() {
            const startPage = Math.max(1, this.currentPage - 2);
            const endPage = Math.min(this.totalPages, startPage + 4);
            const pages = [];
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }
            return pages;
        },
        shouldDisplayDots() {
            return this.currentPage < this.totalPages - 2;
        },
    },

    async mounted() {
        console.log(this.getMinItem(), this.getMaxItem());
        await this.fetchData();
    }
}

</script>