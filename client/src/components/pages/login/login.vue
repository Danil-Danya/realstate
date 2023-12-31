<template>
    <div class="center">
        <form class="login__form">
            <h2 class="login__title">Admin panel</h2>
            <div class="mb-3 input__container">
                <label for="exampleInputEmail1" class="form-label input__label login__label">Email address</label>
                <input type="email" v-model="email" class="login__input" id="exampleInputEmail1">
            </div>
            <div class="mb-3 input__container">
                <label for="exampleInputPassword1" class="form-label input__label login__label">Password</label>
                <input type="password" v-model="password" class="login__input">
            </div>
            <div class="mb-3 login__bottom">
                <button type="button" @click="autorization()" class="btn btn-dark login__button">Log in</button>
                <router-link to="/login/resend" class="login__link" for="exampleCheck1">Forgot your password?</router-link>
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
        date: new Date()
    }),

    methods: {
        async autorization () {
            const url = 'http://localhost:5000/server-api/indentification';

            const data = {
                email: this.email,
                password: this.password
            }

            try {
                const response = await axios.post(url, data);
                const token = response.data.token;

                localStorage.setItem('token', token);
                localStorage.setItem('month', this.date.getMonth());
                localStorage.setItem('day', this.date.getDate());
                
                if (token) router.replace(`${process.env.VUE_APP_ADMIN_ROUTER}/admin/appartament-active/1`);
            }
            catch (error) {
                console.log(error);
            }
        }
    },
}
</script>