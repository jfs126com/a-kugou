<template>
    <div class="play-panel">
      <audio :src="audio.songUrl" autoplay id="audioPlay" @timeupdate="change()" @ended="next()" @error="next()"></audio>
      <div class="play-head-photo">
        <img :src="audio.imgUrl" alt="" @click="showDetailPlayer()">
      </div>
      <div class="play-status" @click="showDetailPlayer()">
        <p class="play-titile">{{audio.title}}</p>
        <p class="play-singer">{{audio.singer}}</p>
      </div>
      <div class="play-btn">
        <i class="iconfont icon-play" :class=" isPlay ? 'icon-zantingstop' : 'icon-icon-system-fn-play' " @touchstart="ply()"></i>
        <i class="iconfont icon-next icon-nextvideo-copy" @click="next()"></i>
      </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                msg: 'hello vue'
            }
        },
      computed:{
        ...mapGetters(['audio','isPlay','showPlayer'])
      },
      methods:{
          ply(){
            if(this.isPlay){
              document.getElementById("audioPlay").pause();

            } else{
              document.getElementById("audioPlay").play()
            }
            this.$store.commit('isPlay',!this.isPlay)
          },
        showDetailPlayer(){
            if(this.showPlayer){
              this.$store.commit('showDetailPlayer',true);
            }
        },
        change(){
          var time = document.getElementById('audioPlay').currentTime
          if (this.audio.currentFlag) {
            document.getElementById('audioPlay').currentTime = this.audio.currentLength;
            this.$store.commit('setCurrent', false);
          } else {
            this.$store.commit('setAudioTime', time);
          }
        },
        next(){
          this.$store.dispatch('next');
        }

      },

    }
  document.addEventListener('DOMContentLoaded', function () {
    function audioAutoPlay() {
      var audio = document.getElementById('audioPlay');
      audio.play();
      document.addEventListener("WeixinJSBridgeReady", function () {
        audio.play();
      }, false);
    }
    audioAutoPlay();
  });

</script>

<style scoped>

.play-head-photo{
  width: 50px;
  height: 50px;
}
  .play-status{
    flex: 1;
    margin-left:10px;
    margin-top: 5px;
    overflow: hidden;
  }
  .play-titile{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size: 16px;
  }
  .play-singer{
    margin-top: 4px;
  }
  .play-btn{
    line-height: 50px;
    text-align: right;
  }
  .icon-play{
    font-size: 40px;
    margin-left: 20px;
  }
  .icon-next{
    font-size: 34px;
    margin:0 10px;

  }

</style>
