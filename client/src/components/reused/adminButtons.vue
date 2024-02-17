<template>
    <div class="admin__button-container">
        <div class="admin__filter-buttons">
          <div class="dropdown" v-for="(button, index) in buttons" :key="index">
            <button class="btn filter__buttons dropdown-toggle" @click="setButtonIndex(index)" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ button.name }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li v-for="(line, index) in button.list" :key="line" @click="changeFilter(button.name, line, index, buttonIndex);">
                <a class="dropdown-item" href="#"> {{ line }} </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="admin__filter-active">
          <div v-for="(button, index) in activeButtons" :key="button">
            <button class="btn selected-button admin__filter-active-button" v-if="button" @click="deleteFilter(index)">
                  {{ button }}
                  <span class="btn-chrest">
                    <i class="fa-solid fa-xmark"></i>
                  </span>
            </button>
          </div>
        </div>
      </div>
</template>

<style lang="scss" scoped>
    select::-ms-expand {
        display: none;
    }

    select {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        text-indent: 1px;
        text-overflow: '';
    }
    .admin__filter {
        &-buttons {
            max-width: 1260px;
            display: flex;
            gap: 15px;
        }

        &-active {
          display: flex;
          margin-top: 30px;
          max-width: 1260px;
          gap: 15px;

          &-button {

          }
        }
    }
</style>

<script>
import config from '@/configs/config.filter.admin.json';
import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        buttons: config,
        adminButtons: {

        },
        buttonIndex: 0,
        activeButtons: { 
          // bedrooms: '', 
          // propertyType: '',
          // locations: '',
          // areas: ''
        },
        filter: {
          bedrooms: null,
          bathrooms: null,
          propertyType: '',
          locations: '',
          areas: {
            min: 0,
            max: Infinity
          },
        }
    }),

    computed: {
      ...mapGetters('appartaments', ['getAppartaments']),
    },

    methods: {
      ...mapActions('appartaments', ['fetchAppartaments']),

      async fetchData () {
        await this.fetchAppartaments(this.filter);
      },

      setButtonIndex (index) {
        this.buttonIndex = index;
      },

      deleteFilter (index) {
        const filterIndex = index.toLowerCase();

        
        delete this.activeButtons[index];
        this.filter[index] = null;
        
        if (index === 'areas') {
           delete this.activeButtons[index];
           this.filter[index] = {}
        }

        console.log(filterIndex);

        this.fetchData();
      },

      getMinMax (minMaxArray) {
        return minMaxArray.filter(item => {
          const number = Number(item);

          if (!isNaN(number)) return number;
        });
      },

      changeMinMaxFilter (minMax, typeFilter, prefix) {
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

      getPrefix (minMax) {
        if (minMax[0].toLowerCase() === 'under') {
          return 'under'
        }

        if (minMax[0].toLowerCase() === 'over') {
          return 'over';
        }
      },

      changeFilter (typeFilter, filterLine, index, name) {
        this.activeButtons[name] = filterLine;

        typeFilter = typeFilter.toLowerCase();

        if (typeFilter === 'bedrooms' || typeFilter === 'bathrooms') {
          this.filter[name] = index + 1; 
        }

        if (typeFilter === 'locations' || typeFilter === 'property type') {
          this.filter[name] = [filterLine];  
        }

        if (typeFilter === 'areas') {
          const minMaxArray = filterLine.split(' ');
          const getMinMax = this.getMinMax(minMaxArray);
          const getPrefix = this.getPrefix(minMaxArray);

          this.changeMinMaxFilter(getMinMax, typeFilter, getPrefix);
        }

        this.fetchData();
      }
    }
}

</script>