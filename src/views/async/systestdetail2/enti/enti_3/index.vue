<template>
  <div class="layout-row">
    <l1 class="flex1 hh100" v-model:terminals="state.terminals" />
    <div class="flex4 hh100 flex-col hidden ml15">
      <r1 class="flex2 ww100 mb15" />
      <r2 class="flex7 ww100" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import api from '@/api'
  import l1 from './l1'
  import r1 from './r1'
  import r2 from './r2'
  import scheduled from "@/utils/scheduled"
  const { createScheduled } = scheduled()
  const route = useRoute()
	const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const state = reactive({
	  ...publicStore.$state,
  })

  onMounted(async() => {
		console.log("初始化enti_3结果")
    state.args = route.query.id?`id='${route.query.id}'`:`user_id='${route.query.user_id}' and start_time='${route.query.start_time}'`
    await getInit()
    init()
    createScheduled("enti_3", 5 * 1000, () => { init() })
  })

	onBeforeUnmount(async() => {
		console.log("摧毁enti_3结果")
	})

  // 初始化数据
	const getInit = async() => {
    let query1 = {model: 't_sensor_template', args: `attribute='0'`}
		let query2 = {model: 't_sensor', args: `type='ZYTJZD'`}
    let query3 = {model: 't_test_task_execute', args: state.args}
    let query4 = {model: 't_test_task_complete', args: state.args}
    let res = await publicStore.http({Api1: query1, Api2: query2, Api3: query3})
    publicStore._public.deviceTypes = proxy.isNull(res.Api1)? [] : res.Api1
		state.terminals = proxy.isNull(res.Api2)? [] : res.Api2
    let task_executes = proxy.isNull(res.Api3)? [] : res.Api3
    if(!proxy.isNull(task_executes)){
      let datas = changeData(task_executes)
      let data = datas[0]
      data.status = '1'
      publicStore.active = {...data}
      // 正在执行模拟
      mock()
    } else{
      let task_completes = await publicStore.http({Api4: query4})
      if(!proxy.isNull(task_completes)){
        let datas = changeData(task_completes)
        let data = datas[0]
        data.status = '2'
        publicStore.active = {...data}
      }
    }
    getChild()
  }

  // 实时化数据
	const init = async() => {
    if(proxy.isNull(publicStore.active)) return
    if(publicStore.active.status != '1') return
		let query = {model: 't_test_task_execute', args: state.args}
    let task_executes = await publicStore.http({Api: query})
    if(!proxy.isNull(task_executes)){
      console.log("执行中...")
      let datas = changeData(task_executes)
      let data = datas[0]
      publicStore.active.res = {...data.res}
      publicStore.active.status = '1'
    } else{
      console.log("已结束...")
      let query = {model: 't_test_task_complete', args: state.args}
      let task_completes = await publicStore.http({Api: query})
      if(!proxy.isNull(task_completes)){
        let datas = changeData(task_completes)
        let data = datas[0]
        publicStore.active.res = {...data.res}
        publicStore.active.status = '2'
      }
    } 
  }

  // 解析字符串
  const changeData = (list) => {
    return list.map(v => {
      if(v.attr) {
        try {
          v.attr = JSON.parse(v.attr)
        } catch (err) {
          console.error("解析失败:", err.message)
        }
      }else {
        v.attr = {}
      }
      if(v.res) {
        try {
          v.res = JSON.parse(v.res)
        } catch (err) {
          console.error("解析失败:", err.message)
        }
      }else {
        v.res = {}
      }
      return v
    })  
  }

  // 更新数据
  const updateData = (data) => {
    if(proxy.isNull(publicStore.active)) publicStore.active = {...data}
    if(proxy.isNull(publicStore.active.attr)) return
    if(proxy.isNull(publicStore.active.attr.childs)) return
    publicStore.active.status = data.status
    if(proxy.isNull(data.res)) return
    if(proxy.isNull(data.res.childs)) return
    publicStore.active.attr.childs.forEach(v => {
      let exist = data.res.childs.find(a=>a.type == v.type)
      if(exist) v.items = [...exist.items]
    })
  }

  // 获取childs
	const getChild = async() => {
		if (proxy.isNull(state.terminals)) return
		if(proxy.isNull(publicStore.active)) return
		if(proxy.isNull(publicStore.active.attr)) return
		if(proxy.isNull(publicStore.active.attr.terminal)) return
		let terminal = state.terminals.find(a=>a.id == publicStore.active.attr.terminal)
		if(!terminal) return
		if(!terminal.parent_type) return
		// 获取关联节点
		let query = {model: 't_sensor', args: `parent_id='${terminal.parent_type}'`}
		let nodes = await publicStore.http({Api: query})
		if(!proxy.isNull(nodes)){
      let ids = [...new Set(nodes.map(a => a.id))].map(a => `'${a}'`).join(',')
			let query = {model: 't_sensor', args: `parent_id IN (${ids})`}
			let devices = await publicStore.http({Api: query})
			if(!proxy.isNull(devices)){
				let childs = Array.from(
					devices.reduce((map, device) => {
						const group = map.get(device.type) || { type: device.type, meas: [], sensors: [] }
						group.sensors.push(device)
						map.set(device.type, group)
						return map
					}, new Map())
					.values()
				)
				let types = [...new Set(childs.map(a => a.type))].map(a => `'${a}'`).join(',')
				let query = {model: 't_sensor_template_measure_point', args: `sensor_type IN (${types})`}
        let res = await publicStore.http({Api: query})
				let meas = res.sort((a, b) => a.order - b.order)
				if(!proxy.isNull(meas)) childs.forEach(v => {v.meas = meas.filter(a=>a.sensor_type == v.type)})
				state.childs = childs
        publicStore.active.attr.childs.forEach(v => {
          let exist = state.childs.find(a=>a.type == v.type)
          if(exist) Object.assign(v, exist)
        })
			}
		}
	} 

  // 模拟正在执行
  const mock = async() => {
    if(proxy.isNull(publicStore.active)) return
    if(proxy.isNull(publicStore.active.attr)) return
    let count = 10
    let frequency = 5
    let throughput = []
    let datas = []
    const now = Date.now()
    for (let i = 0; i < count; i++) {
      let x = now+1000*frequency*(i+1) + ''
      let y = Math.floor(Math.random() * 10) + 1 + ''
      let newdata = [x, y]
      throughput.push(newdata)
      let y2 = Math.floor(Math.random() * 10) + 1 + ''
      let data = {date: '2025-09-09', period: '16:00-16:15', duration: '30', average: '3', accuracy: '100', throughput: [...throughput]}
      let item = {value: JSON.parse(JSON.stringify(data)), time: frequency*1000}
      datas.push(item)
    } 
    startSequentialRequests(datas)
  }

