<template>
    <div class="admin__post-create">
        <div class="admin__post-create-nav">
            <a @click="redirectInBack" href="#"><i class="fa-solid fa-angle-left"></i>Back</a>
            <h2 class="admin__title">Edit post</h2>
            <a href="#" class="admin__delete"><i class="fa-solid fa-trash-can"></i>Delete Post</a>
        </div>
        <div class="admin__post-create-container">
            <div class="admin__content">
                <form>
                    <div class="input__container admin__create-input-container">
                        <label class="input__label admin__label admin__create-label">Title</label>
                        <input type="text" v-model="title" class="form-control admin__create-input">
                    </div>
                    <div class="input__container admin__create-input-container">
                        <label class="input__label admin__label admin__create-label">Text</label>
                        <textarea type="text" v-model="text" class="form-control admin__create-input"></textarea>
                    </div>
                    <div class="admin__upload-images">
                        <img :src="`/${path}` || path" alt="Img" ref="img" @click="deleteImg(index)" v-for="(path, index) in imgPaths"
                            :key="path" class="admin__create-img">
                        <img :src="path" alt="Img" ref="img" @click="deleteImg(index)" v-for="(path, index) in imgFilePaths"
                            :key="path" class="admin__create-img">
                    </div>
                    <div class="admin__drag" ref="drop" @drop.prevent="uploadFile">
                        <div class="admin__drag-filed">
                            <input type="file" placeholder="none" @change="uploadFile" class="admin__upload" readonly>
                            <span class="admin__upload-icon">
                                <i class="fa-regular fa-images"></i>
                            </span>
                            <p class="admin__upload-text">Drag and drop or explore</p>
                        </div>
                    </div>
                    <p class="admin__text admin__post-create-add">Add <span>text</span> and <span>picture</span></p>
                    <span class="admin__line"></span>
                    <div class="input__container admin__post-create-container">
                        <label class="input__label admin__label admin__create-label">Edit tags</label>
                        <input type="text" ref="tags" @keyup="addTags" class="form-control admin__create-input"
                            placeholder="enter one at a time separated by commas or or select tags below">
                    </div>
                </form>
                <div class="tags__container">
                    <div class="tags__item" v-for="(tag, index) in tags" :key="tag" @click="deleteTag(index)">
                        <p  class="admin__text">{{ tag }}</p>
                        <span><i class="fa-solid fa-trash-can"></i></span>
                    </div>
                </div>
                <div class="admin__create-buttons-container">
                    <div class="admin__create-buttons">
                        <div class="admin__radio-container">
                            <div class="form-check form-switch">
                                <label class="form-check-label" for="flexSwitchCheckChecked">Active</label>
                                <input class="form-check-input" v-model="isActive" type="checkbox"
                                    id="flexSwitchCheckChecked" checked>
                            </div>
                        </div>
                        <button type="button" @click="uploadImagesAndCreatePosts(false)" class="btn admin__create-buttons-btn btn-dark">Edit</button>
                        <router-link to="#" @click="uploadImagesAndCreatePosts(true)" class="admin__create-buttons-link">Save in drafts</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/pages/admin/post-create.scss';
</style>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        url: `/${process.env.VUE_APP_API_PATH}/post-update`,
        imgPaths: [],
        imgFiles: [],
        imgFilePaths: [],
        tags: [],
        title: '',
        text: '',
        views: 0,
        isActive: true,
        id: 0,
        isDraft: false,
        page: {}
    }),
    methods: {
        ...mapActions(['fetchOnePost']),

        deleteImg(index) {
            this.imgPaths.splice(index, 1);
            this.imgFiles.splice(index, 1);
        },

        validateFile(unvalited) {
            if (unvalited) {
                this.$refs.drop.style.border = '1px solid red';
            }
            else {
                this.$refs.drop.style.border = 'none';
            }
        },

        async uploadImagesAndCreatePosts(isDraft) {
            const formData = new FormData();

            this.imgFiles.forEach((file, index) => {
                formData.append(`${index}`, file);
            });

            this.date = this.getDate();
            this.time = this.getTime();

            if (isDraft) {
                this.isActive = false;
                this.isDraft = true;
            }

            const formDataFields = [
                'title', 'text', 'date', 'time', 'isActive', 'views', 'isDraft', 'id'
            ];

            const tags = `${this.tags}`;
            const imgPaths = `${this.imgPaths}`;
            formData.append('tags', tags);
            formData.append('imgPaths', imgPaths);

            formDataFields.forEach((field, index) => {
                formData.append(field, this[field]);
            });

            try {
                const response = await axios.put(this.url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                await location.reload();
            }
            catch (error) {
                console.error('Error uploading images and creating appartaments:', error);
            }
        },

        deleteTag(index) {
            this.tags.splice(index);
        },

        addTags(event) {
            event.preventDefault();

            if (event.key === 'Enter') {
                const newTag = this.$refs.tags.value.trim();

                if (newTag && !this.tags.includes(newTag)) {
                    this.tags.push(newTag.replace(/^\w/, (c) => c.toUpperCase()));
                    this.$refs.tags.value = '';
                }
            }
        },

        getDate() {
            const date = new Date();

            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();

            return `${day}-${month}-${year}`;
        },
        getTime() {
            const date = new Date();

            const hours = date.getHours();
            const minuts = date.getMinutes();

            return `${hours}:${minuts}`;
        },

        uploadFile(event) {
            event.preventDefault();

            const files = event.type === 'drop' ? event.dataTransfer.files : event.target.files;

            if (files) {
                const src = URL.createObjectURL(files[0]);
                const isFileAdded = this.imgFiles.some((file) => file.name === files[0].name);

                this.validateFile(false);

                if (isFileAdded || this.imgPaths.length >= 1) {
                    this.validateFile(true);
                    return;
                }

                this.imgFilePaths.push(src);
                this.imgFiles.push(files[0]);
            }
        },
    },

    computed: {
        ...mapGetters(['getOnePost'])
    },

    async mounted () {
        const data = {
            id: +this.$route.params.id,
            title: this.$route.params.name
        }
        await this.fetchOnePost(data);
        this.page = this.getOnePost;

        this.title = this.page.title;
        this.text = this.page.text;
        this.views = this.page.views;
        this.id = this.page.id;
        this.isDraft = this.page.isDraft;
        this.tags = this.page.tags.split(',');
        this.imgPaths = this.page.imgPaths.split();

        if (this.tags[0] === '') {
            this.tags = [];
        }
    }
}

</script>