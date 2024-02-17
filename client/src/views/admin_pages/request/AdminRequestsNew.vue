<template>
    <div>
        <adminRequestNew />
    </div>
</template>

<script>
import adminRequestNew from '@/components/pages/Admin/request/adminRequestNew.vue';

export default {
    components: {
        adminRequestNew
    },
    async beforeRouteUpdate(to, from, next) {
        await this.fetchData();
        next();
    },
}

</script>