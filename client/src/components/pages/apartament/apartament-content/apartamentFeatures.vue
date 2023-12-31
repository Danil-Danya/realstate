<template>
    <div class="apartament__features">
        <h2 class="apartament__features-title">Features and Amenities</h2>
        <div class="apartament__features-container">
            <div class="apartament__features-item">
                <h2 class="apartament__features-name">Indoor</h2>
                <ul class="apartament__features-ul">
                    <li v-if="dataContent.indoor" v-for="indoor in dataContent.indoor.split(',')" :key="indoor">
                        <p class="apartament__features-text">{{ indoor }}</p>
                    </li>
                    <li v-else>
                        <p class="apartament__features-text">Not indicated</p>
                    </li>
                </ul>
            </div>
            <div class="apartament__features-item">
                <h2 class="apartament__features-name">Outdoor</h2>
                <ul class="apartament__features-ul">
                    <li v-if="dataContent.outdoor" v-for="outdoor in dataContent.outdoor.split(',')" :key="outdoor">
                        <p class="apartament__features-text">{{ outdoor }}</p>
                    </li>
                    <li v-else>
                        <p class="apartament__features-text">Not indicated</p>
                    </li>
                </ul>
            </div>
            <div class="apartament__features-item">
                <h2 class="apartament__features-name">Lot</h2>
                <ul class="apartament__features-ul">
                    <li v-if="dataContent.lot" v-for="lot in dataContent.lot.split(',')" :key="lot">
                        <p class="apartament__features-text">{{ lot }}</p>
                    </li>
                    <li v-else>
                        <p class="apartament__features-text">Not indicated</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/styles/pages/apartament/features.scss';
</style>

<script>
export default {
    data: () => ({
        indoors: [
            'Marble floors', 'Kitchen Appliances',
            'Balcony', 'Central air conditioning',
            'Built in wardrobes', 'Upgraded interior'
        ],
        outdoors: [
            'Gymnasium', 'Private swimming pool',
            'Covered parking', 'Private Garden', 
            'BBQ area', 'Maids room', 'Drivers Room',
            'Private garage', 'Walk-in Closet'
        ],
        lots: ['Pets allowed']
    }),

    props: {
        dataContent: Object
    }
}

</script>