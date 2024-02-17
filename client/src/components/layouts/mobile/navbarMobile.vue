<template>
    <nav class="navbar" v-if="documentWidth < 1000">
            <div class="container">
                <div class="container-fluid d-flex navbar__content">
                    <router-link to="/" class="navbar__logo">
                        <img src="@/assets/images/static/navbar/logo.png" alt="Logo">
                    </router-link>
                    <form class="d-flex navbar__form" role="search">
                        <ul class="navbar__form-ul d-flex">
                            <li v-for="item in filter" @click="toggleFilter" :key="item">
                                <a href="#" class="navbar__filter">{{ item }}</a>
                                <span class="navbar__filter-element"></span>
                            </li>
                        </ul>
                        <button class="btn  navbar__btn-mobile" type="submit">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                    <div class="navbar__icon-list">
                        <ul>
                            <li v-for="icon, index in icons" :key="icon">
                                <a href="#" ref="link" @click.stop="toggleBar(index)" class="navbar__icon">
                                    <div ref="div" class="disactive">
                                        <i :class="icon" ref="icons"></i>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <transition name="navbar">
                    <div class="navbar__modal-mobile" ref="modal" v-if="modal"> 
                        <div class="navbar__modal-header">
                            <h3 class="navbar__modal-title">Menu</h3>
                        </div>
                        <div class="navbar__modal-icon">
                            <span class="navbar__icon" @click="createLikedLink">
                                <i class="fa-regular fa-heart"></i>
                            </span>
                            <span class="navbar__icon">
                                <i class="fa-solid fa-earth-americas"></i>
                            </span>
                        </div>
                        <ul>
                            <li v-for="link in links" :key="link">
                                <router-link :to="`${link.link}`" class="navbar__modal-link">{{ link.name }}</router-link>
                            </li>
                        </ul>
                    </div>
                </transition>
                <transition name="filter">
                    <navbarFilters v-if="showFilter" @closeFilter="closeFilter"/>
                </transition>
            </div>
        </nav>
</template>

<style lang="scss" scoped>
    @import '@/assets/styles/layouts/navbar.scss';
</style>

<script>
import navbarFilters from '@/components/reused/navbarFilters.vue';
export default {
    data: () => ({
        documentWidth: window.innerWidth,
        modal: false,
        showFilter: false,
        filter: [
            'Rent/Buy',
            'Property type',
            'Price ra...',
        ],
        icons: [
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

    components: {
        navbarFilters
    },

    methods: {
        toggleFilter() {
            this.showFilter = !this.showFilter;
        },

        closeFilter() {
            this.showFilter = !this.showFilter;
        },

        createLikedLink() {
            let likedLink = document.querySelector('.navbar__like');
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
            likedUrl = encodeURIComponent(likedUrl ? likedUrl : 'none')

            this.$router.push('/catalog/1/?liked=' + likedUrl);
        },

        toggleBar(index) {
            this.modal = !this.modal;

            if (index === this.$refs.link.length - 1) {
                const activeDiv = document.querySelectorAll('.active');
                const disactiveDiv = document.querySelectorAll('.disactive');

                const divClass = disactiveDiv.length ? 'active' : 'disactive';

                const divContent = `<div class="${divClass}" ref="div">
                                        <i class="fa-solid ${disactiveDiv.length ? 'fa-xmark' : 'fa-bars-staggered'}"></i>
                                    </div>`;

                this.$refs.link[index].removeChild(disactiveDiv[disactiveDiv.length - 1] || activeDiv[activeDiv.length - 1]);
                this.$refs.link[index].innerHTML += divContent;
            }
        },
        closeOnBodyBar() {
            if (this.modal) {
                const bar = this.$refs.link;
                const activeDiv = document.querySelectorAll('.active');
                const disactiveDiv = document.querySelectorAll('.disactive');
                console.log(bar);

                this.modal = false;

                bar[0].removeChild(activeDiv[0]);
                bar[0].innerHTML += `<div class="disactive" ref="div">
                                                      <i class="fa-solid fa-bars-staggered"></i>
                                                  </div>`;
            }
        }
    },
    
    mounted() {
        document.querySelector('body').addEventListener('click', () =>  this.closeOnBodyBar());
    },
}


</script>