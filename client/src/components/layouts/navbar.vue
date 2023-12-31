<template>
    <nav class="navbar" v-if="documentWidth > 1000">
        <div class="container">
            <div class="container-fluid d-flex navbar__content">
                <router-link to="/" class="navbar__logo">
                    <img src="@/assets/images/static/navbar/logo.png" alt="Logo">
                </router-link>
                <form class="d-flex navbar__form" role="search">
                    <ul class="navbar__form-ul d-flex">
                        <li v-for="item in filter" :key="item">
                            <a href="#" class="navbar__filter">{{ item }}</a>
                            <span class="navbar__filter-element"></span>
                        </li>
                    </ul>
                    <button class="btn btn-outline-success navbar__btn" type="submit">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                </form>
                <div class="navbar__icon-list">
                    <ul>
                        <li v-for="icon, index in icons" :key="icon">
                            <a href="#" ref="link" @click="toggleBar(index)" class="navbar__icon">
                                <div ref="div" class="disactive">
                                    <i :class="icon" class="icon" ref="icons"></i>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="navbar__modal-container">
                <div class="navbar__modal" ref="modal" v-if="modal">
                    <ul>
                        <li v-for="link in links" :key="link">
                            <router-link :to="link.link" class="navbar__modal-link">{{ link.name }}</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<style lang="scss" scoped>
    @import '@/assets/styles/layouts/navbar.scss';
</style>


<script>
export default {
    data: () => ({
        documentWidth: window.innerWidth,
        modal: false,
        filter: [
            'Rent/Buy',
            'Property type',
            'Completion status',
            'Area',
            'Price range',
        ],
        icons: [
            'fa-regular fa-heart',
            'fa-solid fa-earth-americas',
            'fa-solid fa-bars-staggered'
        ],
        links: [
            {
                link: '/',
                name: 'Home'
            },
            {
                link: '/catalog/1',
                name: 'Catalog'
            },
            {
                link: '/blog',
                name: 'Blog'
            },
            {
                link: '/#about',
                name: 'About us'
            },
            {
                link: '/#contact',
                name: 'Contact us'
            },
        ]
    }),

    methods: {
        toggleBar(index) {
            this.modal = !this.modal;
                
            let icon = document.querySelectorAll('.icon');
            
            if (icon[2].classList.contains('fa-bars-staggered')) {
                icon[2].classList.remove('fa-bars-staggered')
                icon[2].classList.add('fa-xmark')
            }
            else {
                icon[2].classList.remove('fa-xmark')
                icon[2].classList.add('fa-bars-staggered')
            }
        },
    },
}

</script>