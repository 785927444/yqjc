<template>
    <div class="layout-col ba1">
        <div class="h40 ww100 flex-sc relative mb10">
            <img class="hh100" src="@/assets/imgs/title.png" />
            <div class="ww100 hh100 flex-sc absolute pl35">
                <span class="fw flex1 ptb5">能耗最高区域</span>
                <div class="flex-ec hh70 plr12 mr15 rad30 bsred fFF6060">
                    {{publicStore._public.maxAera?publicStore._public.maxAera.data.length:'0'}}
                </div>
            </div>
        </div>
        <div class="flex1 flex-cc">
            <div class="layout-col2  bgbox11 mlr30 plr10 ww30 bdbox">
                <span class="pt5 pb5 ww100 txcenter">总用电量<span>（kwh）</span></span>
                <span class="pb5 ww100 txcenter">{{publicStore._public.maxAera?publicStore._public.maxAera.power_consumption:'0'}}</span>
            </div>
            <div class="layout-col2 bgbox11 mlr30 plr10 ww30 bdbox">
                <span class="pt5 pb5 ww100 txcenter">区域名称<span></span></span>
                <span class="pb5 ww100 txcenter">{{publicStore._public.maxAera?publicStore._public.maxAera.aera:'暂无'}}</span>
            </div>
        </div>
        <div class="ww100 flex2 overlay">
            <div class="ww100 flex-col" v-for="(v, i) in publicStore._public.maxAera?publicStore._public.maxAera.data:[]" :key="i">
                <div class="flex-sc ww100 bs4 ptb15">
                    <span class="ww20 pl15 i21">电表</span>
                    <span class="ww20 white">{{v.device_name}}</span>
                     <span class="ww20 pl15 i21">用电量</span>
                    <span class="ww20 white">{{v.name}} kwh</span>
                </div>
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