<template>
    <div class="blog__content" v-if="windowWidth < 580">
        <div class="container">
            <div class="blog__content-content">
                <div class="blog__content-container">
                    <div class="blog__content-top">
                        <h1 class="blog__title-posts">Recent media posts</h1>
                    </div>
                    <div class="blog__content-catalog">
                        <div class="blog__item blog__content-item" v-for="(blog, index) in posts.splice(3)" :key="blog">
                            <router-link :to="`/post/${title}`">
                                <img :src="`/${img[index]}`" alt="Blog card"
                                    class="blog__img blog__content-img">
                            </router-link>
                            <p class="blog__text">{{ blog.title.length < 50 ? blog.title : blog.title.slice(0, 50) + '...' }}</p>
                            <div class="blog__initial">
                                <p class="blog__views"><i class="fa-solid fa-eye"></i> {{ blog.views }}</p>
                                <p class="blog__date">{{ blog.date }}, {{ blog.time }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="blog__content-bottom">
                        <router-link to="/blog" class="blog__title-posts">All posts</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">@import '@/assets/styles/pages/blog/content.scss';</style>

<script>

export default {
    data: () => ({
        windowWidth: window.innerWidth,
        img: []
    }),

    props: {
        posts: Array
    },

    watch: {
        'posts': {
            deep: true,
            handler() {
                this.posts.forEach(item => {
                    const content = JSON.parse(item.content);

                    content.some(obj => {
                        if (obj.type === 'IMAGE') {
                            this.img.push(obj.path);
                            return true;
                        }
                        return false;
                    });
                });
            }
        }
    },

    mounted () {
        // this.posts.forEach(item => {
        //     const content = JSON.parse(item.content);

        //     content.some(obj => {
        //         if (obj.type === 'IMAGE') {
        //             this.img.push(obj.path);
        //             return true;
        //         }
        //         return false;
        //     });
        // });
    }
}

</script>