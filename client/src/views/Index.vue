<template>
    <div>
        <headerVue/>
        <explore/>
        <about/>
        <offer/>
        <popular/>
        <lineVue/>
        <accordione/>
        <message/>
        <reviews/>
        <blog></blog>
    </div>

</template>

<script>
import headerVue from '@/components/pages/index/header.vue';
import explore from '@/components/pages/index/explore.vue';
import about from '@/components/pages/index/about.vue';
import accordione from '@/components/pages/index/accordione.vue';
import reviews from '@/components/pages/index/reviews.vue';
import offer from '@/components/reused/offer.vue';
import popular from '@/components/pages/index/popular.vue';
import lineVue from '@/components/pages/index/line.vue';
import message from '@/components/pages/index/message.vue';
import blog from '@/components/pages/index/blog.vue';

export default {
    components: {
        headerVue,
        explore,
        about,
        accordione,
        lineVue,
        reviews,
        offer,
        popular,
        message,
        blog
    },
    mounted() {
        document.title = 'Luxury One - Home page'
    }
}

</script>


