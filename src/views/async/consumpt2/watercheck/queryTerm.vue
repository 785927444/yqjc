<template>
    <div class="flex-col-ss ww100 relative">
        <div class="ww100 flex-sc">
            <div class="p10 cosp" :class="state.active==1?'bs4':'ba1'" @click="()=>{state.active=1}">水量</div>
            <div class="p10 cosp" :class="state.active==2?'bs4':'ba1'" @click="()=>{state.active=2}">水费</div>
            <!-- <span class="pl10">能耗种类：</span>
            <el-select v-modle="state.nhzl" style="width:150px;"></el-select> -->
            <span  class="pl10">时间范围：</span>
            <span class="w100x2 mmr12">
                <el-date-picker class="ww100" v-model="publicStore.datetime" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" type="datetimerange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
            </span>
            <el-button  type="primary" :icon="Back"></el-button>
            <el-button  type="primary" :icon="Icon1"></el-button>
            <el-button  type="primary" :icon="Right"></el-button>
            <el-button type="primary" >查询</el-button>
            <div class="absolute r15">
                <el-button class="ml15" type="primary" :icon="IconDown">下载表格</el-button>
            </div>
        </div>
        <div class="ww100 flex-sc mt10">
            <span>设备选择：</span>
            <div class="flex-sc mr20 cursor" @click.stop="v.check=!v.check" v-for="(v, i) in publicStore._public.devices?publicStore._public.devices:[]" :key="i">
                <div class="w14 h14 flex-sc rad2 p2 bo-white-1 cursor" :class="v.check?'bgi22 white':''"><i-ep-check v-if="v.check" /></div>
                <div class="pb2 ml5">{{v.name}}</div>
            </div>   
        </div>
    </div>
</template>

<script lang="ts" setup>
    import IconDown from "../iconDown.vue";
    import Icon1 from "../icon1.vue";
    import {Back,Right} from "@element-plus/icons-vue";
    const { proxy }: any = getCurrentInstance();
    const publicStore = proxy.publicStore();
    const state = reactive({
        ...publicStore.$state,
        active: 1,
        nhzl: '',
    })
</script>