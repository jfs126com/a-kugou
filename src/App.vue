<template>
  <div id="app">
    <Head/>
    <player/>
    <Detailpayer/>
  </div>
</template>

<script>
  import Head from './components/header/Head'
  import Player from './components/Player'
  import Detailpayer from './components/DetailPlayer'
export default {
    name:'app',
  data(){
      return{
        msg:'wo s app'
      }
  },
  components:{
    Head,Player,Detailpayer
  }
}
</script>
