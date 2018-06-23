<template>
  <div class="table">
    <b-nav fill v-if="rangeData.values.length">
      <b-nav-item v-for="(title, index) of rangeData.values[0]" :key="index">
        {{title}} |
      </b-nav-item>
    </b-nav>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Table',
  computed: {
    ...mapGetters('authorization', [
      'rangeData'
    ]),
  }
};
</script>

