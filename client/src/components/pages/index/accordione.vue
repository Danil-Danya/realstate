<template>
    <section class="accordione">
        <div class="container-mini">
            <div class="accordione__content">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item accordione__item" v-for="item in 5" :key="item">
                        <span class="accordione__item-text">Top Performing Agency 2023</span>
                        <img src="@/assets/images/site/pages/index/accordione/decore.png" alt="Decore" class="accordione__decore">
                    </li>
                </ul>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/index/accordione.scss';
</style>