<template>
    <div class="layout-col">
        <div class="h40 ww100 flex-sc relative mb10">
            <img class="hh100" src="@/assets/imgs/title.png" />
            <div class="ww100 hh100 flex-sc absolute pl35">
                <span class="fw flex1 ptb8">能耗最高电表</span>
            </div>
        </div>
        <div class="ww100 flex1 ba1 p20">
            <div class="ww100 hh100 bs4">
                <div class="display-col ptb8">
                    <div class="flex-sc ww100 cgap50">
                        <span class="pl15  c3EBEE3 ww20">电表</span>
                        <span class="">{{publicStore._public.max?publicStore._public.max.device_name:'暂无'}}</span>
                    </div>
                </div>
                <div class="display-col ptb8">
                    <div class="flex-sc ww100 cgap50">
                        <span class="pl15  c3EBEE3 ww20">用电量</span>
                        <span class="">{{publicStore._public.max?publicStore._public.max.power_consumption:'暂无'}} kwh</span>
                    </div>
                </div>
                <div class="display-col ptb8">
                    <div class="flex-sc ww100 cgap50">
                        <span class="pl15  c3EBEE3 ww20">省市区</span>
                        <span class="">广东省/深圳市/宝安区</span>
                    </div>
                </div>
                <div class="display-col ptb8">
                    <div class="flex-sc ww100 cgap50">
                        <span class="pl15  c3EBEE3 ww20">企业名称</span>
                        <span class="">{{publicStore._public.max?publicStore._public.max.company:'暂无'}}</span>
                    </div>
                </div>
                <div class="display-col ptb8">
                    <div class="flex-sc ww100 cgap50">
                        <span class="pl15  c3EBEE3 ww20">楼栋楼层</span>
                        <span class="">{{publicStore._public.max?publicStore._public.max.floor:'暂无'}}</span>
                    </div>
                </div>
                <div class="display-col ptb8">
                    <div class="flex-sc ww100 cgap50">
                        <span class="pl15  c3EBEE3 ww20">所属部门</span>
                        <span class="">{{publicStore._public.max?publicStore._public.max.depart:'暂无'}}</span>
                    </div>
                </div>
                <div class="display-col ptb8">
                    <div class="flex-sc ww100 cgap50">
                        <span class="pl15  c3EBEE3 ww20">坐标</span>
                        <span class="">{{publicStore._public.max?publicStore._public.max.coord:'暂无'}}</span>
                    </div>
                </div>
                <div class="display-col ptb8">
                    <div class="flex-sc ww100 cgap50">
                        <span class="pl15  c3EBEE3 ww20">用电性质</span>
                        <span class="">{{publicStore._public.max?publicStore._public.max.nature:'暂无'}}</span>
                    </div>
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