<template>
    <section class="admin-navbar">
        <div class="container-admin">
            <div class="admin-navbar__content">
                <div class="admin-navbar-top">
                    <div class="admin-navbar-input-container">
                        <i class="admin-navbar-input-loop fa-solid fa-magnifying-glass"></i>
                        <input type="text" class="admin-navbar-input" placeholder="House or blog">
                    </div>
                    <router-link to="/" v-if="!authProp"><h2 class="admin-navbar-link-back">Back</h2></router-link>
                    <router-link to="#" v-else @click="logoutUser"><h2 class="admin-navbar-link-back">Log out</h2></router-link>
                </div>
                <div class="admin-navbar-bottom" v-if="navbarAccess()">
                    <nav class="nav">
                        <router-link :to="link.link" class="nav-link active" 
                        aria-current="page"
                        v-if="getPagesType() === 'APPARTAMENT'"
                        v-for="link in adminNavLinks.appartamentLinks" :key="link">
                            {{ link.name }}
                        </router-link>

                        <router-link :to="link.link" class="nav-link active" 
                        aria-current="page"
                        v-if="getPagesType() === 'POST'"
                        v-for="link in adminNavLinks.postLinks" :key="link">
                            {{ link.name }}
                        </router-link>

                        <router-link :to="link.link" class="nav-link active" 
                        aria-current="page"
                        v-if="getPagesType() === 'EMAIL'"
                        v-for="link in adminNavLinks.requetsLinks" :key="link">
                            {{ link.name }}
                        </router-link>
                    </nav>
                    <router-link :to="`/${routerToken}/admin/appartament-create`" type="button" v-if="getPagesType() === 'APPARTAMENT'" class="admin-navbar-button btn btn-dark">Add house</router-link>
                    <router-link :to="`/${routerToken}/admin/post-create`" type="button" v-if="getPagesType() === 'POST'" class="admin-navbar-button btn btn-dark">Add post</router-link>
                </div>
            </div>
        </div>
        <div class="admin-modal-container">
            <adminModal/>
        </div>
    </section>
</template>

<script>
import adminModal from '@/components/reused/adminModal.vue';
import router from '@/router';
import { mapGetters } from 'vuex';

export default {
    data: () => ({
        routerToken: process.env.VUE_APP_ADMIN_ROUTER,
    }),

    props: ['authProp'],

    computed: mapGetters({adminNavLinks: 'getAdminNavLinks'}),

    methods: {
        logoutUser () {
            localStorage.removeItem('token');
            localStorage.removeItem('month');
            localStorage.removeItem('day');

            router.replace('/login')
        },

        navbarAccess () {
            return this.$route.name === 'Appartament-create' || this.$route.name === 'Post-create' ? false : true;
        },

        getPagesType () {
            return this.$route.meta.adminType;
        },
    },
    components: { adminModal },
}

</script>

<style lang="scss" scoped>
@import '@/assets/styles/layouts/admin-nav.scss';
</style>