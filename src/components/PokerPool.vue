<template>
  <div>
    <div class="result" v-if="finished">
      <button v-on:click="replay">洗牌</button>
    </div>
    <div v-else>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'PokerPool',
  components: {
  },
  methods: {
    replay: function() {
      axios
        .post('http://poker.xsalo.com/card_tables/13/replay-events')
        .then(response => {
          console.log(response)
          this.selectedCards = []
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    }
  },
  props: {
    finished: Boolean,
    cards: Array
  },
}
</script>

<style scoped>
.result {
  padding: 30px;
}
</style>
