<template>

    <div class="page">
        <Navigation/>
    </div>
  
</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {

    name: "contact-page",

    components: {
        Navigation: defineAsyncComponent(() =>
            import(
                /*webpackChunkName: "Navigation"*/ './Navigation.vue'
            ),
        ),
    }

}
</script>

<style scoped>

    

</style>