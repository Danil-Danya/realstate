<template>
    <section class="blog">
        <blogPath/>
        <blogSlider v-if="windowWidth > 580"/>
        <mobileBlogSlider v-if="windowWidth < 580"/>
        <blogContent/>
    </section>
</template>

<script>
import blogPath from '@/components/pages/blog/blogPath.vue';
import blogSlider from '@/components/pages/blog/blogSlider.vue';
import mobileBlogSlider from '@/components/pages/blog/mobile/mobileBlogSlider.vue';
import blogContent from '@/components/pages/blog/blogContent.vue';
import postFilter from '@/components/reused/postFilter.vue';

export default {
    data: () => ({
        windowWidth: window.innerWidth
    }), 
    components: {
        blogPath,
        blogSlider,
        mobileBlogSlider,
        blogContent,
        postFilter
    },
    mounted () {
        document.title = 'Luxury One - blog'
    }
}

</script>