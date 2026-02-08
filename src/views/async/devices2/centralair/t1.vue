<template>
  <div class="layout-col overlay warp ba1">
	  <div class="ww100 hh100 hidden cursor " v-for="(v, i) in !isNull(publicStore._public.homeDevices)?
		  state.active!='All'&&!state.airName?publicStore._public.homeDevices.filter(a =>a['Operation_State']==state.active) : 
		  state.active=='All'&&state.airName?publicStore._public.homeDevices.filter(a => a.name.indexOf(state.airName)!=-1) :
		  state.active!='All'&&state.airName?publicStore._public.homeDevices.filter(a =>a['Operation_State']==state.active&&a.name.indexOf(state.airName)!=-1) :
		  state.active=='All'&&!state.airName?publicStore._public.homeDevices : [] : []" :key="i" @click.stop="toPath('/detail', {id: v.id, stationNum: v.stationNum, type: v.type, code: 'Output_Power', code2: 'Daily_Output'})">
			<div class="ww100 hh100 flex-col i15">
				<!-- 标题 -->
				<aa-title :title="v.name"><template #right-content></template></aa-title>
				<!-- 监测值 -->
				<div class="ww100 hh100 flex-sc ba1 p15 ralative">
					<div class="flex3 flex-sc warp">
						<div class="ww33 flex-sc">
							<div class="flex2">当前状态</div>
							<div class="flex3 white" :class="find(state.actives, ['value', v.Operation_State], 'color')?find(state.actives, ['value', v.Operation_State], 'color'):''">
								{{find(state.actives, ['value', v.Operation_State], 'name')}}
							</div>
						</div>
						<div class="ww33 flex-sc">
							<div class="flex2">电压（V）</div>
							<div class="flex3 white">{{v.Voltage?Math.floor((v.Voltage*100))/100 : 0}}</div>
						</div>
						<div class="ww33 flex-sc mt12">
							<div class="flex2">电流（A）</div>
							<div class="flex3 white">{{v.Electricity?Math.floor((v.Electricity*100))/100 : 0}}</div>
						</div>
						<div class="ww33 flex-sc mt12">
							<div class="flex2">频率（Hz）</div>
							<div class="flex3 white">{{v.Frequency?Math.floor((v.Frequency*100))/100 : 0}}</div>
						</div>
						<div class="ww33 flex-sc mt12">
							<div class="flex2">功率（kWh）</div>
							<div class="flex3 white">{{v.Power?Math.floor((v.Power*100))/100 : 0}}</div>
						</div>
						<div class="ww33 flex-sc mt12">
							<div class="flex2">用电量（kWh）</div>
							<div class="flex3 white">{{v.Total_Electricity?Math.floor((v.Total_Electricity*100))/100 : 0}}</div>
						</div>
					</div>
					<div class="flex2 flex-cc">
						<div class="flex1 flex-cc">
              <div class="flex-col-cc mlr10 i7">
								<i-ep-homeFilled class="f18" />
								<span class="mt10">房间</span>
							</div>
              <div class="flex-col-cc mlr10">
								<span>温度（℃）</span>
								<span class="mt10 f20 white">{{v.Room_Temperature?Math.floor((v.Room_Temperature*100))/100 : 0}}</span>
							</div>
              <div class="flex-col-cc mlr10">
								<span>湿度（%）</span>
								<span class="mt10 f20 white">{{v.Room_Humility?Math.floor((v.Room_Humility*100))/100 : 0}}</span>
							</div>
						</div>
						<div class="h50 flex-cc hidden">
							<img class="hh100 w2" src="@/assets/imgs/line.png" />
						</div>
						<div class="flex1 flex-cc">
              <div class="flex-col-cc mlr10 i7">
								<i-ep-grid class="f18" />
								<span class="mt10">集装箱</span>
							</div>
              <div class="flex-col-cc mlr10">
								<span>温度（℃）</span>
								<span class="mt10 f20 white">{{v.Container_Temperature?Math.floor((v.Container_Temperature*100))/100 : 0}}</span>
							</div>
              <div class="flex-col-cc mlr10">
								<span>湿度（%）</span>
								<span class="mt10 f20 white">{{v.Container_Humility?Math.floor((v.Container_Humility*100))/100 : 0}}</span>
							</div>
						</div>
					</div>
					<div class="flex1 flex-cc fontStyle f16">
						<div class="bs4 w100 h40 lh40 tc mlr10">控制</div>
						<div class="bs4 w100 h40 lh40 tc mlr10">详情</div>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script lang="ts" setup>
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const state = reactive({
    ...publicStore.$state,
    active:"All",
    actives:[
      {name:"全部", value:"All", color: ''},
      {name:"停止", value:"0", color: 'i6'},
      {name:"运行", value:"1", color: 'i11'},
      {name:"异常", value:"2", color: 'i8'}
    ]
  })
</script>

<style scoped lang="scss">

</style>
