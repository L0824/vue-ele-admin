<template>
    <main class="site-content" :class="{'site-content--tabs':$route.meta.isTab}">
        <!-- 主入口标签页 start -->
        <el-tabs v-if="$route.meta.isTab" v-model="mainTabsActiveName" :closable="true"  
        @tab-click="selectedTabHandle"
        @tab-remove="removeTabHandle">
            <el-dropdown class="site-tabs__tools" :show-timeout="0">
                <i class="el-icon-arrow-down el-icon--right"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item  @click.native="tabsCloseCurrentHandle">关闭当前标签页</el-dropdown-item>
                    <el-dropdown-item @click.native="tabsCloseOtherHandle">关闭其它标签页</el-dropdown-item>
                    <el-dropdown-item @click.native="tabsCloseAllHandle">关闭全部标签页</el-dropdown-item>
                    <el-dropdown-item @click.native="tabsRefreshCurrentHandle">刷新当前标签页</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-tab-pane v-for="item in mainTabs" :key="item.name" :label="item.title" :name="item.name">
                <el-card :body-style="siteContentViewHeight">
                    <keep-alive >
                        <router-view v-if="item.name === mainTabsActiveName"></router-view>
                    </keep-alive>
                </el-card>
            </el-tab-pane>
        </el-tabs>
        <!-- 主入口标签页 end -->
        <el-card v-else :body-style="siteContentViewHeight">
            <keep-alive>
                <router-view/>
            </keep-alive>
        </el-card>

    </main>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    computed:{
        documentClientHeight:{
            get(){
                return this.$store.state.common.documentClientHeight
            }
        },
        menuActiveName:{
            get(){
                return this.$store.state.common.menuActiveName
            },
            set(val){
                this.$store.commit('common/updateMenuActiveName',val)
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
        },
        siteContentViewHeight(){
            var height = this.documentClientHeight - 50 - 30 -2
            if(this.$route.meta.isTab){
                height -= 40
                return { height: height + 'px' }
            }
        }
    },
    methods:{
        //tabs,选中tab
        selectedTabHandle(tab){
            // console.log(tab)
            tab = this.mainTabs.filter(item => item.name === tab.name)
            if(tab.length >= 1){
                this.$router.push({name:tab[0].name})
            }
        },
        //tabs,删除tab
        removeTabHandle(tabName){
           
            // console.log(tabName)
            this.mainTabs = this.mainTabs.filter(item => item.name !== tabName)
            if(this.mainTabs.length >=1){
                //删除的刚好是当前的路由的tab
                if(tabName === this.mainTabsActiveName){
                    this.$router.push({name : this.mainTabs[this.mainTabs.length-1].name},()=>{
                        this.mainTabsActiveName = this.$route.name
                    }
                    )}
            }else{
                this.menuActiveName = '',
                this.$router.push({ name : 'home'})
            }
        },
        // 关闭当前标签页
        tabsCloseCurrentHandle(){
            this.removeTabHandle(this.mainTabsActiveName)
        },
        //关闭其他标签页
        tabsCloseOtherHandle () {
        this.mainTabs = this.mainTabs.filter(item => item.name === this.mainTabsActiveName)
        },
        //关闭全部标签页
        tabsCloseAllHandle(){
            this.mainTabs = []
            this.menuActiveName = ''
            this.$router.push({name:'home'})

        },
        //刷新当前标签页
        tabsRefreshCurrentHandle(){
           var tempName = this.mainTabsActiveName
            this.removeTabHandle(tempName)
            this.$nextTick(() => {
                this.$router.push({name:tempName})
            })
        }


    }
}
</script>

