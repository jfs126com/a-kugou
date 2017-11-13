<template>
    <div class="header">
      <HeadLogo></HeadLogo>
      <HeadNav></HeadNav>
    </div>
</template>

<script>
  import HeadLogo from './HeadLogo'
  import HeadNav from './HeadNav'
    export default {
      data(){
        return{
          msg:'head'
        }
      },
      components:{
        HeadNav,HeadLogo
      }
    }
</script>

