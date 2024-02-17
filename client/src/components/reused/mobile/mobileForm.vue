<template>
    <div class="mobile__contact">
        <div class="container">
        <div class="mobile__contact-container">
            <div class="mobile__contact-header">
            <div class="mobile__contact-element"></div>
            <h2 class="mobile__contact-title">Send request</h2>
            <span class="mobile__contact-chrest" @click="exiteForm">
                <i class="fa-solid fa-xmark"></i>
            </span>
            </div>
            <form action="#" class="mobile__form">
            <div class="input__container">
                <label for="name" class="mobile__label input__label" ref="nameLabel">Your name</label>
                <input v-model="name" type="text" id="name" ref="name" class="mobile__contact-input" :placeholder="nameMessage ? nameMessage : ''">
            </div>
            <div class="input__container">
                <label for="phone" class="mobile__label input__label" ref="phoneLable">Phone number</label>
                <input v-model="phone" type="text" id="phone" ref="phone" class="mobile__contact-input mobile__contact-input-none" :placeholder="contactMessage ? contactMessage : ''">
            </div>
            <p class="mobile__branching">Or</p>
            <div class="input__container">
                <label for="email" class="mobile__label input__label" ref="emailLable">Email address</label>
                <input v-model="email" type="text" id="email" ref="email" class="mobile__contact-input" :placeholder="contactMessage ? contactMessage : ''">
            </div>
            <div class="mobile__check-container">
                <div class="form-check mobile__check">
                <input class="form-check-input mobile__contact-check" type="checkbox" value="" id="flexCheckDefault">
                <label class="form-check-label" for="exampleCheck1">
                    <span>please, text me on </span>
                    <i class="fa-brands fa-whatsapp whatsapp"></i>
                    <i class="fa-solid check-arrow fa-angle-down"></i>
                </label>
            </div>
                <div class="form-check mobile__check">
                    <input class="form-check-input mobile__contact-check" type="checkbox" v-model="policy" id="flexCheckChecked" checked>
                    <label class="form-check-label" ref="policy" for="flexCheckChecked">I agree to Terms of use and Privacy Policy</label>
                </div>
            </div>
            <div class="input__container">
                <label for="question" class="mobile__label input__label" ref="mesageLable">Your question</label>
                <textarea v-model="question" id="question" ref="message" class="mobile__contact-input" :placeholder="messageMessage ? messageMessage : ''"></textarea>
            </div>
            <button type="button" @click="sendMessage" class="btn btn-dark mobile__contact-button">Send request</button>
            </form>
        </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/mobile/form-mobile.scss';
</style>

<script>
import axios from 'axios';

export default {
    data: () => ({
        contact: false,
        nameMessage: '',
        contactMessage: '',
        messageMessage: ''
    }),
    methods: {
        exiteForm () {
            this.$emit('exitForm')
        },
        validator() {
            let isValid = true;
            console.log(this.$refs.emailLable);

            if (!this.name) {
                isValid = false;

                this.nameMessage = 'This field cannot be empty';
                this.$refs.name.style.border = '1px solid red';
                this.$refs.nameLabel.style.color = 'red';
            }
            else {
                this.nameMessage = '';
                this.$refs.name.style.border = '1px solid #D9D9D9';
                this.$refs.nameLabel.style.color = 'rgba(55, 55, 55, 0.6)';
            }

            if (!this.email && !this.phone) {
                isValid = false;

                this.contactMessage = 'You must fill in one field: phone or email';

                this.$refs.email.style.border = '1px solid red';
                this.$refs.emailLable.style.color = 'red';

                this.$refs.phone.style.border = '1px solid red';
                this.$refs.phoneLable.style.color = 'red';
            }
            else {
                this.contactMessage = '';

                this.$refs.email.style.border = '1px solid #D9D9D9';
                this.$refs.emailLable.style.color = 'rgba(55, 55, 55, 0.6)';

                this.$refs.phone.style.border = '1px solid #D9D9D9';
                this.$refs.phoneLable.style.color = 'rgba(55, 55, 55, 0.6)';
            }

            if (!this.question) {
                isValid = false;

                this.messageMessage = 'This field cannot be empty';

                this.$refs.message.style.border = '1px solid red';
                this.$refs.mesageLable.style.color = 'red';
            }
            else {
                this.messageMessage = '';

                this.$refs.message.style.border = '1px solid #D9D9D9';
                this.$refs.mesageLable.style.color = '#D9D9D9';
            }

            if (!this.policy) {
                isValid = false;
                this.$refs.policy.style.color = 'red';
            }
            else {
                this.$refs.policy.style.color = '#D9D9D9';
            }

            return isValid;
        },
        showContact() {
            this.contact = !this.contact;
        },
        async sendMessage() {
            const url = '/server-api/request-create';

            const data = {
                name: this.name,
                phone: this.phone,
                date: this.date,
                email: this.email,
                from: 'footer',
                fromPage: 'Home page',
                connectionType: 'whatsapp',
                question: this.question,
                isNew: true
            }

            try {
                if (this.validator()) {
                    await axios.post(url, data);
                    location.reload();
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
}

</script>


