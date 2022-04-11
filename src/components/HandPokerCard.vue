<template>
  <div id="hand">
    <div v-if="player.last_play != null && !player.playing">
      <PokerCardGroup v-if="player.last_play.cards != null" :cards="player.last_play.cards" />
      <div v-if="player.last_play.action == 'PASS'">PASS</div>
    </div>

    <div class="options" v-if="player.playing && gameStatus == 2">
      <button v-on:click="play">出牌</button>
      <button v-if="player.passable" v-on:click="pass">过牌</button>
    </div>

    {{player.name}}
    <div class="show-cards-transformed" style="margin-left: 5px" v-if="player.showCards != null">
      <PokerCardGroup :cards="player.showCards" />
    </div>

    <div class="options" v-if="player.playing && gameStatus == 1">
      <button v-on:click="show">{{showActionName}}</button>
      <button v-on:click="pass">过</button>
    </div>

    <div>
      <span v-for="(card, index) in player.cards" :key="card" :style="{left: index * 25 + 'px', zIndex: index, top: selectedCards.includes(card) ? 60 + 'px' : 80 + 'px'}" v-on:click="clickCard(card)">
        <PokerCard :value="card" />
      </span>
    </div>

  </div>
</template>

<script>
import PokerCard from './PokerCard.vue'
import axios from 'axios';
import PokerCardGroup from './PokerCardGroup.vue'

export default {
  name: 'HandPokerCard',
  props: {
    player: Object,
    gameStatus: Number,
  },
  computed: {
    showActionName: function() {
      if (this.player.cards.includes('0h') || this.player.cards.includes('0d')) {
        return '亮'
      } else {
        return '揪'
      }
    },
    cleanSelectedCards: function() {
      return this.selectedCards.filter(c => this.player.cards.includes(c))
    }
  },
  components: {
    PokerCard,
    PokerCardGroup
  },
  methods: {
    show: function() {
      axios
        .post('http://poker.xsalo.com/card_tables/13/show-events', {
          player: this.player.name,
          cards: this.cleanSelectedCards,
        })
        .then(response => {
          console.log(response)
          this.selectedCards = []
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    },
    play: function() {
      axios
        .post('http://poker.xsalo.com/card_tables/13/play-events', {
          player: this.player.name,
          cards: this.cleanSelectedCards,
        })
        .then(response => {
          console.log(response)
          this.selectedCards = []
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    },
    pass: function() {
      axios
        .post('http://poker.xsalo.com/card_tables/13/pass-events', {
          player: this.player.name,
        })
        .then(response => {
          console.log(response)
          this.selectedCards = []
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
        });
    },
    clickCard: function(card) {
      if (this.selectedCards.includes(card)) {
        var index = this.selectedCards.indexOf(card);
        if (index > -1) {
          this.selectedCards.splice(index, 1);
        }
      } else {
        this.selectedCards.push(card)
      }
      this.$forceUpdate()
      console.log(this.selectedCards)
    }
  },
  data() {
    return {
      selectedCards: [],
    }
  }
}
</script>

<style scoped>
#hand {
  position: relative;
  width: 650px;
}

#hand span {
  position: absolute;
}

.options {
  height: 40px;
}

button {
  margin-right: 30px;
}


.show-cards-transformed {
  /* 等同于变换: scaleX(2) scaleY(2);*/
  transform: scale(0.3);
}
</style>
