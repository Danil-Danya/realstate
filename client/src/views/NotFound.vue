<template>
    <div>
        <NotFoundPath />
        <NotFound />
        <offer v-if="windowWidth > 580"/>
        <mobileOffer v-else/>
    </div>
</template>

<script>
import offer from '@/components/reused/offer.vue';
import NotFoundPath  from '@/components/pages/notfound/path.vue';
import NotFound from '@/components/pages/notfound/404.vue';
import mobileOffer from '@/components/pages/index/mobile/mobileOffer.vue';

export default {
    data: () => ({
        windowWidth: window.innerWidth
    }),
    components: {
        NotFoundPath,
        offer,
        NotFound,
        mobileOffer
    }
}
</script>