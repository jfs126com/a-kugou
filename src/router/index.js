import Vue from 'vue'
import Router from 'vue-router'
import NewSongs from '@/views/NewSongs'

Vue.use(Router)

export default new Router({
  mode:'history',
  router:[
    {
      path:'/newSongs',
      component:NewSongs,
      alias:'/'
    },{
      path:'/ranking/info/:id',
      component:require('../views/RankingInfo')
    }
  ]
})
