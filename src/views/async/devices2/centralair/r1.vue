<template>
  <div class="layout-row ba1 p20 i15">
    <div class="flex1 hh100 flex-col hidden">
			<div class="ww100 h60 p2 rad2 mb15 bgbox11">
				<div class="octagon p10 flex-col-cc">
          <span>风机电流</span>
					<span class="mt5 white f16">{{!isNull(publicStore._public.homeDevices)? publicStore._public.homeDevices[0].Wind_Electricity? Math.floor((publicStore._public.homeDevices[0].Wind_Electricity*100))/100 : '' : '' }} mA</span>
				</div>
			</div>
			<div class="ww100 h60 p2 rad2 mb15 bgbox11">
				<div class="octagon p10 flex-col-cc">
          <span>风机功率</span>
					<span class="mt5 white f16">{{!isNull(publicStore._public.homeDevices)? publicStore._public.homeDevices[0].Wind_Power? Math.floor((publicStore._public.homeDevices[0].Wind_Power*100))/100 : '' : '' }} W</span>
				</div>
			</div>
			<div class="ww100 h60 p2 rad2 mb15 bgbox11">
				<div class="octagon p10 flex-col-cc">
          <span>风机无功功率</span>
					<span class="mt5 white f16">{{!isNull(publicStore._public.homeDevices)? publicStore._public.homeDevices[0].Wind_NonePower? Math.floor((publicStore._public.homeDevices[0].Wind_NonePower*100))/100 : '' : '' }} W</span>
				</div>
			</div>
			<div class="ww100 h60 p2 rad2 mb15 bgbox11" style="box-sizing: border-box;">
				<div class="octagon p10 flex-col-cc">
          <span>压缩机电流</span>
					<span class="mt5 white f16">{{!isNull(publicStore._public.homeDevices)? publicStore._public.homeDevices[0].Mompressor_Electricity? Math.floor((publicStore._public.homeDevices[0].Mompressor_Electricity*100))/100 : '' : '' }} mA</span>
				</div>
			</div>
			<div class="ww100 h60 p2 rad2 mb15 bgbox11">
				<div class="octagon p10 flex-col-cc">
          <span>压缩机功率</span>
					<span class="mt5 white f16">{{!isNull(publicStore._public.homeDevices)? publicStore._public.homeDevices[0].Mompressor_Power? Math.floor((publicStore._public.homeDevices[0].Mompressor_Power*100))/100 : '' : '' }} W</span>
				</div>
			</div>
			<div class="ww100 h60 p2 rad2 mb15 bgbox11">
				<div class="octagon p10 flex-col-cc">
          <span>压缩机无功功率</span>
					<span class="mt5 white f16">{{!isNull(publicStore._public.homeDevices)? publicStore._public.homeDevices[0].Mompressor_NonePower? Math.floor((publicStore._public.homeDevices[0].Mompressor_NonePower*100))/100 : '' : '' }} W</span>
				</div>
			</div>
		</div>
		<div class="flex5 hh100 flex-col hidden relative">
      <img class="hh100 ww100" src="@/assets/imgs/zz-s.png" />
			<!-- 定位一 -->
			<div class="flex-col-cc absolute-cc ww15" style="top: 58%; left: 15%">
				<div class="ww100 h50 p2 rad2 mb15 bgbox11">
					<div class="octagon ptb5 flex-col-cc">
						<span class="f12">冷却泵运行频率</span>
						<span class="mt2 white">{{!isNull(publicStore._public.homeDevices)? publicStore._public.homeDevices[0].Pump_Frequency? Math.floor((publicStore._public.homeDevices[0].Pump_Frequency*100))/100 : '' : '' }} Hz</span>
					</div>
				</div>
				<div class="ww100 h50 p2 rad2 mb15 bgbox11">
					<div class="octagon ptb5 flex-col-cc">
						<span class="f12">冷却水进水温度</span>
						<span class="mt2 white">{{!isNull(publicStore._public.homeDevices)? publicStore._public.homeDevices[0].Pump_InputTemperature? Math.floor((publicStore._public.homeDevices[0].Pump_InputTemperature*100))/100 : '' : '' }} ℃</span>
					</div>
				</div>
				<div class="ww100 h50 p2 rad2 mb15 bgbox11">
					<div class="octagon ptb5 flex-col-cc">
						<span class="f12">冷却水出水温度</span>
						<span class="mt2 white">{{!isNull(publicStore._public.homeDevices)? publicStore._public.homeDevices[0].Pump_OutputTemperature? Math.floor((publicStore._public.homeDevices[0].Pump_OutputTemperature*100))/100 : '' : '' }} ℃</span>
					</div>
				</div>
			</div>
			<!-- 定位二 -->
			<div class="flex-col-cc absolute-cc ww15" style="top: 17%; left: 61.5%">
				<div class="ww100 h45 p2 rad2 mb10 bgbox11">
					<div class="octagon ptb5 flex-col-cc">
						<span class="f12">制冷温度</span>
						<span class="mt2 white">{{!isNull(publicStore._public.homeDevices)? publicStore._public.homeDevices[0].Temperature? Math.floor((publicStore._public.homeDevices[0].Temperature*100))/100 : '' : '' }} ℃</span>
					</div>
				</div>
				<div class="ww100 h45 p2 rad2 mb10 bgbox11">
					<div class="octagon p5 flex-col-cc">
						<span class="f12">风管回温度</span>
						<span class="mt2 white">{{!isNull(publicStore._public.homeDevices)? publicStore._public.homeDevices[0].Duct_Temperature? Math.floor((publicStore._public.homeDevices[0].Duct_Temperature*100))/100 : '' : '' }} ℃</span>
					</div>
				</div>
			</div>
			<!-- 定位三 -->
			<div class="flex-col-cc absolute-cc ww15" style="top: 28%; left: 29%">
				<div class="ww100 h50 p2 rad2 mb5 bgbox11">
					<div class="octagon ptb5 flex-col-cc w50x2">
						<span class="f12">冷却泵运行频率</span>
						<span class="mt2 white">{{!isNull(publicStore._public.homeDevices)? publicStore._public.homeDevices[0].Pump_Frequency? Math.floor((publicStore._public.homeDevices[0].Pump_Frequency*100))/100 : '' : '' }} Hz</span>
					</div>
				</div>
			</div>
			<!-- 定位4 -->
			<div class="flex-col-cc absolute-cc ww12" style="top: 80%; left: 58%">
				<div class="ww100 h50 p2 rad2 mb5 bgbox11">
					<div class="octagon ptb5 flex-col-cc">
						<span class="f12">盖发器出水温度</span>
						<span class="mt2 white">{{!isNull(publicStore._public.homeDevices)? publicStore._public.homeDevices[0].Evaporator_OutputTemperature? Math.floor((publicStore._public.homeDevices[0].Evaporator_OutputTemperature*100))/100 : '' : '' }} ℃</span>
					</div>
				</div>
			</div>
			<!-- 定位5 -->
			<div class="flex-col-cc absolute-cc ww12" style="top: 80%; left: 87%">
				<div class="ww100 h50 p2 rad2 mb5 bgbox11">
					<div class="octagon ptb5 flex-col-cc">
						<span class="f12">盖发器进水温度</span>
						<span class="mt2 white">{{!isNull(publicStore._public.homeDevices)? publicStore._public.homeDevices[0].Evaporator_InputTemperature? Math.floor((publicStore._public.homeDevices[0].Evaporator_InputTemperature*100))/100 : '' : '' }} ℃</span>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script lang="ts" setup>
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
	const configStore = proxy.configStore()
  const dictStore = proxy.dictStore()
  const state = reactive({
	  ...publicStore.$state,
  })
</script>
 
<style scoped lang="scss">

</style>
