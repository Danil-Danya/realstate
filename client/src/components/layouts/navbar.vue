<template>
    <div>
        <nav class="navbar">
            <div class="container">
                <div class="container-fluid d-flex navbar__content">
                    <router-link to="/" class="navbar__logo">
                        <img src="@/assets/images/static/navbar/logo.png" alt="Logo">
                    </router-link>
                    <form class="d-flex navbar__form" role="search">
                        <ul class="navbar__form-ul d-flex">
                            <li v-for="item in filter" :key="item">
                                <a href="#" class="navbar__filter" @click="toggleFilter">{{ item }}</a>
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
                                <a href="#" ref="link" @click.stop="toggleBar(index)" class="navbar__icon">
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
                            <li v-for="link in links" :key="link" @click="closeNavbarModal">
                                <router-link :to="link.link" class="navbar__modal-link">{{ link.name }}</router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
        <transition name="filter">
            <navbarFilters v-if="showFilter" @closeFilter="closeFilter"/>
        </transition>
    </div>
</template>

<style lang="scss" scoped>
    @import '@/assets/styles/layouts/navbar.scss';
</style>


<script>
import navbarFilters from '../reused/navbarFilters.vue';

export default {
  components: { navbarFilters },
    data: () => ({
        showFilter: false,
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
                link: '/blog/1',
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
        toggleFilter () {
            this.showFilter = ! this.showFilter;
        },

        closeFilter () {
            this.showFilter = false;
        },

        createLikedLink () {
            let likedUrl = '';

            let tovars = localStorage.getItem('likedTovars');
            !tovars ? tovars = [] : tovars = JSON.parse(tovars);

            tovars.forEach((tovar, index) => {
                if (index === tovars.length - 1) {
                    likedUrl += tovar;
                }
                else {
                    likedUrl += tovar + ',';
                }
            });

            this.$refs.link[0].setAttribute('href', '/catalog/1/?liked=' + encodeURIComponent(likedUrl ? likedUrl : 'none'));
        },

        closeNavbarModal () {
            if (this.modal) {
                this.modal = false;
                let icon = document.querySelectorAll('.icon');
                icon[2].classList.remove('fa-xmark')
                icon[2].classList.add('fa-bars-staggered')
            }
        },

        toggleBar(index) {
            if (index === 2) {
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
            }
        },
    },

    mounted () {
        this.createLikedLink();

        document.querySelector('body').addEventListener('click', (e) => this.closeNavbarModal());
    }
}

</script>