<template>
    <div class="delete__container">
        <div class="delete__modal">
            <div class="delete__modal-container">
                <h2 class="delete__title">Are you sure you want to delete this email?</h2>
                <div class="admin__line"></div>
                <div class="delete__button">
                    <button type="button" class="btn delete__btn btn-light" @click="closeModal">No</button>
                    <button type="button" class="btn delete__btn btn-dark" @click="deleteRequest">Yes</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import '@/assets/styles/layouts/admin-delete-modal.scss';
</style>

<script>
import axios from 'axios';

export default {
    props: {
        idToDelete: String,
        nameToDelete: String
    },

    
    methods: {
        closeModal() {
            this.$emit('closeModal');
        },
        async deleteRequest() {
            try {
                const url = `/${process.env.VUE_APP_API_PATH}/request-delete`;
                console.log(this.idToDelete);

                const response = await axios.delete(url, {
                    data: { 
                        id: this.idToDelete, 
                        name: this.nameToDelete 
                    },
                });
                location.reload();
            }
            catch (error) {
                console.log(error);
            }
        },
    }
}

</script>