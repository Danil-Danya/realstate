<template>
    <div class="post__filter-container">
        <div class="post__filter-content">
            <div class="post__filter-tags" ref="tags">
                <div class="tags__item" v-for="(tag, index) in tags" :key="tag" ref="tag" @click="filterTag(index)">
                    <p class="tags__text">{{ tag }}</p>
                </div>
            </div>
            <div class="post__filter-all">
                <p class="post__filter-text" @click="showAll()">{{ tagsState }} {{ tagsState === 'All tags' ? `(${ this.tags.length })` : ''}}</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .post__filter {
        &-container {
            margin-bottom: 50px;
        }

        &-text {
            width: 100px;
            cursor: pointer;
            font-family: Gotham Bold !important ;
            margin-top: 15px !important;
        }

        &-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            //overflow: auto;
            //height: 50px;
        }
    }

    .tags {
        &__active {
            color: #fff !important;
            background: #5f5f5fad;
        }

        &__text {
            line-height: 18px;
            height: 18px;
        }
    }
</style>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        tags: [],
        numberOfTags: 7,
        tagsState: `Hide tags`,
        activeTags: []
    }),
    computed: {
        ...mapGetters(['getPosts'])
    },
    methods: {
        ...mapActions(['fetchPost']),

        async fetchData () {
            const filters = {
                tags: this.activeTags
            }
            await this.fetchPost(filters);
        },

        getTagsArray () {
            let tags = [];

            this.getPosts.forEach(post => {
                post.tags.split(',').forEach(tag => {
                    if (tag != '') {
                        tags.push(tag)
                    }
                })
            });

            this.tags = [...new Set(tags)]
        },

        async filterTag(index) {
            let tagElement = this.$refs.tag[index];
            let tag = tagElement.textContent;

            tagElement.classList.toggle('tags__active');

            const indexInActiveTags = this.activeTags.indexOf(tag);

            if (indexInActiveTags !== -1) {
                this.activeTags.splice(indexInActiveTags, 1);
            } 
            else {
                this.activeTags.push(tag);
            }

            await this.fetchData();

            setTimeout(() => console.log(this.getPosts), 1000)
        },

        showAll() {
            const tags = this.$refs.tags;

            if (this.tagsState === 'All tags') {
                this.tagsState = 'Hide tags';
                tags.style.maxHeight = 'none'; 
                tags.style.overflow = 'none'; 
            } else {
                this.tagsState = 'All tags';
                tags.style.maxHeight = '50px';
                tags.style.overflow = 'hidden';
            }
        }

    },

    async mounted () {
        await this.fetchData();
        this.getTagsArray();

        this.showAll();

        console.log('tags: ', this.getPosts);
    }
}

</script>