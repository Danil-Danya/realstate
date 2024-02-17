<template>
    <div class="notfound">
        <div class="container">
            <div class="notfound__content-container">
                <div class="notfound__content">
                    <h2 class="notfound__title">The page has been deleted or is unavailable</h2>
                    <p class="notfound__text">Try to find a property using the search above or return back</p>
                    <a href="#" class="notfound__link" @click="goBack">Return back</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/404/notfound.scss';
</style>

<script>

export default {
    methods: {
        goBack () {
            this.$router.go(-1);
        }
    }
}

</script>