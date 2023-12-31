<template>
    <section class="admin__appartaments">
        <adminButtons/>
        <adminApartamentsAll/>
    </section>
</template>


<style lang="scss">
@import '@/assets/styles/pages/admin/appartaments.scss';
</style>

<script>
import adminButtons from '@/components/reused/adminButtons.vue';
import adminApartamentsAll from '@/components/pages/Admin/apartaments/adminApartamentsAll.vue';


export default {
    components: {
        adminButtons,
        adminApartamentsAll
    }
}

</script>