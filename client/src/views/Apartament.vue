<template>
    <section class="apartament">
       <apartamentFilter :dataInfo="dataInfo" />
        <mobileApartamentSlider :dataImages="dataImages" :dataContent="dataContent" v-if="windowWidth < 580" />
        <mobileApartamentInfo v-if="windowWidth < 580" />
        <apartamentSlider :dataImages="dataImages" :dataSlider="dataSlider" v-if="windowWidth > 580"/>
        <apartamentImagesList :dataImages="dataImages" @activeSlide="setDataSlider" v-if="windowWidth > 580" />
        <apartamentContent :dataContent="dataContent" />
        <apartamentMap :dataMap="dataMap" />
        <mobileApartamentContact v-if="windowWidth < 580"/>
    </section>
</template>


<script>
import apartamentContent from '@/components/pages/apartament/apartamentContent.vue';
import apartamentFilter from '@/components/pages/apartament/apartamentFilter.vue';
import apartamentImagesList from '@/components/pages/apartament/apartamentImagesList.vue';
import apartamentMap from '@/components/pages/apartament/apartamentMap.vue';
import mobileApartamentSlider from '../components/pages/apartament/mobile/mobileApartament-slider.vue';
import mobileApartamentInfo from '@/components/pages/apartament/mobile/mobileApartamentInfo.vue';
import apartamentSlider from '@/components/pages/apartament/apartamentSlider.vue';
import mobileApartamentContact from '@/components/pages/apartament/mobile/mobileApartamentContact.vue';

import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        windowWidth: window.innerWidth,
        dataImages: {},
        dataMap: {},
        dataInfo: {},
        dataContent: {},
        dataSlider: {}
    }),

    components: {
        apartamentContent,
        apartamentFilter,
        apartamentImagesList,
        apartamentMap,
        mobileApartamentSlider,
        mobileApartamentInfo,
        apartamentSlider,
        mobileApartamentContact
    },

    methods: {
        ...mapActions('appartaments', ['fetchOneAppartament']),

        setDataImages () {
            this.dataImages.imgPaths = this.getOneAppartament.imgPaths;
        },

        setDataContent () {
            this.dataContent.name = this.getOneAppartament.name;
            this.dataContent.beds = this.getOneAppartament.beds;
            this.dataContent.baths = this.getOneAppartament.baths;
            this.dataContent.square = this.getOneAppartament.square;
            this.dataContent.priceForRent = this.getOneAppartament.priceForRent;
            this.dataContent.priceForBuy = this.getOneAppartament.priceForBuy;
            this.dataContent.description = this.getOneAppartament.description;
            this.dataContent.indoor = this.getOneAppartament.indoor;
            this.dataContent.outdoor = this.getOneAppartament.outdoor;
            this.dataContent.lot = this.getOneAppartament.lot
            this.dataContent.unitReference = this.getOneAppartament.unitReference;
            this.dataContent.propertyName = this.getOneAppartament.propertyName;
            this.dataContent.emirate = this.getOneAppartament.emirate;
            this.dataContent.status = this.getOneAppartament.status;
            this.dataContent.purpose = this.getOneAppartament.purpose;
            this.dataContent.date = this.getOneAppartament.dateOfCreate;
            this.dataContent.propertyType = this.getOneAppartament.propertyType;
            this.dataContent.combSelect = this.getOneAppartament.combSelect;
        },

        setDataSlider (data) {
            this.dataSlider = data;
        },

        setDataMap () {
            this.dataMap.addres = this.getOneAppartament.addres;
            this.dataMap.lat = this.getOneAppartament.lat;
            this.dataMap.long = this.getOneAppartament.long;
            this.dataMap.title = this.getOneAppartament.name;
        },

        setDataInfo () {
            this.dataInfo.addres = this.getOneAppartament.addres;
            this.dataInfo.name = this.getOneAppartament.name;
        },

        async fetchApartament () {
            const filters = {
                id: this.$route.params.id,
                name: this.$route.params.name,
            }

            await this.fetchOneAppartament(filters);
        }
    },

    computed: mapGetters('appartaments', ['getOneAppartament']),

    async mounted () {
        document.title = this.$route.params.name;
        await this.fetchApartament();
        console.log(this.getOneAppartament);
        this.setDataImages();
        this.setDataContent();
        this.setDataMap();
        this.setDataInfo();
    }
}

</script>