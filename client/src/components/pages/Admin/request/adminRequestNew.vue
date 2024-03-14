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
            <div class="admin__request-content">
                <request-signature/>
                <h2 class="admin__request-title" v-if="request.length === 0">New messages haven't appeared yet, but don't worry and come back later</h2>
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
                        <router-link :to="`/${routerLink}/admin/email-body/${item.name}/${item.id}`" class="admin__icon"><i class="fa-regular fa-eye"></i></router-link>
                        <router-link to="" @click.prevent="showModal(item.id, item.name)" class="admin__icon"><i class="fa-regular fa-trash-can"></i></router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="admin__pages" v-if="Math.ceil(getRequests.length / 15) > 1">
            <router-link :to="`/${routerLink}/admin/email-new/${goToPrevPage()}`">
                <i class="fa-solid fa-angle-left"></i>
            </router-link>
            <div class="pages-links">
                <router-link :to="`/${routerLink}/admin/email-new/1`" v-if="$route.params.index > 3" class="pages-item">
                    1
                </router-link>
                <div v-if="$route.params.index > 3">...</div>
                <router-link :to="`/${routerLink}/admin/email-new/${$route.params.index - 2}`" v-if="$route.params.index > 2" class="pages-item">
                    {{ $route.params.index - 2 }}
                </router-link>
                <router-link :to="`/${routerLink}/admin/email-new/${$route.params.index - 1}`" v-if="$route.params.index > 1" class="pages-item">
                    {{ $route.params.index - 1 }}
                </router-link>
                <div class="pages-select">{{ $route.params.index }}</div>
                <router-link :to="`/${routerLink}/admin/email-new/${+$route.params.index + 1}`" v-if="$route.params.index < Math.ceil(getRequests.length / 15) - 1" class="pages-item">
                        {{ +$route.params.index + 1 }}
                </router-link>
                <router-link :to="`/${routerLink}/admin/email-new/${+$route.params.index + 2}`" v-if="$route.params.index < (Math.ceil(getRequests.length / 15) - 2)" class="pages-item">
                        {{ +$route.params.index + 2 }}
                </router-link>
                <div v-if="$route.params.index < Math.ceil(getRequests.length / 15) - 2">...</div>
                <router-link :to="`/${routerLink}/admin/email-newl/${Math.ceil(getRequests.length / 15)}`" v-if="$route.params.index < Math.ceil(getRequests.length / 15)" class="pages-item">
                    {{ Math.ceil(getRequests.length / 15) }}
                </router-link>
            </div>
            <router-link :to="`/${routerLink}/admin/email-new/${goToNextPage()}`">
                <i class="fa-solid fa-angle-right"></i>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/pages/admin/request.scss';
</style>

<script>
import deleteRequest from '@/components/reused/deleteRequest.vue';
import requestSignature from '@/components/reused/requestSignature.vue';
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        routerLink: process.env.VUE_APP_ADMIN_ROUTER,
        modal: false,
        selectedRequestId: null,
        selectedRequestName: null,
        requestStart: 0,
        requestEnd: 0,
        request: [],
    }),

    components: {
        deleteRequest,
        requestSignature
    },

    computed: mapGetters(['getRequests']),
    
    methods: {
        ...mapActions(['fetchRequest']),

        getLinksIndex() {
            const startIndex = +this.$route.params.index + 1 || 0;
            const pageSize = 15;
            const links = [];
            //const different = Math.round(this.getAppartaments.length / pageSize) - +this.$route.params.index;

            for (let i = startIndex; i < startIndex + Math.round(this.getRequests.length / pageSize); i++) {
                if (i < Math.round(this.getRequests.length / pageSize) && links.length < 7) {
                    links.push(i);
                }
            }

            return links;
        },

        getLinksIndex() {
            const startIndex = +this.$route.params.index + 1 || 0;
            const pageSize = 15;
            const links = [];
            //const different = Math.round(this.getAppartaments.length / pageSize) - +this.$route.params.index;

            for (let i = startIndex; i < startIndex + Math.round(this.getRequests.length / pageSize); i++) {
                if (i < Math.round(this.getRequests.length / pageSize) && links.length < 7) {
                    links.push(i);
                }
            }

            return links;
        },

        goToNextPage() {
            if (Math.round(this.getRequests.length / 15) !== +this.$route.params.index) {
                return +this.$route.params.index + 1;
            }
        },

        goToPrevPage() {
            if (+this.$route.params.index !== 1) {
                return +this.$route.params.index - 1;
            }
            else return this.$route.params.index
        },

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
        },

        async deleteRequest (id, name) {
            try {
                const url = `/${process.env.VUE_APP_API_PATH}/request-delete`;

                const response = await axios.delete(url, {
                    data: { id, name },
                });
                await this.fetchRequest(filter);
            }
            catch (error) {
                console.log(error);
            }
        },
 
        async fetchData() {
            const filters = {
                isNew: 'true'
            };
            await this.fetchRequest(filters);
        },
    },

    watch: {
        '$route.params.index': {
            immediate: true,
            handler(newIndex) {
                this.request = [];

                if (this.request.length <= 15) {
                    this.requestStart = (newIndex - 1) * 15;
                    this.requestEnd = newIndex * 15;
                    this.request = this.getRequests.slice(this.requestStart, this.requestEnd);
                }
            },
        },
        'getRequests': {
            deep: true,
            handler(newRequest) {
                this.request = [];

                if (this.request.length <= 15) {
                    this.requestStart = (newRequest - 1) * 15;
                    this.requestEnd = newRequest * 15;
                    this.request = this.getRequests.slice(this.requestStart, this.requestEnd);
                }
            },
        },
    },

    async mounted () {
        await this.fetchData();

        this.requestStart = (+this.$route.params.index - 1) * 15;
        this.requestEnd = +this.$route.params.index * 15;
        this.request = [];

        this.getRequests.forEach((item, index) => {
            if (this.request.length < 15) {
                if (index + 1 > this.requestStart && index <= this.requestEnd) {
                    this.request.push(item);
                }
            }
        })
    }
}

</script>