<template>
    <div class="admin">
        <adminSideBar :authProp="auth" />
        <div class="container-admin" ref="container">

            <adminNavbar :authProp="auth" />
            <div v-if="auth && accessInRole">
                <router-view />
            </div>
            <div v-else>
                <NoAccess />
            </div>
        </div>
    </div>
</template>

<script>
import adminSideBar from '@/components/layouts/adminSideBar.vue';
import adminNavbar from '@/components/layouts/adminNavbar.vue';
import NoAccess from '@/views/NoAccess.vue';
import axios from 'axios';

export default {
    data: () => ({
        auth: true,
    }),
    components: {
        adminSideBar,
        adminNavbar, 
        NoAccess
    },
    computed: {
        accessInRole () {
            const role = localStorage.getItem('role');
            const page = this.$route.meta.adminType;

            if (role === 'SUPER_ADMIN') {
                return true;
            }

            if (role === 'CREATOR') {
                if (page === 'APPARTAMENT' || page === 'POST') {
                    return true;
                }
            }

            if (role === 'SPECTATOR') {
                if (page === 'EMAIL') {
                    return true;
                }
            }

            return false;
        }
    },
    methods: {
        async confirmAuthorization () {
            const url = '/server-api/authification';
            const token = localStorage.getItem('token');
            const auth = localStorage.getItem('auth');
            
            console.log(token);
            try {
                if (token && auth) {
                    const response = await axios.post(url, { token });
                    const isAuth = response.data.auth;
        
                    this.auth = isAuth;
                    this.$route.meta.auth = isAuth;
                }
            }
            catch (error) {
                console.log('You are not authorizored');
            }
        },

        changeAdminContainer () {
            let container = this.$refs.container;

            if (window.innerWidth < 1920) {
                container.style.setProperty('width', window.innerWidth - 330 + 'px', 'important');
            }
            if (window.innerWidth < 960) {
                container.style.setProperty('width', window.innerWidth + 'px', 'important');
            }
        }
    },
    mounted () {
        this.confirmAuthorization();
        this.changeAdminContainer();
        console.log(this.accessInRole, this.auth);

        window.addEventListener('resize', () => this.changeAdminContainer());
    }
}


</script>

<style lang="scss" scoped>
.admin {
    width: 100%;
    display: flex;
}
</style>