<template>
    <div>
        <footer class="footer" v-if="documentWidth > 870">
            <div class="container">
                <div class="footer__content">
                    <div class="footer__info">
                        <div class="footer__logo-container">
                            <router-link to="/">
                                <img src="@/assets/images/static/footer/logo.png" alt="Logo" class="footer__logo">
                            </router-link>
                        </div>
                        <ul>
                            <li v-for="icon in icons" :key="icon">
                                <a :href="icon.link" class="footer__icon">
                                    <i :class="icon.icon"></i>    
                                </a>
                            </li>
                        </ul>
                        <div class="footer__policy">
                            <h2 class="footer__policy-title">Privacy policy</h2>
                            <p class="footer__policy-text">Copyright © 2024. All Rights Reserved.</p>
                        </div>
                    </div>
                    <div class="footer__bar">
                        <ul>
                            <li v-for="link in links" :key="link">
                                <router-link to="" class="footer__link">{{ link.name }}</router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="footer__adress">
                        <p class="footer__text">Bay Square, Building 8, Office 101,Business Bay, Dubai UAE</p>
                        <a href="tel:+971562205936" class="footer__link-adress">+971 56 220 5936</a>
                        <a href="mailto:info@l1re.com" class="footer__link-adress">info@l1re.com</a>
                    </div>
                    <div class="footer__form">
                        <h2 class="footer__form-title">Do you have any question?</h2>
                        <form action="" class="footer__form-container">
                            <div class="input__container footer__input">
                                <label for="exampleFormControlInput1" class="form-label input__label" ref="nameLabel">Your name</label>
                                <input type="text" class="form-control footer__input-el" id="exampleFormControlInput1" ref="name" v-model="name" placeholder="Anastasiya">
                                 <p class="message-message" style="color: red;">{{ nameMessage }}</p>
                            </div>
                            <div class="mb3 input__container footer__input">
                                <label for="exampleFormControlTextarea1" class="form-label input__label" ref="phoneLabel">Phone number</label>
                                <input type="number" class="form-control footer__input-el" v-model="phone" ref="phone" id="exampleFormControlInput1" placeholder="+971 56 220 5936">
                                <p class="message-message" style="color: red;">{{ phoneMessage }}</p>
                            </div>
                            <div class="form-check footer__check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                <label class="form-check-label" for="exampleCheck1">
                                    Please, text me on 
                                    <i class="fa-brands fa-whatsapp whatsapp"></i>
                                </label>
                            </div>
                            <div class="form-check footer__check">
                                <input class="form-check-input" type="checkbox" v-model="policy" value="" id="flexCheckChecked" checked>
                                <label class="form-check-label footer__label" ref="policy" for="flexCheckChecked">I agree to Terms of use and Privacy Policy</label>
                            </div>
                            <button type="button" class="btn btn-dark footer__button" @click="sendMessage">Contact me</button>
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    </div>
</template>

<style lang="scss" scoped>
@import '@/assets/styles/layouts/footer.scss';
</style>

<script>
import axios from 'axios';

export default {
    data: () => ({
        documentWidth: window.innerWidth,
        nameMessage: '',
        contactMessage: '',
        messageMessage: '',
        policy: true,
        links: [
            {
                link: '/',
                name: 'Explore houses'
            },
            {
                link: '/',
                name: 'About us'
            },
            {
                link: '/',
                name: 'Blog'
            },
            {
                link: '/',
                name: 'Catalog'
            },
            {
                link: '/',
                name: 'Contact us'
            },
        ],
        icons: [
            {
                icon: 'fa-brands fa-facebook',
                link: 'https://www.facebook.com/LuxuryOneRE '
            },
            {
                icon: 'fa-brands fa-youtube',
                link: 'https://www.youtube.com/channel/UCVBrNkDRJ8TRGVkQSQUOaLA'
            },
            {
                icon: 'fa-brands fa-instagram',
                link: 'https://www.instagram.com/luxuryonere/'
            },
            {
                icon: 'fa-brands fa-linkedin-in',
                link: 'https://www.linkedin.com/company/luxury-one-re/'
            },
            {
                icon: 'fa-brands fa-tiktok',
                link: 'https://www.tiktok.com/@luxuryonerealestate'
            },
            {
                icon: 'fa-brands fa-whatsapp',
                link: 'https://api.whatsapp.com/send?phone=971521096888'
            },
        ]
    }),

    methods: {
        validator () {
            let isValid = true;
            console.log(this.$refs.phone);

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

            if (!this.phone) {
                isValid = false;

                this.phoneMessage = 'This field cannot be empty';
                this.$refs.phone.style.border = '1px solid red';
                this.$refs.phoneLabel.style.color = 'red';
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
            if (this.validator()) {
                const url = 'http://localhost:5000/server-api/request-create';

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
                    await axios.post(url, data);
                    location.reload();
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    }
}

</script>
