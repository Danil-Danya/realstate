<template>
    <div class="post__tags">
        <div class="container">
            <div class="post__tags-container">
                <div class="post__tags-tag" v-for="tag in dataTags.tags" :key=tag>
                    <p class="post__tags-text">{{ tag }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/styles/pages/post/tags.scss';
</style>

<script>
export default {
    data: () => ({
        tags: ['Finance', 'Arabian ranches', 'Dubai', 'Apartaments', 'Rent', 'Low price', 'Best offer', 'Info', 'Our partners',]
    }),

    props: {
        dataTags: Object
    },
}
</script>