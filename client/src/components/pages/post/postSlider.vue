<template>
    <div class="blog" v-if="windowWidth >= 580">
        <div class="container">
            <div class="blog__content">
                <div class="blog__slider swiper">
                    <div class="blog__wrapper swiper-wrapper">
                        <div class="blog__item swiper-slide" v-for="(blog, index) in posts" :key="blog">
                            <router-link :to="`/post/${blog.title}`">
                                <img :src="`/${img[index]}`" alt="Blog card" class="blog__img">
                            </router-link>
                            <p class="blog__text">{{ blog.title.length < 50 ? blog.title : blog.title.slice(0, 50) + '...' }}</p>
                            <div class="blog__initial">
                                <p class="blog__views"><i class="fa-solid fa-eye"></i> {{ blog.views }}</p>
                                <p class="blog__date">{{ blog.date }}, {{ blog.time }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss">
    @import '@/assets/styles/pages/post/slider.scss';
</style>

<script>
import Swiper from 'swiper';
import 'swiper/css';
import axios from 'axios';

export default {
    data: () => ({
        windowWidth: window.innerWidth,
        url: '/server-api/',
        img: []
    }),

    props: {
        posts: Array
    },
    
    watch: {
        'posts': {
            deep:true,
            handler() {
                 this.posts.forEach(item => {
                    const content = JSON.parse(item.content);

                    content.some(obj => {
                        if (obj.type === 'IMAGE') {
                            this.img.push(obj.path);
                            return true;
                        }
                        return false;
                    });
                });
            }
        }
    },

    async mounted () {
        
        this.$nextTick(() => {
            let countSlidesFromWinfowWidth = 3.4;
    
            if (this.windowWidth < 1250) {
                countSlidesFromWinfowWidth = 3;
            }
            if (this.windowWidth < 800) {
                countSlidesFromWinfowWidth = 2;
            }
            const swiper = new Swiper('.blog__slider', {
                slidesPerView: countSlidesFromWinfowWidth,
                spaceBetween: 50,
                loop: true
            })
        })

    }
}

</script>