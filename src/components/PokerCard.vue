<template>
  <img class="card-shadow" :src="src" />
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
  height: 100%;
  border-radius: 8px 8px 0 0;
  box-shadow: 1px 2px 5px 1px black;
}

img {
  object-fit: cover;
  object-position: top;
}
</style>
