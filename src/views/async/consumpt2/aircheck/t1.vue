<template>
    <div class="flex-ss warp ww100">
        <div class="flex-sc " style="width: 25%">
            <img src="@/assets/imgs/day2.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ww50">
                <span class="pt5 pb5 ww100 txcenter">今日用电量<span>（度）</span></span>
                <span class="pb5 ww100 txcenter">{{publicStore._public.airCondition?publicStore._public.airCondition.day_electricity_consumption:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc " style="width: 25%">
            <img src="@/assets/imgs/day4.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ww50">
                <span class="pt5 pb5  ww100 txcenter">今日节能电量<span>（度）</span></span>
                <span class="pb5  ww100 txcenter">{{publicStore._public.airCondition?publicStore._public.airCondition.day_energy_saving_power:'0'}}</span>
            </div>
        </div> 
        <div class="flex-sc " style="width: 25%">
            <img src="@/assets/imgs/day5.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ww50">
                <span class="pt5 pb5  ww100 txcenter">今日节能效率<span></span>（%）</span>
                <span class="pb5  ww100 txcenter">{{publicStore._public.airCondition?publicStore._public.airCondition.day_efficiency:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc " style="width: 25%">
            <img src="@/assets/imgs/day4.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ww50">
                <span class="pt5 pb5  ww100 txcenter">今日节能收益<span>（度）</span></span>
                <span class="pb5  ww100 txcenter">{{publicStore._public.airCondition?publicStore._public.airCondition.day_earnings:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc " style="width: 25%">
            <img src="@/assets/imgs/month5.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ww50">
                <span class="pt5 pb5  ww100 txcenter">月用电量<span>（度）</span></span>
                <span class="pb5  ww100 txcenter">{{publicStore._public.airCondition?publicStore._public.airCondition.month_electricity_consumption:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc " style="width: 25%">
            <img src="@/assets/imgs/month4.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ww50">
                <span class="pt5 pb5  ww100 txcenter">月节能电量<span>（度）</span></span>
                <span class="pb5  ww100 txcenter">{{publicStore._public.airCondition?publicStore._public.airCondition.month_energy_saving_power:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc " style="width: 25%">
            <img src="@/assets/imgs/month3.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ww50">
                <span class="pt5 pb5  ww100 txcenter">月节能效率<span>（%）</span></span>
                <span class="pb5  ww100 txcenter">{{publicStore._public.airCondition?publicStore._public.airCondition.month_efficiency:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc " style="width: 25%">
            <img src="@/assets/imgs/month4.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ww50">
                <span class="pt5 pb5  ww100 txcenter">月节能收益<span>（元）</span></span>
                <span class="pb5  ww100 txcenter">{{publicStore._public.airCondition?publicStore._public.airCondition.month_earnings:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc " style="width: 25%">
            <img src="@/assets/imgs/year1.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ww50">
                <span class="pt5 pb5  ww100 txcenter">年用电量<span>（度）</span></span>
                <span class="pb5  ww100 txcenter">{{publicStore._public.airCondition?publicStore._public.airCondition.year_electricity_consumption:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc " style="width: 25%">
            <img src="@/assets/imgs/year2.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ww50">
                <span class="pt5 pb5  ww100 txcenter">年节能电量<span>（度）</span></span>
                <span class="pb5  ww100 txcenter">{{publicStore._public.airCondition?publicStore._public.airCondition.year_energy_saving_power:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc " style="width: 25%">
            <img src="@/assets/imgs/year3.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ww50">
                <span class="pt5 pb5  ww100 txcenter">年节能效率<span>（%）</span></span>
                <span class="pb5  ww100 txcenter">{{publicStore._public.airCondition?publicStore._public.airCondition.year_efficiency:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc " style="width: 25%">
            <img src="@/assets/imgs/year2.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ww50">
                <span class="pt5 pb5  ww100 txcenter">年节能收益<span>（元）</span></span>
                <span class="pb5  ww100 txcenter">{{publicStore._public.airCondition?publicStore._public.airCondition.year_earnings:'0'}}</span>
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