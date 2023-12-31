<template>
    <div class="apartament__filter">
        <div class="container">
            <div class="apartament__filter-content">
                <div class="apartament__path path__back">
                    <div class="path__back-container">
                        <router-link to="#" class="path__back-link">
                            <span class="path__back-icon">
                                <i class="fa-solid fa-angle-left"></i>
                            </span>
                            <p class="path__back-text">Back</p>
                        </router-link>
                    </div>
                    <div class="apartament__path path__links">
                        <ul>
                            <li v-for="(link, index) in links" :key="link">
                                <router-link :to="link.link" 
                                 class="apartament__path-link path__link"
                                >
                                    <p class="path__link-text">{{ link.name }}</p>
                                    <span class="apartament__path-slash path-slash" v-if="index != links.length">/</span>
                                </router-link>
                            </li>
                            <li>
                                <router-link to="#" class="apartament__path-link path__link path__link-active">
                                    <p class="path__link-text" v-if="dataInfo.name">{{ dataInfo.name.length < 15 ? dataInfo.name : dataInfo.name.slice(0, 10) + '...' }}</p>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="apartament__info" v-if="windowWidth > 580">
                    <div class="apartament__info-left">
                        <div class="apartament__rating">
                            <span class="apartament__info-icon">
                                <i class="fa-solid fa-star"></i>
                            </span>
                            <p class="apartament__rating-text">4.7 (13)</p>
                        </div>
                        <div class="apartament__location">
                            <span class="apartament__info-icon">
                                <i class="fa-solid fa-location-dot"></i>
                            </span>
                            <p class="apartament__location-text">{{ dataInfo.addres }}</p>
                        </div>
                        <div class="apartament__map">
                            <p class="apartament__map-text">Show in map</p>
                        </div>
                    </div>
                    <div class="apartament__info-right">
                        <div class="apartament__icon-container">
                            <span class="apartament__info-icon">
                                <i class="fa-regular fa-heart"></i>
                            </span>
                            <span class="apartametnt__map">
                                <span class="apartament__info-icon">
                                    <i class="fa-solid fa-share-nodes"></i>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/apartament/filter.scss';
</style>

<script>
export default {
    data: () => ({
        windowWidth: window.innerWidth,
        links: [
            {
                name: 'Home',
                link: '/',
                isActive: false
            },
            {
                name: 'Catalog',
                link: '/catalog',
                isActive: false

            },
        ]
    }),
    
    props: {
        dataInfo: Object
    }
}
</script>