<template>
    <contact-form mode="update" :contact="contact"></contact-form>
</template>

<script>
import ContactForm from './ContactForm.vue';
export default {
    components: { ContactForm },
    props: [ 'contact' ]
}
</script>