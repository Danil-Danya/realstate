<template>
    <div class="admin__post-create">
        <div class="admin__post-create-nav">
            <a @click="redirectInBack" href="#"><i class="fa-solid fa-angle-left"></i> Back</a>
            <a href="#" class="admin__delete"><i class="fa-solid fa-trash-can"></i> Delete Post</a>
        </div>
        <div class="admin__post-create-container">
            <div class="admin__content">
                <form>
                    <div class="input__container admin__create-input-container">
                        <label class="input__label admin__label admin__create-label">Title</label>
                        <input type="text" v-model="title" class="form-control admin__create-input">
                    </div>
                    <div class="admin__post-content-container" v-for="(item, index) in content" :key="item">
                        <div class="admin__drop admin__drop admin__drop-text" v-show="item.type === 'TEXT'" draggable="true" @dragstart="onDragStart(index, $event)" @dragover="onDragOver" @drop="onDroped($event, index)">
                            <span class="admin__drag-text"><i class="fa-solid fa-grip-lines"></i></span>
                            <div class="input__container admin__create-input-container">
                                <label class="input__label admin__label admin__create-label">Text</label>
                                <textarea type="text" v-model="content[index].content" class="form-control admin__create-input"></textarea>
                            </div> 
                        </div>
                        <div class="admin__drop admin__drop-image" v-show="item.type === 'IMAGE'" draggable="true" @dragstart="onDragStart(index, $event)" @dragover="onDragOver"  @drop="onDroped($event, index)">
                            <span class="admin__drag-image"><i class="fa-solid fa-grip-lines"></i></span>
                            <div class="admin__upload-images"  v-if="item.type === 'IMAGE'">
                                <img :src="'/' + item.path" alt="Img" v-if="item.path" ref="img" class="admin__create-img">
                            </div>
                            <div class="admin__drag" ref="drop" @drop.prevent="uploadFile($event, index)">
                            <div class="admin__drag-filed">
                                    <input type="file" placeholder="none" @change="uploadFile($event, index)" class="admin__upload" readonly>
                                    <span class="admin__upload-icon">
                                        <i class="fa-regular fa-images"></i>
                                    </span>
                                    <p class="admin__upload-text">Drag and drop or explore</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p class="admin__text admin__post-create-add">
                        Add <span class="admin__add" @click="addTextOrImage('TEXT')">text</span> 
                        and <span class="admin__add" @click="addTextOrImage('IMAGE')">picture</span>
                    </p>
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
        content: [],
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

        onDragStart(index, event) {
            event.dataTransfer.setData('text/plain', index);
        },

        onDroped(e, index) {
            e.preventDefault();
            const draggedIndex = e.dataTransfer.getData('text/plain');

            console.log('Dragged Index:', draggedIndex);
            console.log('Target Index:', index);


            const temp = this.content[index];
            this.content[index] = this.content[draggedIndex];
            this.content[draggedIndex] = temp;
        },

        async uploadImagesAndCreatePosts(isDraft) {
            const formData = new FormData();

            this.content.forEach((item, index) => {
                if (item.type === 'IMAGE') {
                    const file = item.file;

                    file.name.replace(/[^a-zA-Z0-9.,-/\\]/g, '');
                    formData.append(`${index}`, file);
                }
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

            const content = JSON.stringify(this.content);
            formData.append('content', content);

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

        redirectInBack() {
            this.$router.go(-1);
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

        addTextOrImage(type) {
            if (type === 'TEXT') {
                this.content.push({ type: 'TEXT', content: '' },);
            }
            if (type === 'IMAGE') {
                this.content.push({ type: 'IMAGE', content: '' },);
            }
        },

        getTime() {
            const date = new Date();

            const hours = date.getHours();
            const minuts = date.getMinutes();

            return `${hours}:${minuts}`;
        },

        uploadFile(event, index) {
            event.preventDefault();

            const files = event.type === 'drop' ? event.dataTransfer.files : event.target.files;

            if (files && files.length > 0) {
                const src = URL.createObjectURL(files[0]);

                this.content[index] = { index, type: 'IMAGE', path: src, file: files[0] };
                console.log(this.content[index]);
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

        this.content = JSON.parse(this.getOnePost.content);

        console.log(this.content);
        if (this.tags[0] === '') {
            this.tags = [];
        }
    }
}

</script>