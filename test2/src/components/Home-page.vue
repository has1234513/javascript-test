<template>

    <div class="page">
        <Navigation/>
        <div class="accodions">
             <h2 class >Accordion</h2>

            <button class="accordion">Section 1</button>
            <div class="panel">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
        </div>
       

    </div>
  
</template>

<script>
import { defineAsyncComponent } from 'vue';
import axios from 'axios'
export default {
    name: 'home-page',

    components: {
        Navigation: defineAsyncComponent(() =>
            import(
                /*webpackChunkName: "Navigation"*/ './Navigation.vue'
            ),
        ),
    },

    data() {
        return {
            categories: []
        }
    },

    mounted () {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function() {
                this.classList.toggle("active");
                var panel = this.nextElementSibling;
                if (panel.style.display === "block") {
                panel.style.display = "none";
                } else {
                panel.style.display = "block";
                }
            });
        }

        this.fetchCategories()
    },

    methods: {
        fetchCategories() {
            const config = {
                method: 'get',
                url: 'http://dev3.elemental.co.za/elemental-cms/front_end/get_knowledge',
            };

            axios(config)
            .then( (response) => {
                console.log(response.data);

                this.categories = response.data.results
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }
}
</script>

<style scoped>

   .accodions:first-child {
    margin: 10% 0 0 0;
   }

    .accordion {
        background-color: #eee;
        color: #444;
        cursor: pointer;
        padding: 18px;
        width: 100%;
        border: none;
        text-align: left;
        outline: none;
        font-size: 15px;
        transition: 0.4s;
    }

    .active, .accordion:hover {
        background-color: #ccc; 
    }

    .panel {
        padding: 0 18px;
        display: none;
        background-color: white;
        overflow: hidden;
        background-color: rgb(133, 155, 148);
    }

</style>