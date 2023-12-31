<template>
    <adminButtons/>
    <adminAppartamentsDisActive/>
</template>

<style lang="scss">
@import '@/assets/styles/pages/admin/appartaments.scss';
</style>

<script>
import adminAppartamentsDisActive from '@/components/pages/Admin/apartaments/adminAppartamentsDisActive.vue';
import adminButtons from '@/components/reused/adminButtons.vue';


export default {
    components: {
        adminAppartamentsDisActive,
        adminButtons
    }
}
</script>