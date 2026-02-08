<template>
    <div class="layout-col ba1">
        <div class="h40 ww100 flex-sc relative mb10">
            <img class="hh100" src="@/assets/imgs/title.png" />
            <div class="ww100 hh100 flex-sc absolute pl35">
                <span class="fw flex1 ptb5">电压越限电表</span>
                <div class="flex-ec hh70 plr12 mr15 rad30 bsred fFF6060">
                    {{publicStore._public.list?publicStore._public.list.filter(a=>a.type == 1).length:'0'}}
                </div>
            </div>
        </div>
        <div class="p10 flex1 overlay">
            <div class="flex-col" v-for="(v, i) in publicStore._public.list?publicStore._public.list.filter(a=>a.type == 1):[]" :key="i">
                <div class="flex-col ww100 bs4">
                    <div class="flex-sc pt10">
                        <span class="pl15 i21 ww20">电表</span>
                        <span class="">{{v.device_name}}</span>
                    </div>
                    <div class="flex-sc pt10">
                        <span class="pl15 i21 ww20">电压</span>
                        <span class="">{{v.voltage}} V</span>
                    </div>
                    <div class="plr15 ptb10  flex-sc">
                        <span class="i6">{{v.describe}}</span>
                        <span class="flex1 tr">{{v.time}}</span>
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