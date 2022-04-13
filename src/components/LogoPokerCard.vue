<template>
  <div class="card">
    <img class="card-shadow" :src="src" />
    <div class="count">{{cardCountDes}}</div>
  </div>
</template>

<script>
export default {
  name: 'LogoPokerCard',
  props: {
    single: Boolean,
  },
  computed: {
    src: function() {
      return require('../assets/poker/logo_card.png')
    },
    cardCountDes: function() {
      return this.single ? "1" : "?"
    }
  }
}
</script>

<style scoped>
.card-shadow {
  width: 40px;
  height: 57px;
}

.count {
  position: absolute;
  left: 14px;
  top: 18px;
  color: white;
  font-weight:bold;
  font-size: 20px;
}

.card {
  width: 40px;
  height: 57px;
  position: relative;
}

</style>
