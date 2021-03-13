<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit" class="form">
      <validation-provider
        v-slot="{ errors }"
        name="name"
        rules="required|max:20"
      >
        <v-text-field
          v-model="post.name"
          :counter="20"
          :error-messages="errors"
          label="Dessert"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="calories"
        rules="required|max:20"
      >
        <v-text-field
          v-model="post.calories"
          :counter="20"
          :error-messages="errors"
          label="Calories"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="fat"
        rules="required|max:20"
      >
        <v-text-field
          v-model="post.fat"
          :counter="20"
          :error-messages="errors"
          label="Fat (g)"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="carbs"
        rules="required|max:20"
      >
        <v-text-field
          v-model="post.carbs"
          :counter="20"
          :error-messages="errors"
          label="Carbs (g)"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="protein"
        rules="required|max:20"
      >
        <v-text-field
          v-model="post.protein"
          :counter="20"
          :error-messages="errors"
          label="Protein (g)"
          required
        ></v-text-field>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        name="iron"
        rules="required|max:20"
      >
        <v-text-field
          v-model="post.iron"
          :counter="20"
          :error-messages="errors"
          label="Iron (%)"
          required
        ></v-text-field>
      </validation-provider>

      <v-btn class="mr-4" type="submit" :disabled="invalid">
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
  </validation-observer>
</template>

<script>
import { required, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode
} from "vee-validate";
import Axios from "axios";
import { BASEURL } from "../utils/Constant";

setInteractionMode("eager");

extend("required", {
  ...required,
  message: "{_field_} can not be empty"
});

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters"
});

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      post: {}
    };
  },
  created() {
    Axios.get(`${BASEURL}/desserts/${this.$route.params.id}`)
      .then(response => {
        this.post = response.data;
      })
      .catch(err => {
        alert(err);
      });
  },
  methods: {
    submit() {
      this.$refs.observer.validate();
      Axios.put(`${BASEURL}/desserts/${this.$route.params.id}`, this.post)
        .then(response => {
          this.$router.push({
            name: "Home"
          });
          console.log(response.data);
        })
        .catch(err => {
          alert(err);
        });
    },
    clear() {
      this.post = {};
      this.$refs.observer.reset();
    }
  }
};
</script>

<style scoped>
.form {
  margin-right: 25rem;
  margin-left: 25rem;
}
</style>
