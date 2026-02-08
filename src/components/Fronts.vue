<template>
  <div class="ww100 p12 bod-i16-1 flex-sc" style="background: rgba(7, 55, 100, 0.7)">
    <!-- 左边 -->
    <div class="flex-sc">
      <div class="flex-sc cursor bgi16 ptb8 plr12 rad2 mr15" @click.stop="handleClick('front')">
        <i-ep-setting class="f12 fw mr5" />
        <span>选择预设方案</span>
      </div>
      <div class="flex-sc cursor i15" @click.stop="handleClick('frontRecord')">
        <i-ep-notification  class="f12 fw mr5" />
        <span>执行记录</span>
      </div>
    </div>
    <!-- 右边 -->
     <div class="flex1 flex-ec" v-if="!isNull(configStore.user) && !isNull(publicStore.active)&&!isNull(publicStore.active.attr)&&publicStore.active.attr.front">
        <div class="flex-col tr">
          <div class="flex-ec">
            <span class="i15">方案：</span>
            <span>{{ state.data.frontName?state.data.frontName:'暂无' }}</span>
          </div>
          <div class="flex-ec mt8" v-if="!isNull(state.data)">
            <span class="i15 ml10">状态：</span>
            <span :class="state.data.status==0?'i7':state.data.status==1?'i11':state.data.status==2?'i6':''">{{ state.data.desc?state.data.desc:'暂无' }}</span>
            <span v-if="state.data.status == 2" class="i15 ml10">开始：</span>
            <span v-if="state.data.status == 2">{{ state.data.start_time?state.data.start_time:'暂无' }}</span>
            <span v-if="state.data.status == 2" class="i15 ml10">结束：</span>
            <span v-if="state.data.status == 2">{{ state.data.end_time?state.data.end_time:'暂无' }}</span> 
          </div>
        </div>
				<div class="h36 flex-cc hidden mlr25">
					<img class="hh100 w1" src="@/assets/imgs/line.png" />
				</div>
        <div class="flex-sc">
          <div class="ptb5 plr15 rad4 cursor mr15" @click.stop="setStart()"  :class="!isNull(state.data)?'bgi1':'bga'">开始</div>
          <div class="ptb5 plr15 rad4 cursor" @click.stop="setStop()" :class="state.data&&state.data.status == 1?'bgi8':'bga'">停止</div>
        </div>
     </div>
    <Front :state="state" ref="frontRef"/>
    <FrontRecord :state="state" ref="frontRecordRef"/>
  </div>
</template>

<script lang="ts" setup>
  import api from "@/api"
