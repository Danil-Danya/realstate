<template>
    <div class="post__content">
        <div class="container">
            <div class="post__content-container">
                <div class="post__content-info">
                    <p class="post__content-date">{{ dataContent.date }} {{ dataContent.time }}</p>
                    <div class="post__content-views">
                        <span class="post__viws-icon"><i class="fa-solid fa-eye"></i></span>
                        <p class="post__views-text">{{ dataContent.views }}</p>
                    </div>
                </div>
                <h1 class="post__content-title">{{ dataContent.title }} </h1>
                <p class="post__content-text">{{ dataContent.text }}</p>
                <p class="post__content-text">feugiat. Auctor blandit nisi vel egestas cursus sit. Purus cursus ante velit adipiscing gravida. Ut id metus purus integer neque tincidunt erat vitae. Ridiculus venenatis ut enim nec pulvinar ullamcorper tristique.Lorem ipsum dolor sit amet consectetur. Id tellus arcu turpis feugiat sed feugiat. Auctor blandit nisi vel egestas cursus sit. Purus cursus ante velit adipiscing gravida. Ut id metus purus integer neque tincidunt erat vitae. Ridiculus venenatis ut enim nec pulvinar ullamcorper </p>
                <img :src="`/${dataContent.imgPaths}`" alt="Post" class="post__content-img">
                <p class="post__content-text">Lorem ipsum dolor sit amet consectetur. Id tellus arcu turpis feugiat sed feugiat. Auctor blandit nisi vel egestas cursus sit. Purus cursus ante velit adipiscing gravida. Ut id metus purus integer neque tincidunt erat vitae. Ridiculus venenatis ut enim nec pulvinar ullamcorper tristique.Lorem ipsum dolor sit amet consectetur. Id tellus arcu turpis feugiat sed feugiat. Auctor blandit nisi vel egestas cursus sit. Purus cursus ante velit adipiscing gravida. Ut id metus purus integer neque eque tincidunt erat vitae. Ridiculus venenatis ut enim nec pulvinar ullamcorper.</p>
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
    }
}

</script>