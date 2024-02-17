<template>
    <div class="blog__content">
        <div class="container">
            <div class="blog__content-content">
                <div class="blog__content-container">
                    <div class="blog__content-top">
                        <h1 class="blog__title">All blogs</h1>
                    </div>
                    <post-filter/>
                    <div class="blog__content-catalog">
                        <div class="blog__item blog__content-item" v-for="(blog, index) in post" :key="blog">
                            <router-link :to="`/post/${blog.title}`">
                                <img :src="`/${img[index]}`" alt="Blog card" class="blog__img blog__content-img">
                            </router-link>
                            <p class="blog__text">{{ blog.title.length < 50 ? blog.title : blog.title.slice(0, 50) + '...' }}</p>
                            <div class="blog__initial">
                                <p class="blog__views"><i class="fa-solid fa-eye"></i> {{ blog.views }}</p>
                                <p class="blog__date">{{ blog.date }} {{ blog.time }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="admin__pages" v-if="Math.ceil(getPosts.length / 15) > 1">
                <router-link :to="`/${routerLink}/admin/post-active/${goToPrevPage()}`">
                    <i class="fa-solid fa-angle-left"></i>
                </router-link>
                <div class="pages-links">
                    <router-link :to="`/${routerLink}/admin/post-active/1`" v-if="$route.params.index > 3" class="pages-item">
                        1
                    </router-link>
                    <div v-if="$route.params.index > 3">...</div>
                    <router-link :to="`/${routerLink}/admin/post-active/${$route.params.index - 2}`" v-if="$route.params.index > 2" class="pages-item">
                        {{ $route.params.index - 2 }}
                    </router-link>
                    <router-link :to="`/${routerLink}/admin/post-active/${$route.params.index - 1}`" v-if="$route.params.index > 1" class="pages-item">
                        {{ $route.params.index - 1 }}
                    </router-link>
                    <div class="pages-select">{{ $route.params.index }}</div>
                    <router-link :to="`/${routerLink}/admin/post-active/${+$route.params.index + 1}`" v-if="$route.params.index < Math.ceil(getPosts.length / 15) - 1" class="pages-item">
                            {{ +$route.params.index + 1 }}
                    </router-link>
                    <router-link :to="`/${routerLink}/admin/post-active/${+$route.params.index + 2}`" v-if="$route.params.index < (Math.ceil(getPosts.length / 15) - 2)" class="pages-item">
                            {{ +$route.params.index + 2 }}
                    </router-link>
                    <div v-if="$route.params.index < Math.ceil(getPosts.length / 15) - 2">...</div>
                    <router-link :to="`/${routerLink}/admin/post-active/${Math.ceil(getPosts.length / 15)}`" v-if="$route.params.index < Math.ceil(getPosts.length / 15)" class="pages-item">
                        {{ Math.ceil(getPosts.length / 15) }}
                    </router-link>
                </div>
                <router-link :to="`/${routerLink}/admin/post-active/${goToNextPage()}`">
                    <i class="fa-solid fa-angle-right"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/blog/content.scss';
</style>

<script>
import { mapActions, mapGetters } from 'vuex';
import postFilter from '@/components/reused/postFilter.vue';


export default {
    data: () => ({
        img: []
    }),

    components: {
        postFilter,
        postStart: 0,
        postEnd: 0,
        post: [],
    },

    methods: {
        ...mapActions(['fetchPost']),

        getLinksIndex() {
            const startIndex = +this.$route.params.index + 1 || 0;
            const pageSize = 15;
            const links = [];

            for (let i = startIndex; i < startIndex + Math.round(this.getPosts.length / pageSize); i++) {
                if (i < Math.round(this.getPosts.length / pageSize) && links.length < 7) {
                    links.push(i);
                }
            }

            return links;
        },

        goToNextPage() {
            if (Math.round(this.getPosts.length / 15) !== +this.$route.params.index) {
                return +this.$route.params.index + 1;
            }
        },

        goToPrevPage() {
            if (+this.$route.params.index !== 1) {
                return +this.$route.params.index - 1;
            }
            else return this.$route.params.index
        },
    },
    computed: mapGetters(['getPosts']),

    watch: {
        '$route.params.index': {
            immediate: true,
            handler(newIndex) {
                this.post = [];

                if (this.post.length <= 15) {
                    this.postStart = (newIndex - 1) * 15;
                    this.postEnd = newIndex * 15;
                    this.post = this.getPosts.slice(this.postStart, this.postEnd);
                }
            },
        },
        'getPosts': {
            deep: true,
            handler(newPosts) {
                this.post = [];

                if (this.post.length <= 15) {
                    this.postStart = (this.$route.params.index - 1) * 15;
                    this.postEnd = this.$route.params.index * 15;
                    this.post = newPosts.slice(this.postStart, this.postEnd);
                }
            },
        },
        'post': {
            immediate: true,
            deep: true,
            handler() {
                this.firstImages = [];
                this.post.forEach(item => {
                    const content = JSON.parse(item.content);

                    content.some(obj => {
                        if (obj.type === 'IMAGE') {
                            this.firstImages.push(obj.path);
                            return true;
                        }
                        return false;
                    });
                });
            },
        },
    },

    async mounted() {
        await this.fetchPost();

        this.postStart = (+this.$route.params.index - 1) * 15;
        this.postEnd = +this.$route.params.index * 15;
        this.post = [];
        this.firstImages = [];

        this.getPosts.forEach((item, index) => {
            if (this.post.length < 15) {
                if (index + 1 > this.postStart && index <= this.postEnd) {
                    this.post.push(item);
                }
            }
        })

        console.log('post', this.post);

        this.getPosts.forEach(item => {
            const content = JSON.parse(item.content);

            content.some(obj => {
                if (obj.type === 'IMAGE') {
                    this.img.push(obj.path);
                    return true;
                }
                return false;
            });
        });
    }
}

</script>