<template>
    <div class="ba1">
        <div class="layout-col i15">
            <div class="flex-sc ww100 mb15 rad2">
				<div class="flex-sc flex1 pl15 ptb15 ba13">
					<div class="flex-sc flex1 pptb3">
						<div class="w50 h50 "><img class="ww100" src="@/assets/imgs/e5.png"/></div>
					</div>
					<div  class="flex-sc flex3 layout-col">
						<span class="mb5">企业装机容量</span>
						<span>
							<span class="f16 fw white mr5">{{publicStore._public.overview?publicStore._public.overview.installed_capacity:'0'}}</span>
							<span>kVA</span>
						</span>
					</div>
				</div>
                <div class="flex-sc flex1 pl15 ptb15 ba13 ml5">
					<div class="flex-sc flex1 pptb3">
						<div class="w50 h50 "><img class="ww100" src="@/assets/imgs/y.png"/></div>
					</div>
					<div  class="flex-sc flex3 layout-col">
						<span class="mb5">今年用电量</span>
						<span>
							<span class="f16 fw white mr5">{{publicStore._public.overview?publicStore._public.overview.year_electricity_consumption:'0'}}</span>
							<span>KWh</span>
						</span>
					</div>
				</div>
			</div>
            <div class="flex-sc ww100 mb15 rad2">
				<div class="flex-sc flex1 pl15 ptb15 ba13">
					<div class="flex-sc flex1 pptb3">
						<div class="w50 h50 "><img class="ww100" src="@/assets/imgs/mup.png"/></div>
					</div>
					<div  class="flex-sc flex3 layout-col">
						<span class="mb5">企业申报需量</span>
						<span>
							<span class="f16 fw white mr5">{{publicStore._public.overview?publicStore._public.overview.electricity_demand:'0'}}</span>
							<span>kVA</span>
						</span>
					</div>
				</div>
                <div class="flex-sc flex1 pl15 ptb15 ba13 ml5">
					<div class="flex-sc flex1 pptb3">
						<div class="w50 h50 "><img class="ww100" src="@/assets/imgs/monthproduce.png"/></div>
					</div>
					<div  class="flex-sc flex3 layout-col">
						<span class="mb5">本月用电量</span>
						<span>
							<span class="f16 fw white mr5">{{publicStore._public.overview?publicStore._public.overview.month_electricity_consumption:'0'}}</span>
							<span>KWh</span>
						</span>
					</div>
				</div>
			</div>
            <div class="flex-sc ww100 mb15 rad2">
				<div class="flex-sc flex1 pl15 ptb15 ba13">
					<div class="flex-sc flex1 pptb3">
						<div class="w50 h50 "><img class="ww100" src="@/assets/imgs/e6.png"/></div>
					</div>
					<div  class="flex-sc flex3 layout-col">
						<span class="mb5">变压器数量</span>
						<span>
							<span class="f16 fw white mr5">{{publicStore._public.overview?publicStore._public.overview.transformer_num:'0'}}</span>
							<span>个</span>
						</span>
					</div>
				</div>
                <div class="flex-sc flex1 pl15 ptb15 ba13 ml5">
					<div class="flex-sc flex1 pptb3">
						<div class="w50 h50 "><img class="ww100" src="@/assets/imgs/elight.png"/></div>
					</div>
					<div  class="flex-sc flex3 layout-col">
						<span class="mb5">本月电费</span>
						<span>
							<span class="f16 fw white mr5">{{publicStore._public.overview?publicStore._public.overview.month_electric_charge:'0'}}</span>
							<span>元</span>
						</span>
					</div>
				</div>
			</div>
            <div class="flex-sc ww100 mb15 rad2">
				<div class="flex-sc flex1 pl15 ptb15 ba13">
					<div class="flex-sc flex1 pptb3">
						<div class="w50 h50 "><img class="ww100" src="@/assets/imgs/rate.png"/></div>
					</div>
					<div  class="flex-sc flex3 layout-col">
						<span class="mb5">功率因素</span>
						<span>
							<span class="f16 fw white mr5">{{publicStore._public.overview?publicStore._public.overview.power_factor:'0'}}</span>
							<span>kVA</span>
						</span>
					</div>
				</div>
                <div class="flex-sc flex1 pl15 ptb15 ba13 ml5">
					<div class="flex-sc flex1 pptb3">
						<div class="w50 h50 "><img class="ww100" src="@/assets/imgs/rate.png"/></div>
					</div>
					<div  class="flex-sc flex3 layout-col">
						<span class="mb5">实时总负荷</span>
						<span>
							<span class="f16 fw white mr5">{{publicStore._public.overview?publicStore._public.overview.real_time_total_load:'0'}}</span>
							<span>kw</span>
						</span>
					</div>
				</div>
			</div>
            <div class="flex-sc ww100 mb15 rad2">
				<div class="flex-sc flex1 pl15 ptb15 ba13">
					<div class="flex-sc flex1 pptb3">
						<div class="w50 h50 "><img class="ww100" src="@/assets/imgs/freequence.png"/></div>
					</div>
					<div  class="flex-sc flex3 layout-col">
						<span class="mb5">频率</span>
						<span>
							<span class="f16 fw white mr5">{{publicStore._public.overview?publicStore._public.overview.frequency:'0'}}</span>
							<span>Hz</span>
						</span>
					</div>
				</div>
                <div class="flex-sc flex1 pl15 ptb15 ba13 ml5">
					<div class="flex-sc flex1 pptb3">
						<div class="w50 h50 "><img class="ww100" src="@/assets/imgs/rate.png"/></div>
					</div>
					<div  class="flex-sc flex3 layout-col">
						<span class="mb5">总负荷</span>
						<span>
							<span class="f16 fw white mr5">{{publicStore._public.overview?publicStore._public.overview.total_load:'0'}}</span>
							<span>%</span>
						</span>
					</div>
				</div>
			</div>
            <div class="flex-sc ww100 mb15 rad2">
				<div class="flex-sc flex1 pl15 ptb15 ba13">
					<div class="flex-sc flex1 pptb3">
						<div class="w50 h50 "><img class="ww100" src="@/assets/imgs/freequence.png"/></div>
					</div>
					<div  class="flex-sc flex3 layout-col">
						<span class="mb5">谐波值</span>
						<span>
							<span class="f16 fw white mr5">{{publicStore._public.overview?publicStore._public.overview.harmonic:'0'}}</span>
							<span>%</span>
						</span>
					</div>
				</div>
                <div class="flex-sc flex1 pl15 ptb15 ba13 ml5">
					<div class="flex-sc flex1 pptb3">
						<div class="w50 h50 "><img class="ww100" src="@/assets/imgs/rate1.png"/></div>
					</div>
					<div  class="flex-sc flex3 layout-col">
						<span class="mb5">计量表在线数目</span>
						<span>
							<span class="f16 fw white mr5">{{publicStore._public.overview?publicStore._public.overview.offline_num:'0'}} / {{publicStore._public.overview?publicStore._public.overview.total_num:'0'}}</span>
							<span>个</span>
						</span>
					</div>
				</div>
			</div>
            <div class="flex-sc ww100 mb15 rad2">
				<div class="flex-sc flex1 pl15 ptb15 ba13">
					<div class="flex-sc flex1 pptb3">
						<div class="w50 h50 "><img class="ww100" src="@/assets/imgs/three1.png"/></div>
					</div>
					<div  class="flex-sc flex3 layout-col">
						<span class="mb5">三相电流不平衡度</span>
						<span>
							<span class="f16 fw white mr5">{{publicStore._public.overview?publicStore._public.overview.unbalance:'0'}}</span>
							<span>%</span>
						</span>
					</div>
				</div>
                <div class="flex-sc flex1 pl15 ptb15 ba13 ml5">
					<div class="flex-sc flex1 pptb3">
						<div class="w50 h50 "><img class="ww100" src="@/assets/imgs/warning1.png"/></div>
					</div>
					<div  class="flex-sc flex3 layout-col">
						<span class="mb5">告警数</span>
						<span>
							<span class="f16 fw white mr5">{{publicStore._public.overview?publicStore._public.overview.alarm_num:'0'}}</span>
							<span>个</span>
						</span>
					</div>
				</div>
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
</script>