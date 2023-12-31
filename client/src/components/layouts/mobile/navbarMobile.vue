<template>
    <nav class="navbar" v-if="documentWidth < 1000">
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
                        <button class="btn  navbar__btn-mobile" type="submit">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                    <div class="navbar__icon-list">
                        <ul>
                            <li v-for="icon, index in icons" :key="icon">
                                <a href="#" ref="link" @click="toggleBar(index)" class="navbar__icon">
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
                            <span class="navbar__icon">
                                <i class="fa-regular fa-heart"></i>
                            </span>
                            <span class="navbar__icon">
                                <i class="fa-solid fa-earth-americas"></i>
                            </span>
                        </div>
                        <ul>
                            <li v-for="link in links" :key="link">
                                <a href="" class="navbar__modal-link">{{ link.name }}</a>
                            </li>
                        </ul>
                    </div>
                </transition>
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
                link: '/catalog',
                name: 'Catalog'
            },
            {
                link: '/blog',
                name: 'Blog'
            },
            {
                link: '',
                name: 'About us'
            },
            {
                link: '',
                name: 'Contact us'
            },
        ]
    }),

    methods: {
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
        // closeOnBodyBar() {
        //     if (this.modal) {
        //         const bar = this.$refs.link;
        //         const activeDiv = document.querySelectorAll('.active');
        //         const disactiveDiv = document.querySelectorAll('.disactive');

        //         this.modal = false;

        //         bar[bar.length - 1].removeChild(activeDiv[0]);
        //         bar[bar.length - 1].innerHTML += `<div class="disactive" ref="div">
        //                                               <i class="fa-solid fa-bars-staggered"></i>
        //                                           </div>`;
        //     }
        // }
    },
    // mounted() {
    //     document.body.addEventListener('click', =>  this.closeOnBodyBar, { once: true });
    // },
}


</script>