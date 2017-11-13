<template>
  <div>
  <mt-swipe :auto="5000">
    <mt-swipe-item v-for="(banner, index) in banners" :key="index">
      <a :href="banner.extra.tour">
        <img :src="banner.imgurl" :title="banner.title">
      </a>
    </mt-swipe-item>
  </mt-swipe>
    <div class="new-song-list">
      <ul>
        <li v-for="(item,index) in songList" @click="playAudio(index)"><span class="song-name">{{item.filename}}</span>
          <i class="icontime"></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui'
  import {mapGetters} from 'vuex';
    export default {
      data(){
        return{
          banners:[],
          songList:[],
          songLengthTime:0
        }
      },
      filters:{
        time(value){
          let length = Math.floor(parseInt(value));
          let minute = Math.floor(value / 60);
          if(minute < 10){
            minute = '0' + minute;
          }
          let second = length % 60;
          if(second < 10){
            second = '0' + second;
          }
          return minute + ':' + second;
        }
      },
      computed:{
        ...mapGetters(['audio'])
      },
      created(){
        this.getSongs()
      },
      methods:{
        getSongs(){
          //数据加载时的效果
          Indicator.open({
            text: '加载中...',
            spinnerType: 'snake'
          });
          this.$http.get('/proxy/?json=true').then(({data})=>{
            this.banners = data.banner
            this.songList = data.data
          }).then(() => {
            //加载完关闭
            Indicator.close()
          }).catch((error=>{
            alert('加载失败')
          }))
        },
        playAudio(index){
          let hash = this.songList[index].hash
          let info = {
            list:this.songList,
            index:index
          };
          this.$store.commit('setListInfo',info)
          this.$store.dispatch('getSong',hash)
        }

      }

    }
</script>

<style>
  .mint-swipe {
    height: 39vw !important;
  }

  .mint-swipe-indicator {
    width: 12px !important;
    height: 12px !important;
  }

  .mint-swipe-indicators {
    bottom: 5px !important;
  }
</style>
