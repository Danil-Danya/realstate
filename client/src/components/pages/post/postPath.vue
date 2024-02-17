<template>
    <div class="post__path-container">
        <div class="container">
            <div class="post__path path__back">
                <div class="path__back-container">
                    <router-link to="#" class="path__back-link">
                        <span class="path__back-icon">
                            <i class="fa-solid fa-angle-left"></i>
                        </span>
                        <p class="path__back-text">Back</p>
                    </router-link>
                </div>
                <div class="post__path path__links">
                    <ul>
                        <li v-for="(link, index) in links" :key="link">
                            <router-link :to="link.link" 
                                class="post__path-link path__link"
                                :class="index === links.length - 1 ? 'path__link-active' : ''"
                            >
                                <p class="path__link-text">{{ link.name }}</p>
                                <span class="post__path-slash path-slash" 
                                    v-if="index != links.length - 1">/</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/styles/pages/post/path.scss';
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
                name: 'Blog',
                link: '/blog/',
                isActive: false

            },
            {
                name: 'Apartment at Royal Atlantis...',
                link: '#',
                isActive: true
            },
        ]
    })
}
</script>