<template>
  <div class="tabs">
    <div class="header-nav">
      <ul class="head-nav-ul">
        <li v-for="(item,index) in tabsParam" @click="toggleTabs(index)" :class="{active:index==nowIndex}">{{item.title}}</li>
      </ul>
    </div>
    <div v-show="nowIndex===0">
      <NewSongs></NewSongs>
    </div>
    <div v-show="nowIndex===1">
      <Ranking></Ranking>
    </div>
    <div v-show="nowIndex===2">
      <SongSheet></SongSheet>
    </div>
    <div v-show="nowIndex===3">
      <Singer></Singer>
    </div>
  </div>
</template>

<script>
  import NewSongs from '../../views/NewSongs'
  import Ranking from '../../views/Ranking'
  import SongSheet from '../../views/SongSheet'
  import Singer from '../../views/Singer'
export default {
  data(){
    return{
      tabsParam:[
        {title:'新歌'},
        {title:'排行'},
        {title:'歌单'},
        {title:'歌手'}
      ],
      nowIndex:0,//默认第一个tab为激活状态
    }
  },
  components:{
    NewSongs,
    Ranking,
    SongSheet,
    Singer
  },
  methods:{
    toggleTabs:function(index){
      this.nowIndex=index;
      this.goRouter(this.nowIndex)
    },
    goRouter(index){
      switch (index) {
        case 0:
          this.$router.push({path: '/'});
          break;
        case 1:
          this.$router.push({path: '/ranking'});
          break;
        case 2:
          this.$router.push({path: '/songsheet'});
          break;
        case 3:
          this.$router.push({path: '/singer'});
          break;
      }
    }

  }
}
</script>

