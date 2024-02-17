<style lang="scss">
.filter {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 99999999;
    background: #00000068;
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    top: 0;
    left: 0;
    
    &__container {
        max-width: 1300px;
        width: 100%;
        padding: 25px;
        background: rgb(255, 255, 255);
        border-radius: 30px;
        box-shadow: 0px 2px 7px 0px rgba(0, 0, 0, 0.10);
        max-height: 200px;
        margin-top: 20px;

        @include media ($xs) {
            max-height: 600px !important;
            height: auto;
        }
    }
    
    &__bar {
        display: flex;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
    }
    
    &__chrest {
        font-size: 24px;
        cursor: pointer;
        padding: 10px;
    }
    
    &__content {
        margin-top: 30px !important;
    }
    
    &__dropdown {
        &-range {
            width: 500px !important;
            position: absolute;
            left: -550px !important;

            @include media ($xs) {
                left: 0 !important;
                width: 320px !important;
            }
            
            &-container {
                height: 30px;
                display: flex;
                position: relative;
                margin-bottom: 30px;
            }
            
            &-input {
                display: block;
                position: absolute;
                width: 50% !important;
                
                &:nth-of-type(2) {
                    left: 50% !important;
                    // transform: rotate(180deg);
                }
            }
        }
        
        &-list {
            margin-top: 20px !important;
            background: #fff !important;
            border: none !important;
            width: 320px;
            box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.15);
            border-radius: 20px !important;
            padding: 20px !important;
        }
    }

    &__line {
        display: block;
        background: rgba(55, 55, 55, 0.60);
        width: 50px;
        height: 3px;

    }
    
    &__link {
        cursor: pointer;
        // font-size: 20px !important;
        // font-family: Gotham Bold !important;
        text-align: center;
        display: inline-block;

        &:hover {
            background: #fff !important;
            display: block;
            
            &::after {
                width: 100%;
            }
        }
        
        &::after {
            content: '';
            display: block;
            transition: 500ms;
            width: 0;
            height: 1px;
            background: #000;
        }
    }
    
    &__btn {
        padding: 10px 15px !important;
        display: block;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 22px !important;
        background: #000 !important;
        border: none !important;
        border-radius: 15px !important;
        color: white !important;
        padding: 0;
        &:hover {
            background: rgba(55, 55, 55, 0.50) !important;
        }
    }

    &-range {
        @include media ($xs) {
            width: 100%;
        }
    }
    

    &__line {
        @include media ($xs) {
            margin: 20px 0 !important;
            opacity: 0;
        }
    }
    
    &__button {
        overflow: hidden;
        padding: 16px 30px !important;
        max-width: 420px;
        border-radius: 20px !important;
        border: 1px solid #D9D9D9 !important;
        outline: none;
        max-width: 230px;
        width: 100%;
        background: #fff !important;
        color: #D9D9D9 !important;
        text-align: left !important;
        display: flex;
        justify-content: space-between;
        align-items: center;

        @include media ($xs) {
            max-width: 100%;
        }

        &-selected {
            border: 2px solid #000 !important;
            color: #000 !important;
        }   

        &::selection {
            border: 1px solid black !important;
        }

        &::after {
            content: '';
            display: none !important;
        }
    }

    &__range {
        width: 200px;
        @include media ($xs) {
            width: 100%;
        }
        &-link {
            display: flex;
            justify-content: center;
        }

        &-container {
            margin: 30px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;

            @include media ($xs) {
                flex-wrap: wrap;
            }
        }
    }

    &__label {
        background: #fff !important;
        &-selected {
            color: #000 !important;
        }
    }

    &__input {
        display: flex;
        gap: 15px;
        
        @include media ($xs) {
            flex-wrap: wrap;
            justify-content: center;
        }
    }

    
}
</style>

