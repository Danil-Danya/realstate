<template>
    <aside class="sidebar">
        <div class="sidebar__container">
            <div class="sidebar__logo-container">
                <router-link to="/">
                    <img src="@/assets/images/static/sidebar/logo.png" alt="Logo" class="sidebar__logo">
                </router-link>
            </div>
            <div class="list-group sidebar__container-link" v-if="showBar">
                <ul>
                    <li v-for="link in links" :key="link">
                        <router-link :to="link.path" active-class="active-bar" exact
                        :class="{ 'active-bar': isLinkActive(link.path) }"
                        class="sidebar__link list-group-item list-group-item-action">
                            <p>{{ link.name }} </p>
                            <p class="sidebar__notification" v-if="link.name === 'Requests' && requests > 0">{{ link.name === 'Requests' ? `${requests}` : '' }}</p>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { beforeRouteUpdate } from 'vue-router';


export default {
    data: () => ({
        requests: 0,
        links: [
            {
                path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-all/1`,
                name: 'Properties managment',
            },
            {
                path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-all/1`,
                name: 'Blog',
            },
            {
                path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/email-all/1`,
                name: 'Requests',
            },
            {
                path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/users-all`,
                name: 'Show users',
            },
        ]
    }),

    props: ['authProp'],

    watch: {
        requests: {
            deep: true,
            immediate: true,
        },
        'getRequests': {
            deep: true,
            immediate: true,
        },
    },

    computed: {
        ... mapGetters(['getRequests']),
        showBar () {
            return this.authProp;
        }
    },

    methods: {
        ...mapActions(['fetchRequest']),

        isLinkActive(linkPath) {
            const currentPath = this.$route.path;
            return currentPath === linkPath;
        },

        async fetchData() {
            const filters = {
                isNew: 'true'
            };
            await this.fetchRequest(filters);
        },
    },

    async mounted() {
        await this.fetchData();
        // this.$router.beforeRouteUpdate(async (to, from, next) => {
        //     await this.fetchData();
        //     this.requests = this.getRequests.length != 0 ? this.getRequests.length : 0;
        //     next();
        // })

        this.requests = this.getRequests.length != 0 ? this.getRequests.length : 0;
    }
}
</script>

<style lang="scss" scoped> 
@import '@/assets/styles/layouts/admin-sidebar.scss';
</style> 