<template>
    <div class="flex-cc ww100 i15">
        <div class="flex-sc flex1 mlr10">
            <img class="w70" src="@/assets/imgs/总发电量.png"/>
            <div class="flex-col-cc flex-sc bgbox11 mlr10 plr10 ptb5 ww100">
                <span class="pt5 pb5">总发电量<span>（kWh）</span></span>
                <span class="pb5 f16 fw white">{{!isNull(publicStore._public.homeInfo)&&publicStore._public.homeInfo.Daily_Output?Math.floor((publicStore._public.homeInfo.Daily_Output*100))/100:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc flex1 mlr10">
            <img class="w70" src="@/assets/imgs/光伏发电量.png"/>
            <div class="flex-col-cc flex-sc bgbox11 mlr10 plr10 ptb5 ww100">
                <span class="pt5 pb5">光伏发电量<span>（kWh）</span></span>
                <span class="pb5 f16 fw white">{{!isNull(publicStore._public.homeInfo1)&&publicStore._public.homeInfo1.Daily_Output?Math.floor((publicStore._public.homeInfo1.Daily_Output*100))/100:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc flex1 mlr10">
            <img class="w70" src="@/assets/imgs/风机发电量.png"/>
            <div class="flex-col-cc flex-sc bgbox11 mlr10 plr10 ptb5 ww100">
                <span class="pt5 pb5">风机发电量<span>（kWh）</span></span>
                <span class="pb5 f16 fw white">
									{{!isNull(publicStore._public.homeInfo2)&&publicStore._public.homeInfo2.Daily_Output?Math.floor((publicStore._public.homeInfo2.Daily_Output*100))/100:'0'}}
								</span>
            </div>
        </div>
        <div class="flex-sc flex1 mlr10">
            <img class="w70" src="@/assets/imgs/当前功率.png"/>
            <div class="flex-col-cc flex-sc bgbox11 mlr10 plr10 ptb5 ww100">
                <span class="pt5 pb5">当前功率<span>（kW）</span></span>
                <span class="pb5 f16 fw white">{{!isNull(publicStore._public.homeInfo)&&publicStore._public.homeInfo.Output_Power&&publicStore._public.homeInfo.Output_Power?Math.floor((publicStore._public.homeInfo.Output_Power*100))/100:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc flex1 mlr10">
            <img class="w70" src="@/assets/imgs/光伏功率.png"/>
            <div class="flex-col-cc flex-sc bgbox11 mlr10 plr10 ptb5 ww100">
                <span class="pt5 pb5">光伏功率<span>（kW）</span></span>
                <span class="pb5 f16 fw white">{{!isNull(publicStore._public.homeInfo1)&&publicStore._public.homeInfo1.Output_Power&&publicStore._public.homeInfo1.Output_Power?Math.floor((publicStore._public.homeInfo1.Output_Power*100))/100:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc flex1 mlr10">
            <img class="w70" src="@/assets/imgs/风机功率.png"/>
            <div class="flex-col-cc flex-sc bgbox11 mlr10 plr10 ptb5 ww100">
                <span class="pt5 pb5">风机功率<span>（kW）</span></span>
                <span class="pb5 f16 fw white">{{!isNull(publicStore._public.homeInfo2)&&publicStore._public.homeInfo2.Output_Power&&publicStore._public.homeInfo2.Output_Power?Math.floor((publicStore._public.homeInfo2.Output_Power*100))/100:'0'}}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { proxy }: any = getCurrentInstance();
const publicStore = proxy.publicStore();
const state = reactive({
    ...publicStore.$state,
})

</script>