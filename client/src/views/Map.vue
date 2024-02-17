<template>
    <div>
        <paths />
        <filters />
        <maps />
    </div>
</template>

<script>
import filters from '@/components/reused/filters.vue';
import maps from '@/components/pages/map/map.vue';
import paths from '@/components/pages/map/path.vue';

export default {
    components: {
        paths,
        filters,
        maps,
    }
}

</script>