<template>
    <section class="catalog">
        <catalogPath/>
        <filters @data="data"/>
        <catalog v-if="windowWidth > 580"/>
        <mobileCatalog v-else/>
    </section>
</template>

<script>
import catalogPath from '@/components/pages/catalog/path.vue';
import catalog from '@/components/pages/catalog/catalog.vue';
import filters from '@/components/reused/filters.vue';
import mobileCatalog from '@/components/pages/catalog/mobile/mobileCatalog.vue';

export default {
    data: () => ({
        windowWidth: window.innerWidth,
        data: null
    }),

    components: {
        catalogPath,
        catalog,
        filters,
        mobileCatalog
    },

    methods: {
        data (data) {
            this.data = data;
        }
    },
    
    mounted() {
        console.log('data' + this.data);
    }
}


</script>