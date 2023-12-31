<template>
    <div class="blog__content" v-if="windowWidth < 580">
        <div class="container">
            <div class="blog__content-content">
                <div class="blog__content-container">
                    <div class="blog__content-top">
                        <h1 class="blog__title-posts">Recent media posts</h1>
                    </div>
                    <div class="blog__content-catalog">
                        <div class="blog__item blog__content-item" v-for="blog in 12" :key="blog">
                            <img src="@/assets/images/static/blogcard/blog.jpg" alt="Blog card"
                                class="blog__img blog__content-img">
                            <p class="blog__text">Apartment at Royal Atlantis sets new record at Dh 12,387 per square foot
                                on Palm Jumeirah</p>
                            <div class="blog__initial">
                                <p class="blog__views"><i class="fa-solid fa-eye"></i> 1 456</p>
                                <p class="blog__date">August 30, 2023 18:34</p>
                            </div>
                        </div>
                    </div>
                    <div class="blog__content-bottom">
                        <router-link to="/blog" class="blog__title-posts">All posts</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">@import '@/assets/styles/pages/blog/content.scss';</style>

<script>

export default {
    data: () => ({
        windowWidth: window.innerWidth
    }),
}

</script>