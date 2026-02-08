<template>
    <div class="layout-row">
        <div class="flex-sc" style="width: 16.66%">
            <img src="@/assets/imgs/day2.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ">
                <span class="pt5 pb5">今日用电量<span>（kwh）</span></span>
                <span class="pb5">{{publicStore._public.productCheck?publicStore._public.productCheck.day_electricity:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc" style="width: 16.66%">
            <img src="@/assets/imgs/day2.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ">
                <span class="pt5 pb5">月用电量<span>（kwh）</span></span>
                <span class="pb5">{{publicStore._public.productCheck?publicStore._public.productCheck.month_electricity:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc" style="width: 16.66%">
            <img src="@/assets/imgs/ele1.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ">
                <span class="pt5 pb5">累计用电量<span>（kwh）</span></span>
                <span class="pb5">{{publicStore._public.productCheck?publicStore._public.productCheck.all_electricity:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc" style="width: 16.66%">
            <img src="@/assets/imgs/day3.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ">
                <span class="pt5 pb5">日碳排放量<span>（t）</span></span>
                <span class="pb5">{{publicStore._public.productCheck?publicStore._public.productCheck.day_co2:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc" style="width: 16.66%">
            <img src="@/assets/imgs/month2.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ">
                <span class="pt5 pb5">月碳排放量<span>（t）</span></span>
                <span class="pb5">{{publicStore._public.productCheck?publicStore._public.productCheck.month_co2:'0'}}</span>
            </div>
        </div>
        <div class="flex-sc" style="width: 16.66%">
            <img src="@/assets/imgs/co2.png"/>
            <div class="layout-col2 flex-sc bgbox11 mlr30 plr10 ">
                <span class="pt5 pb5">累计碳排放量<span>（t）</span></span>
                <span class="pb5">{{publicStore._public.productCheck?publicStore._public.productCheck.all_co2:'0'}}</span>
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