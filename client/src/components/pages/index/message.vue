<template>
    <section class="message">
        <div class="container">
            <div class="message__content">
                <div class="message__left">
                    <img src="@/assets/images/site/pages/index/message/message.png" alt="Message Image" class="message__img">
                </div>
                <div class="message__right">
                    <h2 class="message__title">Find dream house now</h2>
                    <p class="message__text">Lorem ipsum dolor sit amet consectetur.Lorem ipsum dolor sit amet consectetur. amet consectetur.</p>
                    <form>
                        <div class="mb-3 input__container message__input-long">
                            <label for="exampleInputEmail1" class="form-label input__label">Your name</label>
                            <input type="text" class="form-control message__input-long" id="exampleInputEmail1" placeholder="Anastasiya">
                        </div>
                        <div class="message__input-container">
                            <div class="mb-3 input__container message__input-mini">
                                <label for="exampleInputPassword1" class="form-label input__label">Phone number</label>
                                <input type="number" class="form-control message__input-mini" placeholder="+998-- --- -- --" id="exampleInputPassword1">
                            </div>
                            <h2 class="message__input-title">or</h2>
                            <div class="mb-3 input__container message__input-mini">
                                <label for="exampleInputPassword1" class="form-label input__label">Email address</label>
                                <input type="email" placeholder="example@mail.com" class="form-control message__input-mini" id="exampleInputPassword1">
                            </div>
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">
                                Please, text me on 
                                <i class="fa-brands fa-whatsapp whatsapp"></i>
                                <i class="fa-solid check-arrow fa-angle-down"></i>
                            </label>
                        </div>
                        <div class="mb-3 form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1">
                            <label class="form-check-label" for="exampleCheck1">I agree to Terms of use and Privacy Policy</label>
                        </div>
                        <div class="message__area-container">
                            <div class="input__container message__area">
                                <label for="exampleFormControlTextarea1" class="form-label input__label">Your question</label>
                                <textarea class="form-control message__area" placeholder="Message" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <button type="submit" class="btn message__button btn-dark">Contact me</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
    @import '@/assets/styles/pages/index/message.scss';
</style>