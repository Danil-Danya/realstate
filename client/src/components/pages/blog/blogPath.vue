<template>
    <div class="catalog__path-container">
        <div class="container">
            <div class="catalog__path-container">
                <div class="catalog__path path__back">
                    <div class="catalog__path-container">
                        <router-link to="#" class="path__back-link">
                            <span class="path__back-icon">
                                <i class="fa-solid fa-angle-left"></i>
                            </span>
                            <p class="catalog__path-text">Back</p>
                        </router-link>
                    </div>
                    <div class="catalog__path path__links">
                        <ul>
                            <li v-for="(link, index) in links" :key="link">
                                <router-link to="#" 
                                    class="catalog__path-link path__link"
                                    :class="index === links.length - 1 ? 'path__link-active' : ''"
                                >
                                    <p class="path__link-text">{{ link.name }}</p>
                                    <span class="catalog__path-slash path-slash" 
                                        v-if="index != links.length - 1">/</span>
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/pages/blog/path.scss';
</style>

<script>
export default {
    data: () => ({
        links: [
            {
                name: 'Home',
                link: '',
                isActive: false
            },
            {
                name: 'Blog',
                link: '',
                isActive: true

            },
        ]
    })
}
</script>