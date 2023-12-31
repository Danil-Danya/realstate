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
        <div class="apartament__price"  v-if="dataContent.priceForRent">
            <div class="apartament__price-left">
                <p class="apartament__price-text">Price in</p>
                <div class="dropdown">
                    <button class="btn apartament__select dropdown-toggle"
                     type="button" id="dropdownMenuButton1" 
                     data-bs-toggle="dropdown" aria-expanded="false"
                    >
                        {{ valuteForRent }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><p class="dropdown-item" @click="selectValuteForRent('aed')" ref="aed">AED</p></li>
                        <li><p class="dropdown-item" @click="selectValuteForRent('usd')" ref="usd">USD</p></li>
                        <li><p class="dropdown-item" @click="selectValuteForRent('rub')" ref="rub">RUB</p></li>
                    </ul>
                </div>
            </div>
            <div class="apartament__price-right">
                <h2 class="apartament__title-price">
                    <p class="apartament__price-number">{{ dataContent.priceForRent }}</p>
                    <p class="apartament__price-valute">(AED)</p>
                </h2>
                <p class="apartament__price-term">month</p>
            </div>
        </div>
        <div class="apartament__price" v-if="dataContent.priceForBuy">
            <div class="apartament__price-left">
                <p class="apartament__price-text">Price in</p>
                <div class="dropdown">
                    <button class="btn apartament__select dropdown-toggle"
                     type="button" id="dropdownMenuButton1" 
                     data-bs-toggle="dropdown" aria-expanded="false"
                    >
                        {{ valuteForBuy }}
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                        <li><p class="dropdown-item" @click="selectValuteForBuy('aed')"  ref="aed">AED</p></li>
                        <li><p class="dropdown-item" @click="selectValuteForBuy('usd')" ref="usd">USD</p></li>
                        <li><p class="dropdown-item" @click="selectValuteForBuy('rub')" ref="rub">RUB</p></li>
                    </ul>
                </div>
            </div>
            <div class="apartament__price-right">
                <h2 class="apartament__title-price">
                    <p class="apartament__price-number">{{ dataContent.priceForBuy }}</p>
                    <p class="apartament__price-valute">({{ valuteForBuy }})</p>
                </h2>
                <p class="apartament__price-term">for buy</p>
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

export default {
    data: () => ({
        valuteForBuy: 'AED',
        valuteForRent: 'AED'
    }),

    props: {
        dataContent: Object
    },

    methods: {
        selectValuteForRent (key) {
            this.valuteForRent = this.$refs[key].innerHTML;
        },

        selectValuteForBuy (key) {
            this.valuteForBuy = this.$refs[key].innerHTML;
        },
    },

    mounted () {
        //console.log(dataContent.priceForBuy);
    }
}

</script>