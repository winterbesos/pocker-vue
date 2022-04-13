<template>
  <div id="app" :style="{backgroundImage: 'url(' + tableBg + ')'}">
    <div style="display: flex; justify-content: center;" v-if="croPlayer != null">
      <div>
        <div class="row">
          <div style="flex-grow: 1;"></div>
          <div style="flex-grow: 1;">
            <div class="player-name" style="text-align:left">{{croPlayer.name}}</div>
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
      </div>
    </div>
    <div class="mid-flex-box">
      <div class="side-player" v-if="prePlayer != null">
        <div class="column">
          <div class="player-name" style="text-align:right">{{prePlayer.name}}</div>

          <div class="row">
            <div class="show-card-container" v-if="prePlayer.showCards != null && prePlayer.showCards.size != 0">
              <div class="show-cards-transformed">
                <PokerCardGroup :cards="prePlayer.showCards" />
              </div>
            </div>

            <div v-if="prePlayer.ranking == null">
              <LogoPokerCard :single="prePlayer.single" />
            </div>
          </div>

        </div>
      </div>

      <div class="pool">
        <PockerPool :croPlayer="croPlayer" :prePlayer="prePlayer" :nxtPlayer="nxtPlayer" :mePlayer="mePlayer" :finished="game == null ? true : game.status == 99" />
      </div>

      <div class="side-player" v-if="nxtPlayer != null">
        <div>
          <div class="player-name" style="text-align:left">{{nxtPlayer.name}}</div>

          <div class="row">
            <div v-if="nxtPlayer.ranking == null">
              <LogoPokerCard :single="nxtPlayer.single" />
            </div>

            <div class="row row-right">
              <div class="show-card-container margin-left-10" v-if="nxtPlayer.showCards != null && nxtPlayer.showCards.size != 0">
                <div class="show-cards-transformed" v-if="nxtPlayer.showCards != null">
                  <PokerCardGroup :cards="nxtPlayer.showCards" />
                </div>
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
  },
  data() {
    return {
      game: null,
      name: null,
    }
  },
  computed: {
    tableBg: function() {
      return require('./assets/table_bg.png')
    },
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

.player-name {
  color: white;
}
.margin-right-50 {
  margin-right: 50px;
}

.margin-left-50 {
  margin-left: 50px;
}

.margin-top-50 {
  margin-top: 50px;
}

.margin-top-10 {
  margin-top: 10px;
}

.margin-left-10 {
  margin-left: 10px;
}

.margin-right-10 {
  margin-right: 10px;
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
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.last-play-cards {
  height: 86px;
}

.last-play-cards-transform {
  transform-origin: top;
  transform: scale(0.6);
}

.mid-flex-box {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  flex-grow: 1;
}

.pool {
  flex-grow: 1;
}

body {
  margin: 0;
  background-color: #4A61A5;
}

.row {
  display: flex;
  flex-direction:row;
}

.row-right {
  justify-content: flex-end;
}

.row-vertical-center {
  align-items: center;
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

.white {
  color: white;
}

#app {
  overflow: hidden;
  overscroll-behavior-y: none;
  padding-left: 20px;
  padding-right: 20px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
