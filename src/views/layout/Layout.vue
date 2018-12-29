<template>
  <div class="site-wrapper" :class="{'site-sidebar--fold':sidebarFold}" v-loading.fullscreen.lock="loading" element-loading-text="拼命加载中">
    <template v-if="!loading">
      <main-navbar/>
      <main-sidebar/>
    </template>
    <div class="site-content__wrapper" :style="{'height':documentClientHeight + 'px'}">
      <main-content/>
    </div>

  </div>
</template>
<script>
import MainNavbar from './main-navbar'
import MainSidebar from './main-sidebar'
import MainContent from './main-content'
export default {
  data(){
    return {
      loading:true
    }
  },
  components:{
      MainNavbar,
      MainSidebar,
      MainContent
  },
  computed:{
    documentClientHeight:{
      get(){
        return this.$store.state.common.documentClientHeight
      },
      set(val){
        this.$store.commit('common/updateDocumentClientHeight',val)
      }
    },
    sidebarFold:{
      get(){
        return this.$store.state.common.sidebarFold
      }
    },
    userName:{
      get(){
        return this.$store.state.user.name
      },
      set(val){
        this.$store.commit('user/updateName',val)
      }
    }
  },
  created(){
    this.getUserInfo()
  },
  mounted(){
    this.resetDocumentClientHeight()
  },
  methods:{
    //重置窗口可视宽度
    resetDocumentClientHeight(){
      console.log('屏幕高度为'+document.documentElement['clientHeight'])
      this.documentClientHeight = document.documentElement['clientHeight']
      window.onresize = () =>{
        this.documentClientHeight = document.documentElement['clientHeight']
      }
    },
    //获取当前管理员的信息
    getUserInfo(){
      this.$http({
        url:this.$http.adornUrl('/sys/user/info'),
        method:'get',
        params:this.$http.adornParams()
      }).then(({data}) =>{
        if(data && data.code === 0){
          this.loading = false
          this.userId = data.user.userId
          this.userName = data.user.username

        }
      }
      )
    }
  }
}
</script>

