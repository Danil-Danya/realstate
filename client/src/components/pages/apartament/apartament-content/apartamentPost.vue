<template>
    <div class="apartament__post-body">
        <h1 class="apartament__title">{{ dataContent.name }}</h1>
        <div class="apartament__rooms">
            <div class="apartament__beds apartament__rooms-room">
                <span class="apartament__number">{{ dataContent.beds }}</span>
                <div class="apartament__rooms-text">beds</div>
            </div>
            <div class="apartament__baths apartament__rooms-room">
                <span class="apartament__number">{{ dataContent.baths }}</span>
                <div class="apartament__rooms-text">baths</div>
            </div>
            <div class="apartament__square apartament__rooms-room">
                <span class="apartament__number">{{ dataContent.square }}</span>
                <div class="apartament__rooms-text">square (ft)</div>
            </div>
        </div>
        <div class="apartament__price">
            <div class="apartament__price-left">
                <p class="apartament__price-text">Price in</p>
                <div class="dropdown">
                    <button class="btn apartament__select dropdown-toggle"
                     type="button" id="dropdownMenuButton1" 
                     data-bs-toggle="dropdown" aria-expanded="false"
                    >
                        {{ valuteSelector }}
                    </button>
                    <ul class="dropdown-menu apartament__price-dropdown" aria-labelledby="dropdownMenuButton1">
                        <li><p class="dropdown-item valute apartament__price-select" @click="changeValute(0)" ref="aed">AED</p></li>
                        <li><p class="dropdown-item valute apartament__price-select" @click="changeValute(1)" ref="usd">USD</p></li>
                        <li><p class="dropdown-item valute apartament__price-select" @click="changeValute(2)" ref="rub">RUB</p></li>
                    </ul>
                </div>
            </div>
            <div class="apartament__price-right">
                <h2 class="apartament__title-price" v-if="dataContent.priceForRent !== undefined && dataContent.priceForRent > 0">
                    <p class="apartament__price-number">{{ Math.round(dataContent.priceForRent * valuteCount, 2) }}</p>
                    <p class="apartament__price-term">month.</p>
                </h2>
                <h2 class="apartament__title-price" v-if="dataContent.priceForBuy !== undefined && dataContent.priceForBuy > 0">
                    <p class="apartament__price-number">{{ Math.round(dataContent.priceForBuy * valuteCount, 2) }}</p>
                    <p class="apartament__price-term">for buy.</p>
                </h2>
            </div>
        </div>
        <div class="apartament__line"></div>
        <div class="apartament__description">
            <p class="apartament__text">{{ dataContent.description }}</p>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/apartament/post.scss';
</style>

<script>
import Convertor from '@/scripts/valuteConvertor.js';

export default {
    data: () => ({
        valuteForBuy: 'AED',
        valuteForRent: 'AED',
        valuteSelector: 'AED',
        valuteCount: 1
    }),

    props: {
        dataContent: Object
    },

    methods: {
        changeValute(index) {
            const select = document.querySelectorAll('.valute')[index];
            this.valuteSelector = select.innerHTML;
            this.valuteConvert();
        },

        async valuteConvert() {
            const convertor = await new Convertor({
                valuteFrom: 'aed',
                valuteTo: this.valuteSelector.toLowerCase()
            });

            this.valuteCount = await convertor.convertValute();
        },
    },

    mounted () {
        console.log(this.dataContent);
    }
}

</script>