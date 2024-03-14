<template>
    <div>
        <deleteUsers 
            v-if="modal"
            :deleteUsers="deleteUsers"
            :email="email"
            @closeModal="closeModal" 
        />
        <h2 class="admin__counter">{{ getUsers.length }} Users</h2>
        <div class="admin__users-content">
            <div class="admin__item" v-for="(item, index) in getUsers" :key="item"
             :style="index % 2 === 1 ? { background: 'rgba(55, 55, 55, 0.02)' } : {}"
            >
                <div class="admin__index">
                    <h2 class="admin__text-bold">{{ index + 1 }}</h2>
                </div>
                <div class="admin__users-title">
                    <h2 class="admin__text-bold">
                        {{ item.email }}
                    </h2>
                </div>
                <div class="form-check form-switch" style="margin: 10px;" v-if="index != 0 && role === 'SUPER_ADMIN'">
                    <input class="form-check-input" type="checkbox" ref="creator"
                        @click="changeFieldInRole(index, item.email, item.role)" 
                        id="creator" :checked="item.role === 'CREATOR' ? true : false"
                    >
                    <label class="form-check-label">For creation </label>
                </div>
                <div class="form-check form-switch" style="margin: 10px;" v-if="index != 0 && role === 'SUPER_ADMIN'">
                    <label class="form-check-label" for="flexSwitchCheckChecked">For view</label>
                    <input class="form-check-input" type="checkbox" ref="spectator"
                     @click="changeFieldInRole(index, item.email, item.role)"  
                     id="spectator" :checked="item.role === 'SPECTATOR' ? true : false"
                    >
                </div>
                <div class="admin__icon-container">
                    <router-link to="" @click="showModal(item.email)" class="admin__icon">
                        <i class="fa-regular fa-trash-can"></i>
                    </router-link>
                </div>
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
import axios from 'axios';

export default {
    data: () => ({
        modal: false,
        email: '',
        role: localStorage.getItem('role')
    }),

    components: {
        deleteUsers
    },

    computed: mapGetters(['getUsers']),
    methods: {
        ...mapActions(['fetchUsers']),

        async changeFieldInRole (index, email, role) {
            let input = document.querySelectorAll(`#${role.toLowerCase()}`);

            const idCreator = 'creator';
            const idSpectator = 'spectator';
            const idInput = input[index - 1].getAttribute('id');

            let newRole;
            
            if (idInput === idCreator) {
                newRole = 'SPECTATOR';

                const isChanged = await this.requestEditRole(newRole, email);

                if (isChanged) {
                    this.getUsers[index].role = idSpectator.toUpperCase();
                    console.log(this.getUsers[index].role);
                }
            } 
            else {
                newRole = 'CREATOR';

                const isChanged = await this.requestEditRole(newRole, email);

                if (isChanged) {
                    this.getUsers[index].role = idCreator.toUpperCase();
                    console.log(this.getUsers[index].role);
                }
            }
        },

        async requestEditRole (role, email) {
            const url = '/server-api/edit-user-role';

            try {
                const response = await axios.put(url, { email, role });
                console.log(response);

                return response ? true : false;
            }
            catch (error) {
                console.log(error);
                return false;
            }
        },

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