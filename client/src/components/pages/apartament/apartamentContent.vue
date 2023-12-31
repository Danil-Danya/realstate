<template>
    <div>
        <div class="apartament__post">
            <div class="container">
                <div class="apartament__post-content">
                    <div class="apartament__post-left">
                        <apartamentPost :dataContent="dataContent"/>
                        <apartamentProjectDetails :dataContent="dataContent"/>
                        <apartamentFeatures :dataContent="dataContent"/>
                    </div>
                    <div class="apartament__post-right">
                        <apartamentContact v-if="windowWidth > 800" /> 
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/apartament/content.scss';
</style>

<script>
import apartamentPost from './apartament-content/apartamentPost.vue';
import apartamentFeatures from './apartament-content/apartamentFeatures.vue';
import apartamentProjectDetails from './apartament-content/apartamentProjectDetails.vue';
import apartamentContact from './apartament-content/apartamentContact.vue';


export default {
    data: () => ({
        windowWidth: window.innerWidth
    }),
    components: {
        apartamentPost,
        apartamentFeatures,
        apartamentProjectDetails,
        apartamentContact
    },

    props: {
        dataContent: Object
    }
}

</script>