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
                            <p class="footer__policy-text">Copyright © 2022. All Right Reserved.</p>
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
                                <label for="exampleFormControlInput1" class="form-label input__label">Youre name</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
                            </div>
                            <div class="mb3 input__container footer__input">
                                <label for="exampleFormControlTextarea1" class="form-label input__label">Phone number</label>
                                <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="+971 56 220 5936">
                            </div>
                            <div class="form-check footer__check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                                <label class="form-check-label" for="exampleCheck1">
                                    please, text me on 
                                    <i class="fa-brands fa-whatsapp whatsapp"></i>
                                    <i class="fa-solid check-arrow fa-angle-down"></i>
                                </label>
                            </div>
                            <div class="form-check footer__check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                                <label class="form-check-label footer__label" for="flexCheckChecked">I agree to Terms of use and Privacy Policy</label>
                            </div>
                            <button type="button" class="btn btn-dark footer__button">Contact me</button>
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

export default {
    data: () => ({
        documentWidth: window.innerWidth,
        links: [
            {
                link: '/',
                name: 'Explore house'
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
                link: ''
            },
            {
                icon: 'fa-brands fa-youtube',
                link: ''
            },
            {
                icon: 'fa-brands fa-instagram',
                link: ''
            },
            {
                icon: 'fa-brands fa-linkedin-in',
                link: ''
            },
            {
                icon: 'fa-brands fa-tiktok',
                link: ''
            },
            {
                icon: 'fa-brands fa-whatsapp',
                link: ''
            },
        ]
    }),

}

</script>
