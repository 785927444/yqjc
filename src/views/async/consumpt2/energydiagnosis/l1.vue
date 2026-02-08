<template>
    <div class="layout-col ba1">
        <div class="h40 ww100 flex-sc relative mb10">
            <img class="hh100" src="@/assets/imgs/title.png" />
            <div class="ww100 hh100 flex-sc absolute pl35">
                <span class="fw flex1 ptb5">告警</span>
                <div class="flex-ec hh70 plr12 mr15 rad30 bsred fFF6060">
                    {{publicStore._public.list?publicStore._public.list.length:'0'}}
                </div>
            </div>
        </div>
        <div class="p10 flex1 overlay">
            <div class="flex-col" v-for="(v, i) in publicStore._public.list?publicStore._public.list:[]" :key="i">
                <div class="flex-col ww100 bs4">
                    <span class="pl15 pt15 i21">
                        <span>{{v.device_name}}</span>
                        <!-- <span class="ppl15 cfff">{{v.id}}</span> -->
                    </span>
                    <div class="relative plr15 ptb10 flex-sc">
                        <span class="i8 mr15">{{v.name}}</span>
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