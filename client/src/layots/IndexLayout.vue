<template>
    <div class="site">
        <navbar/>
        <navbarMobile/>
        <main class="main" style="min-height: 100vh;">
            <router-view />
        </main> 
        <footerVue/>
        <footerMobile @toggleForm="openMobileForm"/>
        <transition name="form">
            <mobileForm @exitForm ="deleteForm" v-if="visible"/>
        </transition>
    </div>
</template>

<style lang="scss">
    .form-enter-active,
    .form-leave-active {
        transition: all 0.5s ease;
    }

    .form-enter-from,
    .form-leave-to {
        top: 100%;
    }
</style>

<script>
import navbar from '@/components/layouts/navbar.vue';
import footerVue from '@/components/layouts/footer.vue';
import footerMobile from '@/components/layouts/mobile/footerMobile.vue';
import navbarMobile from '@/components/layouts/mobile/navbarMobile.vue'
import mobileForm from '@/components/reused/mobile/mobileForm.vue';

export default {
    data: () => ({
        visible: false
    }),
    components: {
        navbar,
        navbarMobile,
        footerVue,
        footerMobile,
        mobileForm
    },
     methods: {
        openMobileForm() {
            this.visible = true;
            document.querySelector('body').style.overflow = 'hidden'
        },
        deleteForm() {
            this.visible = false;
            document.querySelector('body').style.overflow = 'auto'
        },
    },

    mounted () {
    }
}

</script>