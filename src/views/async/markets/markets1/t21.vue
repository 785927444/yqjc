<template>
  <div class="layout-col" style="overflow:visible;">
    <div class="absolute t5 r5 z1" v-if="!isNull(configStore.user) && configStore.user.id == '1'">
      <el-button size="small" type="info" @click.stop="handleClick('out')">模板</el-button>
      <el-button size="small" type="primary" @click.stop="handleClick('in')">导入</el-button>
      <el-button size="small" type="danger" @click.stop="handleClick('del')">清空</el-button>
    </div>
    <div class="hh100 ww100" id="Line_responsesEnv1"></div>
    <!-- 导入 -->
    <ImportData @init="init" :state="state" ref="importRef"/>
  </div>
</template>

<script lang="ts" setup>
  import api from '@/api'
  import ec from "@/utils/chart";
  const { drawChart } = ec();
  const { proxy }: any = getCurrentInstance();
  const publicStore = proxy.publicStore();
  const configStore = proxy.configStore();
  let importRef = $ref()
  const state = reactive({
    ...publicStore.$state,
    model: 't_medium_wide'
  });

	// 父子双向绑定
	const props = defineProps(['query'])
	// 父子绑定方法
	const emit = defineEmits(['init'])
  // 回调父组件
	const init= () => emit('init')

  watch(() => publicStore._public.responsesEnv1, async(val, old) => {
    // if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    await publicStore.rechart('Line_responsesEnv1')
    setChart1(val);
  }, { immediate: false, deep: true });

	const setChart1 = async(data) => {
		let chart = 'Lines'
		let id = 'Line_responsesEnv1'
    let attr = {
			min: 0, 
			// max: 100,
      min2: 0,
      // max2: 10,
			colorList: [],
			legendArr: [],
			legendX: 'center',
			legendShow: true,
			labelShow: false,
			areaShow: false,
      smooth: true,
      tooltip: true,
			y_name: '成交电量\n(GWh）',
      y_name2: '成交电价\n(元/MWh)',
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
		let datas = []
		let series = {data: []}
		series = data.map(v => {
			datas = [...datas, ...v.data]
			attr.legendArr.push({name: v.name, type: v.type})
			attr.symbol = true
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

  const handleClick = async(remark) => {
    if(remark == 'out'){
      let query = {model: 't_medium_wide'}
      let res = await publicStore.http({Api: query})
      let list = [...res]
      let name = '中长期市场行情-曲线模板'
      let content = [
        {key: 'id', name: 'ID'},
        {key: 'trade_year', name: '年'},
        {key: 'trade_month', name: '月'},
        {key: 'annual_bilateral_energy', name: '年度双边协商交易电量'},
        {key: 'annual_listed_energy', name: '年度挂牌交易电量'},
        {key: 'annual_concentrated_energy', name: '年度集中交易电量'},
        {key: 'annual_bilateral_price', name: '年度双边协商交易均价'},
        {key: 'annual_listed_price', name: '年度挂牌交易均价'},
        {key: 'annual_concentrated_price', name: '年度集中交易均价'},
        {key: 'monthly_bilateral_energy', name: '月度双边协商交易电量'},
        {key: 'monthly_load_curve_energy', name: '月度集中交易(市场用户负荷曲线)电量'},
        {key: 'monthly_time_sharing_energy', name: '月度分时集中交易电量'},
        {key: 'monthly_bilateral_price', name: '月度双边协商交易均价'},
        {key: 'monthly_load_curve_price', name: '月度集中交易(市场用户负荷曲线)均价'},
        {key: 'monthly_time_sharing_price', name: '月度分时集中交易均价'},
      ]
      proxy.handleExport(content, list, name)
    } 
    if(remark == 'in'){
      let content = [
        {key: 'id', name: 'ID'},
        {key: 'trade_year', name: '年'},
        {key: 'trade_month', name: '月'},
        {key: 'annual_bilateral_energy', name: '年度双边协商交易电量'},
        {key: 'annual_listed_energy', name: '年度挂牌交易电量'},
        {key: 'annual_concentrated_energy', name: '年度集中交易电量'},
        {key: 'annual_bilateral_price', name: '年度双边协商交易均价'},
        {key: 'annual_listed_price', name: '年度挂牌交易均价'},
        {key: 'annual_concentrated_price', name: '年度集中交易均价'},
        {key: 'monthly_bilateral_energy', name: '月度双边协商交易电量'},
        {key: 'monthly_load_curve_energy', name: '月度集中交易(市场用户负荷曲线)电量'},
        {key: 'monthly_time_sharing_energy', name: '月度分时集中交易电量'},
        {key: 'monthly_bilateral_price', name: '月度双边协商交易均价'},
        {key: 'monthly_load_curve_price', name: '月度集中交易(市场用户负荷曲线)均价'},
        {key: 'monthly_time_sharing_price', name: '月度分时集中交易均价'},
      ]
      let ctx = {content: content, key: state.key, query: props.query, unique: ''}
      importRef.onVisable(ctx)
    }
    if(remark == 'del'){
      ElMessageBox.confirm('请确定已保存模板?', '删除提示', {confirmButtonText: '确定', cancelButtonText: '关闭', type: 'error'}).then(async() => {
        let query = {model: 't_medium_wide'}
        let res = await publicStore.http({Api: query})
        let params = {model: state.model, list: res}
        api.delApi(params).then((res:any) => {
          if(res.code == 200){
            init()
            ElNotification({ title: '提示', message: '操作成功', type: 'success' })
          }else{
            ElNotification({ title: '提示', message: res.msg?res.msg:'操作失败', type: 'error' })
          }
        }).catch((err) => {
          ElNotification({ title: '提示', message: '操作失败', type: 'error' })
        })
      })
    }
  }
</script>

<style scoped lang="scss">

</style>
