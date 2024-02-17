<template>
    <div>
        <deleteUsers 
            v-if="modal"
            :deleteUsers="deleteUsers"
            :email="email"
            @closeModal="closeModal" 
        />
        <h2 class="admin__counter">{{ getUsers.length }} Users</h2>
        <div class="admin__item" v-for="(item, index) in getUsers" :key="item"
         :style="index % 2 === 1 ? { background: 'rgba(55, 55, 55, 0.02)' } : {}"
        >
            <div class="admin__index">
                <h2 class="admin__text-bold">{{ index + 1 }}</h2>
            </div>
            <div class="admin__users-title">
                <h2 class="admin__text-bold">
                    {{ item }}
                </h2>
            </div>
            <div class="admin__icon-container">
                <router-link to="" @click="showModal(item)" class="admin__icon">
                    <i class="fa-regular fa-trash-can"></i>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/admin/users.scss';
</style>

<script>
import { mapActions, mapGetters } from 'vuex'
import deleteUsers from '@/components/reused/deleteUsers.vue';

export default {
    data: () => ({
        modal: false,
        email: '',
    }),

    components: {
        deleteUsers
    },

    computed: mapGetters(['getUsers']),
    methods: {
        ...mapActions(['fetchUsers']),

        showModal(email) {
            this.email = email;
            this.modal = true;
        },

        closeModal() {
            this.email = '';
            this.modal = false;
        },
    },

    async mounted() {
        await this.fetchUsers();
        console.log(this.getUsers);
    }
}


</script>