import { isNull } from "@/utils/common"
	import scheduled from "@/utils/scheduled"
	const { createScheduled } = scheduled()
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
	})
  let frontRef = $ref()
  let frontRecordRef = $ref()
	onMounted(async() => {
    // await setInit()
    init()
    createScheduled('fronts', 2*1000, () => { init() })
	})

  // const setInit = async() =>{
  //   if(proxy.isNull(publicStore.active)) return
  //   if(proxy.isNull(publicStore.active.attr)) return
  //   if(proxy.isNull(publicStore.active.attr.front)) return
  //   const query = `id=${publicStore.active.attr.front}`
  //   const params = {ip: publicStore.link.ip, port: publicStore.link.port, url: `/api/v1/vpp/detailScheme?${query}`, method: 'GET'}
  //   const res = await publicStore.http({httpApi: params})
  //   if(!proxy.isNull(res) && !proxy.isNull(res.data)){
  //     publicStore.active.attr.frontName = res.data.schemeName
  //   }
  // }

  const init = async() => {
    if(proxy.isNull(configStore.user)) return
    if(proxy.isNull(configStore.tourist)) return
    if(proxy.isNull(publicStore.active)) return
    if(proxy.isNull(publicStore.active.attr)) return
    if(proxy.isNull(publicStore.active.attr.front)) return
    if(proxy.isNull(state.data)) return
    const query = `id=${publicStore.active.attr.front}`
    const params = {ip: publicStore.link.ip, port: publicStore.link.port, url: `/api/v1/vpp/statusScheme?${query}`, method: 'GET'}
    const res = await publicStore.http({httpApi: params})
    const data = {}
    if(!proxy.isNull(res) && !proxy.isNull(res.data)){
      data.desc = res.data.desc? res.data.desc : ''
      data.status = res.data.status? res.data.status : ''
      if(data.status == 2) publicStore.active.attr.frontCheck = 2
      if(!proxy.isNull(res.data.schemeInstances)){
        data.frontName = res.data.schemeInstances.schemeName? res.data.schemeInstances.schemeName : ''
        data.start_time = res.data.schemeInstances.taskCreateTime? res.data.schemeInstances.taskCreateTime : ''
        data.end_time = res.data.schemeInstances.taskEndTime? res.data.schemeInstances.taskEndTime : ''
      }
    }
    state.data = {...data}
  }

  // 点击方法
  const handleClick = (remark, val) => {
    if(proxy.isNull(publicStore.active)) return
    if(proxy.isNull(publicStore.active.attr)) publicStore.active.attr = {}
    if(remark == 'front'){
      // publicStore.active.attr.front = '1' 
      frontRef.onVisable()
    }
    if(remark == 'frontRecord'){
      frontRecordRef.onVisable()
    }
  }

  const setStart = async() => {
    if(proxy.isNull(state.data)) return ElNotification({ title: '提示', message: '方案获取失败！', type: 'error' })
    ElMessageBox.confirm('是否确定开始?', '温馨提示', {confirmButtonText: '确定', cancelButtonText: '关闭', type: 'success'}).then(async() => {
      if(proxy.isNull(publicStore.active)) return
      if(proxy.isNull(publicStore.active.attr)) return
      if(proxy.isNull(publicStore.active.attr.front)) return
      const logdata = {
        id: '',
        type: '1',
        level: 'info',
        stationnum: configStore.user.station_num,
        user: configStore.user.name,
        username: configStore.user.username,
        systemtestId: publicStore.active.id,
        systemtestName: publicStore.active.name,
        schemeId: publicStore.active.attr.front,
        schemeName: publicStore.active.attr.frontName,
        start_time: proxy.parseTime(new Date().getTime()) + '',
        name: '开始方案',
        res: '0',
        msg: `执行开始失败`,
      } 
      const query = `id=${publicStore.active.attr.front}`
      const params = {ip: publicStore.link.ip, port: publicStore.link.port, url: `/api/v1/vpp/executeScheme?${query}`, method: 'GET'}
      const res = await publicStore.http({httpApi: params})
      console.log("开始res", res)
      if(res.code == 200 && !proxy.isNull(res.data)){
        logdata.start_time = new Date(res.data.taskCreateTime).getTime() + ''
        logdata.res = '1'
        logdata.msg = res.message
        ElNotification({ title: '提示', message: '开始成功', type: 'success' })
        publicStore.active.attr.frontCheck = 1
        init()
      } else{
        ElNotification({ title: '提示', message: '开始失败', type: 'error' })
      }
      setLog(logdata)
    })
  }

  const setStop = async() => {
    if(proxy.isNull(state.data)) return ElNotification({ title: '提示', message: '方案获取失败！', type: 'error' })
    if(state.data.status != 1) return ElNotification({ title: '提示', message: '方案非执行中，无需停止！', type: 'error' })
    ElMessageBox.confirm('是否确定停止?', '温馨提示', {confirmButtonText: '确定', cancelButtonText: '关闭', type: 'success'}).then(async() => {
      if(proxy.isNull(publicStore.active)) return
      if(proxy.isNull(publicStore.active.attr)) return
      if(proxy.isNull(publicStore.active.attr.front)) return
      if(proxy.isNull(state.data)) return
      const logdata = {
        id: '',
        type: '2',
        level: 'info',
        stationnum: configStore.user.station_num,
        user: configStore.user.name,
        username: configStore.user.username,
        systemtestId: publicStore.active.id,
        systemtestName: publicStore.active.name,
        schemeId: publicStore.active.attr.front,
        schemeName: publicStore.active.attr.frontName,
        start_time: proxy.parseTime(new Date().getTime()) + '',
        name: '停止方案',
        res: '0',
        msg: `执行停止失败`,
      }
      const query = `id=${publicStore.active.attr.front}`
      const params = {ip: publicStore.link.ip, port: publicStore.link.port, url: `/api/v1/vpp/stopScheme?${query}`, method: 'GET'}
      const res = await publicStore.http({httpApi: params})
      console.log("停止res", res)
      if(res.code == 200){
        ElNotification({ title: '提示', message: '停止成功', type: 'success' })
        init()
      } else{
        ElNotification({ title: '提示', message: '停止失败', type: 'error' })
      }
      setLog(logdata)
    })
  }

  // 记录日志
  const setLog = async(form) => {
    let params = {model: 't_scheme_log', list: [form]}
    api.addApi(params).then((res:any) => {
      if(res.code == 200){
        console.log('写入日志成功')
      }else{
        console.log('响应成功，请求失败')
      }
    }).catch((err) => {
      console.log('数据响应失败')
    })
  }
</script>

<style scoped lang="scss">

</style>
