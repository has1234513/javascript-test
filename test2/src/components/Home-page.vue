<template>

    <div class="page">
        <Navigation/>

        <h2 class="accodions" >Accordion</h2>

        <div class="list">
            <div class="" v-for="cat in categoriesOrdered" :key="cat.id">
             

            <button :style="{
                border: openAccs.includes(cat.id) ? '1px solid green' : ''
            }" class="accordion" @click="openAcc(cat)">{{cat.cat}}</button>
            <div v-if="openAccs.includes(cat.id)" class="panel">
                <h4>{{cat.title}}</h4>
                <div v-html="cat.description"> </div>
                <button class="like-button">{{cat.like}} like{{parseInt(cat.likes) !== 1 ? 's' : '' }}</button>
            </div>
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
            categories: null,
            openAccs: []
        }
    },

    computed: {
        categoriesOrdered () {
            // eslint-disable-next-line
            const order = this.categories?.sort((a,b) => {
                return a.cat.localeCompare(b.cat)
            }) 
            return order
        }
    },

    mounted () {
  
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
        },

        openAcc(cat) {
            if (this.openAccs.includes(cat.id)) {
                this.openAccs = this.openAccs.filter(c => c !== cat.id)
            } else {
                this.openAccs.push(cat.id)
            }
        }
    }
}
</script>

<style scoped>

   .accodions {
        margin: 10% 0 0 0;
   }

   .list {
    overflow-y: auto;
    height: 70vh;
    width: 70vw;
    margin: auto 
   }
   
   .like-button{
        margin: 2% 0
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
        display: flex;
        flex-direction: column;
        background-color: rgb(133, 155, 148);
    }

</style>