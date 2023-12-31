<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
import IndexLayout from './layots/IndexLayout.vue';
import LoginLayout from './layots/LoginLayout.vue';
import AdminLayout from './layots/AdminLayout.vue';
import Preloader from './components/preloader/preloader.vue';
import removeToken from './scripts/removeToken.js';
import '@/assets/fontawesome/js/all.min.js';


export default {
  components: {
    IndexLayout,
    LoginLayout,
    AdminLayout,
    Preloader
  },
  methods: {
  },
  computed: {
    layout () {
      console.log(`${ this.$route.meta.layout || 'index' } - layout`);
      return (`${this.$route.meta.layout || 'index'}-layout`);
    } 
  },
  mounted () {
    removeToken();
  }
}

</script>

<style lang="scss">
  @import '@/assets/styles/root/fonts.scss';
  @import '@/assets/styles/root/default.scss';
  @import '@/assets/styles/root/grid.scss';
  @import '@/assets/fontawesome/css/all.min.css';
</style>
