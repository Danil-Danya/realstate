<template>
    <div class="admin__request-body">
        <div class="admin__request-body-nav">
            <a href="#" @click="goBack"><i class="fa-solid fa-angle-left"></i> Back</a>
            <h2 class="admin__title">Request</h2>
            <a href="#" class="admin__delete"><i class="fa-solid fa-trash-can"></i> Delete request</a>
        </div>
        <div class="admin__request-body-container">
            <div class="admin__content">
                <div class="admin__request-body-name">
                    <p class="admin__text">Name: </p>
                    <p class="admin__text-bold admin__text-big">{{ page.name }}</p>
                </div>
                <div class="admin__request-body-tel">
                    <p class="admin__text">Phone: </p>
                    <div class="admin__request-body-tel-container">
                        <img v-if="page.phone" src="@/assets/images/static/flags/uzbekistan.svg" alt="" class="admin__request-body-flag">
                        <a v-if="page.phone" :href="`to:+${page.phone}`" class="admin__text-bold admin__request-body-link">+{{ page.phone }}</a>
                        <p class="admin__text" v-if="!page.phone">unfortunately the user did not enter a phone number</p>
                    </div>
                </div>
                <div class="admin__request-body-email">
                    <p class="admin__text">Email: </p>
                    <a class="admin__text admin__request-body-link" :href="`mailto:${page.email}`">{{ page.email }}</a>
                    <p class="admin__text" v-if="!page.email">unfortunately the user did not enter an email</p>
                </div>
                <div class="admin__request-body-question">
                    <p class="admin__text">Question: </p>
                    <p class="admin__text admin__request-body-question-text" v-if="page.question">
                        {{ page.question }}
                    </p>
                    <p  class="admin__text admin__request-body-question-text" v-else>
                        Sorry, the user did not send any message
                    </p>
                </div>
                <span class="admin__line"></span>
                <div class="admin__request-body-data">
                    <div class="admin__request-body-type">
                        <p class="admin__text">Text on:</p>
                        <span class="admin__request-body-icon">
                            <i v-if="page.connectionType === 'whatsapp'" class="admin__whatsapp fa-brands fa-whatsapp"></i>
                            <i v-if="page.connectionType === 'telegram'" class="admin__telegram fa-brands fa-telegram"></i>
                        </span>
                    </div>
                    <div class="admin__request-body-from">
                        <p class="admin__text">From:</p>
                        <router-link to="" class="admin__text admin__request-body-link">{{ page.fromPage }}</router-link>
                    </div>
                </div>
                <div class="admin__create-buttons-container">
                    <button type="button" @click="goBack" class="btn admin__create-buttons-btn btn-dark">Done</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/pages/admin/request-body.scss';
</style>

<script>
import { mapGetters, mapActions } from 'vuex';
import axios from 'axios';
import { nextTick } from 'vue';

export default {
    data: () => ({
        page: {}
    }),

    methods: {
        ...mapActions(['fetchOneRequest']),
        goBack () {
            this.$router.go(-1);
        },

        async updateRequest() {
            const url = `/${process.env.VUE_APP_API_PATH}/request-update`;

            const data = {
                id: this.getOneRequests.request.id,
                isNew: false
            }
            console.log(data);
            const updated = await axios.put(url, data);

            if (this.getOneRequests.request.isNew) {
                location.reload()
            }
        },
    },

    computed: mapGetters(['getOneRequests']),

    async mounted () {
        const data = {
            id: +this.$route.params.id,
            name: this.$route.params.name
        }

        await this.fetchOneRequest(data);

        this.page = this.getOneRequests.request;
        this.$nextTick(async () => await this.updateRequest());
    }
}

</script>