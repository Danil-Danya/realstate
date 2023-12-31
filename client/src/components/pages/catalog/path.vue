<template>
    <div class="blog__path-container">
        <div class="container">
            <div class="blog__path-container">
                <div class="blog__path path__back">
                    <div class="path__back-container">
                        <router-link to="#" class="path__back-link">
                            <span class="path__back-icon">
                                <i class="fa-solid fa-angle-left"></i>
                            </span>
                            <p class="path__back-text">Back</p>
                        </router-link>
                    </div>
                    <div class="blog__path path__links">
                        <ul>
                            <li v-for="(link, index) in links" :key="link">
                                <router-link :to="link.link" class="blog__path-link path__link"
                                    :class="index === links.length - 1 ? 'path__link-active' : ''">
                                    <p class="path__link-text">{{ link.name }}</p>
                                    <span class="blog__path-slash path-slash" v-if="index != links.length - 1">/</span>
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
                link: '/',
                isActive: false
            },
            {
                name: 'Catalog',
                link: '#',
                isActive: true

            },
        ]
    })
}
</script>