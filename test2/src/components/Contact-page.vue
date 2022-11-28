<template>

    <div class="page">
        <Navigation/>
        <div class="container">  
            <div v-if="!completed" id="contact">
                <h3>elemental Contact Form</h3>
                <h4>Please fill the fields below</h4>
                <fieldset >
                    <input :style="{ border: nameError != null ? '1px solid red' : ''}" v-model="contact.name" placeholder="Name" type="text" tabindex="1" required autofocus>
                </fieldset>
                <p class="error-mgs"> {{nameError}} </p>
                <fieldset >
                    <input :style="{ border: emailError != null ? '1px solid red' : '' }" v-model="contact.email" placeholder="Valid Email Address" type="email" tabindex="2" required>
                </fieldset>
                <p class="error-mgs"> {{emailError}} </p>
                <fieldset >
                    <input :style="{ border: numError != null ? '1px solid red' : '' }" v-model="contact.number" placeholder="Valid SA Phone Number e.g(+27734567890)" type="tel" tabindex="3" required>
                </fieldset>
                <p class="error-mgs"> {{numError}} </p>
                <fieldset>
                    <button @click="send" name="submit" type="submit" id="contact-submit" data-submit="...Sending">Submit</button>
                </fieldset>

                <p class="error-mgs" v-if="emptyError" > {{emptyError}} </p>
            </div>

            <div v-else id="conact-success">
                <h1 class=""> 
                  Contacts sent successfully
                </h1>
            </div>
        </div>
    </div>
  
</template>

<script>
import { defineAsyncComponent } from 'vue';
export default {

    name: "contact-page",

    data() {
        return {
            contact : {
                name: '',
                email:'',
                number:''
            },
            nameError: null,
            emailError: null,
            numError: null,
            emptyError: null,
            completed: false
        }
    }, 

    components: {
        Navigation: defineAsyncComponent(() =>
            import(
                /*webpackChunkName: "Navigation"*/ './Navigation.vue'
            ),
        ),
    },

    methods: {

      validateEmail(email) {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },

      validateNumber(num) {
        const re = /^(\+27|0)[6-8][0-9]{8}$/
        return re.test(num)
      },

      runChecks(){
        let passed = true

        if (/^[a-zA-Z]+$/.test(this.contact.name) === false) {
          this.nameError = "Name needs to contain letters only"
          passed = false
        }

        if (!this.validateEmail(this.contact.email)) {
          this.emailError = "Please ensure proper email format"
          passed = false
        }

        if (!this.validateNumber(this.contact.number)) {
          this.numError = "Please ensure proper SA number format: (+27734567890)"
          passed = false
        }
        return passed
      }, 


      async runAPI (){
        const axios = require('axios');
        const data = JSON.stringify(this.contact);

        const config = {
            method: 'post',
            url: 'http://dev3.elemental.co.za/elemental-cms/front_end/contact_form_test',
            headers: { 
                'Content-Type': 'text/plain', 
            },  
            data : data
        };

        await axios(config)
        .then( (response) => {
            
            console.log(response.data);
        })
        .catch( (error) => {
            console.error(error);
        });
      },

      async send() {

        this.nameError = null,
        this.emailError = null,
        this.emptyError= null,
        this.numError = null

        if (this.contact.name === '' ||
                this.contact.email === '',
                this.contact.number === '') {
          this.emptyError = 'please complete all fileds'  
        } else if (this.runChecks()) {
            try {
              await this.runAPI()
              this.completed = true
              this.nameError = null;
              this.emailError = null;
              this.numError = null;
              this.emptyError= null;
            } catch (e) {
              console.error(e)
            }

          }
        
      }
    }

}
</script>

<style scoped>

  .error-mgs {
    font-size: 13px;
    color: red;
  }

    .container {
        max-width: 400px;
        width: 100%;
        margin: 0 auto;
        position: relative;
        display: flex;
    }

    #conact-success{
      margin: 30% auto;
    }

#contact input[type="text"],
#contact input[type="email"],
#contact input[type="tel"],
#contact input[type="url"],
#contact textarea,
#contact button[type="submit"] {
  font: 400 12px/16px "Roboto", Helvetica, Arial, sans-serif;
}

#contact {
  background: #F9F9F9;
  padding: 25px;
  margin: 150px 0;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

#contact h3 {
  display: block;
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 10px;
}

#contact h4 {
  margin: 5px 0 15px;
  display: block;
  font-size: 13px;
  font-weight: 400;
}

fieldset {
  border: medium none !important;
  margin: 0 0 10px;
  min-width: 100%;
  padding: 0;
  width: 100%;
}

#contact input[type="text"],
#contact input[type="email"],
#contact input[type="tel"],
#contact input[type="url"],
#contact textarea {
  width: 100%;
  border: 1px solid #ccc;
  background: #FFF;
  margin: 0 0 5px;
  padding: 10px;
}

#contact input[type="text"]:hover,
#contact input[type="email"]:hover,
#contact input[type="tel"]:hover,
#contact input[type="url"]:hover,
#contact textarea:hover {
  -webkit-transition: border-color 0.3s ease-in-out;
  -moz-transition: border-color 0.3s ease-in-out;
  transition: border-color 0.3s ease-in-out;
  border: 1px solid #aaa;
}

#contact textarea {
  height: 100px;
  max-width: 100%;
  resize: none;
}

#contact button[type="submit"] {
  cursor: pointer;
  width: 100%;
  border: none;
  background: #4CAF50;
  color: #FFF;
  margin: 0 0 5px;
  padding: 10px;
  font-size: 15px;
}

#contact button[type="submit"]:hover {
  background: #43A047;
  -webkit-transition: background 0.3s ease-in-out;
  -moz-transition: background 0.3s ease-in-out;
  transition: background-color 0.3s ease-in-out;
}

#contact button[type="submit"]:active {
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
}

.copyright {
  text-align: center;
}

#contact input:focus,
#contact textarea:focus {
  outline: 0;
  border: 1px solid #aaa;
}

::-webkit-input-placeholder {
  color: #888;
}

:-moz-placeholder {
  color: #888;
}

::-moz-placeholder {
  color: #888;
}

:-ms-input-placeholder {
  color: #888;
}

</style>