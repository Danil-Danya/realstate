<template>
    <section class="login">
        <div class="container">
            <div class="login__content">
                <div class="login__logo-container">
                    <router-link to="/">
                        <img src="@/assets/images/static/login/logo.png" alt="Logo" class="login__logo">
                    </router-link>
                </div>
                <div class="login__window">
                    <router-view/>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/login/login.scss';
</style>