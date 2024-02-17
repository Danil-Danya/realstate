<template>
    <div class="apartament__images">
        <!-- <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
            <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
            <a class="a2a_button_telegram"></a>
            <a class="a2a_button_facebook"></a>
            <a class="a2a_button_whatsapp"></a>
            <a class="a2a_button_email"></a>
            <a class="a2a_button_linkedin"></a>
        </div> -->
        <div class="container">
            <div class="apartament__images-content">
                <div class="apartament__images-left">
                    <img  v-if="dataImages.imgPaths != undefined" 
                    :src="`/${dataImages.imgPaths.split(',')[0]}`"  
                    alt="Preview" class="apartament__images-preview"
                    >
                    <div class="apartament__img-hover" @click="getActiveSlide(-1)"></div>
                </div>
                <div class="apartament__images-right">
                    <div class="apartament__images-container">
                        <div class="apartament__images-item">
                             <div class="apartament__img-hover" v-if="dataImages.imgPaths && dataImages.imgPaths.split(',').length >= 2" @click="getActiveSlide(1)"></div>
                                <div class="apartament__img-length" v-if="dataImages.imgPaths && dataImages.imgPaths.split(',').length === 2"></div>
                            <img v-if="dataImages.imgPaths != undefined && dataImages.imgPaths.split(',').length >= 2"
                             :src="`/${dataImages.imgPaths.split(',')[1]}`"
                             alt="" class="apartament__img"
                            >
                            <div class="apartament__img-mask" v-else>
                                <span class="apartament__img-icon">
                                    <i class="fa-regular fa-images"></i>
                                </span>
                                <p class="apartament__img-text">New photo coming soon</p>
                            </div>
                        </div>
                        <div class="apartament__images-item">
                            <div class="apartament__img-hover" v-if="dataImages.imgPaths && dataImages.imgPaths.split(',').length >= 3" @click="getActiveSlide(2)"></div>
                            <div class="apartament__img-length" v-if="dataImages.imgPaths && dataImages.imgPaths.split(',').length === 3"></div>
                            <img v-if="dataImages.imgPaths != undefined && dataImages.imgPaths.split(',').length >= 3"
                             :src="`/${dataImages.imgPaths.split(',')[2]}`"
                             alt="" class="apartament__img"
                            >
                            <div class="apartament__img-mask" v-else>
                                <span class="apartament__img-icon">
                                    <i class="fa-regular fa-images"></i>
                                </span>
                                <p class="apartament__img-text">New photo coming soon</p>
                            </div>
                        </div>
                        <div class="apartament__images-item">
                            <div class="apartament__img-hover" v-if="dataImages.imgPaths && dataImages.imgPaths.split(',').length >= 4" @click="getActiveSlide(3)"></div>
                            <div class="apartament__img-length" v-if="dataImages.imgPaths && dataImages.imgPaths.split(',').length >= 4">
                                <p class="apartament__img-alert" v-if="dataImages.imgPaths.split(',').length > 4">+{{ dataImages.imgPaths.split(',').length - 4 }} photo
                                </p>
                            </div>
                            <img v-if="dataImages.imgPaths != undefined && dataImages.imgPaths.split(',').length >= 4"
                             :src="`/${dataImages.imgPaths.split(',')[3]}`"
                             alt="" class="apartament__img"
                            >
                            <div class="apartament__img-mask" v-else>
                                <span class="apartament__img-icon">
                                    <i class="fa-regular fa-images"></i>
                                </span>
                                <p class="apartament__img-text">New photo coming soon</p>
                            </div>
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
    data: ()  => ({
        slider: false
    }),

    props: {
        dataImages: Object
    },

    methods: {
        getActiveSlide (index) {
            this.slider = true;

            const data = {
                index,
                slider: this.slider
            }
            console.log(data);

            this.$emit('activeSlide', data);
        }
    },

    mounted() {
        //console.log(this.dataImages);

        const script = document.createElement("script");
        script.async = true;
        script.src = "https://static.addtoany.com/menu/page.js";
        document.head.appendChild(script);
    }
}

</script>