<template>
    <div class="layout-col">
        <div class="ww100 flex-sc pr15 i15 mb10">  
            <span class="mr5 ml15 i15">名称：</span>
            <div class="w50x4">
                <el-input v-model="state.airName" placeholder="请输入"></el-input>
            </div>        
        </div>
        <!-- 内容 -->
        <div class="layout-row overlay warp p8 ba1">
            <div class="p8 ww25 cursor" v-for="(v, i) in !isNull(publicStore._public.homeDevices)?
            // state.active=='All'&&state.bay!='All'&&!state.airName?publicStore._public.homeDevices.filter(a =>a.bayNum==state.bay) :
            // state.active!='All'&&state.bay!='All'&&!state.airName?publicStore._public.homeDevices.filter(a =>a.bayNum==state.bay&&a['2022']==state.active) :
            // state.active=='All'&&state.bay!='All'&&state.airName?publicStore._public.homeDevices.filter(a =>a.bayNum==state.bay&&a.name.indexOf(state.airName)!=-1) :
            state.active!='All'&&state.bay=='All'&&!state.airName?publicStore._public.homeDevices.filter(a =>a['2022']==state.active) : 
            state.active=='All'&&state.bay=='All'&&state.airName?publicStore._public.homeDevices.filter(a => a.name.indexOf(state.airName)!=-1) :
            state.active!='All'&&state.bay=='All'&&state.airName?publicStore._public.homeDevices.filter(a =>a['2022']==state.active&&a.name.indexOf(state.airName)!=-1) :
            state.active=='All'&&state.bay=='All'&&!state.airName?publicStore._public.homeDevices : [] : []" :key="i" @click.stop="toPath('/detail', {id: v.id, stationNum: v.stationNum, type: v.type, code: 'All_active_electric', code2: 'day_electrlc'})">
                <div class="ww100 flex-col rad6 i15 bs">
                    <div class="flex-col ww100 p15">
                        <div class="flex1 flex-sc">
                        <div class="w32 h32"><img class="ww100" src="@/assets/imgs/zz-3.png" /></div>
                        <div class="f15 ml10 fontStyle">{{v.name}}</div>
                        </div>
                        <div class="flex1 flex-sc mt12">
                        <div class="">总有功功率（kW）</div>
                        <div class="flex1 tr">{{v.Total_active_power?Math.floor((v.Total_active_power*100))/100 : 0}}</div>
                        </div>
                        <div class="flex1 flex-sc mt12">
                        <div class="">总有功功电能（kWh）</div>
                        <div class="flex1 tr">{{v.All_active_electric?Math.floor((v.All_active_electric*100))/100 : 0}}</div>
                        </div>
                        <div class="flex1 flex-sc mt12">
                        <div class="">总视在功率（kVA）</div>
                        <div class="flex1 tr">{{v.Total_apparent_power?Math.floor((v.Total_apparent_power*100))/100 : 0}}</div>
                        </div>
                        <div class="flex1 flex-sc mt12">
                        <div class="">功率因数</div>
                        <div class="flex1 tr">{{v.power_factor?Math.floor((v.power_factor*100))/100 : 0}}</div>
                        </div>
                        <div class="flex1 flex-sc mt12">
                        <div class="">日电能（kWh）</div>
                        <div class="flex1 tr">{{v.day_electrlc?Math.floor((v.day_electrlc*100))/100 : 0}}</div>
                        </div>
                        <div class="flex1 flex-sc mt12">
                        <div class="">更多操作</div>
                        <div class="flex1 tr i21 cursor" >详情</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<!-- 底部 -->
		<aa-foot></aa-foot>
        <Ctrl :state="state" ref="ctrlRef" />
        <Ctrls :state="state" ref="ctrlsRef" />
        <CtrlLog :state="state" ref="logRef" />
    </div>
</template>
<script setup lang="ts">
    const { proxy }: any = getCurrentInstance();
    const publicStore = proxy.publicStore();
    const state = reactive({
        ...publicStore.$state,
        active:"All",
        bay:"All",
        actives:[
            {name:"全部", value:"All", color: ''},
            {name:"开机", value:"1", color: 'i11'},
            {name:"关机", value:"0", color: 'i6'},
            {name:"关机中", value:"2", color: 'i6'},
            {name:"开机中", value:"3", color: 'i11'},
        ],
        types: [
            {name:"插座式", value:"1010"},
            {name:"单相导轨式", value:"1011"},
            {name:"接线盒式", value:"1012"}, 
            {name:"三相导轨式", value:"1013"}, 
        ],
        airName:"",
    })
    let ctrlRef = $ref()
    let ctrlsRef = $ref()
    let logRef = $ref()

    const handleClick = async(remark) => {
        if(remark == 'controls'){
            let val = {stationNum: publicStore.active.parent_id==0?publicStore.active.id:publicStore.active.parent_id}
            ctrlsRef.onVisable(val)
        }
    }
</script>

<style lang="scss">
.air-itembox{background: linear-gradient(180deg,rgba(20, 100, 197, 0) 0%,rgba(20, 100, 197, 0.5)100%);border:1px solid rgba(96, 231, 255, 0.6);box-sizing:border-box;}
.btn-bg1{background: linear-gradient(90deg,rgba(65, 165, 176, 1) 0%,rgba(49, 199, 209, 0) 100%);border-radius: 4px;}
.btn-bg2{background: linear-gradient(90deg,rgba(44, 115, 222, 1) 0%,rgba(162, 187, 255, 0) 100%);border-radius: 4px;}
</style>