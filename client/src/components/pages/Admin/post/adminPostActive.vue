<template>
    <div class="admin__container">
        <transition name="post">
            <deletePost v-if="modal" :idToDelete="selectedPostId" :nameToDelete="selectedPostName"
                :imgPathsToDelete="selectedPostImgPaths" @closeModal="closeModal" />
        </transition>
        <h2 class="admin__counter">{{ getPosts.length }} properties</h2>
        <postSignature />
        <div class="admin__item" v-for="(item, index) in getPosts" :key="item"
            :style="index % 2 === 1 ? { background: 'rgba(55, 55, 55, 0.02)' } : {}">
            <div class="admin__index">
                <h2 class="admin__text-bold">{{ index + 1 }}</h2>
            </div>
            <div class="admin__img">
                <img :src="`/${item.imgPaths}`" alt="Img" class="admin__img">
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
                <p class="admin__text">{{ item.time }}</p>
            </div>
            <div class="admin__post-tags">
                <p class="admin__text">{{ item.tags.split(',').length }}</p>
            </div>
            <div class="admin__icon-container">
                <router-link :to="`/${routerLink}/admin/post-edit/${item.title}/${item.id}`" class="admin__icon"><i class="fa-regular fa-pen-to-square"></i></router-link>
                <router-link to="" @click="showModal(item.id, item.title, item.imgPaths)" class="admin__icon">
                    <i class="fa-regular fa-trash-can"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/admin/post.scss';
</style>


<script>
import postSignature from '@/components/reused/postSignature.vue';
import deletePost from '@/components/reused/deletePost.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        routerLink: process.env.VUE_APP_ADMIN_ROUTER,
        modal: false,
        selectedPostId: null,
        selectedPostName: null,
        selectedPostImgPaths: null
    }),

    components: {
        postSignature,
        deletePost
    },

    computed: {
        ...mapGetters(['getPosts']),
    },

    methods: {
        ...mapActions(['fetchPost']),

        updateDate(index) {
            const responseDate = this.getPosts[index].date;
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
                isActive: 'true'
            };
            await this.fetchPost(filters);
        },
    },

    async mounted() {
        await this.fetchData();
        console.log(this.getPosts);
    }
}

</script>