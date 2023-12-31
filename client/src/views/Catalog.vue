<template>
    <section class="catalog">
        <catalogPath/>
        <catalog/>
    </section>
</template>

<script>
import catalogPath from '@/components/pages/catalog/path.vue';
import catalog from '@/components/pages/catalog/catalog.vue';

export default {
    components: {
        catalogPath,
        catalog
    }
}


</script>