<template>
    <div v-show="detailPlayerFlag">
      <div class="detail-player" :style="{backgroundImage:`url(${audio.imgUrl})`}"></div>
      <div class="detail-player" :style="{backgroundImage:`url(${audio.imgUrl})`,filter: 'blur(5px)', '-webkit-filter':'blur(5px)'}"></div>
      <div class="detail-player-content">
        <div class="detail-player-title">
          <i class="iconfont icon-back icon-fanhui" @click="hideDetailPlayer()"></i>
          <span>{{audio.title}}</span>
        </div>
        <div class="detail-player-img">
          <img :src="audio.imgUrl" alt="">
        </div>
        <div class="detail-player-lrc">
          <div class="lrc-content" :style="{marginTop: lrcOffset + 'px' }">
            <p v-for="(item,index) in songLrc" :class="{isCurrentLrc:item.seconds >= audio.currentLength}">{{item.lrcContent}}</p>
          </div>
        </div>
        <div class="detail_player-range container">
          <span class="detail_player-time">{{audio.currentLength | time}}</span>
          <mt-range
            id="range"
            :min="0"
            :max="audio.songLength"
            v-model="audio.currentLength"
            :bar-height="3" disabled
          style="width: 74%" @click.native="rangeChange($event)"></mt-range>
          <span class="detail_player-time fr">{{audio.songLength | time}}</span>
        </div>
        <div class="detail_player-control player-padding">
          <i class="detail_player-btn play-prev player_btn-sm" @click="prev()"></i>
          <i class="detail_player-btn play-play player_btn-lg" :class="{'play-pause':isPlay}" @click="ply()"></i>
          <i class="detail_player-btn play-next player_btn-sm" @click="next()"></i>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex';
    export default {
        data() {
            return {
              rangeValue: 0
            }
        },
      filters:{
        time(value){
          var length = Math.floor(parseInt(value));
          var minute = Math.floor(value / 60);
          if (minute < 10) {
            minute = '0' + minute;
          }
          var second = length % 60;
          if (second < 10) {
            second = '0' + second;
          }
          return minute + ':' + second;
        }
      },
      computed:{
        ...mapGetters(['audio','detailPlayerFlag','isPlay']),
        songLrc(){
          if(this.audio.lrc){
            var temp = this.audio.lrc.split('\r\n')
            temp = temp.splice(0, temp.length - 1)
            temp = temp.map((value)=>{
              var time = value.substr(1, 5)
              var seconds = parseInt(time.split(':')[0]) * 60 + parseInt(time.split(':')[1])
              var lrcContent = value.substr(10)
              return {
                seconds,
                lrcContent
              }
            })
          }
          return temp
        },
        lrcOffset(){
          if (this.songLrc) {
            var offset = (this.songLrc.length - document.querySelectorAll('.isCurrentLrc').length - 2) * (-20)
            return this.audio.currentLength + offset - this.audio.currentLength
          }
        }
      },
      methods:{
        hideDetailPlayer(){
          this.$store.commit('showDetailPlayer',false)
        },
        rangeChange(event){
          let offset = event.offsetX
          let rangeWidth = (document.documentElement.clientWidth - 20) * 0.8 -20
          let clickLength = Math.floor(offset * this.audio.songLength / rangeWidth)
          if(offset < rangeWidth){
            this.$store.commit('setAudioTime',clickLength)
            this.$store.commit('setCurrent',true)
          }
        },
        ply(){
          if (this.isPlay) {
            document.getElementById('audioPlay').pause()
          } else {
            document.getElementById('audioPlay').play()
          }
          this.$store.commit('isPlay', !this.isPlay)
        },
        prev(){
          this.$store.dispatch('prev')
        },
        next(){
          this.$store.dispatch('next')
        }
      }
    }
</script>

<style>
  .detail-player{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1111;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .detail-player-content{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1112;
    background: rgba(0,0,0,0.5);
  }
  .detail-player-title{
    display: flex;
    height: 50px;
    padding: 10px;
  }
  .detail-player-title span{
    flex: 1;
    color: #fff;
    text-align: center;
    margin-left: -15px;
    line-height: 30px;
    font-size: 16px;
  }
  .icon-back{
    font-size: 26px;
    color: #fff;
  }
  .detail-player-img{
    width: 40%;
    margin:20px auto;
  }
  .detail-player-img img{
    border-radius: 50%;
    border: solid 4px #666;
  }
  .detail-player-lrc{
    width: 100%;
    height: 100px;
    overflow: hidden;
    margin-bottom: 20px;
    text-align: center;
    color: #fff;
    line-height: 20px;
  }
  .lrc-content{
    transition: all .5s;
    transform: translateZ(0)
  }
  .detail_player-time{
    display: block;
    width: 12%;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-size: 12px;
    text-align: center;
    float: left;
  }
  .container{
    padding:0 10px;
    width: 100%;
    overflow: hidden;
  }
  .mt-range-thumb{
    width: 16px;
    height: 16px;
    top: 7px;
  }
  .fr{
    float: right;
    margin-top: -30px;
  }
  .player-padding{padding: 0 20%}
  .detail_player-control{margin-top: 10px;}
  .detail_player-btn{display: block;width: 33.3%;float: left;height: 100px;}
  .play-prev{background: url("../assets/images/play_prev.png") no-repeat;background-size: 60% auto;background-position: center}
  .play-play{background: url("../assets/images/play_play.png") no-repeat;background-size: 80% auto;background-position: center}
  .play-pause{background: url("../assets/images/play_pause.png") no-repeat;background-size: 80% auto;background-position: center}
  .play-next{background: url("../assets/images/play_next.png") no-repeat;background-size: 60% auto;background-position: center}
</style>
