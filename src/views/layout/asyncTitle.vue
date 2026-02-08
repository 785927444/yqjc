<template>
  <div class="ww100 absolute z10 t0">
    <div class="relative ww100 mb5">
      <img class="ww100" src="@/assets/imgs/top-cebg.png"/>
      <!-- 左边 -->
      <div class="absolute-cc tc layout-row plr16">
        <div class="flex3 hh100 flex-ec">
          <div class="flex1 flex-col-cs mb30">
            <span class="f18">{{clock(state.time).sfm}}</span>
            <span class="f12 ml2">{{clock(state.time).ymd}}</span>
          </div>
          <!-- 平台 -->
          <div class="flex3 hh100 flex-ec pt32 pb10 mb45" v-if="isNull(configStore.distributId) || configStore.distributId=='0'">
            <div class="cursor hh100" @click="toPath('/home')">
              <img class="hh100" v-if="route.path != '/home' && configStore.lang != 'en'" src="@/assets/imgs/but-1.png">
              <img class="hh100" v-if="route.path == '/home' && configStore.lang != 'en'" src="@/assets/imgs/but-11.png">
              <img class="hh100" v-if="route.path != '/home' && configStore.lang == 'en'" src="@/assets/imgs/but-1-en.png">
              <img class="hh100" v-if="route.path == '/home' && configStore.lang == 'en'" src="@/assets/imgs/but-11-en.png">
            </div>
            <div class="cursor hh100" @click="toPath('/devices')">
              <img class="hh100" v-if="route.path != '/devices' && configStore.lang != 'en'" src="@/assets/imgs/but-a2.png">
              <img class="hh100" v-if="route.path == '/devices' && configStore.lang != 'en'" src="@/assets/imgs/but-a22.png">
              <img class="hh100" v-if="route.path != '/devices' && configStore.lang == 'en'" src="@/assets/imgs/but-a2-en.png">
              <img class="hh100" v-if="route.path == '/devices' && configStore.lang == 'en'" src="@/assets/imgs/but-a22-en.png">
            </div>
            <div class="cursor hh100" @click="toPath('/juhe/user/home')">
              <img class="hh100" v-if="route.path != '/juhe/user/home'" src="@/assets/imgs/but-12.png">
              <img class="hh100" v-if="route.path == '/juhe/user/home'" src="@/assets/imgs/but-1212.png">
            </div>
            <div class="cursor hh100" @click="toPath('/predicts')">
              <img class="hh100" v-if="route.path != '/predicts' && configStore.lang != 'en'" src="@/assets/imgs/but-14.png">
              <img class="hh100" v-if="route.path == '/predicts' && configStore.lang != 'en'" src="@/assets/imgs/but-1414.png">
              <img class="hh100" v-if="route.path != '/predicts' && configStore.lang == 'en'" src="@/assets/imgs/but-9-en.png">
              <img class="hh100" v-if="route.path == '/predicts' && configStore.lang == 'en'" src="@/assets/imgs/but-99-en.png">
            </div>
          </div>
          <!-- 单站 -->
          <div class="flex3 hh100 flex-ec pt32 pb10 mb45" v-else>
            <div class="cursor hh100" @click="toPath('/home')">
              <img class="hh100" v-if="route.path != '/home'" src="@/assets/imgs/but-1.png">
              <img class="hh100" v-if="route.path == '/home'" src="@/assets/imgs/but-11.png">
            </div>
            <div class="cursor hh100" @click="toPath('/devices2/photovoltaic')">
              <img class="hh100" v-if="route.path.indexOf('/devices2')!=-1"  src="@/assets/imgs/but-a22.png">
              <img class="hh100" v-else src="@/assets/imgs/but-a2.png">
            </div>
          </div>
        </div>
        <!-- 中间 标题 -->
        <div class="flex2 fw plr30 cursor relative" @click="toPath('/home')">
          <div class="ww100 absolute-cc tt35 ls2 f30" v-if="isNull(configStore.distributId) || configStore.distributId=='0'">
            <img class="ww50 mt20" v-if="configStore.lang != 'en'"  src="@/assets/imgs/title-title.png">
            <img class="ww50 mt20" v-if="configStore.lang == 'en'"  src="@/assets/imgs/title-title.png">
          </div>
          <div class="ww100 absolute-cc tt35 ls2 f24 pt30" v-else>
            {{`${configStore.config.title?configStore.config.title : '园区源网荷储一体化协调控制'}`}}
          </div>
        </div>
        <!-- 右边 -->
        <div class="flex3 hh100 flex-sc">
          <!-- 平台 -->
          <div class="flex2 hh100 flex-sc pt32 pb10 mb45" v-if="isNull(configStore.distributId) || configStore.distributId=='0'">
            <div class="cursor hh100" @click="toPath('/demands')">
              <img class="hh100" v-if="route.path != '/demands' && configStore.lang != 'en'" src="@/assets/imgs/but-8.png">
              <img class="hh100" v-if="route.path == '/demands' && configStore.lang != 'en'" src="@/assets/imgs/but-88.png">
              <img class="hh100" v-if="route.path != '/demands' && configStore.lang == 'en'" src="@/assets/imgs/but-8-en.png">
              <img class="hh100" v-if="route.path == '/demands' && configStore.lang == 'en'" src="@/assets/imgs/but-88-en.png">
            </div>
            <div class="cursor hh100" @click="toPath('/markets')">
              <img class="hh100" v-if="route.path != '/markets' && configStore.lang != 'en'" src="@/assets/imgs/but-100.png">
              <img class="hh100" v-if="route.path == '/markets' && configStore.lang != 'en'" src="@/assets/imgs/but-101.png">
              <img class="hh100" v-if="route.path != '/markets' && configStore.lang == 'en'" src="@/assets/imgs/but-8-en.png">
              <img class="hh100" v-if="route.path == '/markets' && configStore.lang == 'en'" src="@/assets/imgs/but-88-en.png">
            </div>
            <div class="cursor hh100" @click="toPath('/systest2')">
              <img class="hh100" v-if="route.path != '/systest2'" src="@/assets/imgs/but-a4.png">
              <img class="hh100" v-if="route.path == '/systest2'" src="@/assets/imgs/but-a44.png">
            </div>
             <div class="cursor hh100" @click="toPath('/systestlog2')">
              <img class="hh100" v-if="route.path != '/systestlog2'" src="@/assets/imgs/but-a10.png">
              <img class="hh100" v-if="route.path == '/systestlog2'" src="@/assets/imgs/but-a1010.png">
            </div>
          </div>
          <!-- 单站 -->
          <!-- <div class="flex2 hh100 flex-sc pt32 pb10 mb45" v-else>
           <div class="cursor hh100" @click="toPath('/systest2')">
              <img class="hh100" v-if="route.path != '/systest2'" src="@/assets/imgs/but-a4.png">
              <img class="hh100" v-if="route.path == '/systest2'" src="@/assets/imgs/but-a44.png">
            </div>
            <div class="cursor hh100" @click="toPath('/systestlog2')">
              <img class="hh100" v-if="route.path.indexOf('/systestlog2') == -1" src="@/assets/imgs/but-a10.png">
              <img class="hh100" v-else src="@/assets/imgs/but-a1010.png">
            </div>
          </div> -->
          <!-- 单站 -->
          <div class="flex2 hh100 flex-sc pt32 pb10 mb45" v-else>
           <div class="cursor hh100" @click="toPath('/inspect2')">
              <img class="hh100" v-if="route.path != '/inspect2'" src="@/assets/imgs/but-a5.png">
              <img class="hh100" v-if="route.path == '/inspect2'" src="@/assets/imgs/but-a55.png">
            </div>
            <div class="cursor hh100" @click="toPath('/consumpt2')">
              <img class="hh100" v-if="route.path.indexOf('/consumpt2') == -1" src="@/assets/imgs/but-a6.png">
              <img class="hh100" v-else src="@/assets/imgs/but-a66.png">
            </div>
          </div>
          <!-- 登录 -->
          <div class="flex1 flex-ec fontStyle mb25">
            <!-- <div class="flex-sc ml15">
              <el-switch 
              v-model="state.lang" 
              style="--el-switch-on-color: #13ce66;--el-switch-off-color: #ff4949;" 
              inline-prompt 
              active-text="cn" 
              inactive-text="en" 
              @change="handleChangeI18n" />
            </div> -->
            <div class="flex-sc cursor ml15" v-if="!isNull(configStore.tourist)&&configStore.tourist.link" @click="toPath(configStore.tourist.link, '', 1); configStore.$patch({ token: '', user: '', tourist: ''})">
              <img class="w20 mr5" src="@/assets/imgs/a-back.png" />
              <span class="f15">主页</span>
            </div>
            <div class="flex-sc cursor ml15" v-if="!isNull(configStore.distributId)&&configStore.distributId!='0'" @click="configStore.$patch({ distributId: '0'})">
              <img class="w20 mr5" src="@/assets/imgs/a-back.png" />
              <span class="f15">平台</span>
            </div>
            <el-popover placement="bottom" width="12%" trigger="click" :visible="state.isFalse">
              <template #reference>
                <div class="flex-ec cursor" v-if="isNull(configStore.token)" @click="authRef.onVisable()">
                  <div class="cursor w22 mlr5">
                    <img class="ww100" src="@/assets/imgs/use-img.png">
                  </div>
                  <span class="cursor flex-cc">
                    <span class="mr5 f15 title">登录</span>
                  </span>
                </div>
                <div class="flex-ec cursor" v-else @click="state.isFalse=!state.isFalse">
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
                  <el-button type="primary" plain size="small" @click="toPath('/admin')">后台</el-button>
                  <el-button type="danger" plain size="small" @click="loginOut()">退出</el-button>
                </div>
              </div>
            </el-popover>
          </div>
        </div>
      </div>
      <Auth title="登录" ref="authRef" />
    </div>
  </div>
