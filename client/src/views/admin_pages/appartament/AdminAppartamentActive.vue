<template>
    <adminButtons/>
    <adminAppartamentsActive/>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/admin/appartaments.scss';
</style>

<script>
import adminAppartamentsActive from '@/components/pages/Admin/apartaments/adminAppartamentsActive.vue';
import adminButtons from '@/components/reused/adminButtons.vue';


export default {
    components: {
        adminAppartamentsActive,
        adminButtons
    }
}
</script>