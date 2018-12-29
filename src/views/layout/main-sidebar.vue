<template>
    <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
        <div class="site-sidebar__inner">
            <el-menu  class="site-sidebar__menu" :default-active="menuActiveName || 'home'" :collapse="sidebarFold" :collapseTransition ="false">
                <el-menu-item index="home" @click="$router.push({name:'home'})">
                    <icon-svg name="shouye" class="site-sidebar__menu-icon"></icon-svg>
                    <span slot="title">首页</span>
                </el-menu-item>
                <sub-menu v-for="menu in menuList" :key="menu.menuId" :menu="menu" :dynamicMenuRoutes="dynamicMenuRoutes">

                </sub-menu>
            </el-menu>

        </div>
    </aside>
</template>
<script>
import SubMenu from './main-sidebar-sub-menu'
export default {
    data(){
         return {
            dynamicMenuRoutes:[],
            menuList:[]
        }
    },
    components:{
        SubMenu
    },
    computed:{
        sidebarLayoutSkin:{
            get(){
                return this.$store.state.common.sidebarLayoutSkin
            }
        },
        sidebarFold:{
            get(){
                return this.$store.state.common.sidebarFold
            }
        },
        menuActiveName: {
            get () { 
                return this.$store.state.common.menuActiveName 
            },
            set (val) { 
                this.$store.commit('common/updateMenuActiveName', val) 
            }
         },
        mainTabs:{
            get(){
                return this.$store.state.common.mainTabs
            },
            set(val){
                this.$store.commit('common/updateMainTabs',val)
            }
        },
        mainTabsActiveName:{
            get(){
                return this.$store.state.common.mainTabsActiveName
            },
            set(val){
                this.$store.commit('common/updateMainTabsActiveName',val)
            }
         }
    },
    created(){
        this.dynamicMenuRoutes = JSON.parse(sessionStorage.getItem('dynamicMenuRoutes') || '[]')
        console.log(this.dynamicMenuRoutes)
       
        this.menuList = JSON.parse(sessionStorage.getItem('menuList') || '[]')
        console.log(this.menuList)

        this.routeHandle(this.$route)
    },
    // watch方法监听路由变化
    watch: {
      $route: 'routeHandle'
    },
    methods:{
        //路由操作
        routeHandle(route){
            if(route.meta.isTab){
                //tab选中，不存在先添加
                var tab = this.mainTabs.filter(item => item.name === route.name)[0]
                if(!tab){
                    if(route.meta.isDynamic){
                        route = this.dynamicMenuRoutes.filter(item => item.name === route.name)[0]
                        if(!route){
                            return console.error('未能找到可用标签页')
                        }
                    }
                    tab = {
                        menuId:route.meta.menuId || route.name,
                        name:route.name,
                        title:route.meta.title,
                        type:'module'
                    }
                    this.mainTabs = this.mainTabs.concat(tab)
                }
                this.menuActiveName = tab.menuId + ''
                this.mainTabsActiveName = tab.name
            }
        }
    }
   
}
</script>