<template>
    <div class="filter">
        <div class="filter__container">
            <div class="filter__bar">
                <div>
                    <button type="button" class="btn btn-dark" ref="rent" @click="selectComb()">Rent</button>
                    <button type="button" class="btn btn-light" ref="buy" @click="selectComb()">Buy</button>
                </div>
                <div>
                    <p class="filter__link" @click="clearAll">Clear all</p>
                </div>
                <div class="filter__close">
                    <span class="filter__chrest" @click="closeFilter">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </div>
            </div>
            <div class="filter__content">
                <div class="filter__input">
                    <div class="dropdown filter__input input__container" v-for="(button, index) in buttons" :key="button">
                        <label for="" class="input__label filter__label" ref="labels">{{ button.name }}</label>
                        <button class="btn btn-secondary dropdown-toggle filter__button" type="button"  ref="buttons" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" @click.prevent="setButtonIndex(index); selectButton(button.name, button)"> 
                            {{ activeButtons[index] }}
                            <span class="filter__arrow">
                                <i class="fa-solid fa-angle-down"></i>
                            </span>
                        </button>
                        <ul class="dropdown-menu filter__dropdown-list" aria-labelledby="dropdownMenuButton1" v-if="button.name !== 'Price'">
                            <li v-for="(filter, index) in button.list" :key="filter" class="filter__dropdown-string">
                                <a class="dropdown-item filter__link" href="#" @click="setFilter(button.name, filter, index, buttonIndex);">{{ filter }}</a>
                            </li>
                        </ul>
                        <ul class="dropdown-menu filter__dropdown-list filter__dropdown-range" aria-labelledby="dropdownMenuButton1">
                            <li :key="filter" class="filter__dropdown-string">
                               <div class="filter__dropdown-range-container">
                                    <input type="range" min="0" v-model="filter.price.min" max="10000000" step="1" class="filter__dropdown-range-input" @change="setMaxPrice">
                                    <input type="range" min="0" v-model="filter.price.max" max="10000000" step="1" class="filter__dropdown-range-input" @change="setMaxPrice">
                                </div>
                                <div class="filter__range-container">
                                    <div class="filter-range">
                                        <label for="" class="input__label filter__label" ref="labels"></label>
                                        <button class="btn btn-secondary dropdown-toggle filter__button filter__range" type="button"  ref="buttons"> 
                                        <p class="filter__price"> Min: {{ filter.price.min }} AED</p>
                                        </button>
                                    </div>
                                    <span class="filter__line"></span>
                                    <div class="filter-range">
                                        <label for="" class="input__label filter__label" ref="labels"></label>
                                        <button class="btn btn-secondary dropdown-toggle filter__button filter__range" type="button"  ref="buttons"> 
                                        <p class="filter__price">Max: {{ filter.price.max }} AED</p>
                                        </button>
                                    </div>
                                </div>
                                <div class="filter__range-link">
                                    <p class="filter__link" @click="rangeButton()">Done</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="filter__buttons-search">
                        <router-link :to="`/catalog/1/?${createQueryLink()}`" @click="closeFilter()" class="btn btn-outline-success filter__btn" v-if="windowWidth > 580">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </router-link>
                        <router-link :to="`/catalog/1/?${createQueryLink()}`" class="btn btn-outline-success filter__btn" v-else>
                            search
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import config from '@/configs/config.filter.navbar.json';

