<template>
  <v-card class="card">
    <v-card-title>
      Nutrition
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      class="elevation-1"
      @page-count="pageCount = $event"
    >
      <template v-slot:[`item.action`]="{ item }">
        <v-btn @click.prevent="deleteItem(item)" v-model="item.id"
          >Update</v-btn
        >
        <v-btn @click.prevent="deleteItem(item)" v-model="item.id"
          >Delete</v-btn
        >
      </template>
    </v-data-table>

    <div class="text-center pt-2 input-item">
      <v-pagination v-model="page" :length="pageCount"></v-pagination>
      <v-text-field
        :value="itemsPerPage"
        label="Items per page"
        type="number"
        min="-1"
        max="15"
        @input="itemsPerPage = parseInt($event, 10)"
      ></v-text-field>
    </div>
  </v-card>
</template>

<script>
import Axios from "axios";
import { BASEURL } from "../utils/Constant";
export default {
  data() {
    return {
      page: 1,
      pageCount: 0,
      itemsPerPage: 4,
      search: "",
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name"
        },
        { text: "Calories", value: "calories" },
        { text: "Fat (g)", value: "fat" },
        { text: "Carbs (g)", value: "carbs" },
        { text: "Protein (g)", value: "protein" },
        { text: "Iron (%)", value: "iron" },
        { text: "Actions", value: "action", sortable: false }
      ],
      desserts: []
    };
  },
  created() {
    Axios.get(`${BASEURL}/desserts`).then(response => {
      this.desserts = response.data;
    });
  },
  methods: {
    deleteItem(item) {
      Axios.delete(`${BASEURL}/desserts/${item.id}`)
        .then(response => {
          this.desserts.splice(this.desserts.indexOf(item), 1);
          console.log(response.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.input-item {
  width: 50%;
  margin-left: 1rem;
}

.card {
  margin-right: 10rem;
  margin-left: 10rem;
}
</style>
