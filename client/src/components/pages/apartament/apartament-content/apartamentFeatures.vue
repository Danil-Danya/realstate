<template>
    <div class="apartament__features">
        <div class="apartament__features-head">
            <h2 class="apartament__features-title">Features and Amenities</h2>
            <svg v-if="width < 920" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 300" height="42" width="42"><rect class="tooltip-horizontal-scroll-icon_card" x="480" width="200" height="200" rx="5" fill="rgba(190,190,190,0.3)"></rect><rect class="tooltip-horizontal-scroll-icon_card" y="0" width="200" height="200" rx="5" fill="rgba(190,190,190,0.3)"></rect><rect class="tooltip-horizontal-scroll-icon_card" x="240" width="200" height="200" rx="5" fill="rgba(190,190,190,0.3)"></rect><path class="tooltip-horizontal-scroll-icon_hand" d="M78.9579 285.7C78.9579 285.7 37.8579 212.5 20.5579 180.8C-2.44209 138.6 -6.2422 120.8 9.6579 112C19.5579 106.5 33.2579 108.8 41.6579 123.4L61.2579 154.6V32.3C61.2579 32.3 60.0579 0 83.0579 0C107.558 0 105.458 32.3 105.458 32.3V91.7C105.458 91.7 118.358 82.4 133.458 86.6C141.158 88.7 150.158 92.4 154.958 104.6C154.958 104.6 185.658 89.7 200.958 121.4C200.958 121.4 236.358 114.4 236.358 151.1C236.358 187.8 192.158 285.7 192.158 285.7H78.9579Z" fill="rgba(190,190,190,1)"></path></svg>
        </div>
        <div class="apartament__features-content" ref="content">
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
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/styles/pages/apartament/features.scss';

    .tooltip-horizontal-scroll-icon_hand {
        animation: tooltip-horizontal-scroll-icon_anim-scroll-hand 2s infinite;
    }

    .tooltip-horizontal-scroll-icon_card {
        animation: tooltip-horizontal-scroll-icon_anim-scroll-card 2s infinite;
    }

    @keyframes tooltip-horizontal-scroll-icon_anim-scroll-hand {
        0% { transform: translateX(80px) scale(1); opacity: 0; }
        10% { transform: translateX(80px) scale(1); opacity: 1; }
        20%, 60% { transform: translateX(175px) scale(.6); opacity: 1; }
        80% { transform: translateX(5px) scale(.6); opacity: 1; }
        to { transform: translateX(5px) scale(.6); opacity: 0; }
    }

    @keyframes tooltip-horizontal-scroll-icon_anim-scroll-card {
        0%, 60% { transform: translateX(0); }
        80%, to { transform: translateX(-240px); }
    }
</style>

<script>
export default {
    data: () => ({
        width: window.innerWidth,
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
    },
}

</script>