// 顺序执行：每个请求等待前一个完成
const status = ref('')
const startSequentialRequests = async (datas) => {
  status.value = '开始顺序执行...'
  
  for (let i = 0; i < datas.length; i++) {
    const item = datas[i]
    status.value = `等待 ${item.time}ms 后执行第 ${i + 1} 个请求`
    console.log(status.value)
    
    // 先等待指定的时间
    await new Promise(resolve => setTimeout(resolve, item.time))
    // 然后执行请求
    let res = {...publicStore.active.res, ...item.value}
    let from = {id: publicStore.active.id, res: JSON.stringify(res)}
    let params = {model: 't_test_task_execute', list: [from]}
    const result = await api['updApi'](params)
  }
  
  status.value = '所有请求完成'
  // 转成历史
  console.log(status.value)
  taskChance()
}

// 进行转成历史
const taskChance = async() => {
  let query = {model: 't_test_task_execute', args: state.args}
  let task_executes = await publicStore.http({Api: query})
  if(!proxy.isNull(task_executes)){
    let from = {...task_executes[0]}
    from.id = ''
    from.end_time = Date.now() + ''
		let res = await proxy.handleApi('add', from, 't_test_task_complete')
    if(res.code == 200){
      ElNotification({ title: '提示', message: '添加历史成功', type: 'success' })
      let ress = await proxy.handleApi('del', {...task_executes[0]}, 't_test_task_execute')
      if(ress.code == 200){
        ElNotification({ title: '提示', message: '删除进行成功', type: 'success' })
        getInit()
      }
    }
  }
}

</script>
  
<style scoped lang="scss">

</style>
  