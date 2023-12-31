<template>
    <div class="admin">
        <adminSideBar :authProp="auth" />
        <div class="container-admin">
            <adminNavbar :authProp="auth" />
            <div v-if="auth">
                <router-view/>
            </div>
            <div v-else>
                <NoAccess/>
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
        auth: true
    }),
    components: {
        adminSideBar,
        adminNavbar, 
        NoAccess
    },
    methods: {
        async confirmAuthorization () {
            const url = '/server-api/authification';
            const token = localStorage.getItem('token');
            
            try {
                if (token) {
                    const response = await axios.post(url, token);
                    const isAuth = response.data.auth;
        
                    this.auth = isAuth;
                    this.$route.meta.auth = isAuth;
                }
            }
            catch (error) {
                console.log('You are not authorizored');
            }
        }
    },
    mounted () {
        this.confirmAuthorization()
    }
}


</script>

<style lang="scss" scoped>
.admin {
    width: 100%;
    display: flex;
}
</style>