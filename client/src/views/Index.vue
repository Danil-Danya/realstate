<template>
    <div>
        <headerVue v-if="windowWidth > 1140"/>
        <mobileHeader v-else/>
        <explore v-if="windowWidth > 580"/>
        <mobileExplore v-else/>
        <about/>
        <offer v-if="windowWidth > 580"/>
        <mobileOffer v-else/>
        <popular v-if="windowWidth > 580"/>
        <mobilePopular v-else/>
        <lineVue/>
        <!-- <accordione/> -->
        <message v-if="windowWidth > 580"/>
        <mobileMessage v-else/>
        <reviews/>
        <blog/>
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

import mobileHeader from '@/components/pages/index/mobile/mobileHeader.vue';
import mobileExplore from '@/components/pages/index/mobile/mobileExplore.vue';
import mobileOffer from '@/components/pages/index/mobile/mobileOffer.vue';
import mobilePopular from '@/components/pages/index/mobile/mobilePopular.vue';
import mobileMessage from '@/components/pages/index/mobile/mobileMessage.vue';

export default {
    data: () => ({
        windowWidth: window.innerWidth
    }),

    methods: {
        handleResize() {
            this.windowWidth = window.innerWidth;
        }
    },

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
        blog,
        mobileHeader,
        mobileExplore,
        mobileOffer,
        mobilePopular,
        mobileMessage
    },

    mounted() {
        window.addEventListener('resize', this.handleResize);
        document.title = 'Luxury One - Home page'
    }
}

</script>


