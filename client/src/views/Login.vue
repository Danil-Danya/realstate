<template>
    <login/>
</template>

<script>
import login from '@/components/pages/login/login.vue';

export default {
    components: {
        login
    },
    mounted() {
        document.title = 'Login'
    }
}

</script>