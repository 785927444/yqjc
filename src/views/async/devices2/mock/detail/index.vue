<template>
  <div class="layout-col">
    <t1 class="mb15" />
    <b1 />
    <div class="flex-ec mt15 bgi22 plr15 ptb10">
      <div class="ptb6 plr12 rad2 bgi1 cursor" @click.stop="publicStore._public.active = {}">返回页面</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
	import t1 from './t1'
	import b1 from './b1'
  import scheduled from "@/utils/scheduled";
  const { createScheduled } = scheduled();
  const { proxy }: any = getCurrentInstance();
  const configStore = proxy.configStore();
  const publicStore = proxy.publicStore();
  const state = reactive({
    ...publicStore.$state,
    today: {}
  });

  onMounted(async () => {
    await getInit();
    createScheduled("mock_control", 3 * 1000, () => {
      getDevicesData();
      getPhotovoltaicPower();
      getWindPower();
      getOutPower();
      getWakeLoss();
    });
  });

	onBeforeUnmount(async() => {
		publicStore._public.PhotovoltaicPower = ''
		publicStore._public.OutputPower = ''
    publicStore._public.WindPower = ''
    publicStore._public.WakeLoss = ''
		publicStore.rechart()
	})

  watch(() => publicStore.active, async (val) => {
    if(proxy.isNull(val)) return
    getDevices();
  },{ immediate: false, deep: true });

  watch(() => publicStore._public.init, async (val) => {
    getDevices();
  },{ immediate: false, deep: true });

  const getInit = async (key) => {
    // 获取今日时间
    const today = new Date();
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0); // 精确到毫秒为 0
    const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999); // 精确到毫秒为 999
    state.today.start = startOfToday.getTime(); // 开始时间的时间戳
    state.today.end = endOfToday.getTime();     // 结束时间的时间戳
    let type = `'photovoltaic', 'wind'`
    let query = proxy.isNull(configStore.distributId) || configStore.distributId=='0'? { model: "t_sensor", args: `type IN (${type})`} : { model: "t_sensor", args: `stationNum='${configStore.distributId}' and type IN (${type})`}
    let res = await publicStore.http({ Api: query })
    publicStore._public.allDevices = proxy.isNull(res)? [] : res
    publicStore._public.Devices1 = publicStore._public.allDevices.filter(a=>a.type == 'photovoltaic')
    publicStore._public.Devices2 = publicStore._public.allDevices.filter(a=>a.type == 'wind')
    getDevices()

  };

  const getDevices = async () => {
    if(proxy.isNull(publicStore._public.allDevices)) return
    state.query = {model: "redis"}
    state.ids = []
    state.query.key = publicStore._public.allDevices.map((a) => {
      // ids
      let id = state.ids.find(b=>b == a.id)
      if(!id) state.ids.push(a.id)
      // 实时
      return "mo:Hash:sensor:" + a.id;
    });
    getDevicesData();
    getPhotovoltaicPower();
    getWindPower();
    getOutPower();
    getWakeLoss();
  };

  // 实时请求设置信息
  const getDevicesData = async() => {
    if (!proxy.isNull(publicStore._public.allDevices)){
      let params = {getApi: state.query}
      let res = await publicStore.http(params)
      let homeInfo = {}
      let homeDevices = []
      let homeInfo1 = {}
      let homeDevices1 = []
      let homeInfo2 = {}
      let homeDevices2 = []   
      publicStore._public.allDevices.forEach(vv => {
        let device =  Object.assign({}, vv)
        let redis_exist = res.find(a=>a.sensor_id == vv.id)
        let redis_data = redis_exist? redis_exist : {}
        Object.assign(device, redis_data)
        if(device.isAlarm) device.alarm = device.isAlarm>0? '1' : '0'
        if(vv.type == 'photovoltaic'){
          setData(homeInfo1, redis_data)
          homeDevices1.push(device)
        }
        if(vv.type == 'wind'){
          setData(homeInfo2, redis_data)
          homeDevices2.push(device)
        }
        setData(homeInfo, redis_data)
        homeDevices.push(device)
      })
      publicStore._public.homeInfo = homeInfo
      publicStore._public.homeDevices = homeDevices
      publicStore._public.homeInfo1 = homeInfo1
      publicStore._public.homeDevices1 = homeDevices1
      publicStore._public.homeInfo2 = homeInfo2
      publicStore._public.homeDevices2 = homeDevices2
      // console.log("publicStore._public.homeInfo---", publicStore._public.homeInfo)
      // console.log("publicStore._public.homeDevices---", publicStore._public.homeDevices)
    } else{
      publicStore._public.homeInfo = {};
      publicStore._public.homeDevices = [];
      publicStore._public.homeInfo1 = {};
      publicStore._public.homeDevices1 = [];
      publicStore._public.homeInfo2 = {};
      publicStore._public.homeDevices2 = [];
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

  // 日光伏发电
  const getPhotovoltaicPower = async() => {
    if (!proxy.isNull(publicStore._public.Devices1)){
      let name = 'PhotovoltaicPower'
      let code1 = "Daily_Output"
      let code2 = "Irradiation"
      let code = `'${code1}','${code2}'`
      let num = 100
      let length = publicStore._public.Devices1.length
      let limit = num * length > 500? 500 : num * length
      let idss = [...new Set(publicStore._public.Devices1.filter(a => a.id).map(a => a.id))]
      let ids = idss.map(a => `'${a}'`).join(',')
      let query = { model: "t_sensor_measure_float", order: "timestamp desc", limit: limit, args: `measurement_code IN (${code}) and sensor_id IN (${ids}) and timestamp>='${state.today.start}' and timestamp<='${state.today.end}'`}
      let res = await publicStore.http({ Api: query })
      let list = proxy.isNull(res)? [] : res
      let chart = [
        {name: '日发电量', code: code1, data: []},
        {name: '辐照强度', code: code2, data: []}
      ]
      list.forEach((v, i)=> {
        let value = Math.floor(100*Number(v.value))/100
        let time = proxy.parseTime(v.timestamp, '{m}-{d} {h}:{i}:{s}')
        let item = [time, value, v.timestamp]
        let chartTemp = chart.find(a=>a.code == v.measurement_code) 
        if(chartTemp){
          let exist = chartTemp.data.find(a=>a[0]==time)
          v[code] = value
          if(exist){
            exist[1] += value
          }else{
            chartTemp.data.unshift(item)
          }
        }
      })
      publicStore._public[name] = chart
    } else{
      publicStore._public[name] = [{name: '', data: []}];
    }
  }

  // 日风机发电
  const getWindPower = async() => {
    if (!proxy.isNull(publicStore._public.Devices2)){
      let name = 'WindPower'
      let code1 = "Daily_Output"
      let code2 = "Speed"
      let code = `'${code1}','${code2}'`
      let num = 100
      let length = publicStore._public.Devices2.length
      let limit = num * length > 500? 500 : num * length
      let idss = [...new Set(publicStore._public.Devices2.filter(a => a.id).map(a => a.id))]
      let ids = idss.map(a => `'${a}'`).join(',')
      let query = { model: "t_sensor_measure_float", order: "timestamp desc", limit: limit, args: `measurement_code IN (${code}) and sensor_id IN (${ids}) and timestamp>='${state.today.start}' and timestamp<='${state.today.end}'`}
      let res = await publicStore.http({ Api: query })
      let list = proxy.isNull(res)? [] : res
      let chart = [
        {name: '日发电量', code: code1, data: []},
        {name: '风速测量', code: code2, data: []}
      ]
      list.forEach((v, i)=> {
        let value = Math.floor(100*Number(v.value))/100
        let time = proxy.parseTime(v.timestamp, '{m}-{d} {h}:{i}:{s}')
        let item = [time, value, v.timestamp]
        let chartTemp = chart.find(a=>a.code == v.measurement_code) 
        if(chartTemp){
          let exist = chartTemp.data.find(a=>a[0]==time)
          v[code] = value
          if(exist){
            exist[1] += value
          }else{
            chartTemp.data.unshift(item)
          }
        }
      })
      publicStore._public[name] = chart
    } else{
      publicStore._public[name] = [{name: '', data: []}];
    }
  }

  // 日发电功率
  const getOutPower = async() => {
    if (!proxy.isNull(publicStore._public.allDevices)){
      let name = 'OutputPower'
      let code = "Output_Power"
      let num = 100
      let length = publicStore._public.allDevices.length
      let limit = num * length > 500? 500 : num * length
      let ids = state.ids.map(a => `'${a}'`).join(',')
      let query = { model: "t_sensor_measure_float", order: "timestamp desc", limit: limit, args: `measurement_code='${code}' and sensor_id IN (${ids}) and timestamp>='${state.today.start}' and timestamp<='${state.today.end}'`}
      let res = await publicStore.http({ Api: query })
      let list = proxy.isNull(res)? [] : res
      let chart = [
        {name: '光伏', type: 'photovoltaic', data: []},
        {name: '风机', type: 'wind', data: []},
      ]
      list.forEach((v, i)=> {
        let value = Math.floor(100*Number(v.value))/100
        let time = proxy.parseTime(v.timestamp, '{m}-{d} {h}:{i}:{s}')
        let item = [time, value, v.timestamp]
        let sensor = publicStore._public.allDevices.find(a=>a.id == v.sensor_id)
        let chartTemp = chart.find(a=>a.type == sensor.type) 
        if(chartTemp){
          let exist = chartTemp.data.find(a=>a[0]==time)
          v[code] = value
          if(exist){
            exist[1] += value
          }else{
            chartTemp.data.unshift(item)
          }
        }
      })
      publicStore._public[name] = chart
    } else{
      publicStore._public[name] = [{name: '日发电功率', data: []}];
    }
  }

  // 日风机尾流损失
  const getWakeLoss = async() => {
    if (!proxy.isNull(publicStore._public.Devices2)){
      let name = 'WakeLoss'
      let code1 = "Wake_Loss"
      let code2 = "Speed"
      let code = `'${code1}','${code2}'`
      let num = 100
      let length = publicStore._public.Devices2.length
      let limit = num * length > 500? 500 : num * length
      let idss = [...new Set(publicStore._public.Devices2.filter(a => a.id).map(a => a.id))]
      let ids = idss.map(a => `'${a}'`).join(',')
      let query = { model: "t_sensor_measure_float", order: "timestamp desc", limit: limit, args: `measurement_code IN (${code}) and sensor_id IN (${ids}) and timestamp>='${state.today.start}' and timestamp<='${state.today.end}'`}
      let res = await publicStore.http({ Api: query })
      let list = proxy.isNull(res)? [] : res
      let chart = [
        {name: '尾流损失', code: code1, data: []},
        {name: '风速测量', code: code2, data: []}
      ]
      list.forEach((v, i)=> {
        let value = Math.floor(100*Number(v.value))/100
        let time = proxy.parseTime(v.timestamp, '{m}-{d} {h}:{i}:{s}')
        let item = [time, value, v.timestamp]
        let chartTemp = chart.find(a=>a.code == v.measurement_code) 
        if(chartTemp){
          let exist = chartTemp.data.find(a=>a[0]==time)
          v[code] = value
          if(exist){
            exist[1] += value
          }else{
            chartTemp.data.unshift(item)
          }
        }
      })
      publicStore._public[name] = chart
    } else{
      publicStore._public[name] = [{name: '', data: []}];
    }
  }
</script>

<style lang="scss">
 
</style>
