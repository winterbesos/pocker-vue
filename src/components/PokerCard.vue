<template>
  <div>
    <img class="card-shadow" :src="src" />
  </div>
</template>

<script>
export default {
  name: 'PokerCard',
  props: {
    value: String,
  },
  computed: {
    src: function() {
      return require('../assets/poker/' + this.value + '.png')
    }
  }
}
</script>

<style scoped>
.card-shadow {
  width: 100px;
  border-radius: 8px;
  box-shadow: 1px 2px 5px 1px grey;
}

</style>
