<template>
    <nav class="site-navbar" :class="'site-navbar--' + navbarLayoutType">
        <div class="site-navbar__header">
            <h1 class="site-navbar__brand">
                <a href="javascript:;" class="site-navbar__brand-lg">用户权限管理平台</a>
                <a href="javascript:;" class="site-navbar__brand-mini">权限</a>

            </h1>
        </div>
        <div class="site-navbar__body clearfix">
            <el-menu class="site-navbar__menu" mode="horizontal">
                <el-menu-item class="site-navbar__switch" index="0"  @click="sidebarFold = !sidebarFold">
                    <icon-svg name="zhedie"></icon-svg>
                </el-menu-item>

            </el-menu>
            <el-menu class="site-navbar__menu site-navbar__menu--right" mode="horizontal">
                <el-menu-item index="1">
                    <template slot="title">
                        <el-badge value="new">
                            <icon-svg name="shezhi" class="el-icon-setting"></icon-svg>
                        </el-badge>
                    </template>
                </el-menu-item>
                <el-menu-item class="site-navbar__avatar" index="2"> 
                    <el-dropdown :show-timeout="0" placement = "bottom">
                        <span class="el-dropdown-link">
                            <img src="~@/assets/img/avatar.png"  :alt="userName">{{userName}}

                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item  @click.native="updatePasswordHandle()">修改密码</el-dropdown-item>
                            <el-dropdown-item  @click.native="logoutHandle()">退出</el-dropdown-item>
                        </el-dropdown-menu>

                    </el-dropdown>

                </el-menu-item>

            </el-menu>
        </div>
        <!-- 修改密码的弹窗 start -->
        <update-password v-if="updatePasswordVisible" ref="updatePassword"></update-password>
        <!-- 修改密码的弹窗 end -->
    </nav>
</template>
<script>
import UpdatePassword from './main-navbar-update-password'
export default {
    data(){
        return {
            updatePasswordVisible:false
        }
    },
    components:{
        UpdatePassword
    },
    computed:{
        sidebarFold:{
            get(){
                return this.$store.state.common.sidebarFold
            },
            set(val){
                this.$store.commit('common/updateSidebarFold', val)
            }
        },
        userName:{
            get(){
                return this.$store.state.user.name
            }
        },
        navbarLayoutType:{
            get(){
                return this.$store.state.common.navbarLayoutType
            }
        }
      
    },
    methods:{
        //修改密码
        updatePasswordHandle(){
            this.updatePasswordVisible = true
            this.$nextTick(() => {
                this.$refs.updatePassword.init()
        })
        },
        logoutHandle(){
            this.$confirm('确定进行[退出]操作?','提示',{
                confirmButtonText:'确定',
                cancelButtonText:'取消',
                type:'warning'
            }).then(() =>{
                this.$http({
                    url:this.$http.adornUrl('/sys/logout'),
                    method:'post',
                    data:this.$http.adornData()
                }).then(({data}) =>{
                    if(data && data.code === 0){
                        this.$cookie.delete('token')
                        this.$router.options.isAddDynamicMenuRoutes = false
                        this.$router.push({name:'login'})
                    }
                })
            })
        }
    }
    
}
</script>

