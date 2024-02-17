<template>
    <div class="admin__appartaments-create">
        <div class="admin__appartaments-create-nav">
            <a @click="redirectInBack" href="#"><i class="fa-solid fa-angle-left"></i> Back</a>
            <h2 class="admin__title">Edit house</h2>
            <a href="#" class="admin__delete" @click.prevent="showAlert"><i class="fa-solid fa-trash-can"></i> Delete house</a>
        </div>
        <div class="admin__appartaments-create-container">
            <div class="admin__content">
                <form>
                    <div class="input__container admin__create-input-container">
                        <label class="input__label admin__label admin__create-label">Name of house</label>
                        <input v-model="name" type="text" class="form-control admin__create-input">
                        <div class="admin__message"></div>
                    </div>
                    <div class="input__container admin__create-input-container">
                        <label class="input__label admin__label admin__create-label">Location</label>
                        <input v-model="addres" type="text" class="form-control admin__create-input">
                        <div class="admin__message"></div>
                    </div>
                    <div class="admin__mininput-container">
                        <div class="input__container admin__create-input-container">
                            <label class="input__label admin__label admin__create-label">Lat (google maps)</label>
                            <input v-model="lat" type="text" class="form-control admin__create-input">
                            <div class="admin__message"></div>
                        </div>
                        <div class="input__container admin__create-input-container">
                            <label class="input__label admin__label admin__create-label">Long (google maps)</label>
                            <input v-model="long" type="text" class="form-control admin__create-input">
                            <div class="admin__message"></div>
                        </div>
                    </div>
                    <div class="admin__mininput-container">
                        <div class="input__container admin__create-input-container">
                            <label class="input__label admin__label admin__create-label">Property type</label>
                            <select v-model="propertyType" type="text"
                                class="form-control admin__mininput admin__create-input">
                                <option value="Apartament">Apartament</option>
                                <option value="Villa">Villa</option>
                                <option value="Townhouse">Townhouse</option>
                            </select>
                            <div class="admin__message"></div>
                        </div>
                        <div class="input__container admin__create-input-container">
                            <label class="input__label admin__label admin__create-label">Rent/buy</label>
                            <select type="text" v-model="combSelect"
                                class="form-control admin__mininput admin__create-input">
                                <option selected value="Rent and buy">Rent/buy</option>
                                <option value="Buy">Buy</option>
                                <option value="Rent">Rent</option>
                            </select>
                            <div class="admin__message"></div>
                        </div>
                    </div>
                    <div class="admin__upload-images">
                        <img :src="`/${path}`" v-if="paths != ''" alt="Img" ref="img" @click="deleteImg(index)" v-for="(path, index) in imgPaths"
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
                    <div class="admin__thrio-container">
                        <div class="input__container admin__create-input-container">
                            <label class="input__label admin__label admin__create-label">Beds</label>
                            <input type="number" v-model="beds"
                                class="form-control admin__create-input admin__create-number">
                            <p class="admin__create-input-button" @click="updateCountInput('beds', 'plus')">+</p>
                            <p class="admin__create-input-button" @click="updateCountInput('beds', 'minus')">—</p>
                            <div class="admin__message"></div>
                        </div>
                        <div class="input__container admin__create-input-container">
                            <label class="input__label admin__label admin__create-label">Baths</label>
                            <input type="number" v-model="baths"
                                class="form-control admin__create-input admin__create-number">
                            <p class="admin__create-input-button" @click="updateCountInput('baths', 'plus')">+</p>
                            <p class="admin__create-input-button" @click="updateCountInput('baths', 'minus')">—</p>
                            <div class="admin__message"></div>
                        </div>
                        <div class="input__container admin__create-input-container">
                            <label class="input__label admin__label admin__create-label">Square (ft)</label>
                            <input v-model="square" type="number" class="form-control admin__create-input">
                            <div class="admin__message"></div>
                        </div>
                    </div>
                    <div class="input__container admin__create-input-container"
                        v-if="combSelect === 'Rent and buy' || combSelect === 'Rent'">
                        <label class="input__label admin__label admin__create-label">Price for rent in AED</label>
                        <input v-model="priceForRent" type="text" class="form-control admin__create-input">
                        <div class="admin__message"></div>
                    </div>
                    <div class="input__container admin__create-input-container"
                        v-if="combSelect === 'Rent and buy' || combSelect === 'Buy'">
                        <label class="input__label admin__label admin__create-label">Price for buy in AED</label>
                        <input v-model="priceForBuy" type="text" class="form-control admin__create-input">
                        <div class="admin__message"></div>
                    </div>
                    <div class="input__container admin__create-input-container">
                        <label class="input__label admin__label admin__create-label">Description of house</label>
                        <textarea v-model="description" type="text" class="form-control admin__create-input"></textarea>
                        <div class="admin__message"></div>
                    </div>
                    <h2 class="admin__create-title">Project details</h2>
                    <div class="admin__mininput-container">
                        <div class="input__container admin__create-input-container">
                            <label class="input__label admin__label admin__create-label">Unit reference</label>
                            <input v-model="unitReferense" type="text" class="form-control admin__create-input">
                            <div class="admin__message"></div>
                        </div>
                        <div class="input__container admin__create-input-container">
                            <label class="input__label admin__label admin__create-label">Property name:</label>
                            <input v-model="propertyName" type="text" class="form-control admin__create-input">
                            <div class="admin__message"></div>
                        </div>
                        <div class="input__container admin__create-input-container">
                            <label class="input__label admin__label admin__create-label">Emirate</label>
                            <select v-model="emirate" type="text" class="form-control admin__create-input">
                                <option value="Dubai">Dubai</option>
                            </select>
                            <div class="admin__message"></div>
                        </div>
                        <div class="input__container admin__create-input-container">
                            <label class="input__label admin__label admin__create-label">Status</label>
                            <select v-model="status" type="text" class="form-control admin__create-input">
                                <option value="Completed">Completed</option>
                                <option value="Not finished">Not finished</option>
                            </select>
                            <div class="admin__message"></div>
                        </div>
                    </div>
                    <div class="input__container admin__create-input-container">
                        <label class="input__label admin__label admin__create-label">Purpose</label>
                        <select v-model="purpose" type="text" class="form-control admin__create-input">
                            <option value="For sale">For sale</option>
                        </select>
                        <div class="admin__message"></div>
                    </div>
                    <h2 class="admin__create-title">Features and Amenities</h2>
                    <div class="admin__checkinput-container">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <div class="input__container">
                            <label class="input__label admin__label admin__create-label">Outdoor</label>
                            <input v-model="outdoor" type="text" class="form-control admin__create-input">
                        </div>
                    </div>
                    <div class="admin__checkinput-container">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <div class="input__container">
                            <label class="input__label admin__label admin__create-label">Indoor</label>
                            <input v-model="indoor" type="text" class="form-control admin__create-input">
                        </div>
                    </div>
                    <div class="admin__checkinput-container">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <div class="input__container">
                            <label class="input__label admin__label admin__create-label">Lot</label>
                            <input v-model="lot" type="text" class="form-control admin__create-input">
                        </div>
                    </div>
                    <span class="admin__line"></span>
                    <div class="admin__check-content">
                        <div class="admin__check-container">
                            <input v-model="isSlide" class="form-check-input" id="best" type="checkbox" value="">
                            <label for="#best">Add in «Best offers»</label>
                        </div>
                        <div class="admin__check-container">
                            <input v-model="firstSlide" class="form-check-input" id="best" type="checkbox" value="">
                            <label for="#best">Add in Slider on home page</label>
                        </div>
                    </div>
                    <div class="admin__create-buttons-container">
                        <div class="admin__create-buttons">
                            <div class="admin__radio-container">
                                <div class="form-check form-switch">
                                    <label class="form-check-label" for="flexSwitchCheckChecked">Active</label>
                                    <input v-model="isActive" class="form-check-input" type="checkbox"
                                        id="flexSwitchCheckChecked" checked>
                                </div>
                            </div>
                            <button type="button" class="btn admin__create-buttons-btn btn-dark"
                                @click="uploadImagesAndCreateAppartaments()">Edit</button>
                            <router-link to="#" class="admin__create-buttons-link">Save in drafts</router-link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/pages/admin/appartaments-create.scss';
