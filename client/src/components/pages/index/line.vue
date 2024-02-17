<template>
    <section class="line swiper">
        <div class="line__container">
            <div class="line__content swiper-wrapper">
                <div class="line__item swiper-slide" v-for="item in 10" :key="item">
                    <p class="line__text">we have reason to be proud</p>
                    <span class="line__dot"></span>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/index/line.scss';
</style>