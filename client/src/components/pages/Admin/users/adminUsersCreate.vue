<template>
    <div class="admin__user-container">
        <div class="admin__user-create">
            <div class="admin__user-create-nav">
                <a @click="redirectInBack" href="#"><i class="fa-solid fa-angle-left"></i> Back</a>
                <a href="#" class="admin__delete"><i class="fa-solid fa-trash-can"></i> Delete user</a>
            </div>
            <div class="admin__user-create-container">
                <div class="admin__content">
                    <form autocomplete="disabled"> 
                        <div class="admin__user-input-container">
                            <div class="input__container admin__create-input-container">
                                <label class="input__label admin__label admin__create-label" ref="emailLabel">Email</label>
                                <input type="wmail" v-model="email" class="form-control admin__create-input" readonly onfocus="this.removeAttribute('readonly')" ref="email">
                                <p class="admin__user-message">{{ emailMessage }}</p>
                            </div>
                        </div>
                        <div class="admin__user-input-container">
                            <div class="input__container admin__create-input-container">
                                <label class="input__label admin__label admin__create-label" ref="passwordLabel">Role</label>
                                <select class="form-control admin__create-input" style="cursor: pointer;" v-model="role">
                                    <option value="CREATOR" selected>Creator</option>
                                    <option value="SPECTATOR">For view </option>
                                </select>
                                <span class="password-icon" ref="passwordIcon" @click="showPassword">
                                    <i class="fa-solid fa-chevron-down"></i>
                                </span>
                                <p class="admin__user-message">{{ passwordMessage }}</p>
                            </div>
                        </div>
                        <div class="admin__user-input-container">
                            <div class="input__container admin__create-input-container">
                                <label class="input__label admin__label admin__create-label" ref="passwordLabel">Password</label>
                                <input :type="viewPassword ? 'text' : 'password'" v-model="password" readonly onfocus="this.removeAttribute('readonly')" utocomplete="new-password" class="form-control admin__create-input" ref="password">
                                <span class="password-icon" ref="passwordIcon" @click="showPassword">
                                    <i class="fa-solid fa-eye"></i>
                                </span>
                                <p class="admin__user-message">{{ passwordMessage }}</p>
                            </div>
                        </div>
                    </form>
                    <div class="admin__create-buttons-container">
                        <button type="button" @click="registrNewUser()" class="btn admin__create-buttons-btn btn-dark">Add</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/admin/user-create.scss';
</style>

<script>
import axios from 'axios';

export default {
    data: () => ({
        email: '',
        password: '',
        role: 'CREATOR',
        emailMessage: '',
        passwordMessage: '',
        viewPassword: false
    }),

    methods: {
        showPassword () {
            this.viewPassword = !this.viewPassword;
        },

        checkPassword (password) {
            let isValid = true;

            if (password.length < 8) {
                isValid = false;
                this.passwordMessage = 'The password must contain at least 8 characters';
            }

            if (!isNaN(password)) {
                isValid = false;
                this.passwordMessage = 'The password must contain numbers and letters';
            }

            if (!password) {
                isValid = false;
                this.passwordMessage = 'This field cannot be empty';
            }

            if (isValid) {
                this.passwordMessage = ''; 
                this.$refs.password.style.border = '1px solid #D9D9D9';
                this.$refs.passwordLabel.style.color = '#D9D9D9';
            }
            else {
                this.$refs.password.style.border = '1px solid red';
                this.$refs.passwordLabel.style.color = 'red';
            }
            

            return isValid;
        },

        checkEmail (email) {
            const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
            let isValid = true;

            if (!EMAIL_REGEXP.test(email)) {
                this.emailMessage = 'This value in field is not email';
                isValid = false;
            }
            
            if (!email) {
                this.emailMessage = 'This field cannot be empty';
                isValid = false;
            }

            if (isValid) {
                this.emailMessage = '';
                this.$refs.email.style.border = '1px solid #D9D9D9';
                this.$refs.emailLabel.style.color = '#D9D9D9';
            }
            else {
                this.$refs.email.style.border = '1px solid red';
                this.$refs.emailLabel.style.color = 'red';
            }

            return isValid
        },

        validator (email, password) {
            let isValid = false;

            const checkEmail = this.checkEmail(email);
            const checkPassword = this.checkPassword(password);

            if (checkPassword && checkEmail) {
                return true;
            }
            
            return false;
        },

        async registrNewUser () {
            const url = `http://localhost:5000/${process.env.VUE_APP_API_PATH}/registration`;
            const isValid = this.validator(this.email, this.password);
            
            if (isValid) {
                const data = {
                    email: this.email,
                    password: this.password,
                    role: this.role
                }
    
                try {
                    await axios.post(url, data);
                    await location.reload();
                }
                catch (error) {
                    console.log(error);
                    return
                }
            }
        },
    },
}


</script>