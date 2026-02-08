<template>
  <!-- 生成弹窗 -->
  <div class="topclass">
    <el-dialog v-model="state.isFalse" :title="state.title" :width="state.width" :draggable="true" :destroy-on-close="true" :before-close="onClose">
      <div class="ww100  hidden relative white flex-col" v-if="['comm_1', 'comm_2'].includes(publicStore.active.type)">
        <div class="plr25 pt25 pb10 f20 i15">是否确认生成任务？</div>
        <div class="ww100 flex-ec p15">
          <el-button size="large" type="info" class="i23 bg-white" @click="onVisable">取 消</el-button>
          <el-button size="large" type="info" class="white bgi22" @click.stop="handleExecute()">确定生成</el-button>
        </div>
      </div>
      <div class="ww100 h100x6 hidden relative white flex-sc" v-else>
        <div class="flex3 hh100 flex-col ba1">
          <div class="ww100 flex-sc p10" v-if="!isNull(publicStore.active) && !isNull(publicStore.active.attr)">
            <div v-if="!isNull(publicStore.active.attr.childs)">
              <div v-if="publicStore.active.type.indexOf('unit')!=-1 || (publicStore.active.type.indexOf('unit')==-1  && publicStore.active.attr.fields.length<1)" class="flex-sc cursor bgi16 ptb8 plr12 rad2 mr15" @click.stop="publicStore.active.attr.fields = !isNull(publicStore.active.attr.fields)?  [...publicStore.active.attr.fields, ...[{datetime: [], type: '', code: '', value: ''}]]: [{datetime: [], type: '', code: '', value: ''}]">
                <i-ep-plus class="f12 fw mr5" />
                <span>控制时段</span>
              </div>
              <div v-else class="flex-sc cursor bg-white i16 ptb8 plr12 rad2 mr15">
                <i-ep-plus class="f12 fw mr5" />
                <span>控制时段</span>
              </div>
            </div> 
            <div v-else class="flex-sc cursor bg-white i16 ptb8 plr12 rad2 mr15">
              <i-ep-plus class="f12 fw mr5" />
              <span>控制时段</span>
            </div>
          </div>
          <!-- 底部 -->
		      <aa-foot></aa-foot>
          <div class="row bgi22">
            <!-- <div class="flex1">设备类型</div> -->
            <div class="flex1">选择时间</div>
            <!-- <div class="w50x3">控制点</div> -->
            <div class="w50x3" v-if="['unit_7', 'unit_8'].includes(publicStore.active.type)">调节至温度(℃)</div>
            <div class="w50x3" v-else-if="['unit_1', 'unit_2', 'unit_3', 'unit_4', 'unit_5', 'unit_6'].includes(publicStore.active.type)">调节至功率(kW)</div>
            <div class="w50x3" v-else>调节功率(kW)</div>
            <span class="w50 tc">操作</span>
          </div>
          <div class="table ba1" style="max-height: 100%; height: auto;" v-if="!isNull(publicStore.active) && !isNull(publicStore.active.attr) && !isNull(publicStore.active.attr.childs) && !isNull(publicStore._public) && !isNull(publicStore._public.childs)">
            <div class="row cursor" v-for="(item, index) in !isNull(publicStore._public.childs) && !isNull(publicStore.active.attr.fields)?publicStore.active.attr.fields:[]" :key="index" :class="index%2 == 1?'bgi23':'bgi18'">
              <!-- <div class="flex1">
                <el-select style="width: 100%" v-model="item['type']" placeholder="请选择" clearable filterable @change="item.code='';item.value=''">
                  <el-option v-for="(v, i) in publicStore._public.childs" :key="v.type" :label="v.name" :value="v.type" />
                </el-select>
              </div> -->
              <div class="flex1">
                <el-date-picker style="width: 100%" v-model="item['datetime']" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"type="datetimerange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
              </div>
              <!-- <div class="w50x3">
                <el-select style="width: 100%" v-model="item['code']" placeholder="请选择" clearable filterable @change="item.value=''">
                  <el-option v-for="(v, i) in find(publicStore._public.childs, ['type', item['type']], 'controls')" :key="v.code" :label="v.name" :value="v.code" />
                </el-select>
              </div> -->
              <div class="w50x3">
                <div class="ww100" v-if="item['code']" v-for="(v, i) in find(publicStore._public.childs, ['type', item['type']], 'controls')" :key="i">
                  <div class="ww100" v-if="item['code'] == v.code">
                    <div v-if="!isNull(v.action) && v.value_type">
                      <!-- 计数 -->
                      <el-input v-if="v.value_type=='count'" type="number" style="width: 100%" v-model="item['value']" placeholder="请输入" />
                      <el-select v-else-if="v.value_type=='mode'" style="width: 100%" v-model="item['value']" placeholder="请选择" clearable filterable>
                        <el-option v-for="(v, i) in v.action" :key="v.action_code" :label="v.action_name" :value="v.action_code" />
                      </el-select>
                      <el-input v-else type="number" style="width: 100%" v-model="item['value']" placeholder="请输入" />
                    </div>
                    <el-input v-else type="number" style="width: 100%" v-model="item['value']" placeholder="请输入" />
                  </div>
                </div>
                <el-input v-else type="number" style="width: 100%" v-model="item['value']" placeholder="请输入" />
              </div>
              <span class="w50 tc">
                <i-ep-delete class="cursor i7" @click.stop = "publicStore.active.attr.fields.splice(index, 1)" />
              </span>
            </div>
            <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
          </div>
        </div>
        <div class="flex4 hh100 flex-col">
          <div class="ww100 flex-sc p10" v-if="!isNull(publicStore.active) && !isNull(publicStore.active.attr) && publicStore.active.type.indexOf('unit')==-1">
            <div v-if="!isNull(publicStore.active.attr.childs) && !isNull(publicStore.active.attr.fields)" class="flex-sc cursor bgi16 ptb8 plr12 rad2 mr15" @click.stop="getMeaChart()">
              <i-ep-view class="f12 fw mr5" />
              <span>查看预测</span>
            </div>
            <div v-else class="flex-sc cursor bg-white i16 ptb8 plr12 rad2 mr15">
              <i-ep-view class="f12 fw mr5" />
              <span>查看预测</span>
            </div>
            <div v-if="publicStore.active.attr.scene && publicStore.active.attr.scene == 'alleviating_heavy_overload'" class="flex-sc cursor bgi16 ptb8 plr12 rad2 mr15" @click.stop="state.isFalse3 = true">
              <i-ep-view class="f12 fw mr5" />
              <span>设置缓解</span>
            </div>
            <div class="flex1 tr fontStyle" v-if="state.errtxt">预测结果：{{ state.errtxt }}</div>
          </div>
          <div class="ww100 flex1 p5 hidden flex-col" element-loading-background="rgba(0, 0, 0, 0.3)" v-loading="state.loading? true : false"  element-loading-text="预测中...">
            <div class="ww100 p8" :class="state.charttype.indexOf('fd')==-1?'':'flex1'">
              <div class="ww100 hh100" id="Line_meas"></div>
            </div>
            <div class="ww100 p8" :class="state.charttype.indexOf('fh')==-1?'':'flex1'">
              <div class="ww100 hh100" id="Line_meas2"></div>
            </div>
            <div class="ww100 p8" :class="publicStore.active.type.indexOf('unit')==-1?'':'flex1'">
              <div class="ww100 hh100" id="Line_meas3"></div>
            </div>
          </div>
          <div class="ww100 flex-ec p15">
            <el-button size="large" type="info" class="i23 bg-white" @click="onVisable">取 消</el-button>
            <el-button size="large" type="info" class="white bgi22" @click.stop="handleExecute()" v-if="publicStore.active.type.indexOf('calc')==-1">确定新建</el-button>
            <el-button size="large" type="info" class="white bgi22" @click.stop="handleScheme()" v-else>生成方案</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <!-- 方案-->
    <el-dialog v-model="state.isFalse2" title="推荐方案" :draggable="true" width="50%">
      <div class="ww100 flex-col white">
				<div class="row bgi22">
					<div :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width">{{v.name}}</div>
				</div>
				<div class="table">
					<div class="ww100 row cursor ce" style="padding: 6px 2px;" :class="index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in state.list?state.list:[]" :key="index" @click="handleClick('active', item)">
						<div v-show="v.show" :class="v.width" :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i">
							<span v-if="typeof(v.key) == 'object'" class="cursor mlr5" :class="kk=='add'||state.auth[kk] == false?'none':'i15'" v-for="(vv, kk, ii) in v.key" :key="ii" @click.stop="handleClick(kk, item)">
									<span v-if="configStore.user.role_id == '1' && kk=='upd'"><i-ep-edit class="f12" /></span>
									<span v-else-if="configStore.user.role_id == '1' && kk=='del'"><i-ep-delete class="f12" /></span>
							</span>
							<div v-else-if="v.key=='-'" class="w14 h14 rad100 m-auto cursor flex-cc p2" :class="!isNull(publicStore.active)&&!isNull(publicStore.active.attr)&&!isNull(publicStore.active.attr.terminal) && publicStore.active.attr.terminal == item.id?'bgi16 white':'bg-white'" @click.stop="handleClick('active', item)">
								<i-ep-select v-if="!isNull(publicStore.active)&&!isNull(publicStore.active.attr)&&!isNull(publicStore.active.attr.terminal) && publicStore.active.attr.terminal == item.id" class="f10" />
							</div>
							<span v-else-if="v.key=='*'">{{(state.page-1)*state.limit + index+1}}</span>
							<span v-else-if="v.type == 'time'">{{item[v.key] == 0?'/':parseTime(item[v.key])}}</span>
							<span v-else-if="v.type == 'select'" :class="find(v.list, [v.value, item[v.key]], 'color')?find(v.list, [v.value, item[v.key]], 'color'):''">
								{{find(v.list, [v.value, item[v.key]], v.label)}}
							</span>
							<span v-else><span>{{isNull(item[v.key]) && v.key!=''? '' : item[v.key]}}</span></span>
						</div>
					</div>
				</div>
      </div>
			<template #footer>
				<div class="dialog-footer mt20">
					<el-button size="large" type="info" class="i23 bg-white" @click="state.isFalse2 = !state.isFalse2">取 消</el-button>
					<el-button size="large" type="info" class="white bgi22" @click.stop="handleExecute()">确定新建</el-button>
				</div>
			</template>
    </el-dialog>
    <!-- 缓解重过载-->
    <el-dialog v-model="state.isFalse3" title="缓解重过载" :draggable="true" width="30%">
      <div class="ww100 flex-sc white p20">
        <span>缓解值：</span>
        <el-input class="flex1" v-model="state.overload_threshold" placeholder="请设置缓解值" type="number" size="large" />
      </div>
			<template #footer>
				<div class="dialog-footer mt20">
					<el-button size="large" type="info" class="i23 bg-white" @click="state.overload_threshold = '';state.isFalse3 = !state.isFalse3">取 消</el-button>
					<el-button size="large" type="info" class="white bgi22" @click="state.isFalse3 = !state.isFalse3">确定</el-button>
				</div>
			</template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import { checkStatus } from '@/utils/system'
  import api from '@/api'
  import ec from "@/utils/chart"
  const { drawChart } = ec()
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const state = reactive({
    ...publicStore.$state,
    setTypes: [
      {name: '光伏设备', ttype: 'fd', type: 'photovoltaic', type2: 'PV'},
      {name: '风机设备', ttype: 'fd', type: 'wind', type2: 'FAN'},
      {name: '储能设备', ttype: 'fh', type: 'energy', type2: 'BAT'},
      {name: '分体空调', ttype: 'fh', type: 'airconditioner', type2: 'SAC'},
      {name: '中央空调', ttype: 'fh', type: 'airconditionerfz', type2: 'CAC'},
      {name: '充电桩',   ttype: 'fh', type: 'charge', type2: 'EV_CHARGER'},
      {name: 'RLC负载',  ttype: 'fh', type: 'RLC', type2: 'RLC_LOAD'},
      {name: '智能电表', ttype: 'fh', type: 'METER', type2: 'SMART_METER'},
    ],
    charttype: '',
  })

  const props = defineProps({
    state: {
      type: [Object, Array],
      default: ()=>{return {}}
    },
  })
  const emit = defineEmits(['init'])

  const onClose = () => {
    state.isFalse = !state.isFalse
    if(!state.isFalse) return
  }

  // 弹窗
  const onVisable = async (val?: any) => {
    state.isFalse = !state.isFalse
    if(!state.isFalse) return
    // 初始化数据
    state.meaChart = []
    state.meaChart2 = []
    state.meaChart3 = []
    publicStore.rechart('Line_meas')
    publicStore.rechart('Line_meas2')
    publicStore.rechart('Line_meas3')
    state.errtxt = ''
    state.charttype = ''
    state.overload_threshold = ''
    publicStore.active.attr.fields = []
		if(['comm_1', 'comm_2'].includes(publicStore.active.type)) {
      state.title = '温馨提示'
      state.width = '30%'
		}else{
      state.title = '设置时段'
      state.width = '70%'
    }
  }

  // 生成方案
  const handleScheme = async() => {
    const check = await checkStatus()
    if(!check.status) return ElNotification({ title: '提示', message: `${check.msg}`, type: 'error' })
    state.isFalse2 = !state.isFalse2
    if(!state.isFalse2) return
    state.list = []
    state.content = [
      { width: 'w70', show: true, align: 'center', key: '*', name: '序号' }, 
      { width: 'flex1', show: true, align: 'left', key: 'devices', name: '设备' }, 
      { width: 'w50x5', show: true, align: 'left', key: 'code', name: '数据类型' }, 
      { width: 'w50x2', show: true, align: 'left', key: 'value', name: '数值' }, 
      { width: 'w50x4', show: true, align: 'left', key: 'time', name: '时间' },
      { width: 'w50x2', show: true, align: 'left', key: 'status', name: '状态' },  
    ]
    state.list = [
      {id: '1', devices: '设备1', code: '', value: '10', time: '2025-12-12 00:00:00', status: '0'},
      {id: '2', devices: '设备2', code: '', value: '10', time: '2025-12-12 00:00:00', status: '0'},
      {id: '3', devices: '设备3', code: '', value: '10', time: '2025-12-12 00:00:00', status: '0'},
    ]
  }

  // 确认任务
	const handleExecute = async() => {
		const check = await checkStatus('2')
		if(!check.status) return ElNotification({ title: '提示', message: `${check.msg}`, type: 'error' })
    let from = {...publicStore.active}
    from.attr = JSON.stringify(from.attr)
    from.model_id = from.id
    from.id = ''
    from.start_time = Date.now() + ''
    from.name = proxy.parseTime(from.start_time) + '-' + from.name 
    from.user_id = configStore.user.id
    from.user_name = configStore.user.name
    from.status = '0'
    let res = await proxy.handleApi('add', from, 't_test_task_execute')
    if(res.code == 200){
      console.log("保存成功")
      // proxy.toPath('/systestdetail2', {type: publicStore.active.type, user_id: configStore.user.id, start_time: from.start_time})
      // return
      let query1 = {model: 't_test_task_execute', args: `user_id='${configStore.user.id}' and start_time='${from.start_time}'`}
      let res1 = await publicStore.http({Api1: query1}) 
      if(!proxy.isNull(res1)){
        let url = '/api/v1.0/p3000/monitorOnline/commFrontEndProcessor/mqtt/query'
        let query2 = {task_id: res1[0]['id']}
        let res2 = await publicStore.http({httpApi: {query: query2, url: url, ip: proxy.getHttp('ip'), port: '19092'}})
        if(!proxy.isNull(res2) && res2.errcode == 0){
          ElNotification({ title: '提示', message: '确认任务成功', type: 'success' })
          // 保留选中状态
          configStore.actIndex = publicStore.active.id
          // 跳转到结果
          proxy.toPath('/systestdetail2', {type: publicStore.active.type, user_id: configStore.user.id, start_time: from.start_time})
        }else{
          ElNotification({ title: '提示', message: '确认任务失败', type: 'error' })
        }
      }
    }else{
      ElNotification({ title: '提示', message: '保存失败', type: 'error' })
    }
	}

  // 请求曲线数据
  const getMeaChart = async (val?: any, type?:string) => {
		const check = await checkStatus('1')
		if(!check.status) return ElNotification({ title: '提示', message: `${check.msg}`, type: 'error' })
    if(publicStore.active.attr.scene && publicStore.active.attr.scene == 'alleviating_heavy_overload' && state.overload_threshold == '') return ElNotification({ title: '提示', message: `请设置缓解`, type: 'error' })
    // if(isNull(configStore.distributId)) return ElNotification({ title: '提示', message: `请选择站点`, type: 'error' }) 
    state.meaChart = []
    state.meaChart2 = []
    publicStore.rechart('Line_meas')
    publicStore.rechart('Line_meas2')
    state.loading = true
    state.charttype = ''
    state.errtxt = ''
    let device_type = []
    let device_list = []
    if(!proxy.isNull(publicStore.active.attr.childs)){
      publicStore.active.attr.childs.forEach(v => {
        if(!v.type) return
        const exits = state.setTypes.find(a=>a.type == v.type)
        if(!exits) return
        if(!state.charttype) state.charttype = exits.ttype
        if(state.charttype && state.charttype!=exits.ttype) state.charttype = 'fd_fh'
        device_type.push(exits.type2)
        if(!proxy.isNull(exits.items)) exits.items.forEach(vv => { device_list.push(vv.sensor_id) })
      })
      device_type = proxy.isNull(device_list)? device_type : []
    }
    const field = publicStore.active.attr.fields[0]
    const query = {
      "region": !proxy.isNull(configStore.distributId)&&configStore.distributId!='0'?configStore.distributId:'76d49f60-30f0-4578-a7d7-f20ff1b89345',
      "time_scale": "real_time",
      "control_target": publicStore.active.attr.scene,
      "overload_threshold": Number(state.overload_threshold),
      "device_info": { "device_type": device_type, "device_list": device_list },
      "start_time": field.datetime[0],
      "end_time": field.datetime[1],
      "target_value": Number(field.value),
    }
    let params = {query: query, ip: "10.8.15.97", port: "8808", url: "/api/control/generate_strategy"}
    let res = await publicStore.http({httpApi: params})
    state.loading = false
    state.errtxt = res.errtxt? res.errtxt : ''
    if(!proxy.isNull(res) && res.errcode == "0") {
      if(proxy.isNull(res.device_type_power_curves)) return console.log("获取空数据")
      const datas = {}
      const start = new Date(field.datetime[0]).getTime()
      res.device_type_power_curves.forEach(v => {
        if(!datas[v.device_id] && !proxy.isNull(v.values)) {
          datas[v.device_id] = v.values.map((vv, ii) => {
            const time = start + 5*60*1000*ii
            return [proxy.parseTime(time, '{m}-{d} {h}:{i}:{s}'), vv, time]
          })
        }
      })
      // state.charttype = 'fd_fh'
      // 发电预测
      if(state.charttype.indexOf('fd')!=-1) state.meaChart = [{name: '发电预测曲线', data: datas.GENERATION_TOTAL?datas.GENERATION_TOTAL:[]}]
      // 负荷预测
      if(state.charttype.indexOf('fh')!=-1) state.meaChart2 = [{name: '负荷预测曲线', data: datas.LOAD_TOTAL?datas.LOAD_TOTAL:[]}]
    }
  }

  // 自动获取曲线
  watch(() => publicStore.active.attr.fields, async(val, old) => {
    if(publicStore.active.type.indexOf('unit')==-1) return 
    // if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    const chart = [{name: '调节曲线', data: []}]
    if(!proxy.isNull(publicStore.active.attr.fields)){
      publicStore.active.attr.fields.forEach((v, i) => {
        if(!proxy.isNull(v.datetime) && v.value) {
          v.datetime.forEach((vv, ii) => {
            if(i!=0 && ii==0) chart[0].data.push([vv.slice(5), publicStore.active.attr.fields[i-1].value])
            chart[0].data.push([vv.slice(5), v.value])
          })
        }
      })
      state.meaChart3 = chart
    }else{
      setChart3(chart)
    }
  }, { immediate: false, deep: true });

  watch(() => state.meaChart, async(val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart(val);
  }, { immediate: false, deep: true });

  watch(() => state.meaChart2, async(val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart2(val);
  }, { immediate: false, deep: true });

  watch(() => state.meaChart3, async(val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart3(val);
  }, { immediate: false, deep: true });

	const setChart = async(data) => {
		let chart = 'Line'
		let id = 'Line_meas'
		let attr = {
			// min: 0, 
			// max: 100,
			extent: 4, 
			colorList: [{color: '#60E7FF', start: 'rgba(96, 231, 255, 1)', end: 'rgba(96, 231, 255, 0)'}],
			legendArr: [],
			legendShow: true,
			labelShow: false,
			areaShow: true,
			y_name: '数值',
			tool_dw: '', 
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
    let datas = []
    let series = {data: []}
    series = data.map(v => {
      datas = [...datas, ...v.data]
      attr.legendArr.push(v.name)
      if(v.data.length>20) attr.symbol = true
      let data = v.data
      return {data}
    })
    let xAxis = []
    let tempDatas = datas.sort((a, b) => a[2] - b[2])
    tempDatas.forEach(v => {
      let x = xAxis.find(a=>a == v[0])
      if(!x) xAxis.push(v[0])
      if(v[1] < 0) delete attr.min
    })
    drawChart(chart, id, attr, {series: series, xAxis: {data: xAxis}}, {});
	}

	const setChart2 = async(data) => {
		let chart = 'Line'
		let id = 'Line_meas2'
		let attr = {
			// min: 0, 
			// max: 100,
			extent: 4, 
			colorList: [{color: '#FFC860', start: 'rgba(255, 200, 96, 0.5)', end: 'rgba(255, 200, 96, 0.1)'}],
			legendArr: [],
			legendShow: true,
			labelShow: false,
			areaShow: true,
			y_name: '数值',
			tool_dw: '', 
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
    let datas = []
    let series = {data: []}
    series = data.map(v => {
      datas = [...datas, ...v.data]
      attr.legendArr.push(v.name)
      if(v.data.length>20) attr.symbol = true
      let data = v.data
      return {data}
    })
    let xAxis = []
    let tempDatas = datas.sort((a, b) => a[2] - b[2])
    tempDatas.forEach(v => {
      let x = xAxis.find(a=>a == v[0])
      if(!x) xAxis.push(v[0])
      if(v[1] < 0) delete attr.min
    })
    drawChart(chart, id, attr, {series: series, xAxis: {data: xAxis}}, {});
	}

	const setChart3 = async(data) => {
		let chart = 'Line'
		let id = 'Line_meas3'
		let attr = {
			// min: 0, 
			// max: 100,
			extent: 4, 
			colorList: [{color: '#F45C5C', start: 'rgba(244, 92, 92, 0.5)', end: 'rgba(244, 92, 92, 0.1)'}],
			legendArr: [],
			legendShow: true,
			labelShow: false,
			areaShow: true,
			y_name: '数值',
			tool_dw: '', 
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
    let datas = []
    let series = {data: []}
    series = data.map(v => {
      datas = [...datas, ...v.data]
      attr.legendArr.push(v.name)
      if(v.data.length>20) attr.symbol = true
      let data = v.data
      return {data}
    })
    let xAxis = []
    let tempDatas = datas.sort((a, b) => a[2] - b[2])
    tempDatas.forEach(v => {
      let x = xAxis.find(a=>a == v[0])
      if(!x) xAxis.push(v[0])
      if(v[1] < 0) delete attr.min
    })
    drawChart(chart, id, attr, {series: series, xAxis: {data: xAxis}}, {});
	}

  // 暴露
  defineExpose({
    onVisable
  })
</script>

<style lang="scss" scoped>
  :deep(.el-dialog){
    border-radius: 5px;
  }
  :deep(.el-dialog__header){
    border-radius: 0;
  }
  :deep(.el-dialog__body){
    padding: 0;
    height: calc(100% - 60px);
  }
</style>