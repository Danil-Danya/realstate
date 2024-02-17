<template>
    <div class="center">
        <form class="login__form">
            <h2 class="login__title">Admin panel</h2>
            <div class="mb-3 input__container">
                <label for="exampleInputEmail1" ref="emailLabel" class="form-label input__label login__label">Email address</label>
                <input type="email" ref="email" v-model="email" class="login__input" id="exampleInputEmail1">
                <p class="admin__user-message" style="color: red;">{{ emailMessage }}</p>
            </div>
            <div class="mb-3 input__container">
                <label for="exampleInputPassword1" ref="passwordLabel" class="form-label input__label login__label">Password</label>
                <input type="password" ref="password" v-model="password" class="login__input">
                <p class="admin__user-message" style="color: red;">{{ passwordMessage }}</p>
            </div>
            <div class="mb-3 login__bottom">
                <button type="button" @click="autorization()" class="btn btn-dark login__button">Log in</button>
                <p class="admin__user-message" style="color: red;" v-if="!isTrue">Wrong login or password</p>
            </div>
        </form>
    </div>
</template>

<script>
import router from '@/router';
import axios from 'axios';

export default {
    data: () => ({
        email: '',
        password: '',
        date: new Date(),
        isTrue: true,
        emailMessage: '',
        passwordMessage: '',
        isValid: true
    }),

    methods: {
        validator () {
            if (!this.password) {
                this.isValid = false;
                this.passwordMessage = 'This field cannot be empty';
                this.$refs.password.style.border = '1px solid red';
                this.$refs.passwordLabel.style.color = 'red';
            }
            else {
                this.passwordMessage = '';
                this.$refs.password.style.border = '1px solid #D9D9D9';
                this.$refs.passwordLabel.style.color = '#D9D9D9';
            }

            if (!this.email) {
                this.emailMessage = 'This field cannot be empty';
                this.isValid = false;
                this.$refs.email.style.border = '1px solid red';
                this.$refs.emailLabel.style.color = 'red';
            }
            else {
                this.passwordMessage = '';
                this.$refs.email.style.border = '1px solid #D9D9D9';
                this.$refs.emailLabel.style.color = '#D9D9D9';
            }
        },

        async autorization () {
            const url = '/server-api/indentification';

            const data = {
                email: this.email,
                password: this.password
            }

            this.validator();

            try {
                if (this.isValid) {
                    const response = await axios.post(url, data);
                    const token = response.data.token;
    
                    localStorage.setItem('token', token);
                    localStorage.setItem('month', this.date.getMonth());
                    localStorage.setItem('day', this.date.getDate());
                    
                    if (token) router.replace(`${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-all/1`);
                }
            }
            catch (error) {
                console.log(error);

                if (error.message === 'Request failed with status code 401') {
                    this.isTrue = false;
                    this.email = '';
                    this.password = ''
                }
            }
        }
    },
}
</script>