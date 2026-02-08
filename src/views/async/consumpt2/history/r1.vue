<template>
    <div class="layout-col">
        <div class="flex1 flex-col">
            <div class="flex-sc flex1 mb15">
                <div class="flex-sc mr20 cursor" v-for="(v, i) in state.checkbox" :key="i" @click.stop="v.check=!v.check">
                   <div class="w14 h14 flex-sc rad2 p2 bo-white-1 mr5"  :class="v.check?'bgi22 white':''"><i-ep-check v-if="v.check" /></div> 
                   <span class="pb2">{{v.name}}</span>
                </div>
                <el-button class="ml15" type="primary" @click.stop="state.checkbox.forEach((v, i)=>{if(i==0||i==1){v.check=true}else{v.check=false}})">重置</el-button>
            </div>
            <div class="flex-sc flex1 hh100 ww100 relative mb15">
                <span class="hh100 flex-cc plr10 cursor" 
                :class="state.active==v.value?'ba3 white':'i14'" 
                v-for="(v, i) in state.actives" :key="i"
                @click.stop="state.active=v.value">{{v.name}}</span>
                <span class="hh100 flex-sc pl10">
                    <span class="pr15">时段:</span>
                    <div class="w100x4">
                        <el-date-picker class="ww100" v-model="publicStore.datetime" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                        type="datetimerange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
                    </div>
                </span>
                <span class="hh100 flex-sc pl10">
                    <el-button class="ml15" type="primary" :icon="Back"></el-button>
                    <el-button class="ml15" type="primary" :icon="Icon1"></el-button>
                    <el-button class="ml15" type="primary" :icon="Right"></el-button>
                </span>
                <span class="hh100 flex-sc pl15">
                    <span class="ftred">*</span>步长：<span class="mlr10 w40"><el-input v-model="state.step"></el-input></span>分钟
                </span>
                <span class="hh100 flex-sc absolute r0">
                    <el-button class="ml15" type="primary" :icon="IconDown">下载表格</el-button>
                </span>
            </div>
        </div>
        <div class="layout-col p20 ba1" v-show="state.active==0">
            <div class="ww100 hh100" id="Line_quxian1"></div>
        </div>
        <div class="layout-col ba1" v-show="state.active==1">
            <div class="row ba11 mr15">
                <div :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width">{{v.name}}</div>
            </div>
            <div class="table">
                <div class="row" :class="index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in !publicStore._public.list?[]:
                publicStore._public.list.filter(a=> state.checkbox.filter(item => item.check).map(item => item.name).includes(a.yccode))" :key="index" @click="handleClick('active', item)">
                    <div v-show="v.show" :class="v.width" :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i">
                        <span v-if="typeof(v.key) == 'object'" class="i21 cursor mlr5" :class="kk=='add'?'none':kk=='deal'&&item['clear_type']!=0?'none':''" v-for="(vv, kk, ii) in v.key" :key="ii" @click.stop="handleClick(kk, item)">{{vv}}</span>
					    <span v-else-if="v.key=='*'">{{(state.page-1)*state.limit + index+1}}</span>
                        <span v-else-if="v.type == 'time'">{{item[v.key] == 0?'/':parseTime(item[v.key])}}</span>
                        <span v-else-if="v.type == 'find'" :class="find(v.value[0], [v.value[1], item[v.key]], 'color')?find(v.value[0], [v.value[1], item[v.key]], 'color'):''">
                            {{find(v.value[0], [v.value[1], item[v.key]], v.value[2])}}
                        </span>
                        <span v-else-if="v.type == 'range'" :class="findRange(v.value[0], [v.value[1], item[v.key]], 'color')?findRange(v.value[0], [v.value[1], item[v.key]], 'color'):''">
                            {{findRange(v.value[0], [v.value[1], item[v.key]], v.value[2])}}
                        </span>
                        <span v-else-if="v.type == 'switch'">
                            <el-switch v-model="item[v.key]" :active-text="v.value[1].name" :inactive-text="v.value[0].name" :active-value="v.value[1].value" :inactive-value="v.value[0].value" inline-prompt @change="handleClick('switch', item)"></el-switch>
                        </span>
                        <span v-else-if="v.type == 'input'"><el-input v-model="item[v.value]" placeholder="请输入" style="width: 150px;" size="small" /></span>
                        <span v-else>{{isNull(item[v.key]) && v.key!=''? '/' : item[v.key]}}</span>
                    </div>
                </div>
            </div>
            <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import ec from "@/utils/chart";
    import {Back,Right} from "@element-plus/icons-vue";
    import IconDown from "../iconDown.vue";
    import Icon1 from "../icon1.vue";
    const { proxy }: any = getCurrentInstance();
    const { drawChart } = ec();
    const publicStore = proxy.publicStore();
    const configStore = proxy.configStore();
    const state = reactive({
        ...publicStore.$state,
        active:0,
        checkbox: [
            {key: 'k1', name: '实时有功', check: true},
            {key: 'k2', name: '日发电量', check: true},
            {key: 'k3', name: '月发电量', check: false},
            {key: 'k4', name: '年发电量', check: false},
            {key: 'k5', name: '总发电量', check: false},
            {key: 'k6', name: '效率',     check: false},
        ],
        step:5,
        actives:[
            {name:"曲线查询",value:0},
            {name:"表格查询",value:1},
        ],
        content: [
            { width: 'w70', show: true, align: 'center', key: '*', name: '序号' },
            { width: 'w100x2', show: true, align: 'left', key: 'yccode', name: '数据对象' },
            { width: 'w100x2', show: true, align: 'left', key: 'value', name: '实时值' },
            { width: 'w100x2', show: true, align: 'left', key: 'unit', name: '单位' },
            { width: 'w100x2', show: true, align: 'left', key: 'timestamp', name: '时间' },
        ],
    })

    watch(() => state.active, async(val, old) =>{
        if(proxy.isNull(val)) return
        if(val == 1) return 
        let charts = []
        publicStore._public.list.forEach(v => {
            try{
                let check = state.checkbox.find(a=>a.name == v.yccode)
                if(check && check.check){
                    let info = JSON.parse(v.info)
                    let temp = {name: v.yccode, data: []}
                    Object.entries(info.list).forEach(([key, value]) => {
                      temp.data.push([key, value])
                    })
                    charts.push(temp)
                }
            }catch(err){
                console.error("json-解析错误")
            }
        })
        publicStore._public.lines = charts
    },{ immediate: false, deep: true });

    watch(() => state.checkbox, async(val, old) =>{
        if(proxy.isNull(val)) return
        if(val == 1) return publicStore.rechart("Line_quxian1")
        let charts = []
        publicStore._public.list.forEach(v => {
            try{
                let check = state.checkbox.find(a=>a.name == v.yccode)
                if(check && check.check){
                    let info = JSON.parse(v.info)
                    let temp = {name: v.yccode, data: []}
                    Object.entries(info.list).forEach(([key, value]) => {
                      temp.data.push([key, value])
                    })
                    charts.push(temp)
                }
            }catch(err){
                console.error("json-解析错误")
            }
        })
        publicStore._public.lines = charts
    },{ immediate: false, deep: true });

    watch(() => publicStore._public.lines, async(val, old) =>{
        if(state.active!=0){return}
        if(proxy.isNull(val)) return
        if(JSON.stringify(val) == JSON.stringify(old)) return
        await nextTick();
        setChart();
    },{ immediate: false, deep: true });

    async function setChart(){
        let chart = "Line";
        const id = "Line_quxian1";
        let attr = {
            min: 0, 
            // max: 100,
            extent: 4, 
            colorList: [],
            legendArr: [],
            legendShow: true,
            labelShow: false,
            areaShow: false,
            y_name: '功率/kw',
            tool_dw: 'kw', 
            tool_name_x: '日期：', 
            tool_name_y: '数值：', 
        }
        let data = publicStore._public.lines
        let series = {data: []}
        series = data.map(v => {
            attr.legendArr.push(v.name)
            let data = v.data
            return {data}
        })
        drawChart(chart, id, attr, {series: series}, {});
    }
</script>