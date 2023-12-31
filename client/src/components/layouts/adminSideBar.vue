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
                            {{ link.name }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>

<script>
export default {
    data: () => ({
        links: [
            {
                path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-all/0`,
                name: 'Properties managment',
            },
            {
                path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-all`,
                name: 'Blog',
            },
            {
                path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/email-all`,
                name: 'Requests',
            },
            {
                path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/user-all`,
                name: 'Edit users',
            },
        ]
    }),

    props: ['authProp'],

    computed: {
        showBar () {
            return this.authProp;
        }
    },

    methods: {
        isLinkActive(linkPath) {
            const currentPath = this.$route.path;
            return currentPath === linkPath;
        },
    },
}
</script>

<style lang="scss" scoped> 
@import '@/assets/styles/layouts/admin-sidebar.scss';
</style> 