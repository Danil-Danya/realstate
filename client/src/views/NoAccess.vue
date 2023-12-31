<template>
    <div>
        <div class="error-text-container">
            <h2 class="error-title">At the moment you do not have enough rights. Obtain permissions and try again.</h2>
            <p class="error-text">You have landed on the closed page of our website, access to which is granted only to specific users. We appreciate your interest in our content and thank you for your attention.</p>
            <p class="error-text">On this page, we provide unique materials, exclusive offers, or other special resources that are available only to selected members of our community.</p>
            <p class="error-text">Thank you for your understanding and interest in our project.</p>
        </div>
        <offer/>
    </div>
</template>

<script>
import offer from '@/components/reused/offer.vue';

export default {
    components: {
        offer
    }
}
</script>