<template>
    <div class="admin__container">
        <transition>
            <deletePost v-if="modal" :idToDelete="selectedPostId" :nameToDelete="selectedPostName"
                :imgPathsToDelete="selectedPostImgPaths" @closeModal="closeModal" />
        </transition>
        <post-filter/>
        <h2 class="admin__counter">{{ getPosts.length }} properties</h2>
        <postSignature />
        <div class="admin__item" v-for="(item, index) in post" :key="item" v-if="post.length > 1"
            :style="index % 2 === 1 ? { background: 'rgba(55, 55, 55, 0.02)' } : {}">
            <div class="admin__index">
                <h2 class="admin__text-bold">{{ index + 1 }}</h2>
            </div>
            <div class="admin__img">
                <img :src="`/${firstImages[index]}`" alt="Img" class="admin__img">
            </div>
            <div class="admin__post-title">
                <h2 class="admin__text-bold">
                    {{ item.title }}
                </h2>
            </div>
            <div class="admin__post-views">
                <p class="admin__text"> {{ item.views }} </p>
            </div>
            <div class="admin__post-date">
                <p class="admin__text">{{ updateDate(index) }}</p>
            </div>
            <div class="admin__post-time">
                <p class="admin__text">19:20</p>
            </div>
            <div class="admin__post-tags">
                <p class="admin__text">{{ item.tags.split(',').length }}</p>
            </div>
            <div class="admin__icon-container">
                <router-link :to="`/${routerLink}/admin/post-edit/${item.title}/${item.id}`" class="admin__icon"><i
                        class="fa-regular fa-pen-to-square"></i></router-link>
                <router-link to="" @click="showModal(item.id, item.title, item.imgPaths)" class="admin__icon">
                    <i class="fa-regular fa-trash-can"></i>
                </router-link>
            </div>
        </div>
        <div class="admin__post-message" v-else>
            <h2 class="admin__post-title">No entries found</h2>
        </div>
        <div class="admin__pages" v-if="Math.ceil(getPosts.length / 15) > 1">
            <router-link :to="`/${routerLink}/admin/post-draft/${goToPrevPage()}`">
                <i class="fa-solid fa-angle-left"></i>
            </router-link>
            <div class="pages-links">
                <router-link :to="`/${routerLink}/admin/post-draft/1`" v-if="$route.params.index > 3" class="pages-item">
                    1
                </router-link>
                <div v-if="$route.params.index > 3">...</div>
                <router-link :to="`/${routerLink}/admin/post-draft/${$route.params.index - 2}`" v-if="$route.params.index > 2" class="pages-item">
                    {{ $route.params.index - 2 }}
                </router-link>
                <router-link :to="`/${routerLink}/admin/post-draft/${$route.params.index - 1}`" v-if="$route.params.index > 1" class="pages-item">
                    {{ $route.params.index - 1 }}
                </router-link>
                <div class="pages-select">{{ $route.params.index }}</div>
                <router-link :to="`/${routerLink}/admin/post-draft/${+$route.params.index + 1}`" v-if="$route.params.index < Math.ceil(getPosts.length / 15) - 1" class="pages-item">
                        {{ +$route.params.index + 1 }}
                </router-link>
                <router-link :to="`/${routerLink}/admin/post-draft/${+$route.params.index + 2}`" v-if="$route.params.index < (Math.ceil(getPosts.length / 15) - 2)" class="pages-item">
                        {{ +$route.params.index + 2 }}
                </router-link>
                <div v-if="$route.params.index < Math.ceil(getPosts.length / 15) - 2">...</div>
                <router-link :to="`/${routerLink}/admin/post-draft/${Math.ceil(getPosts.length / 15)}`" v-if="$route.params.index < Math.ceil(getPosts.length / 15)" class="pages-item">
                    {{ Math.ceil(getPosts.length / 15) }}
                </router-link>
            </div>
            <router-link :to="`/${routerLink}/admin/post-draft/${goToNextPage()}`">
                <i class="fa-solid fa-angle-right"></i>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/pages/admin/post.scss';
</style>


<script>
import postSignature from '@/components/reused/postSignature.vue';
import deletePost from '@/components/reused/deletePost.vue';
import postFilter from '@/components/reused/postFilter.vue';
import { mapActions, mapGetters } from 'vuex';
import PostFilter from '../../../reused/postFilter.vue';

export default {
    data: () => ({
        routerLink: process.env.VUE_APP_ADMIN_ROUTER,
        modal: false,
        selectedPostId: null,
        selectedPostName: null,
        selectedPostImgPaths: null,
        firstImages: [],
        postStart: 0,
        postEnd: 0,
        post: [],
    }),

    components: {
        postSignature,
        deletePost,
        postFilter
    },

    computed: {
        ...mapGetters(['getPosts']),
    },

    methods: {
        ...mapActions(['fetchPost']),

        getLinksIndex() {
            const startIndex = +this.$route.params.index + 1 || 0;
            const pageSize = 15;
            const links = [];
            //const different = Math.round(this.getAppartaments.length / pageSize) - +this.$route.params.index;

            for (let i = startIndex; i < startIndex + Math.round(this.getPosts.length / pageSize); i++) {
                if (i < Math.round(this.getPosts.length / pageSize) && links.length < 7) {
                    links.push(i);
                }
            }

            return links;
        },

        getLinksIndex() {
            const startIndex = +this.$route.params.index + 1 || 0;
            const pageSize = 15;
            const links = [];
            //const different = Math.round(this.getAppartaments.length / pageSize) - +this.$route.params.index;

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

        updateFirstImages() {
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

        updateDate(index) {
            const responseDate = this.post[index].date;
            const dateArr = responseDate.split('-');

            const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'Jule', 'Aug', 'Sempt', 'Oct', 'Nov', 'Dec'];
            const selectedMonth = months[dateArr[1]];

            const updatedDate = `${selectedMonth} ${dateArr[0]}, ${dateArr[2]}`;
            return updatedDate;
        },

        showModal(id, name, imgPaths) {
            this.modal = true;
            this.selectedPostId = id;
            this.selectedPostName = name;
            this.selectedPostImgPaths = imgPaths;
        },

        closeModal() {
            this.modal = false;
            this.selectedPostId = null;
            this.selectedPostName = null;
            this.selectedPostImgPaths = false;
        },

        async fetchData() {
            const filters = {
                isDraft: 'true'
            };
            await this.fetchPost(filters);
        },
    },

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
        await this.fetchData();
    
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
    }
}

</script>