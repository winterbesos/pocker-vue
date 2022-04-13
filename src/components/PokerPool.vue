<template>
  <div class="pool-content">
    <div class="result" v-if="finished">
      <button v-on:click="replay">洗牌</button>
    </div>
    <div class="box" v-else>
      <!-- cro player -->
      <div class="cro-cards" v-if="croPlayer.last_play != null && !croPlayer.playing" :style="{zIndex: croPlayer.last_play.index}">
        <div class="last-play-cards" v-if="croPlayer.last_play.cards != null">
          <div class="last-play-cards-transform">
            <PokerCardGroup v-if="croPlayer.last_play.cards != null" :cards="croPlayer.last_play.cards" />
          </div>
        </div>
        <div class="margin-top-50 text" v-if="croPlayer.last_play.action == 'PASS'">PASS</div>
      </div>
      <div class="margin-top-50 text" v-if="croPlayer.playing">思考中...</div>

      <!-- pre player -->
      <div class="pre-cards">
        <div v-if="prePlayer.last_play != null && !prePlayer.playing" :style="{zIndex: prePlayer.last_play.index}">
          <div class="last-play-cards" v-if="prePlayer.last_play.cards != null">
            <div class="last-play-cards-transform">
              <PokerCardGroup v-if="prePlayer.last_play.cards != null" :cards="prePlayer.last_play.cards" />
            </div>
          </div>
          <div class="margin-left-50 text" v-if="prePlayer.last_play.action == 'PASS'">PASS</div>
        </div>
        <div class="margin-left-10 text" v-if="prePlayer.playing">思考中...</div>
      </div>

      <!-- nxt player -->
      <div class="nxt-cards">
        <div v-if="nxtPlayer.last_play != null && !nxtPlayer.playing" :style="{zIndex: nxtPlayer.last_play.index}">
          <div class="last-play-cards" v-if="nxtPlayer.last_play.cards != null">
            <div class="last-play-cards-transform">
              <PokerCardGroup v-if="nxtPlayer.last_play.cards != null" :cards="nxtPlayer.last_play.cards" />
            </div>
          </div>

          <div class="margin-right-10 text" v-if="nxtPlayer.last_play.action == 'PASS'">PASS</div>
        </div>
        <div class="margin-right-10 text" v-if="nxtPlayer.playing">思考中...</div>
      </div>

      <!-- me player -->
      <div class="me-cards" v-if="mePlayer.last_play != null && !mePlayer.playing" :style="{zIndex: mePlayer.last_play.index}">
        <div class="last-play-cards">
          <div class="last-play-cards-transform">
            <PokerCardGroup v-if="mePlayer.last_play.cards != null" :cards="mePlayer.last_play.cards" />
          </div>
        </div>
        <div class="text" v-if="mePlayer.last_play.action == 'PASS'">PASS</div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import PokerCardGroup from './PokerCardGroup.vue'

export default {
  name: 'PokerPool',
  components: {
    PokerCardGroup,
  },
  methods: {
    replay: function() {
      axios
        .post(this.GLOBAL.domain + '/card_tables/13/replay-events')
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
    croPlayer: Object,
    prePlayer: Object,
    nxtPlayer: Object,
    mePlayer: Object,
    finished: Boolean,
    cards: Array
  },
}
</script>

<style scoped>
.cro-cards {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  height: 86px;
  margin: auto;
}

.pre-cards {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.nxt-cards {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}


.me-cards {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  height: 86;
}

.result {
  padding: 30px;
}

.box {
  position: relative;
  height: 100%;
  width: 100%;
}

.text {
  color: white;
}

.pool-content {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