</style>

<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        url: `/${process.env.VUE_APP_API_PATH}/appartament-update`,
        imgFiles: [],
        imgFilePaths: [],
        imgPaths: [],
        id: 0,
        beds: 1,
        baths: 1,
        square: 10,
        price: 10000,
        name: '',
        addres: '',
        propertyType: 'Apartament',
        combSelect: 'Rent and buy',
        description: '',
        unitReferense: '',
        propertyName: '',
        emirate: 'Dubai',
        purpose: 'For sale',
        indoor: '',
        outdoor: '',
        lot: '',
        long: '',
        lat: '',
        priceForRent: 1000,
        priceForBuy: 1000,
        isSlide: false,
        firstSlide: false,
        isActive: false,
        dateOfCreate: '',
        page: {},
        status: 'Completed'

    }),

    methods: {
        ...mapActions('appartaments', ['fetchOneAppartament']),

        async uploadImagesAndCreateAppartaments() {
            const formData = new FormData();

            this.imgFiles.forEach((file, index) => {;
                formData.append(`${index}`, file);
            });

            this.dateOfCreate = this.getDate();

            if (this.combSelect === 'Rent') {
                this.priceForBuy = '';
            }

            if (this.combSelect === 'Buy') {
                this.priceForRent = '';
            }

            const formDataFields = [
                'beds', 'baths', 'square', 'price', 'name', 'addres', 'propertyType', 'long', 'lat', 'id',
                'combSelect', 'description', 'unitReferense', 'propertyName', 'emirate', 'status', 'priceForRent',
                'priceForBuy', 'purpose', 'indoor', 'outdoor', 'lot', 'isSlide', 'firstSlide', 'isActive', 'dateOfCreate'
            ];

            formDataFields.forEach((field, index) => {
                formData.append(field, this[field]);
            });

            const imgPaths = `${this.imgPaths}`;
            formData.append('imgPaths', imgPaths);

            console.log('imgPaths'+imgPaths);
            console.log();

            if (!this.validator()) {
                return;
            }

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

        validator() {
            const inputs = document.querySelectorAll('.admin__create-input');
            const labels = document.querySelectorAll('label');
            const messages = document.querySelectorAll('.admin__message');

            const vueModelKeys = [
                "name", "addres", "lat", "long", 
                "propertyType","beds", "baths", "square",
                'combSelect',"description", "unitReferense", "propertyName"
            ];

            const validateField = (index, condition) => {
                if (!condition) {
                    inputs[index].style.border = '1px solid red';
                    labels[index + 1].style.color = 'red';
                    messages[index].innerHTML = 'This field cannot be empty';
                    
                    return false;
                }
                return true;
            };

            let validatorState = true;

            if (this.combSelect === 'Rent and buy') {
                for (let i = 0; i < vueModelKeys.length; i++) {
                    validatorState = validateField(i, this[vueModelKeys[i]] && this[vueModelKeys[i]] !== '') && validatorState;
                }
            } else {
                for (let i = 0; i < vueModelKeys.length - 1; i++) {
                    validatorState = validateField(i, this[vueModelKeys[i]] && this[vueModelKeys[i]] !== '') && validatorState;
                }
            }

            return validatorState;
        },


        updateCountInput(input, sign) {
            sign === 'plus' ? this[input]++ : sign === 'minus' && this[input] > 0 ? this[input]-- : '';
        },

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

        uploadFile(event) {
            event.preventDefault();

            const files = event.type === 'drop' ? event.dataTransfer.files : event.target.files;

            if (files) {
                const src = URL.createObjectURL(files[0]);

                const isFileAdded = this.imgFiles.some((file) => file.name === files[0].name);
                console.log(files[0]);

                this.validateFile(false);

                if (isFileAdded) {
                    this.validateFile(true);
                    return;
                }
                this.imgFilePaths.push(src);
                console.log('Img Paths: ' + this.imgPaths);
                this.imgFiles.push(files[0]);
                console.log('Img Files: ' + this.imgFiles);
            }
        },

        getDate() {
            const date = new Date();

            const day = date.getDate();
            const month = date.getMonth();
            const year = date.getFullYear();

            return `${day}-${month}-${year}`;
        },

        redirectInBack() {
            this.$router.go(-1);
        }
    },

    computed: {
        ...mapGetters('appartaments', ['getOneAppartament']),
    },

    async mounted () {
        const data = {
            id: +this.$route.params.id,
            name: this.$route.params.name
        }
        
        await this.fetchOneAppartament(data);
        this.page = this.getOneAppartament;

        this.name = this.page.name;
        this.beds = this.page.beds;
        this.baths = this.page.baths;
        this.square = this.page.square;
        this.priceForRent = this.page.priceForRent;
        this.priceForBuy = this.page.priceBuy;
        this.addres = this.page.addres;
        this.propertyType = this.page.propertyType;
        this.combSelect = this.page.combSelect;
        this.description = this.page.description;
        this.unitReferense = this.page.unitReferense;
        this.propertyName = this.page.propertyName;
        this.emirate = this.page.emirate;
        this.purpose = this.page.purpose;
        this.indoor = this.page.indoor;
        this.outdoor = this.page.outdoor;
        this.lot = this.page.lot;
        this.long = this.page.long;
        this.lat = this.page.lat;
        this.priceForRent = this.page.priceForRent;
        this.priceForBuy = this.page.priceForBuy;
        this.isSlide = this.page.isSlide;
        this.firstSlide = this.page.firstSlide;
        this.isActive = this.page.isActive;
        this.dateOfCreate = this.page.dateOfCreate;
        this.status = this.page.status;
        this.imgPaths = this.page.imgPaths.split(',');
        this.id = this.page.id;


        console.log(this.imgPaths);
    }
}

</script>