export default {
    data: () => ({
        windowWidth: window.innerWidth,
        buttons: config,
        buttonIndex: 0,
        activeButtons: {
            combSelect: 'Any',
            bedrooms: 'Any',
            bathrooms: 'Any',
            propertyType: 'Any',
            areas: 'Any',
            price: 'Any',
        },
        filter: {
            combSelect: 'Rent',
            bedrooms: null,
            bathrooms: null,
            propertyType: '',
            areas: {
                min: 0,
                max: 0
            },
            price: {
                min: 0,
                max: 10000000
            }
        }
    }),

    methods: {
        setButtonIndex(index) {
            this.buttonIndex = index;
        },

        closeFilter() {
            this.$emit('closeFilter', this.showFilter)
        },

        toggleArrow () {
            const arrows = this.$refs.arrows;

            arrows.forEach((arrow, index) => {
               arrow[index].classList('');
            })
        },

        setMaxPrice () {
            if (this.filter.price.min > this.filter.price.max) {
                const tmp = this.filter.price.min;
                this.filter.price.min = this.filter.price.max;
                this.filter.price.max = tmp;
            }
        },

        selectComb() {
            if (this.filter.combSelect === 'Rent') {
                this.filter.combSelect = 'Buy';

                this.$refs.buy.classList.add('btn-dark');
                this.$refs.buy.classList.remove('btn-light');

                this.$refs.rent.classList.add('btn-light');
                this.$refs.rent.classList.remove('btn-dark')
            } else {
                this.filter.combSelect = 'Rent';

                this.$refs.buy.classList.add('btn-light');
                this.$refs.buy.classList.remove('btn-dark');

                this.$refs.rent.classList.add('btn-dark');
                this.$refs.rent.classList.remove('btn-light')
            }
        },

        selectButton (buttonIndex) {
            const labels = this.$refs.labels
            let buttons = this.$refs.buttons;

            buttons.forEach((button, index) => {
                const buttonName = labels[index].innerHTML.toLowerCase();
                buttonIndex = buttonIndex.toLowerCase();

                if (buttonIndex === buttonName) {
                    button.classList.add('filter__button-selected');
                    labels[index].classList.add('filter__label-selected');
                }
                else {
                    button.classList.remove('filter__button-selected');
                    labels[index].classList.remove('filter__label-selected');
                }
            });
        },

        // deleteButton () {
        //     let labels = this.$refs.labels
        //     let buttons = this.$refs.buttons;
            
        //     buttons.forEach((button) =>  button.classList.remove('filter__button-selected'));
        //     labels.forEach((label) => label.classList.remove('filter__label-selected'));
        // },

        createQueryLink () {
            let queryParametrs = '';

            for (const key in this.filter) {
                if (this.filter[key] !== null && this.filter[key] !== undefined) {
                    let value = this.filter[key];

                    if (typeof value === 'object') {
                        value = Object.entries(value)
                            .map(([subKey, subValue]) => `${subKey}=${subValue}`)
                            .join(',');
                    }
                    queryParametrs += `${key}=${value}&`;
                }
            }
            queryParametrs = queryParametrs.slice(0, -1);

            return queryParametrs;
        },

        rangeButton () {
            this.activeButtons.price = `Min: ${this.filter.price.min} AED, max: ${this.filter.price.min} AED`
        },

        clearAll () {
            for (let key in this.activeButtons) {
                this.activeButtons[key] = 'Any';
            }

            for (let key in this.filter) {
                this.filter[key] = ''
            }
        },

        getMinMax(minMaxArray) {
            return minMaxArray.filter(item => {
                const number = Number(item);

                if (!isNaN(number)) return number;
            });
        },

        changeMinMaxFilter(minMax, typeFilter, prefix) {
            console.log(this.filter[typeFilter]);
            if (prefix === 'under') {
                this.filter[typeFilter].min = 0;
                this.filter[typeFilter].max = minMax[0]
            }

            if (prefix === 'over') {
                this.filter[typeFilter].min = minMax[0];
                this.filter[typeFilter].max = Infinity;
            }

            if (!prefix && minMax.length === 2) {
                this.filter[typeFilter].min = minMax[0];
                this.filter[typeFilter].max = minMax[1];
            }
        },

        getPrefix(minMax) {
            if (minMax[0].toLowerCase() === 'under') {
                return 'under'
            }

            if (minMax[0].toLowerCase() === 'over') {
                return 'over';
            }
        },

        setFilter (typeFilter, filterLine, index, name) {
            typeFilter = typeFilter.toLowerCase();

            if (typeFilter === 'bedrooms' || typeFilter === 'bathrooms') {
                this.activeButtons[name] = filterLine;
                this.filter[name] = index + 1;
            }

            if (typeFilter === 'property type') {
                this.filter[name] = filterLine;
                this.activeButtons[name] = filterLine;
            }

            if (typeFilter === 'areas') {
                const minMaxArray = filterLine.split(' ');
                const getMinMax = this.getMinMax(minMaxArray);
                const getPrefix = this.getPrefix(minMaxArray);

                this.changeMinMaxFilter(getMinMax, typeFilter, getPrefix);
            }
        },
    },

    mounted () {
        this.filter.combSelect = this.$route.query.combSelect ? this.$route.query.combSelect : '';
        console.log('this.$route.query.combSelect: ', this.$route.query.combSelect);
    }
}

</script>