</template>


<script lang="ts" setup>
  import { storage } from "@/utils/storage"
  import scheduled from "@/utils/scheduled";
  const { createScheduled } = scheduled();
	const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const state = reactive({
	  ...publicStore.$state,
		time: proxy.parseTime(new Date()),
    timeNum: 0,
  })
  const route = useRoute()
	const setTime = () => state.time = state.time + 1
  let authRef = $ref()
	
  onMounted(async() => {
    state.lang = configStore.lang == 'cn'? true : false
    if(configStore.config.level && configStore.config.level.length == 4) configStore.distributId = configStore.config.level[3]
		createScheduled('clock', 1000, () => { 
      state.timeNum++
      setTime()
    })
	})

  const handleChangeI18n = () => {
    configStore.lang = state.lang? 'cn' : 'en'
    storage.set('lang',  configStore.lang)
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

  watch(() => configStore.user, async(val) => {
    await nextTick()
    console.log("configStore.user---改变", val)
    if(proxy.isNull(configStore.user)) state.isFalse = false
  }, {immediate: false, deep: true})

  watch(() => configStore.distributId, async(val) => {
    await nextTick()
    console.log("distributId---改变", val)
    if(route.path == '/home' && proxy.isNull(configStore.distributId)) {
      window.location.reload()
    }else{
      proxy.toPath('/home')
    }
  }, {immediate: false, deep: true})

  // 自动轮播
  // watch(() => state.timeNum, async(val) => {
  //   let time = proxy.isNull(configStore.distributId)||configStore.distributId=='0'? 2*60 : 5*60
  //   if(state.timeNum < time) return
  //   state.timeNum = 0
  //   configStore.distributId = proxy.isNull(configStore.distributId)||configStore.distributId=='0'? '76d49f60-30f0-4578-a7d7-f20ff1b89345' : '0'
  // }, {immediate: false, deep: true})

  window.addEventListener('mousemove', function(event) {
    state.timeNum = 0
  })
</script>

<style scoped lang="scss">

</style>
