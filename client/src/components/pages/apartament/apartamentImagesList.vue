<template>
    <div class="apartament__images">
        <div class="container">
            <div class="apartament__images-content">
                <div class="apartament__images-left">
                    <img  v-if="dataImages.imgPaths != undefined" :src="`/${dataImages.imgPaths.split(',')[0]}`" alt="Preview" class="apartament__images-preview">
                </div>
                <div class="apartament__images-right">
                    <div class="apartament__images-container">
                        <div class="apartament__images-item">
                            <div class="apartament__img-hover">
                                <p class="apartament__img-text">+12 photos</p>
                            </div>
                            <img v-if="dataImages.imgPaths != undefined" :src="`/${dataImages.imgPaths.split(',')[1]}`" alt="" class="apartament__img">
                        </div>
                        <div class="apartament__images-item">
                            <div class="apartament__img-hover">
                                <p class="apartament__img-text">+12 photos</p>
                            </div>
                             <img v-if="dataImages.imgPaths != undefined" :src="`/${dataImages.imgPaths.split(',')[2]}`" alt="" class="apartament__img">
                        </div>
                        <div class="apartament__images-item">
                            <div class="apartament__img-hover">
                                <p class="apartament__img-text">+12 photos</p>
                            </div>
                             <img v-if="dataImages.imgPaths != undefined" :src="`/${dataImages.imgPaths.split(',')[3]}`" alt="" class="apartament__img">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/apartament/images.scss';
</style>

<script>

export default {
    props: {
        dataImages: Object
    },

    mounted() {
        console.log(this.dataImages);
    }
}

</script>