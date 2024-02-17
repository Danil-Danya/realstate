<template>
    <div>
        <footer class="footer" v-if="documentWidth < 870">
            <div class="container">
                <div class="footer__content">
                    <div class="footer__info">
                        <div class="footer__logo-container">
                            <router-link to="/">
                                <img src="@/assets/images/static/footer/logo.png" alt="Logo" class="footer__logo">
                            </router-link>
                        </div>
                        <div class="footer__adress">
                            <p class="footer__text">Bay Square, Building 8, Office 101,Business Bay, Dubai UAE</p>
                        </div>
                        <div class="footer__contact">
                            <a href="tel:+971562205936" class="footer__link-adress">+971 56 220 5936</a>
                            <a href="mailto:info@l1re.com" class="footer__link-adress">info@l1re.com</a>
                        </div>
                    </div>
                    <div class="footer__bar">
                        <ul>
                            <li v-for="link in links" :key="link">
                                <router-link :to="link.link" class="footer__link">{{ link.name }}</router-link>
                            </li>
                        </ul>
                        <ul class="footer__bar-icon">
                            <li v-for="icon in icons" :key="icon">
                                <a :href="icon.link" class="footer__icon">
                                    <i :class="icon.icon"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="footer__form">
                        <h2 class="footer__form-title">Do you have any question?</h2>
                        <form action="" class="footer__form-container">
                            <button type="button" class="apartament__mobile-contact-button btn btn-dark mobile__contact-button" @click="toggleForm">Contact us</button>
                        </form>
                        <div class="footer__policy">
                            <h2 class="footer__policy-title">Privacy policy</h2>
                            <p class="footer__policy-text">|</p>
                            <p class="footer__policy-text">Copyright © 2022. All Right Reserved.</p>
                        </div>
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
                link: ''
            },
        ]
    }),
    methods: {
        toggleForm() {
            this.$emit('toggleForm');
        },
    }
}

</script>
