<template>
  <div class="layout-col">
    <!-- 标题 -->
		<div class="h40 ww100 flex-sc relative mb5">
			<img class="hh100" src="@/assets/imgs/title.png" />
			<div class="ww100 hh100 flex-sc absolute pl35">
				<span class="fw flex1 ptb5">实时资源总览</span>
				<div class="flex-ec flex1"></div>
			</div>
		</div>
		<div class="flex1 ww100 p15 ba1 flex-sc warp i15">
			<div class="ww50 hh33 flex-sc">
				<img class="w54" src="@/assets/imgs/home1.png" />
				<span class="flex-col-cs ml15">
					<span class="mb5">光伏发电总功率</span>
					<span class="flex-sc">
						<span class="fw white">{{ publicStore._public.photovoltaicInfo&&publicStore._public.photovoltaicInfo.pv_active_power? Math.floor((publicStore._public.photovoltaicInfo.pv_active_power*10))/10 : '0'}}</span>
						<span class="f12 mt2 ml5">kW</span>
					</span>
				</span>
			</div>
			<div class="ww50 hh33 flex-sc">
				<img class="w54" src="@/assets/imgs/home2.png" />
				<span class="flex-col-cs ml15">
					<span class="mb5 i15">储能站充放电总功率</span>
					<span class="flex-sc">
						<span class="fw white">
							{{ publicStore._public.energyInfo&&publicStore._public.energyInfo.Out_TotW? Math.floor((publicStore._public.energyInfo.Out_TotW*10))/10 : '0'}}
						</span>
						<span class="f12 mt2 ml5">kW</span>
					</span>			
				</span>
			</div>
			<div class="ww50 hh33 flex-sc" style="margin-top: 0.5%;">
				<img class="w54" src="@/assets/imgs/home3.png" />
				<span class="flex-col-cs ml15">
					<span class="mb5 i15">充电桩充电总功率</span>
					<span class="flex-sc">
						<span class="fw white">{{ publicStore._public.chargeInfo&&publicStore._public.chargeInfo.Input_Power? Math.floor((publicStore._public.chargeInfo.Input_Power*10))/10 : '0'}}</span>
						<span class="f12 mt2 ml5">kW</span>
					</span>
				</span>
			</div>
			<div class="ww50 hh33 flex-sc" style="margin-top: 0.5%;">
				<img class="w54" src="@/assets/imgs/home4.png" />
				<span class="flex-col-cs ml15">
					<span class="mb5 i15">风力发电总功率</span>
					<span class="flex-sc">
						<span class="fw white">{{ publicStore._public.windInfo&&publicStore._public.windInfo.Output_Power? Math.floor((publicStore._public.windInfo.Output_Power*10))/10 : '0'}}</span>
						<span class="f12 mt2 ml5">kW</span>
					</span>
				</span>
			</div>
			<div class="ww50 hh33 flex-sc" style="margin-top: 0.5%;">
				<img class="w54" src="@/assets/imgs/home5.png" />
				<span class="flex-col-cs ml15">
					<span class="mb5 i15">分体空调总功率</span>
					<span class="flex-sc">
						<span class="fw white">{{ publicStore._public.airconditionerInfo&&publicStore._public.airconditionerInfo.Total_Power? Math.floor((publicStore._public.airconditionerInfo.Total_Power*10))/10 : '0'}}</span>
						<span class="f12 mt2 ml5">kW</span>
					</span>				
				</span>
			</div>
			<div class="ww50 hh33 flex-sc" style="margin-top: 0.5%;">
				<img class="w54" src="@/assets/imgs/home6.png" />
				<span class="flex-col-cs ml15">
					<span class="mb5 i15">中央空调总功率</span>
					<span class="flex-sc">
						<span class="fw white">{{ publicStore._public.airconditionerfzInfo&&publicStore._public.airconditionerfzInfo.T_Power? Math.floor((publicStore._public.airconditionerfzInfo.T_Power*10))/10 : '0'}}</span>
					  <span class="f12 mt2 ml5">kW</span>
					</span>				
				</span>
			</div>
		</div>
  </div>
</template>

<script lang="ts" setup>
  const { proxy }:any = getCurrentInstance()
  const configStore = proxy.configStore()
  const publicStore = proxy.publicStore()
  const state = reactive({
	  ...publicStore.$state,
  })

	onMounted(async() => {
    setInit()
	})

  onBeforeUnmount(() => {
		publicStore._public.homeline1 = ''
		publicStore._public.homepie = ''
		publicStore.rechart()
  })

  watch(() => publicStore._public.homeinfo, async (val) => {
    setInit()
  },{ immediate: false, deep: true });

	const setInit = async() => {
		if(proxy.isNull(publicStore._public.homeinfo)) return
		// getLine1()
		getPie()
		getPowerList()
	}

	const getLine1 = async() => {
		let code = 'carbon'
    let query = {model: "t_sensor_measure_float_station", args: `station_num='${configStore.distributId}' and code='${code}'`, limit: 50, order: 'date desc'}
		let res = await publicStore.http( {Api: query})
    let data1 = []
		res.forEach(v => {
			const date = proxy.parseTime(v.date, '{m}-{d} {h}:{i}:{s}')
			let exist = data1.find(a=>a[2] == date)
			if(exist){
				exist[1] += Number(v.value)
			}else{
				data1.unshift([date, Number(v.value), v.date])
			}
		})
		let charts = [
      {name: '碳排放', data: data1}, 
    ]
		publicStore._public.homeline1 = charts
	}
  
	const getPie = async() => {
		let Daily_Output = publicStore._public.homeinfo.Daily_Output?publicStore._public.homeinfo.Daily_Output:0
		let Electricity = publicStore._public.homeinfo.Electricity?publicStore._public.homeinfo.Electricity:0
		let Daily_Input = publicStore._public.homeinfo.Daily_Input?publicStore._public.homeinfo.Daily_Input:0
		let sum = Daily_Output + Daily_Input + Electricity
		let chart = [
      {name: '光伏发电', value: Daily_Output, color: '#54CFF3', rate: Math.floor((Daily_Output/sum*1000))/10+'%', key: 'count_A'},
      {name: '储能柜', value: Electricity, color: '#3E6AE3', rate: Math.floor((Electricity/sum*1000))/10+'%', key: 'count_B'},
      {name: '充电桩', value: Daily_Input, color: '#F9B74A', rate: Math.floor((Daily_Input/sum*1000))/10+'%', key: 'count_C'},
		]
		publicStore._public.homepie = chart
	}

	const getPowerList = async() => {	
		let code = `'Input_Power','Output_Power'`
    let query = {model: "t_sensor_measure_float_station", args: `station_num='${configStore.distributId}' and code IN (${code})`, limit: 20, order: 'date desc'}
		let res = await publicStore.http( {Api: query})
		publicStore._public.powerlist = proxy.isNull(res)? [] : res
	}

</script>

<style scoped lang="scss">

</style>
