<template>
    <div class="preloader">
        <div class="preloader__container">
            <div class="preloader__content">
                <div class="spinner-border preloader__spiner text-secondary" role="status"></div>
                <h2 class="preloader__title" :style="{ opacity: loadOpacity }">{{ loadView }}</h2>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    data: () => ({
        loadText: 'Loading...',
        loadView: '',
        loadOpacity: 0,
    }),

    methods: {
        loadPushText(index = 0) {
            if (index < this.loadText.length) {
                setTimeout(() => {
                    this.loadView += this.loadText[index];
                    this.loadOpacity = 1;
                    this.loadPushText(index + 1);
                }, 150);
            }
        },
    },

    mounted () {
        this.loadPushText();
    }
}


</script>

<style lang="scss">
@import '@/assets/styles/preloaders/preloader.scss';
</style>