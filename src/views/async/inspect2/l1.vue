<template>
  <div class="layout-col">
    <!-- 标题 -->
		<div class="h40 ww100 flex-sc relative mb10">
			<img class="hh100" src="@/assets/imgs/title4.png" />
			<div class="ww100 hh100 flex-sc absolute pl35">
				<span class="fw flex1 ptb5">站点发电总览</span>
				<div class="flex-ec flex1 hh100">
					<span class="hh100 flex-cc plr10 cursor" 
					:class="state.active==v.value?'bs4 white':'i14'" 
					v-for="(v, i) in state.actives" :key="i"
					@click.stop="state.active=v.value;publicStore._public.active=0">{{v.name}}</span>
				</div>
			</div>
		</div>
    <div class="flex1 ww100 layout-col ba1 p20">
			<div class="ww100 flex-ss  mb15">
				<div class="flex-col-cc f14 ww15 h50" :class="i==publicStore._public.active?'bgbox22':'bgbox11'" @click.stop="publicStore._public.active = i"
				v-for="(v, i) in isNull(publicStore._public.list)?[]:publicStore._public.list.filter(a=>a.type == state.active)" :key="i">
					<span>{{v.name}}<span class="pl10">(kw)</span></span>
					<span class="f18">{{v.power}}</span>
				</div>
			</div>
			<div class="flex4 ww100 layout-row ba1">
				<div class="flex1 mr15">
					<div class="h40 ww100 flex-sc relative mb10">
						<img class="h32" src="@/assets/imgs/sub-title.png" />
						<div class="ww100 hh100 flex-sc absolute pl45">
							<span class="fw flex1 ptb5">发电趋势</span>
							<div class="flex-ec flex3 hh100">
								<div class="w100x4">
									<el-date-picker class="ww100" v-model="publicStore.datetime" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
									type="datetimerange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
								</div>
							</div>
						</div>
					</div>
					<div class="ww100 hh80 p10" id="Line_Fdqs"></div>
				</div>
				<div class="flex1">
					<div class="h40 ww100 flex-sc relative mb10">
						<img class="h32" src="@/assets/imgs/sub-title.png" />
						<div class="ww100 hh100 flex-sc absolute pl45">
							<span class="fw ptb5">站点发电对比</span>
							<div class="flex-ec flex1 hh100 p5">
								<span class="hh100 flex-cc cursor w30" 
									:class="state.activeTime==v.value?'bs4 white':'i14'" 
									v-for="(v, i) in state.activeTimes" :key="i"
									@click.stop="state.activeTime=v.value">{{v.name}}</span>
								<el-date-picker></el-date-picker>
							</div>
						</div>
					</div>
					<div class="ww100 hh80 p10" id="Line_Fdqs2"></div>
				</div>
			</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import ec from "@/utils/chart";
  const { drawChart } = ec();
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const state = reactive({
	  ...publicStore.$state,
	  active:1,
	  actives:[{name:"光伏电站",value:1},{name:"储能电站",value:2}],
	  activeTime:0,
	  activeTimes:[{name:"年",value:0},{name:"月",value:1},{name:"日",value:2}]
  })

  watch(() => publicStore._public.active, async(val, old) => {
		if(proxy.isNull(val)) return
		publicStore._public.data = publicStore._public.list.filter(a=>a.type == state.active)[val]
		publicStore._public.list2 = []
		try {
			let data = JSON.parse(publicStore._public.data.info)
			publicStore._public.info0 = data.info0
			publicStore._public.info1 = data.info1
		} catch (error) {
			console.error('解析 JSON 字符串时出错:', error)
		}
  }, { immediate: false, deep: true });

  watch(() => publicStore._public.lines1,async (val, old) =>{
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart();
  },{ immediate: false, deep: true });

  async function setChart(){
    let chart = "Line";
    const id = "Line_Fdqs";
    let attr = {
			min: 0, 
			max: 1500,
      min2: 0,
      max2: 120,
			extent: 4, 
			colorList: [],
			legendArr: [],
			legendShow: false,
			labelShow: false,
			areaShow: true,
			y_name: '辐照',
      y_name2: '有功',
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
		let data = publicStore._public.lines1
		let series = data.map(v => {
			attr.legendArr.push(v.name)
			return {data: v.data}
		})
		drawChart(chart, id, attr, {series: series}, {});
  }

  watch(() => publicStore._public.lines2,async (val, old) =>{
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart2();
  },{ immediate: false, deep: true });

  async function setChart2(){
    let chart = "Line";
    const id = "Line_Fdqs2";
    let attr = {
			min: 0, 
			// max: 1500,
			extent: 4, 
			colorList: [],
			legendArr: [],
			legendShow: true,
			labelShow: false,
			areaShow: true,
			y_name: 'MW',
			tool_name_x: '日期：', 
			tool_name_y: '数值：', 
		}
		let data = publicStore._public.lines2
		let series = data.map(v => {
			attr.legendArr.push(v.name)
			return {data: v.data}
		})
		drawChart(chart, id, attr, {series: series}, {});
  }
</script>
