<template>
  <div id="hand">
    <div class="pool">
      <div v-if="player.last_play != null && !player.playing">
        <div class="last-play-cards">
          <PokerCardGroup v-if="player.last_play.cards != null" :cards="player.last_play.cards" />
        </div>
        <div v-if="player.last_play.action == 'PASS'">PASS</div>
      </div>
    </div>

    <div class="options">
      <div v-if="player.playing && gameStatus == 2">
        <button v-on:click="play">出牌</button>
        <button v-if="player.passable" v-on:click="pass">过牌</button>
      </div>

      <div v-if="player.playing && gameStatus == 1">
        <button v-on:click="show">{{showActionName}}</button>
        <button v-on:click="pass">过</button>
      </div>
    </div>

    <div v-if="rankingToDes(player.ranking) != null">{{rankingToDes(player.ranking)}}</div>

    <div class="row">
      <div class="column column-center side-space">
        <div style="text-align:left">{{player.name}}</div>

        <div class="show-card-container margin-top-10">
          <div class="show-cards-transformed" v-if="player.showCards != null">
            <PokerCardGroup :cards="player.showCards" />
          </div>
        </div>
      </div>

      <div class="cards" style="flex-grow: 1;">
        <span v-for="(card, index) in player.cards" :key="card" :style="{left: index * 25 + 'px', zIndex: index, top: selectedCards.includes(card) ? 0 + 'px' : 20 + 'px'}" v-on:click="clickCard(card)">
          <PokerCard :value="card" />
        </span>
      </div>
      <div class="side-space"></div>
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
    rankingToDes(ranking) {
      if (ranking === 0) {
        return '第一名'
      } else if (ranking === 1) {
        return '第二名'
      } else if (ranking === 2) {
        return '第三名'
      } else {
        return null
      }
    },
    show: function() {
      axios
        .post(this.GLOBAL.domain + '/card_tables/13/show-events', {
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
        .post(this.GLOBAL.domain + '/card_tables/13/play-events', {
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
        .post(this.GLOBAL.domain + '/card_tables/13/pass-events', {
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
}

.row {
  display: flex;
  flex-direction:row;
}

.cards span {
  position: absolute;
}

.options {
  height: 40px;
}

button {
  margin-right: 30px;
}

.last-play-cards {
  height: 100px;
  transform: scale(0.7);
}

.show-cards-transformed {
  /* 等同于变换: scaleX(2) scaleY(2);*/
  transform: scale(0.4);
}

.pool {
  height: 110px;
}

.cards {
  position: relative;
  height: 170px;
  width: 325px;
}

.side-space {
  width: 80px;
}
</style>
