<template>
  <div class="layout-col">
    <!-- 面包屑 -->
    <aa-nav />
    <!-- 内容 -->
    <div class="layout-col plr15 pb15">
      <div class="flex1 ww100 flex-col hidden mb15">
        <!-- 标题 -->
        <aa-title title="光伏模拟"><template #right-content></template></aa-title>
        <div class="layout-row p10 ba1">
          <t1 />
          <t2 />
        </div>
        <!-- 底部 -->
        <aa-foot></aa-foot>
      </div>
      <div class="flex1 ww100 flex-col hidden">
        <!-- 标题 -->
        <aa-title title="风机模拟"><template #right-content></template></aa-title>
        <div class="layout-row p10 ba1">
          <b1 />
          <b2 />
        </div>
        <!-- 底部 -->
        <aa-foot></aa-foot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import api from "@/api/index"
  import t1 from './t1'
  import t2 from './t2'
  import b1 from './b1'
  import b2 from './b2'
  import scheduled from "@/utils/scheduled";
  const { createScheduled } = scheduled();
  const route = useRoute();
  const { proxy }: any = getCurrentInstance();
  const configStore = proxy.configStore();
  const publicStore = proxy.publicStore();
  const state = reactive({
    ...publicStore.$state,
    today: {}
  });
  const defaultProps = {
    children: 'children',
    label: 'station_name',
  }
  let treeRef = $ref()
  let defaultId = $ref()

  onMounted(async () => {
    state.type1 = "mockphotovoltaic"
    state.type2 = "mockwind"
    state.type = `'${state.type1}','${state.type2}'`
    await getInit();
    createScheduled("mock_control", 2 * 1000, () => {
      getDevicesData();
      getDevicesDailyOutput1();
      getDevicesOutputPower1();
      getDevicesDailyOutput2();
      getDevicesOutputPower2();
    });
  });

  watch(() => publicStore.active, async (val) => {
    if(proxy.isNull(val)) return
    getDevices();
  },{ immediate: false, deep: true });

  const getInit = async (key) => {
    // 获取今日时间
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0); // 精确到毫秒为 0
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999); // 精确到毫秒为 999
    state.today.start = startOfToday.getTime(); // 开始时间的时间戳
    state.today.end = endOfToday.getTime();     // 结束时间的时间戳
    let query1 = proxy.isNull(configStore.distributId) || configStore.distributId=='0'? { model: "t_sensor", args: `type IN (${state.type})`} : { model: "t_sensor", args: `stationNum='${configStore.distributId}' and type IN (${state.type})`}
    let query2 = { model: "t_sensor_control_property"}
    let query3 = { model: "t_sensor_template_control_point"}
    let res = await publicStore.http({ Api1: query1, Api2: query2, Api3: query3 })
    publicStore._public.sensorControls = proxy.isNull(res.Api2)? [] : res.Api2
    publicStore._public.templateControls = proxy.isNull(res.Api3)? [] : res.Api3.sort((a, b) => a.order - b.order)
    publicStore._public.allDevices = proxy.isNull(res.Api1)? [] : res.Api1
    let stationNums = [...new Set(publicStore._public.allDevices.filter(a => a.stationNum).map(a => a.stationNum))]
    state.stationNums = stationNums.map(a => `'${a}'`).join(',')
    state.bayNums = [...new Set(publicStore._public.allDevices.filter(a => a.bayNum).map(a => a.bayNum))]
    getStation(key)
  };

  const getStation = async (key) => {
    let query = {model: "t_station", args: `id IN (${state.stationNums}) OR parent_id IN (${state.stationNums})`}
    let res = await publicStore.http({ Api: query })
    let list = proxy.isNull(res)? [] : res
    state.list = list.filter(a => a.parent_id=='0' || state.bayNums.find(b=>b==a.id))
    let data = state.list.find(a=>a.parent_id == '0')
    data.images = state.list.filter(a=>a.images).map(a => {return a.images})
    setTree(data[state.key])
  }

	const setTree = async(key) => {
    state.tree = proxy.treeData(state.list, state.key, state.parent, 'children')
    publicStore._public.tree = state.tree
    let node1 = proxy.findNode(state.tree, (node) => { return !node.children })
    let node2 = proxy.findNode(state.tree, (node) => { return node[state.key] == key })
    let node = proxy.isNull(node2)? node1 : node2
    await nextTick()
    defaultId = node[state.key]
    // treeRef.setCurrentKey(defaultId, true)
    publicStore.active = Object.assign({}, node)
  }

  const changeSelect = async(val) => {
		let node = proxy.findNode(state.tree, (node) => { return node[state.key] == val })
		if(node) publicStore.active = Object.assign({}, node)
  }

  const getDevices = async () => {
    if(proxy.isNull(publicStore.active)) return
    publicStore._public.devices = publicStore.active.parent_id == '0'? 
    publicStore._public.allDevices.filter(a=>a.stationNum == publicStore.active.id) :
    publicStore._public.allDevices.filter(a=>a.bayNum == publicStore.active.id)
    state.query = {model: "redis"}
    state.ids = []
    state.query.key = publicStore._public.devices.map((a) => {
      // ids
      let id = state.ids.find(b=>b == a.id)
      if(!id) state.ids.push(a.id)
      // 控制
      a.control = []
      let sensorControls = !proxy.isNull(publicStore._public.sensorControls)? publicStore._public.sensorControls.filter(b=>b.sensor_id == a.id) : []
      if(!proxy.isNull(sensorControls)){
        sensorControls.forEach(c => {
          if(!proxy.isNull(c.value)){
            try {
              let temp = JSON.parse(c.value)
              a.control.push(temp)
            } catch (error) {
              console.error("解析失败:", error.message)
            }
          }
        })
      } else{
        let templateControls = publicStore._public.templateControls.filter(b=>b.sensor_type == a.type)
        if(!proxy.isNull(templateControls)){
          templateControls.forEach(c => {
            if(!proxy.isNull(c.calcRuleExpres)){
              try {
                let temp = JSON.parse(c.calcRuleExpres)
                a.control.push(temp)
              } catch (error) {
                console.error("解析失败:", error.message)
              }
            }
          })
        }
      }
      // 实时
      return "mo:Hash:sensor:" + a.id;
    });
    getDevicesData();
    getDevicesDailyOutput1();
    getDevicesOutputPower1();
    getDevicesDailyOutput2();
    getDevicesOutputPower2();
  };

  // 实时请求设置信息
  const getDevicesData = async() => {
    if (!proxy.isNull(publicStore._public.devices)){
      let params = {getApi: state.query}
      let res = await publicStore.http(params)
      let homeInfo = {}
      let homeDevices = []
      publicStore._public.devices.forEach(vv => {
        // 重置实时
        let device =  Object.assign({}, vv)
        let redis_exist = res.find(a=>a.sensor_id == vv.id)
        let redis_data = redis_exist? redis_exist : {}
        Object.assign(device, redis_data)
        if(device.isAlarm) device.alarm = device.isAlarm>0? '1' : '0'
        setData(homeInfo, redis_data)
        // 获取设备
        homeDevices.push(device)
      })
      publicStore._public.homeInfo = homeInfo
      publicStore._public.homeDevices = homeDevices
      // console.log("publicStore._public.homeInfo---", publicStore._public.homeInfo)
      // console.log("publicStore._public.homeDevices---", publicStore._public.homeDevices)
    } else{
      publicStore._public.homeInfo = {};
      publicStore._public.homeDevices = [];
    }
  }

  // 设置数据
  const setData = (info, data) => {
    info['sum'] = !info['sum'] ? 1 : info['sum'] + 1
    Object.keys(data).forEach((key)=>{
      if (key.indexOf('_tc')==-1 && (typeof data[key] === 'number' || (typeof data[key] === 'string' && data[key].trim() !== '' && !isNaN(Number(data[key].trim()))))) {
        if(key == 'timestamp'){
          // 最大
          if(!info[key] || info[key] && info[key]<data[key]) info[key] = data[key]
        }else{
          // 累计
          info[key] = !info[key] ? Number(data[key]) : Number(info[key]) + Number(data[key])
        }
        // 工况
        if(key == 'offline') {
          info[key+data[key]] = !info[key+data[key]] ? 1 : info[key+data[key]] + 1
        }
        // 告警
        if(key == 'isAlarm') {
          if(data[key] > 0) info['alarm1'] = !info['alarm1'] ? 1 : info['alarm1'] + 1
          if(data[key] == 0) info['alarm0'] = !info['alarm0'] ? 1 : info['alarm0'] + 1
        }
        // 运行状态
        if(key == 'Operation_State') {
          info[key+data[key]] = !info[key+data[key]] ? 1 : info[key+data[key]] + 1
        }
      } 
    })
  }

  // 发电量1
  const getDevicesDailyOutput1 = async() => {
    let name = 'DevicesDailyOutput1'
    let code = "Daily_Output"
    let chart = [{name: '发电量', code: code, data: []}]
    if (!proxy.isNull(publicStore._public.devices)){
      let query = getCodeQuery1(code)
      // let res = await publicStore.http({ Api1: query })
      api.Api1(query).then(res=>{
        let list = proxy.isNull(res.data)? [] : res.data
        let timekey = !proxy.isNull(publicStore.active) && publicStore.active.parent_id == '0'?'date':'date'
        list.forEach((v, i)=> {
          let value = Math.floor(100*Number(v.value))/100
          let timestamp = v[timekey]
          let time = proxy.parseTime(timestamp, '{m}-{d} {h}:{i}:{s}')
          let item = [time, value, timestamp]
          let exist = chart[0].data.find(a=>a[0]==time)
          v[code] = value
          if(exist){
            exist[1] += value
          }else{
            chart[0].data.unshift(item)
          }
        })
        publicStore._public[name] = chart
      }).catch((err:any) => {
        console.log('err', err)
      })
    } 
  }

  // 发电功率1
  const getDevicesOutputPower1 = async() => {
    let name = 'DevicesOutputPower1'
    let code = "Output_Power"
    let chart = [{name: '实际功率', code: code, data: []}]
    if (!proxy.isNull(publicStore._public.devices)){
      let query = getCodeQuery1(code)
      // let res = await publicStore.http({ Api1: query })
      api.Api2(query).then(res=>{
        let list = proxy.isNull(res.data)? [] : res.data
        let timekey = !proxy.isNull(publicStore.active) && publicStore.active.parent_id == '0'?'date':'date'
        list.forEach((v, i)=> {
          let value = Math.floor(100*Number(v.value))/100
          let timestamp = v[timekey]
          let time = proxy.parseTime(timestamp, '{m}-{d} {h}:{i}:{s}')
          let item = [time, value, timestamp]
          let exist = chart[0].data.find(a=>a[0]==time)
          v[code] = value
          if(exist){
            exist[1] += value
          }else{
            chart[0].data.unshift(item)
          }
        })
        publicStore._public[name] = chart
      }).catch((err:any) => {
        console.log('err', err)
      })
    } 
  }

  // 发电量2
  const getDevicesDailyOutput2 = async() => {
    let name = 'DevicesDailyOutput2'
    let code = "Daily_Output"
    let chart = [{name: '发电量', code: code, data: []}]
    if (!proxy.isNull(publicStore._public.devices)){
      let query = getCodeQuery1(code)
      // let res = await publicStore.http({ Api1: query })
      api.Api3(query).then(res=>{
        let list = proxy.isNull(res.data)? [] : res.data
        let timekey = !proxy.isNull(publicStore.active) && publicStore.active.parent_id == '0'?'date':'date'
        list.forEach((v, i)=> {
          let value = Math.floor(100*Number(v.value))/100
          let timestamp = v[timekey]
          let time = proxy.parseTime(timestamp, '{m}-{d} {h}:{i}:{s}')
          let item = [time, value, timestamp]
          let exist = chart[0].data.find(a=>a[0]==time)
          v[code] = value
          if(exist){
            exist[1] += value
          }else{
            chart[0].data.unshift(item)
          }
        })
        publicStore._public[name] = chart
      }).catch((err:any) => {
        console.log('err', err)
      })
    } 
  }

  // 发电功率2
  const getDevicesOutputPower2 = async() => {
    let name = 'DevicesOutputPower2'
    let code = "Output_Power"
    let chart = [{name: '实际功率', code: code, data: []}]
    if (!proxy.isNull(publicStore._public.devices)){
      let query = getCodeQuery1(code)
      // let res = await publicStore.http({ Api1: query })
      api.Api4(query).then(res=>{
        let list = proxy.isNull(res.data)? [] : res.data
        let timekey = !proxy.isNull(publicStore.active) && publicStore.active.parent_id == '0'?'date':'date'
        list.forEach((v, i)=> {
          let value = Math.floor(100*Number(v.value))/100
          let timestamp = v[timekey]
          let time = proxy.parseTime(timestamp, '{m}-{d} {h}:{i}:{s}')
          let item = [time, value, timestamp]
          let exist = chart[0].data.find(a=>a[0]==time)
          v[code] = value
          if(exist){
            exist[1] += value
          }else{
            chart[0].data.unshift(item)
          }
        })
        publicStore._public[name] = chart
      }).catch((err:any) => {
        console.log('err---err', err)
      })
    } 
  }

  // 获取测点参数1
  const getCodeQuery1 = (code) => {
    let query = {}
    let limit = 20
    if(!proxy.isNull(publicStore.active) && publicStore.active.parent_id == '0'){
      let args = `code IN ('${code}') and station_num='${publicStore.active.id}' and type='${state.type1}'`
      if(!proxy.isNull(state.datetime)) args += ` and date>='${state.datetime.start}' and date<='${state.datetime.end}'`
      query = { model: "t_sensor_measure_float_station", order: "date desc", limit: limit, args: args }
    } else {
      let args = `code IN ('${code}') and bay_num='${publicStore.active.id}' and type='${state.type1}'`
      if(!proxy.isNull(state.datetime)) args += ` and timestamp>='${state.datetime.start}' and timestamp<='${state.datetime.end}'`
      query = { model: "t_sensor_measure_float_bay", order: "date desc", limit: limit, args: args }
    }
    return query
  }

  // 获取测点参数2
  const getCodeQuery2 = (code) => {
    let query = {}
    let limit = 20
    if(!proxy.isNull(publicStore.active) && publicStore.active.parent_id == '0'){
      let args = `code IN ('${code}') and station_num='${publicStore.active.id}' and type='${state.type2}'`
      if(!proxy.isNull(state.datetime)) args += ` and date>='${state.datetime.start}' and date<='${state.datetime.end}'`
      query = { model: "t_sensor_measure_float_station", order: "date desc", limit: limit, args: args }
    } else {
      let args = `code IN ('${code}') and bay_num='${publicStore.active.id}' and type='${state.type2}'`
      if(!proxy.isNull(state.datetime)) args += ` and timestamp>='${state.datetime.start}' and timestamp<='${state.datetime.end}'`
      query = { model: "t_sensor_measure_float_bay", order: "date desc", limit: limit, args: args }
    }
    return query
  }
</script>

<style lang="scss">
 
</style>
