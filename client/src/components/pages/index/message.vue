<template>
    <section class="message" id="contact">
        <div class="container">
            <div class="message__content">
                <div class="message__left">
                    <img src="@/assets/images/site/pages/index/message/message.png" alt="Message Image" class="message__img">
                </div>
                <div class="message__right">
                    <h2 class="message__title">Find dream house now</h2>
                    <p class="message__text">Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. amet consectetur.</p>
                    <form>
                        <div class="mb-3 input__container message__input-long">
                            <label for="exampleInputEmail1" ref="nameLabel" class="form-label input__label">Your name</label>
                            <input type="text" v-model="name" class="form-control message__input-long" ref="name" id="exampleInputEmail1" placeholder="Anastasiya">
                            <p class="message-message" style="color: red;">{{ nameMessage }}</p>
                        </div>
                        <div class="message__input-container">
                            <div class="mb-3 input__container message__input-mini">
                                <label for="exampleInputPassword1" ref="phoneLabel" class="form-label input__label">Phone number</label>
                                <input type="tel" v-model="phone" class="form-control message__input-mini" ref="phone" placeholder="+998-- --- -- --" id="exampleInputPassword1">
                            </div>
                            <h2 class="message__input-title">or</h2>
                            <div class="mb-3 input__container message__input-mini">
                                <label for="exampleInputPassword1" ref="emailLabel" class="form-label input__label">Email address</label>
                                <input type="email" v-model="email" placeholder="example@mail.com" ref="email" class="form-control message__input-mini" id="exampleInputPassword1">
                            </div>
                        </div>
                        <p class="message-message" style="color: red;">{{ contactMessage }}</p>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">
                                Please, text me on 
                                <i class="fa-brands fa-whatsapp whatsapp"></i>
                            </label>
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" v-model="policy" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" ref="policy" for="exampleCheck1">I agree to Terms of use and Privacy Policy</label>
                        </div>
                        <div class="message__area-container">
                            <div class="input__container message__area">
                                <label for="exampleFormControlTextarea1" ref="messageLabel" class="form-label input__label">Your question</label>
                                <textarea class="form-control message__area" v-model="question" placeholder="Message" ref="message" id="exampleFormControlTextarea1" rows="3"></textarea>
                                <p class="message-message" style="color: red;">{{ messageMessage }}</p>
                            </div>
                            <button type="submit" class="btn message__button btn-dark" @click.prevent="sendMessage()">Contact me</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/index/message.scss';
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
        validator () {
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

        async sendMessage () {
            const url = '/server-api/request-create';

            const data = {
                name: this.name,
                phone: this.phone,
                date: this.date,
                email: this.email,
                from: 'main',
                fromPage: 'Home page',
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