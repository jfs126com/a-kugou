module.exports = {
  'PLAY_AUDIO':{
    methods:{
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
}
