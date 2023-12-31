<template>
    <div class="admin__post-create">
        <div class="admin__post-create-nav">
            <a @click="redirectInBack" href="#"><i class="fa-solid fa-angle-left"></i>Back</a>
            <h2 class="admin__title">Add post</h2>
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
                        <img :src="path" alt="Img" ref="img" @click="deleteImg(index)" v-for="(path, index) in imgPaths" :key="path" class="admin__create-img">
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
                        <label class="input__label admin__label admin__create-label">Add tag</label>
                        <input type="text" ref="tags" @keyup="addTags" class="form-control admin__create-input" placeholder="Enter one at a time separated by commas">
                    </div>
                </form>
                <div class="tags__container">
                    <div class="tags__item" v-for="(tag, index) in tags" :key="tag" @click="deleteTag(index)">
                        <p class="admin__text">{{ tag }}</p>
                        <span><i class="fa-solid fa-trash-can"></i></span>
                    </div>
                </div>
                <div class="admin__create-buttons-container">
                    <div class="admin__create-buttons">
                        <div class="admin__radio-container">
                            <div class="form-check form-switch">
                                <label class="form-check-label" for="flexSwitchCheckChecked">Active</label>
                                <input class="form-check-input" v-model="isActive" type="checkbox" id="flexSwitchCheckChecked" checked>
                            </div>
                        </div>
                        <button type="button" @click="uploadImagesAndCreatePosts(false)" class="btn admin__create-buttons-btn btn-dark">Add</button>
                        <router-link to="#" @click="uploadImagesAndCreatePosts(false)" class="admin__create-buttons-link">Save in drafts</router-link>
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

export  default {
    data: () => ({
        url: `/${process.env.VUE_APP_API_PATH}/post-create`,
        imgPaths: [],
        imgFiles: [],
        tags: [],
        title: '',
        text: '',
        views: 0,
        isDraft: false,
        isActive: true
    }),
    
    methods: {
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

        async uploadImagesAndCreatePosts (isDraft) {
            const formData = new FormData();

            this.imgFiles.forEach((file, index) => {
                file.name.replace(/[^a-zA-Z0-9.,-/\\]/g, '')
                formData.append(`${index}`, file);
            });

            this.date = this.getDate();
            this.time = this.getTime();

            if (isDraft) {
                this.isActive = false;
                this.isDraft = true;
            }

            const formDataFields = [
                'title', 'text', 'date', 'time', 'isActive', 'views', 'isDraft'
            ];

            const tags = `${this.tags}`;
            formData.append('tags', tags);

            formDataFields.forEach((field, index) => {
                formData.append(field, this[field]);
            });

            // if (!this.validator()) {
            //     return;
            // }

            try {
                const response = await axios.post(this.url, formData, {
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

        deleteTag (index) {
            this.tags.splice(index);
        },

        addTags (event) {
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

                if (isFileAdded) {
                    this.validateFile(true);
                    return;
                }
                console.log(files[0]);
                this.imgPaths.push(src);
                this.imgFiles.push(files[0]);
            }
        },
    }
}

</script>