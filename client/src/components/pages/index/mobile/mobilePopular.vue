<template>
    <div class="popular">
        <h2 class="popular__title title">Popular Areas in Dubai</h2>
        <div class="container-xxl">
            <div class="popular__flex">
                <router-link to="#" class="popular__item" v-for="tour in toures" :key="tour">
                    <img src="@/assets/images/static/popular/popular.png" alt="Tour" class="popular__img">
                    <div class="popular__item-container">
                        <h2 class="popular__title-item">{{ tour.name }}</h2>
                        <p class="popular__text">{{ tour.views }} Properties</p>
                    </div>
                </router-link>
                <h2 class="popular__title-bottom">
                    <router-link to="/map" class="popular__link">All areas</router-link>
                </h2>
            </div>
        </div>
    </div>
</template>


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