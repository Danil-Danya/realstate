<template>
    <section class="popular">
        <h2 class="popular__title title">Popular Areas in Dubai</h2>
        <div class="container-xxl">
            <div class="popular__row">
                <router-link :to="`/map/?locations=${tour.name}`" class="popular__item" v-if="toures.length === 7" v-for="tour in toures" :key="tour">
                    <img :src="tour.path" alt="Tour" class="popular__img">
                    <div class="popular__bg"></div>
                    <div class="popular__item-container">
                        <h2 class="popular__title-item">{{ tour.name }}</h2>
                        <p class="popular__text">0 Properties</p>
                    </div>
                </router-link>
                <div class="popular__error" v-else>
                    <h2 class="error">Ошибка!</h2>
                </div>
            </div>
            <h2 class="popular__title-bottom">
                <span class="popular__gray">Show</span> 
                <a href="#" class="popular__link">all areas</a>
            </h2>
        </div>
    </section>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/index/popular.scss';
</style>

<script>

export default {
    data: () => ({
        toures: [
            {
                name: 'Dubai Marina',
                views: 17,
                path: require('@/assets/images/static/popular/dubai-marina.webp')
            },
            {
                name: 'Sobha Hartland',
                views: 17,
                path: require('@/assets/images/static/popular/sobha-hartland-1.webp')
            },
            {
                name: 'Dubai Hills Estate',
                views: 17,
                path: require('@/assets/images/static/popular/dubai-hills-estate.jpg.webp')
            },
            {
                name: 'Emaar Beachfront',
                views: 17,
                path: require('@/assets/images/static/popular/emaar-beachfront.jpg.webp')
            },
            {
                name: 'Business Bay',
                views: 17,
                path: require('@/assets/images/static/popular/business-bay_-scaled.webp')
            },
            {
                name: 'Downtown Dubai',
                views: 17,
                path: require('@/assets/images/static/popular/downtown-header.webp')
            },
            {
                name: 'Palm Jumeirah',
                views: 17,
                path: require('@/assets/images/static/popular/palm-jumeirah (1).webp')
            },
        ]
    }),
}

</script>