<template>
  <div class="group">
    <div class="content" :style="{width: fullWidth + 'px'}">
      <span v-for="(card, index) in cards" :key="card" :style="{left: index * 25 + 'px', zIndex: index}">
        <PokerCard :value="card" />
      </span>
    </div>
  </div>
</template>


<script>
import PokerCard from './PokerCard.vue'

export default {
  name: 'PokerCardGroup',
  components: {
    PokerCard
  },
  computed: {
    fullWidth: function() {
      return (this.cards.length - 1) * 25 + 100
    }
  },
  props: {
    cards: Array
  },
}
</script>

<style scoped>
.group {
  height: 80px;
  display: flex;
  justify-content: center;
}

.content {
  position: relative;
}

.group span {
  position: absolute;
}
</style>
