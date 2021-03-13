<template>
  <v-card class="d-inline-flex justify-center" flat tile>
    <DataTable />
  </v-card>
</template>

<script>
// @ is an alias to /src
import DataTable from "../components/DataTable";

export default {
  name: "Home",
  components: {
    DataTable
  }
};
</script>
