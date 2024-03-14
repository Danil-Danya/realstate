<template>
    <aside class="sidebar">
        <div class="sidebar__container">
            <div class="sidebar__logo-container">
                <router-link to="/">
                    <img src="@/assets/images/static/sidebar/logo.png" alt="Logo" class="sidebar__logo">
                </router-link>
            </div>
            <transition name="sidebarLikns">
                <div class="list-group sidebar__container-link" v-if="showBar && thereAreLinks">
                    <ul>
                        <li v-for="link in links" :key="link.path">
                            <router-link v-if="role === 'SUPER_ADMIN' || link.role === role" :to="link.path" 
                                active-class="active-bar" exact @click="closeMobileLinks"
                                :class="{ 'active-bar': isLinkActive(link.path) }"
                                class="sidebar__link list-group-item list-group-item-action"
                            >
                                <p>{{ link.name }}</p>
                                <p class="sidebar__notification" v-if="link.name === 'Requests' && requests > 0">{{ link.name === 'Requests' ? `${requests}` : '' }}</p>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </transition>
        </div>
        <div class="sidebar__mobile" v-if="windowWidth < 960">
            <div class="sidebar__mobile-switcher">
                <span class="sidebar__icon" @click="toggleMobileLinks">
                    <i class="sidebar__icon-el fa-solid fa-bars-staggered" ref="burgerMenu"></i>
                </span>
            </div>
        </div>
    </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { beforeRouteUpdate } from 'vue-router';


export default {
    data: () => ({
        windowWidth: window.innerWidth,
        requests: 0,
        role: localStorage.getItem('role'),
        thereAreLinks: true,
        links: [
            {
                path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-all/1`,
                role: 'CREATOR',
                name: 'Properties managment',
            },
            {
                path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/post-all/1`,
                name: 'Blog',
                role: 'CREATOR',
            },
            {
                path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/email-all/1`,
                name: 'Requests',
                role: 'SPECTATOR',
            },
            {
                path: `/${process.env.VUE_APP_ADMIN_ROUTER}/admin/users-all`,
                name: 'Show users',
                role: 'SUPER_ADMIN',
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
        },

        filteredLinks() {
            return this.links.filter(link => link.role === this.role);
        }
    },

    methods: {
        ...mapActions(['fetchRequest']),

        isLinkActive(linkPath) {
            const currentPath = this.$route.path;
            return currentPath === linkPath;
        },

        toggleMobileLinks () {
            let burgerMenu = document.querySelector('.sidebar__icon-el');

            if (this.thereAreLinks) {
                this.thereAreLinks = false;

                burgerMenu.classList.remove('fa-xmark');
                burgerMenu.classList.add('fa-bars-staggered');
            }
            else {
                this.thereAreLinks = true;
                
                burgerMenu.classList.remove('fa-bars-staggered');
                burgerMenu.classList.add('fa-xmark');
            }
        },

        closeMobileLinks () {
            if (window.innerWidth < 960) {
                this.thereAreLinks = false;
            }
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

        if (window.innerWidth < 960) {
            this.thereAreLinks = false;
        }
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