<template>
    <div class="admin__button-container">
        <div class="admin__filter-buttons">
          <div class="dropdown" v-for="(button, index) in buttons" :key="index">
            <button class="btn filter__buttons dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{ button.name }}
            </button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
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
            justify-content: space-between;
            gap: 15px;
        }
    }
</style>

<script>

export default {
    data: () => ({
        buttons: [
            {
                selected: false,
                name: 'Dates: Any'
            },
            {
                selected: false,
                name: 'Guest: Any'
            },
            {
                selected: false,
                name: 'Bedrooms: Any'
            },
            {
                selected: false,
                name: 'Beds: Any'
            },
            {
                selected: false,
                name: 'Bathrooms: Any'
            },
            {
                selected: false,
                name: 'Property type'
            },
            {
                selected: true,
                name: 'Location'
            },
            {
                selected: true,
                name: 'Rating: Any'
            },
        ]
    })
}

</script>