<template>
  <div class="pool-content">
    <div class="box">
      <!-- cro player -->
      <div class="cro-cards" v-if="croPlayer != null" :style="{zIndex: croPlayer.last_play != null ? croPlayer.last_play.index : 0}">
        <div class="margin-top-10 text" v-if="rankingToDes(croPlayer.ranking) != null">{{rankingToDes(croPlayer.ranking)}}</div>
        <div class="margin-top-10 text" v-if="croPlayer != null && croPlayer.playing">思考中...</div>
        <div v-if="croPlayer.last_play != null && !croPlayer.playing">
          <div class="last-play-cards" v-if="croPlayer.last_play.cards != null">
            <div class="last-play-cards-transform">
              <PokerCardGroup v-if="croPlayer.last_play.cards != null" :cards="croPlayer.last_play.cards" />
            </div>
          </div>
          <div class="margin-top-10 text" v-if="croPlayer.last_play.action == 'PASS'">PASS</div>
        </div>
      </div>

      <!-- pre player -->
      <div class="pre-cards" v-if="prePlayer != null" :style="{zIndex: prePlayer.last_play != null ? prePlayer.last_play.index : 0}">
        <div class="row row-vertical-center">
          <div class="margin-left-10 text" v-if="prePlayer != null && prePlayer.playing">思考中...</div>
          <div class="margin-left-10 text" v-if="rankingToDes(prePlayer.ranking) != null">{{rankingToDes(prePlayer.ranking)}}</div>
          <div v-if="prePlayer.last_play != null && !prePlayer.playing">
            <div class="last-play-cards" v-if="prePlayer.last_play.cards != null">
              <div class="last-play-cards-transform">
                <PokerCardGroup v-if="prePlayer.last_play.cards != null" :cards="prePlayer.last_play.cards" />
              </div>
            </div>
            <div class="margin-left-50 text" v-if="prePlayer.last_play.action == 'PASS'">PASS</div>
          </div>
        </div>
      </div>

      <!-- nxt player -->
      <div class="nxt-cards" v-if="nxtPlayer != null" :style="{zIndex: nxtPlayer.last_play != null ? nxtPlayer.last_play.index : 0}">
        <div class="row row-vertical-center">
          <div v-if="nxtPlayer.last_play != null && !nxtPlayer.playing">
            <div class="last-play-cards" v-if="nxtPlayer.last_play.cards != null">
              <div class="last-play-cards-transform">
                <PokerCardGroup v-if="nxtPlayer.last_play.cards != null" :cards="nxtPlayer.last_play.cards" />
              </div>
            </div>
            <div class="margin-right-10 text" v-if="nxtPlayer.last_play.action == 'PASS'">PASS</div>
          </div>
          <div class="margin-right-10 text" v-if="nxtPlayer != null && nxtPlayer.playing">思考中...</div>
          <div class="white" v-if="rankingToDes(nxtPlayer.ranking) != null">{{rankingToDes(nxtPlayer.ranking)}}</div>
        </div>
      </div>

      <!-- me player -->
      <div class="me-cards" v-if="mePlayer != null" :style="{zIndex: mePlayer.last_play != null ? mePlayer.last_play.index : 0}">
        <div v-if="mePlayer.last_play != null && !mePlayer.playing">
          <div class="last-play-cards">
            <div class="last-play-cards-transform">
              <PokerCardGroup v-if="mePlayer.last_play.cards != null" :cards="mePlayer.last_play.cards" />
            </div>
          </div>
          <div class="text" v-if="mePlayer.last_play.action == 'PASS'">PASS</div>
        </div>
        <div class="text" v-if="rankingToDes(mePlayer.ranking) != null">{{rankingToDes(mePlayer.ranking)}}</div>
      </div>
    </div>

    <div class="result" v-if="finished">
      <div>
        <span>玩家</span>
        <span>得分</span>
        <span>桌面分</span>
      </div>
      <div v-if="mePlayer != null">
        <span>{{mePlayer.name}}</span>
        <span>{{mePlayer.score}}</span>
        <span>{{mePlayer.table_score}}</span>
      </div>
      <div v-if="prePlayer != null">
        <span>{{prePlayer.name}}</span>
        <span>{{prePlayer.score}}</span>
        <span>{{prePlayer.table_score}}</span>
      </div>
      <div v-if="croPlayer != null">
        <span>{{croPlayer.name}}</span>
        <span>{{croPlayer.score}}</span>
        <span>{{croPlayer.table_score}}</span>
      </div>
      <div v-if="nxtPlayer != null">
        <span>{{nxtPlayer.name}}</span>
        <span>{{nxtPlayer.score}}</span>
        <span>{{nxtPlayer.table_score}}</span>
      </div>
      <button v-on:click="replay">洗牌</button>
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
    },
    rankingToDes: function(ranking) {
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
  },
  props: {
    croPlayer: Object,
    prePlayer: Object,
    nxtPlayer: Object,
    mePlayer: Object,
    finished: Boolean,
    cards: Array
  },
  computed: {
  }
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 9999999;
  background-color: rgba(0,0,0,0.5);
  color: white;
}

.result div {
  height: 25px;
}

.result div span {
  text-align: left;
  width: 70px;
  display: inline-block;
}

.result button {
  width: 50px;
  height: 50px;
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
