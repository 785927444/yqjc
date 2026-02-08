<template>
  <div class="relative ww100 flex-sc white bgi24">
    <img class="ww90" src="@/assets/imgs/back-cebg.png"/>
    <div class="absolute-cc tc ww100 flex-bc plr15 fontStyle">
      <div class="f24">后台管理</div>
      <div class="hh100 flex1 flex-ec fontStyle">
        <div class="flex-sc cursor ml20" @click="setRef.onVisable()" v-if="configStore.user&&(configStore.user.role_id=='1'||configStore.user.role_id=='2')">
          <img class="mr7 w18" src="@/assets/imgs/a-set.png" />
          <span class="title f15 pb2">配置</span>
        </div>
        <div class="flex-sc cursor ml20" @click="toPath('/home')">
          <img class="mr7 w18" src="@/assets/imgs/a-back.png" />
          <span class="title f15 pb2">前台</span>
        </div>
        <el-popover placement="bottom" width="12%" trigger="click" :visible="state.isFalse">
          <template #reference>
            <div class="flex-ec cursor ml20" @click="state.isFalse=!state.isFalse" v-if="!isNull(configStore.loginRoute) && configStore.loginRoute == '/login'">
              <div class="cursor w22 mlr5">
                <img class="ww100" src="@/assets/imgs/use-img.png">
              </div>
              <span class="cursor flex-cc">
                <!-- <span class="mr5 f15 title">{{configStore.user.name}}</span> -->
                <i-ep-caretBottom class="fontStyle" />
              </span>
            </div>
          </template>
          <div class="ww100 lh26 i15">
            <div class="mb5">名称：{{configStore.user.name?decrypt(configStore.user.name):'暂无'}}</div>
            <!-- <div>角色：{{find(configStore.roleList, ['id', configStore.user.function_role], 'role_name')}}</div> -->
            <div class="mb5">电话：{{configStore.user.phone?encryptPhone(decrypt(configStore.user.phone)) : '暂无'}}</div>
            <div class="mb5 i1 tr">
              <el-button type="info" plain size="small" @click="state.isFalse=!state.isFalse">关闭</el-button>
              <el-button type="danger" plain size="small" @click="loginOut()">退出</el-button>
            </div>
          </div>
        </el-popover>
      </div>
    </div>
    <Setting ref="setRef" />
    <Password :state="state" ref="passwordRef" />
  </div>
</template>

<script lang="ts" setup>
  import Setting from '@/components/Setting'
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  let setRef = $ref()
  let passwordRef = $ref()
  const state = reactive({
	  ...publicStore.$state,
  })

  onMounted(async() => {
    if(configStore.password && configStore.password=='true'){
      passwordRef.onVisable({password: '', passwords: ''})
    }
  })

  watch(() => configStore.user, async(val) => {
    await nextTick()
    console.log("configStore.user---改变", val)
    if(proxy.isNull(configStore.user)) state.isFalse = false
  }, {immediate: false, deep: true})

  const changeAsideWidth = () => {
    if(configStore.isCollapse){
      configStore.$patch({isCollapse: false, asideWidth: '230px'})
    }else{
      configStore.$patch({isCollapse: true, asideWidth: '64px'})
    }
  }

  const loginOut = () => {
    let user = !proxy.isNull(configStore.user)?configStore.user.name:''
    let username = !proxy.isNull(configStore.user)?configStore.user.username:''
    proxy.log([{level: 'info', type: '2', name: '退出', msg: `退出成功`, res: '1', user: user, username: username, stationnum: configStore.distributId}])    
    let distributId =  configStore.config&&configStore.config.level&&configStore.config.level.length == 4 && !proxy.isNull(configStore.distributId)&&configStore.distributId!='0'? configStore.distributId : ''
    configStore.$patch({token: '', user: '', distributId: distributId, routes: []})
    proxy.toPath(configStore.loginRoute? configStore.loginRoute : '/home')
    state.isFalse = false
  }
</script>

<style scoped lang="scss">

</style>

