<template>
  <div id="app">
    <div style="display: flex; justify-content: center;" v-if="croPlayer != null">
      <div>
        <div style="display:flex;flex-direction:row;">
          <div style="flex-grow: 1;">
          </div>
          <div style="flex-grow: 1;">
            <div>
              {{croPlayer.name}}{{ (croPlayer.playing ? ' 出牌中...' : '') }}
            </div>
            <div>
              {{(croPlayer.single ? '就剩一张了 ' : '')}}
            </div>
          </div>
          <div class="show-cards-transformed" style="margin-left: 5px" v-if="croPlayer.showCards != null">
            <PokerCardGroup :cards="croPlayer.showCards" />
          </div>
        </div>
        <div style="margin-left: 5px;flex-grow: 1" v-if="croPlayer.last_play != null && !croPlayer.playing">
          <div class="last-play-cards">
            <PokerCardGroup v-if="croPlayer.last_play.cards != null" :cards="croPlayer.last_play.cards" />
          </div>
          <div v-if="croPlayer.last_play.action == 'PASS'">PASS</div>
        </div>
      </div>

    </div>
    <div class="mid-flex-box">
      <div class="side-player" v-if="prePlayer != null">
        <div style="width:100px">
          <div>
            {{prePlayer.name}}{{ (prePlayer.playing ? ' 出牌中...' : '') }}
          </div>
          <div>
            {{(prePlayer.single ? '就剩一张了 ' : '')}}
          </div>
          <div class="show-cards-transformed" style="margin-left: 5px" v-if="prePlayer.showCards != null">
            <PokerCardGroup :cards="prePlayer.showCards" />
          </div>
        </div>
        <div v-if="prePlayer.last_play != null && !prePlayer.playing">
          <div class="last-play-cards">
            <PokerCardGroup v-if="prePlayer.last_play.cards != null" :cards="prePlayer.last_play.cards" />
          </div>
          <div v-if="prePlayer.last_play.action == 'PASS'">PASS</div>
        </div>
      </div>
      <div class="pool">
        <PockerPool :finished="game == null ? true : game.status == 99" />
      </div>
      <div class="side-player" v-if="nxtPlayer != null">
        <div v-if="nxtPlayer.last_play != null && !nxtPlayer.playing">
          <div class="last-play-cards">
            <PokerCardGroup v-if="nxtPlayer.last_play.cards != null" :cards="nxtPlayer.last_play.cards" />
          </div>
          <div v-if="nxtPlayer.last_play.action == 'PASS'">PASS</div>
        </div>
        <div>
          <div>
            {{nxtPlayer.name}}{{ (nxtPlayer.playing ? ' 出牌中...' : '') }}
          </div>
          <div>
            {{(nxtPlayer.single ? '就剩一张了 ' : '')}}
          </div>
          <div class="show-cards-transformed" style="margin-left: 5px" v-if="nxtPlayer.showCards != null">
            <PokerCardGroup :cards="nxtPlayer.showCards" />
          </div>
        </div>
      </div>
    </div>
    <div v-if="mePlayer != null" style="display:flex; justify-content: center;">
      <HandPokerCard :gameStatus="game == null ? 0 : game.status" :player="mePlayer" />
    </div>
  </div>
</template>

<script>
import PokerCardGroup from './components/PokerCardGroup.vue'
import HandPokerCard from './components/HandPokerCard.vue'
import PockerPool from './components/PokerPool.vue'
import axios from 'axios';

export default {
  name: 'App',
  components: {
    HandPokerCard,
    PockerPool,
    PokerCardGroup
  },
  mounted () {
    this.timer = setInterval(this.refresh, 1000);
  },
  methods: {
    refresh() {
      axios
        .get(this.GLOBAL.domain + '/card_tables/13?player=' + this.myName)
        .then(response => this.game = response.data)
    }
  },
  data() {
    return {
      game: null,
      name: null,
    }
  },
  computed: {
    myName: function() {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      return urlParams.get('name')
    },
    mePlayer: function() {
      if (this.game == null) {
        return null
      }
      return this.game.players[this.game.player]
    },
    prePlayer: function() {
      if (this.game == null) {
        return null
      }
      if (this.game.player == 'a') {
        return this.game.players.d
      } else if (this.game.player == 'b') {
        return this.game.players.a
      } else if (this.game.player == 'c') {
        return this.game.players.b
      } else if (this.game.player == 'd') {
        return this.game.players.c
      } else {
        return null
      }
    },
    nxtPlayer: function() {
      if (this.game == null) {
        return null
      }
      if (this.game.player == 'a') {
        return this.game.players.b
      } else if (this.game.player == 'b') {
        return this.game.players.c
      } else if (this.game.player == 'c') {
        return this.game.players.d
      } else if (this.game.player == 'd') {
        return this.game.players.a
      } else {
        return null
      }
    },
    croPlayer: function() {
      if (this.game == null) {
        return null
      }
      if (this.game.player == 'a') {
        return this.game.players.c
      } else if (this.game.player == 'b') {
        return this.game.players.d
      } else if (this.game.player == 'c') {
        return this.game.players.a
      } else if (this.game.player == 'd') {
        return this.game.players.b
      } else {
        return null
      }
    }
  }
}
</script>

<style>

.show-cards-transformed {
  transform: scale(0.2);
}

.side-player {
  display: flex;
  width: 150px;
}

.last-play-cards {
  transform: scale(0.5);
}

.mid-flex-box {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.pool {
  flex-grow: 1;
  height: 150px;
}

.self-view {
  width: 250px;
}

#app {
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
