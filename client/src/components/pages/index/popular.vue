<template>
    <section class="popular">
        <h2 class="popular__title title">Popular Areas in Dubai</h2>
        <div class="container-xxl">
            <div class="popular__row">
                <a href="#" class="popular__item" v-if="toures.length === 7" v-for="tour in toures" :key="tour">
                    <img src="@/assets/images/static/popular/popular.png" alt="Tour" class="popular__img">
                    <div class="popular__item-container">
                        <h2 class="popular__title-item">{{ tour.name }}</h2>
                        <p class="popular__text">{{ tour.views }} Properties</p>
                    </div>
                </a>
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
                views: 17
            },
            {
                name: 'Sobha Hartland',
                views: 17
            },
            {
                name: 'Dubai Hills Estate',
                views: 17
            },
            {
                name: 'Emaar Beachfront',
                views: 17
            },
            {
                name: 'Business Bay',
                views: 17
            },
            {
                name: 'Downtown Dubai',
                views: 17
            },
            {
                name: 'Palm Jumeirah',
                views: 17
            },
        ]
    }),
}

</script>