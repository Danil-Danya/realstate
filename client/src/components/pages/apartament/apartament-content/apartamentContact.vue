<template>
    <div class="apartament__contact">
        <div class="apartament__contact-container">
            <h2 class="apartament__title-provocator">Ready for your new home?</h2>
            <h2 class="apartament__title-contact">Send us an Inquiry</h2>
            <form action="#" class="apartament__form">
                <div class="input__container">
                    <label for="" class="apartament__label input__label" ref="nameLabel">Your name</label>
                    <input type="text" class="apartament__contact-input" ref="name" placeholder="Anastasiya" v-model="name">
                    <p class="message-message" style="color: red;">{{ nameMessage }}</p>
                </div>
                <div class="input__container">
                    <label for="" class="apartament__label input__label" ref="phoneLabel">Phone number</label>
                    <input type="text" class="apartament__contact-input-branching" ref="phone" placeholder="+998 -- --- -- --" v-model="phone">
                </div>
                <p class="apartament__branching">Or</p>
                <div class="input__container">
                    <label for="" class="apartament__label input__label" ref="emailLabel">Email address</label>
                    <input type="text" class="apartament__contact-input" ref="email" placeholder="Example@email.com" v-model="email">
                    <p class="message-message" style="color: red;">{{ contactMessage }}</p>
                </div>
                <div class="input__container">
                    <label for="" class="apartament__label input__label" ref="messageLabel">Your question</label>
                    <textarea class="apartament__contact-input" v-model="question" placeholder="Optional" ref="message"></textarea>
                </div>
                <div>
                    <div class="form-check apartament__contact-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="exampleCheck1">
                            <span>Please, text me on </span>
                            <i class="fa-brands fa-whatsapp whatsapp"></i>
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked v-model="policy">
                        <label class="form-check-label" ref="policy" for="flexCheckChecked" >I agree to Terms of use and Privacy Policy</label>
                    </div>
                </div>
                <button type="button" class="btn btn-dark apartament__contact-button" @click="sendMessage">Contact me</button>
            </form>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/apartament/contact.scss';
</style>

<script>
import axios from 'axios';

export default {
    data: () => ({
        nameMessage: '',
        contactMessage: '',
        messageMessage: ''
    }),
    methods: {
        validator() {
            let isValid = true;

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
                this.$refs.emailLabel.style.color = 'red';

                this.$refs.phone.style.border = '1px solid red';
                this.$refs.phoneLabel.style.color = 'red';
            }
            else {
                this.contactMessage = '';

                this.$refs.email.style.border = '1px solid #D9D9D9';
                this.$refs.emailLabel.style.color = 'rgba(55, 55, 55, 0.6)';

                this.$refs.phone.style.border = '1px solid #D9D9D9';
                this.$refs.phoneLabel.style.color = 'rgba(55, 55, 55, 0.6)';
            }

            if (!this.question) {
                isValid = false;

                this.messageMessage = 'This field cannot be empty';

                this.$refs.message.style.border = '1px solid red';
                this.$refs.messageLabel.style.color = 'red';
            }
            else {
                this.messageMessage = '';

                this.$refs.message.style.border = '1px solid #D9D9D9';
                this.$refs.messageLabel.style.color = '#D9D9D9';
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

        async sendMessage() {
            const url = '/server-api/request-create';

            const data = {
                name: this.name,
                phone: this.phone,
                date: this.date,
                email: this.email,
                from: 'main',
                fromPage: this.$route.params.name,
                connectionType: 'whatsapp',
                question: this.question,
                isNew: true
            }

            if (this.validator()) {
                try {
                    await axios.post(url, data);
                    await location.reload();
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    }
}

</script>