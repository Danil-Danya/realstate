<template>
    <div class="apartament__contact">
        <div class="apartament__contact-container">
            <h2 class="apartament__title-provocator">Ready for your new home?</h2>
            <h2 class="apartament__title-contact">Send us an Inquiry</h2>
            <form action="#" class="apartament__form">
                <div class="input__container">
                    <label for="" class="apartament__label input__label">Yore name</label>
                    <input type="text" class="apartament__contact-input">
                </div>
                <div class="input__container">
                    <label for="" class="apartament__label input__label">Phone number</label>
                    <input type="text" class="apartament__contact-input-branching">
                </div>
                <p class="apartament__branching">Or</p>
                <div class="input__container">
                    <label for="" class="apartament__label input__label">Email address</label>
                    <input type="text" class="apartament__contact-input">
                </div>
                <div class="input__container">
                    <label for="" class="apartament__label input__label">Youre question</label>
                    <textarea class="apartament__contact-input"></textarea>
                </div>
                <div class="form-check apartament__contact-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="exampleCheck1">
                        <span>please, text me on </span>
                        <i class="fa-brands fa-whatsapp whatsapp"></i>
                        <i class="fa-solid check-arrow fa-angle-down"></i>
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                    <label class="form-check-label" for="flexCheckChecked">I agree to Terms of use and Privacy Policy</label>
                </div>
                <button type="button" class="btn btn-dark apartament__contact-button">Contact me</button>
            </form>
        </div>
    </div>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/apartament/contact.scss';
</style>