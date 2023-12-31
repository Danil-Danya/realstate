<template>
    <div>
        <transition name="request">
            <delete-request v-if="modal" 
                :idToDelete="selectedRequestId" 
                :nameToDelete="selectedRequestName" 
                @closeModal="closeModal" 
            />
        </transition>
        <div class="admin__container">
            <h2 class="admin__counter">{{ getRequests.length }} properties</h2>
            <request-signature/>
            <div class="admin__item" v-for="(item, index) in getRequests" :key="item"
                :style="index % 2 === 1 ? { background: 'rgba(55, 55, 55, 0.02)' } : {}">
                <div class="admin__index">
                    <h2 class="admin__text-bold">{{ index + 1 }}</h2>
                </div>
                <div class="admin__request-name">
                    <h2 class="admin__text-bold">{{ item.name }}</h2>
                </div>
                <div class="admin__request-tel">
                    <img src="@/assets/images/static/flags/uzbekistan.svg" alt="UZB" class="admin__country">
                    <a class="admin__text" href="tel:+9998909999999">+{{ item.phone }}</a>
                </div>
                <div class="admin__request-email">
                    <a class="admin__text" href="mailto:example@example.com">{{ item.email }}</a>
                </div>
                <div class="admin__request-form">
                    <p class="admin__text" v-if="item.from === 'footer'">Footer</p>
                    <p class="admin__text" v-if="item.from === 'main'">Main</p>
                </div>
                <div class="admin__request-messanger">
                    <span class="admin__form-icon">
                        <i v-if="item.connectionType === 'whatsapp'" class="admin__whatsapp fa-brands fa-whatsapp"></i>
                        <i v-if="item.connectionType === 'telegram'" class="admin__telegram fa-brands fa-telegram"></i>
                    </span>
                </div>
                <div class="admin__request-question">
                    <span class="admin__form-icon">
                        <i class="fa-solid fa-check"></i>
                    </span>
                </div>
                <div class="admin__icon-container">
                    <router-link :to="`/${routerLink}/admin/email-body/${item.name}/${item.id}`" class="admin__icon"><i
                            class="fa-regular fa-eye"></i></router-link>
                    <router-link to="" @click.prevent="showModal(item.id, item.name)" class="admin__icon"><i
                            class="fa-regular fa-trash-can"></i></router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/admin/request.scss';
</style>

<script>
import deleteRequest from '@/components/reused/deleteRequest.vue';
import requestSignature from '@/components/reused/requestSignature.vue';
import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        routerLink: process.env.VUE_APP_ADMIN_ROUTER,
        modal: false,
        selectedRequestId: null,
        selectedRequestName: null
    }),

    computed: mapGetters(['getRequests']),
    methods: {
        ...mapActions(['fetchRequest']),

        showModal(id, name) {
            this.modal = true;
            this.selectedRequestId = id;
            this.selectedRequestName = name;
        },

        closeModal() {
            console.log(213123);
            this.modal = false;
            this.selectedRequestId = null;
            this.selectedRequestName = null;
        }
    },

    components: {
        deleteRequest,
        requestSignature
    },

    async mounted() {
        await this.fetchRequest();
    }
}

</script>
