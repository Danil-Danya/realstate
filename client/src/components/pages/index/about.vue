<template>
    <section class="about">
        <div class="container">
            <h2 class="about__title title">About us</h2>
            <div class="about__content">
                <div class="about__left">
                    <div class="about__logo-container">
                        <img src="@/assets/images/site/pages/index/about/logo.png" alt="Logo" class="about__logo">
                    </div>
                    <p class="about__text about__center">Lorem ipsum dolor sit amet consectetur. Id tellus arcu turpis feugiat sed feugiat. Auctor blandit nisi vel egestas cursus sit. Purus cursus ante velit adipiscing gravida. Ut id metus purus integer neque tincidunt erat vitae. Ridiculus venenatis ut enim nec pulvinar ullamcorper tristique. Commodo ac diam lorem at volutpat quam fermentum. Blandit iaculis euismod non enim euismod. Ut enim molestie sed nisl sit ipsum cursus.</p>
                    <div class="about__advantages">
                        <div class="about__advantages-item" v-for="item in advanrages" :key="item">
                            <h3 class="about__number">{{ item.number }}</h3>
                            <div class="about__text">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
                <div class="about__right">
                    <img src="@/assets/images/site/pages/index/about/about.png" alt="Image" class="about__img">
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
@import '@/assets/styles/pages/index/about.scss';
</style>

<script>

export default {
    data: () => ({
        advanrages: [
            {
                number: 2375,
                name: 'Satisfied clients'
            },
            {
                number: 10,
                name: 'Years experience'
            },
            {
                number: +1300,
                name: 'Successful cases'
            },
            {
                number: 14,
                name: 'Reliable partners'
            },
        ]
    })
}

</script>