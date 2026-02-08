<template>
  <div class="topclass">
    <el-dialog v-model="state.isFalse" :title="state.title" :before-close="onVisable" :draggable="true" :destroy-on-close="true" width="80%">
      <div class="layout-col plr20 pt20 white">
        <!-- 头部 -->
        <div class="ww100 flex-col p20 rad5 ba1">
          <div class="ww100 flex-sc">
            <div class="flex-sc w100x3">
              <img class="w60" src="@/assets/imgs/zz1.png" />
              <div class="flex-col-ss ml20">
                <div class="f20">{{ state.form.name }}</div>
                <div class="flex-sc mt10">
                    <div class="bgi5 rad20 ptb3 plr10 f12">{{ find(customerTypes, ['value', state.form.type], 'name') }}</div>
                    <div class="i15 f12 ml20" v-if="state.form.updtime">更新：{{ state.form.updtime }}</div>
                </div>
              </div>
            </div>
            <div class="w2 h70 mlr30" style="background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 100% )"></div>
            <div class="flex1 flex-sc warp i15">
              <div class="flex-sc ww25 mtb7">
                <span>额定容量：</span>
                <span class="white">{{ state.form.capacity }}</span>
              </div>
              <div class="flex-sc ww25 mtb7">
                <span>户号内容：</span>
                <span class="white">{{ state.form.account_name }}</span>
              </div>
              <div class="flex-sc ww25 mtb7">
                <span>联系方式：</span>
                <span class="white">{{ state.form.contact_phone }}</span>
              </div>  
              <div class="flex-sc ww25 mtb7">
                <span>所属地区：</span>
                <span class="white">{{ state.form.area }}</span>
              </div>  
              <div class="flex-sc ww25 mtb7">
                <span>电表编号：</span>
                <span class="white">{{ state.form.electricity_code }}</span>
              </div>
              <div class="flex-sc ww25 mtb7">
                <span>供电单位：</span>
                <span class="white">{{ find(companys, ['value', state.form.power_company], 'name') }}</span>
              </div>  
              <div class="flex-sc ww25 mtb7">
                <span>联系邮箱：</span>
                <span class="white">{{ state.form.contact_email }}</span>
              </div> 
              <div class="flex-sc ww25 mtb7">
                <span>联系地址：</span>
                <span class="white">{{ state.form.contact_address }}</span>
              </div>  
            </div>
          </div>
          <div class="ww100 flex-ss i15 mt20">
            <span>主营业务：</span>
            <span class="flex1">{{ state.form.describe }}</span>
          </div>
        </div>
        <!-- 响应详情 -->
        <div class="layout-col mt20">
          <!-- 标题 -->
          <div class="h40 ww100 flex-sc relative mb5">
            <img class="hh100" src="@/assets/imgs/title3.png" />
            <div class="ww100 hh100 flex-sc absolute pl35">
              <span class="fw flex1 ptb5">响应详情</span>
              <div class="flex-ec flex1"></div>
            </div>
          </div>
          <!-- 统计 -->
          <div class="ww100 flex-sc relative mb10">
            <div class="flex1 pr10">
              <div class="ww100 flex-sc bs4 p20">
                <img class="w50" src="@/assets/imgs/zz2.png" />
                <span class="ml15">响应次数</span>
                <span class="flex1 tr fw f20">5<span class="ml8 f12 i15">个</span></span>
              </div>
            </div>
            <div class="flex1 pr10">
              <div class="ww100 flex-sc bs4 p20">
                <img class="w50" src="@/assets/imgs/zz3.png" />
                <span class="ml15">设备数量</span>
                <span class="flex1 tr fw f20">{{ state.data.key1?state.data.key1:'0' }}<span class="ml8 f12 i15">个</span></span>
              </div>
            </div>
            <div class="flex1 pr10">
              <div class="ww100 flex-sc bs4 p20">
                <img class="w50" src="@/assets/imgs/zz4.png" />
                <span class="ml15">装机容量</span>
                <span class="flex1 tr fw f20">2500<span class="ml8 f12 i15">kW</span></span>
              </div>
            </div>
            <div class="flex1 pr10">
              <div class="ww100 flex-sc bs4 p20">
                <img class="w50" src="@/assets/imgs/zz5.png" />
                <span class="ml15">响应量总电量</span>
                <span class="flex1 tr fw f20">5<span class="ml8 f12 i15">kWh</span></span>
              </div>
            </div>
          </div>
          <!-- 内容 -->
          <div class="flex-col-ss ww100 h100x3 ptb20">
            <div class="hh100 ww100" id="Line_responsesEnv1" v-if="state.active==1"></div>
            <div class="hh100 ww100" id="Line_responsesEnv2"  v-if="state.active==2"></div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import ec from "@/utils/chart";
  const { drawChart } = ec();
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const state = reactive({
	  ...publicStore.$state,
    title: '客户详情',
    active: '1',
    actives: [
      {value: '1', name: '执行情况'},
      {value: '2', name: '日负荷情况'},
    ]
  })
  const emit = defineEmits(['init'])
  const invi_types = [
    {value: '0', name: '填谷', color: 'i15'},
    {value: '1', name: '填谷', color: 'i15'},
    {value: '2', name: '填谷', color: 'i15'},
  ]
  const time_types = [
    {value: '0', name: '约时', color: 'i15'},
    {value: '1', name: '约时', color: 'i15'},
    {value: '2', name: '约时', color: 'i15'},
  ]
  const statuss = [
    {value: '0', name: '待邀约', color: 'i6'},
    {value: '1', name: '待确认', color: 'i6'},
    {value: '2', name: '待执行', color: 'i6'},
    {value: '3', name: '正在执行', color: 'i12'},
    {value: '4', name: '执行完成', color: 'i15'},
  ]
  const customerTypes = [
    {name: '工业用户', value: '1'},
    {name: '商业用户', value: '2'},
    {name: '事业单位', value: '3'},
    {name: '居民用户', value: '4'},
  ]
  const companys = [
    {name: '亮能售电有限公司', value: '1'},
    {name: '广林汇智能源科技有限公司', value: '2'},
    {name: '渝北制造厂', value: '3'},
  ]

  // 打开关闭弹窗
  const onVisable = async (val) => {
    publicStore._public.responsesEnv1 = ''
    publicStore._public.responsesEnv2 = ''
    publicStore.rechart('Line_responsesEnv1')
    publicStore.rechart('Line_responsesEnv2')
    state.isFalse = !state.isFalse
    if(!state.isFalse) return
    state.form = {...val}
    init()
  }

  const init = async () => {
    publicStore._public.responsesEnv1 = [
      {name: '基线负荷', data: [['11:30', 2750], ['12:00', 2780],['12:30', 2680]]}, 
      {name: '出清价格', data: [['11:30', 3.8], ['12:00', 3.9],['12:30', 3.8]]},
      {name: '目标负荷', data: [['11:30', 210], ['12:00', 220],['12:30', 180]]},
    ]
    publicStore._public.responsesEnv2 = [
      {name: '', data: [['00:00', 2800], ['00:30', 2750],['01:00', 2700], ['01:30', 2650],['02:00', 2600], ['02:30', 2550],['03:00', 2500], ['03:30', 2500],['04:00', 2500], ['04:30', 2550],['05:00', 2600], ['05:30', 2700],['06:00', 2850], ['06:30', 3050],['07:00', 3300], ['07:30', 3600],['08:00', 3900], ['08:30', 4200],['09:00', 4500], ['09:30', 4700],['10:00', 4800], ['10:30', 4850],['11:00', 4800], ['11:30', 4700],['12:00', 4500], ['12:30', 4300],['13:00', 4100], ['13:30', 3900],['14:00', 3700], ['14:30', 3500],['15:00', 3300], ['15:30', 3100],['16:00', 2900], ['16:30', 2700],['17:00', 2500], ['17:30', 2700],['18:00', 3000], ['18:30', 3300],['19:00', 3600], ['19:30', 3900],['20:00', 4200], ['20:30', 4400],['21:00', 4500], ['21:30', 4500],['22:00', 4400], ['22:30', 4200],['23:00', 3900], ['23:30', 3600]]}, 
    ]
  }

  watch(() => state.active, async(val, old) => {
    if(state.active == 1){
      await publicStore.rechart('Line_responsesEnv1')
      await nextTick();
      setChart1(publicStore._public.responsesEnv1);
    }
    if(state.active == 2){
			await publicStore.rechart('Line_responsesEnv2')
      await nextTick();
      setChart2(publicStore._public.responsesEnv2);
    }
  }, { immediate: false, deep: true });

  watch(() => publicStore._public.responsesEnv1, async(val, old) => {
    if(state.active==2) return
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart1(val);
  }, { immediate: false, deep: true });

  watch(() => publicStore._public.responsesEnv2, async(val, old) => {
    if(state.active==1) return
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart2();
  }, { immediate: false, deep: true });

	const setChart1 = async(data) => {
		let chart = 'Line'
		let id = 'Line_responsesEnv1'
    let attr = {
			min: 0, 
			// max: 100,
      min2: 0,
      max2: 10,
			colorList: [],
			legendArr: [],
			legendX: 'center',
			legendShow: true,
			labelShow: false,
			areaShow: false,
			y_name: 'kW',
      y_name2: '元/kWh',
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
		// let series = data.map((v, i) => {
		// 	attr.legendArr.push(v.name)
		// 	return {data: v.data}
		// })
		// drawChart(chart, id, attr, {series: series, xAxis: {}}, {});
    let datas = []
    let series = {data: []}
    series = data.map(v => {
      datas = [...datas, ...v.data]
      attr.legendArr.push(v.name)
      let data = v.data
      return {data}
    })
    let xAxis = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00','13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
    let tempDatas = datas.sort((a, b) => a[2] - b[2])
    // 处理所有待插入的时间点
    tempDatas.forEach(time => {
      xAxis = insertTime(xAxis, time[0]);
    });
    drawChart(chart, id, attr, {series: series, xAxis: {data: xAxis}}, {});
	}

	const setChart2 = async(data) => {
		let chart = 'Line'
		let id = 'Line_responsesEnv2'
    let attr = {
			min: 0, 
			// max: 100,
			colorList: [],
			legendArr: [],
			legendX: 'center',
			legendShow: true,
			labelShow: false,
			areaShow: false,
			y_name: 'kW',
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
		// let series = data.map((v, i) => {
		// 	attr.legendArr.push(v.name)
		// 	return {data: v.data}
		// })
		// drawChart(chart, id, attr, {series: series, xAxis: {}}, {});
   let datas = []
    let series = {data: []}
    series = data.map(v => {
      datas = [...datas, ...v.data]
      attr.legendArr.push(v.name)
      let data = v.data
      return {data}
    })
    let xAxis = []
    let tempDatas = datas.sort((a, b) => a[2] - b[2])
    tempDatas.forEach(v => {
      let x = xAxis.find(a=>a == v[0])
      if(!x) xAxis.push(v[0])
    })
    drawChart(chart, id, attr, {series: series, xAxis: {data: xAxis}}, {});
	}

  // 将时间字符串转换为分钟数方便比较
  function timeToMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }

  // 在有序数组中插入新时间点（保持排序）
  function insertTime(sortedArray, newTime) {
    const newTimeMinutes = timeToMinutes(newTime);
    
    // 如果时间已存在，则不插入
    if (sortedArray.includes(newTime)) {
      return sortedArray;
    }
    
    // 找到插入位置
    let insertIndex = sortedArray.findIndex(time => {
      return timeToMinutes(time) > newTimeMinutes;
    });
    
    // 如果没找到（新时间最大），则插入到最后
    if (insertIndex === -1) {
      insertIndex = sortedArray.length;
    }
    
    // 插入新时间点
    sortedArray.splice(insertIndex, 0, newTime);
    return sortedArray;
  }

  // 暴露给父组件
  defineExpose({
    onVisable,
  })
</script>

<style scoped lang="scss">
  :deep(input:-webkit-autofill) {
    -webkit-text-fill-color: #f5f5f5 !important;
  }
  :deep(.el-dialog){
    border-radius: 0;
  }
  :deep(.el-dialog__header){
    border-radius: 0;
  }
  :deep(.el-dialog__body){
    padding: 0;
    height: calc(100% - 60px);
  }
</style>
