<template>
  <div class="home" v-if="tableData">
    <h2>You Are Logged And Autorized For this File: <a :href="tableData.spreadsheetUrl"> {{tableData.properties.title}}</a></h2>
    <div>
      <p>
        with {{tableData.sheets.length}} sheets
        <ul :if="tableData.sheets.length">
          <li v-for="sheet of tableData.sheets" :key="sheet.properties.sheetId">
            <a href="#" @click="queryRange([`${sheet.properties.title}!1:1`])">{{sheet.properties.title}}</a>
          </li>
        </ul>
      </p>
    </div>
    <Table v-if="rangeData"></Table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Table from '@/components/Table';

export default {
  name: 'Home',
  components: {
    Table
  },
  methods: {
    ...mapActions('authorization', [
      'queryRange',
      'querySheet'
    ]),
  },
  computed: {
    ...mapGetters('authorization', [
      'tableData',
      'rangeData'
    ]),
  },
  mounted() {
    this.querySheet();
  }
};
</script>
