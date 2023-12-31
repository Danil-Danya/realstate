<template>
    <div>
        <adminAppartamentsCreate/>
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/pages/admin/appartaments.scss';
</style>

<script>
import adminAppartamentsCreate from '@/components/pages/Admin/apartaments/adminAppartamentsCreate.vue';

export default {
    components: {
        adminAppartamentsCreate
    }
}
</script>