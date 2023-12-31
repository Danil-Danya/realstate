<template>
    <div class="apartament__details">
        <h2 class="apartament__details-title">Project details</h2>
        <div class="apartament__detail-content">
            <div class="apartament__details-item">
                <h3 class="apartament__details-name">Unit reference:</h3>
                <p class="apartament__details-answer">{{ dataContent.unitReference }}</p>
            </div>
            <div class="apartament__details-item">
                <h3 class="apartament__details-name">Property name:</h3>
                <p class="apartament__details-answer">{{ dataContent.propertyName }}</p>
            </div>
            <div class="apartament__details-item">
                <h3 class="apartament__details-name">Emirate:</h3>
                <p class="apartament__details-answer">{{ dataContent.emirate }}</p>
            </div>
            <div class="apartament__details-item">
                <h3 class="apartament__details-name">Status:</h3>
                <p class="apartament__details-answer">{{ dataContent.status }}</p>
            </div>
            <div class="apartament__details-item">
                <h3 class="apartament__details-name">Purpose:</h3>
                <p class="apartament__details-answer">{{ dataContent.purpose }}</p>
            </div>
            <div class="apartament__details-item">
                <h3 class="apartament__details-name">Added on:</h3>
                <p class="apartament__details-answer">{{ dataContent.date }}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/styles/pages/apartament/project-detail.scss';
</style>

<script>

export default {
    props: {
        dataContent: Object
    }
}


</script>