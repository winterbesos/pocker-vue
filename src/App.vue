<template>
  <div id="app">
    <div style="display: flex; justify-content: center;height:200px;" v-if="croPlayer != null">
      <div>
        <div class="row">
          <div style="flex-grow: 1;"></div>
          <div style="flex-grow: 1;">
            <div style="text-align:left">{{croPlayer.name}}</div>
            <div class="row">
              <div v-if="croPlayer.ranking == null">
                <LogoPokerCard :single="croPlayer.single" />
              </div>
              <div class="show-card-container margin-left-10" v-if="croPlayer.showCards != null && croPlayer.showCards.size != 0">
                <div class="show-cards-transformed" v-if="croPlayer.showCards != null">
                  <PokerCardGroup :cards="croPlayer.showCards" />
                </div>
              </div>
            </div>
          </div>
        </div>
          <div v-if="rankingToDes(croPlayer.ranking) != null">{{rankingToDes(croPlayer.ranking)}}</div>
          <div v-if="croPlayer.last_play != null && !croPlayer.playing">
            <div class="last-play-cards" v-if="croPlayer.last_play.cards != null">
              <PokerCardGroup v-if="croPlayer.last_play.cards != null" :cards="croPlayer.last_play.cards" />
            </div>
            <div class="margin-top-50" v-if="croPlayer.last_play.action == 'PASS'">PASS</div>
          </div>
          <div class="margin-top-50" v-if="croPlayer.playing">思考中...</div>
      </div>

    </div>
    <div class="mid-flex-box">
      <div class="side-player" v-if="prePlayer != null">
        <div class="column">
          <div style="text-align:left">{{prePlayer.name}}</div>
          <div class="row">
            <div v-if="prePlayer.ranking == null">
              <LogoPokerCard :single="prePlayer.single" />
            </div>
          </div>

          <div class="show-card-container margin-top-10" v-if="prePlayer.showCards != null && prePlayer.showCards.size != 0">
            <div class="show-cards-transformed">
              <PokerCardGroup :cards="prePlayer.showCards" />
            </div>
          </div>
        </div>
        <div v-if="rankingToDes(prePlayer.ranking) != null">{{rankingToDes(prePlayer.ranking)}}</div>
        <div class="column column-center">
          <div v-if="prePlayer.last_play != null && !prePlayer.playing">
            <div class="last-play-cards" v-if="prePlayer.last_play.cards != null">
              <PokerCardGroup v-if="prePlayer.last_play.cards != null" :cards="prePlayer.last_play.cards" />
            </div>
            <div class="margin-left-50" v-if="prePlayer.last_play.action == 'PASS'">PASS</div>
          </div>
          <div class="margin-left-50" v-if="prePlayer.playing">思考中...</div>
        </div>
      </div>

      <div class="pool">
        <PockerPool :finished="game == null ? true : game.status == 99" />
      </div>

      <div class="side-player" v-if="nxtPlayer != null">
        <div class="column column-center">
          <div v-if="nxtPlayer.last_play != null && !nxtPlayer.playing">
            <div class="last-play-cards" v-if="nxtPlayer.last_play.cards != null">
              <PokerCardGroup v-if="nxtPlayer.last_play.cards != null" :cards="nxtPlayer.last_play.cards" />
            </div>

            <div class="margin-right-50" v-if="nxtPlayer.last_play.action == 'PASS'">PASS</div>
          </div>
          <div class="margin-right-50" v-if="nxtPlayer.playing">思考中...</div>
        </div>

        <div v-if="rankingToDes(nxtPlayer.ranking) != null">{{rankingToDes(nxtPlayer.ranking)}}</div>
        <div>
          <div style="text-align:left">
            {{nxtPlayer.name}}
          </div>

          <div v-if="nxtPlayer.ranking == null">
            <LogoPokerCard :single="nxtPlayer.single" />
          </div>
          <div class="row row-right">
            <div class="show-card-container margin-top-10" v-if="nxtPlayer.showCards != null && nxtPlayer.showCards.size != 0">
              <div class="show-cards-transformed" v-if="nxtPlayer.showCards != null">
                <PokerCardGroup :cards="nxtPlayer.showCards" />
              </div>
            </div>
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
import LogoPokerCard from './components/LogoPokerCard.vue'
import HandPokerCard from './components/HandPokerCard.vue'
import PockerPool from './components/PokerPool.vue'
import axios from 'axios';

export default {
  name: 'App',
  components: {
    HandPokerCard,
    PockerPool,
    PokerCardGroup,
    LogoPokerCard
  },
  mounted () {
    this.timer = setInterval(this.refresh, 1000);
  },
  methods: {
    refresh() {
      axios
        .get(this.GLOBAL.domain + '/card_tables/13?player=' + this.myName)
        .then(response => this.game = response.data)
    },
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
    }
  },
  data() {
    return {
      game: null,
      name: null,
    }
  },
  computed: {
    logoCard: function() {
      return require('./assets/poker/logo_card.png')
    },
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
.margin-right-50 {
  margin-right: 50px;
}

.margin-left-50 {
  margin-left: 50px;
}

.margin-top-50 {
  margin-top: 50px;
}

.margin-left-10 {
  margin-left: 10px;
}

.margin-top-10 {
  margin-top: 10px;
}

.show-card-container {
  width: 80px;
  height: 57px;
}

.show-cards-transformed {
  transform-origin: left top;
  transform: scale(0.4);
}

.side-player {
  display: flex;
}

.last-play-cards {
  height: 100px;
  transform: scale(0.7);
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

body {
  background-color: lightgrey;
}

.row {
  display: flex;
  flex-direction:row;
}

.row-right {
  justify-content: flex-end;
}

.column {
  display: flex;
  flex-direction: column;
}

.column-center {
  justify-content: center;
}

.column-right {
  align-items: flex-end;
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
