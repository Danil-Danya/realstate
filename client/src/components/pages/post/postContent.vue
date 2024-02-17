<template>
    <div class="post__content">
        <div class="container">
            <div class="post__content-container">
                <div class="post__content-info">
                    <p class="post__content-date">{{ dataContent.date }}, {{ dataContent.time }}</p>
                    <div class="post__content-views">
                        <span class="post__viws-icon"><i class="fa-solid fa-eye"></i></span>
                        <p class="post__views-text">{{ dataContent.views }}</p>
                    </div>
                </div>
                <h1 class="post__content-title">{{ dataContent.title }} </h1>
                <div class="post__content" v-for="content in dataContent.content" :key="content">
                    <p class="post__content-text" v-if="content.type === 'TEXT'">{{ content.content }}</p>
                    <img :src="`/${content.path}`" v-if="content.type === 'IMAGE'" alt="Post" class="post__content-img">
                </div>
                <div class="post__content-line"></div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/styles/pages/post/content.scss';
</style>

<script>

export default {
    props: {
        dataContent: Object
    },
    mounted() {
        console.log(this.dataContent);
        const dateArr = this.dataContent.date ? this.dataContent.date.split('-') : '';

        const months = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'Jule', 'Aug', 'Sempt', 'Oct', 'Nov', 'Dec'];
        const selectedMonth = months[dateArr[1]];

        this.dataContent.date = `${selectedMonth} ${dateArr[0]}, ${dateArr[2]}`;
    }
}

</script>