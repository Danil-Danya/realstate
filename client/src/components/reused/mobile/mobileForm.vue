<template>
    <div class="mobile__contact">
        <div class="container">
            <div class="mobile__contact-container">
                <div class="mobile__contact-header">
                    <div class="mobile__contact-element"></div>
                    <h2 class="mobile__contact-title">Send request</h2>
                    <span class="mobile__contact-chrest" @click="exiteForm">
                        <i class="fa-solid fa-xmark"></i>
                    </span>
                </div>
                <form action="#" class="mobile__form">
                    <div class="input__container">
                        <label for="" class="mobile__label input__label">Yore name</label>
                        <input type="text" class="mobile__contact-input">
                    </div>
                    <div class="input__container">
                        <label for="" class="mobile__label input__label">Phone number</label>
                        <input type="text" class="mobile__contact-input mobile__contact-input-none">
                    </div>
                    <p class="mobile__branching">Or</p>
                    <div class="input__container">
                        <label for="" class="mobile__label input__label">Email address</label>
                        <input type="text" class="mobile__contact-input">
                    </div>
                    <div class="mobile__check-container">
                        <div class="form-check mobile__check">
                            <input class="form-check-input mobile__contact-check" type="checkbox" value="" id="flexCheckDefault">
                            <label class="form-check-label" for="exampleCheck1">
                                <span>please, text me on </span>
                                <i class="fa-brands fa-whatsapp whatsapp"></i>
                                <i class="fa-solid check-arrow fa-angle-down"></i>
                            </label>
                        </div>
                        <div class="form-check mobile__check">
                            <input class="form-check-input mobile__contact-check" type="checkbox" value="" id="flexCheckChecked" checked>
                            <label class="form-check-label" for="flexCheckChecked">I agree to Terms of use and Privacy Policy</label>
                        </div>
                    </div>
                    <div class="input__container">
                        <label for="" class="mobile__label input__label">Youre question</label>
                        <textarea class="mobile__contact-input"></textarea>
                    </div>
                    <button type="button" class="btn btn-dark mobile__contact-button">Send request</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/mobile/form-mobile.scss';
</style>

<script>

export default {
    methods: {
        exiteForm () {
            this.$emit('exitForm')
        }
    }
}

</script>


