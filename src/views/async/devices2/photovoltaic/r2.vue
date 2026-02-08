<template>
  <div class="layout-col">
    <div class="ww100 flex-sc pr15 i15 mb10">  
      <span class="mr5 i15">状态：</span>
      <div class="w50x4 m">
        <el-select v-model="state.active" placeholder="请选择" filterable>
          <el-option v-for="(v, i) in state.actives" :key="v.value" :label="v.name" :value="v.value" />
        </el-select>
      </div>
      <span class="mr5 ml15 i15">名称：</span>
      <div class="w50x4">
        <el-input v-model="state.airName" placeholder="请输入"></el-input>
      </div>
      <!-- <el-button class="rad4 ptb5 plr8 flex-cc cursor bgi1 i15 ml10" @click.stop="handleClick('controls')">批量控制</el-button> -->
    </div>
    <!-- 内容 -->
    <div class="layout-row overlay warp ba1 p8">
      <div class="p8 ww25 cursor" v-for="(v, i) in !isNull(publicStore._public.homeDevices)?
      state.active!='All'&&!state.airName?publicStore._public.homeDevices.filter(a =>a['pv_inverter_status']==state.active) : 
      state.active=='All'&&state.airName?publicStore._public.homeDevices.filter(a => a.name.indexOf(state.airName)!=-1) :
      state.active!='All'&&state.airName?publicStore._public.homeDevices.filter(a =>a['pv_inverter_status']==state.active&&a.name.indexOf(state.airName)!=-1) :
      state.active=='All'&&!state.airName?publicStore._public.homeDevices : [] : []" :key="i" @click.stop="toPath('/detail', {id: v.id, stationNum: v.stationNum, type: v.type, code: 'pv_active_power', code2: 'pv_daily_energy'})">
        <div class="ww100 flex-col rad6 i15 bs">
          <div class="flex-col ww100 p15">
            <div class="flex1 flex-sc">
              <div class="w32 h32"><img class="ww100" src="@/assets/imgs/zz-3.png" /></div>
              <div class="f15 ml10 fontStyle">{{v.name}}</div>
            </div>
            <div class="flex1 flex-sc mt12">
              <div class="">当前状态</div>
              <div class="flex1 tr" :class="find(state.actives, ['value', v.pv_inverter_status], 'color')?find(state.actives, ['value', v.pv_inverter_status], 'color'):''">
                {{find(state.actives, ['value', v.pv_inverter_status], 'name')}}
              </div>
            </div>
            <div class="flex1 flex-sc mt12">
              <div class="">发电有功功率（kW）</div>
              <div class="flex1 tr">{{v.pv_active_power?Math.floor((v.pv_active_power*100))/100 : 0}}</div>
            </div>
              <div class="flex1 flex-sc mt12">
              <div class="">发电无功功率（kW）</div>
              <div class="flex1 tr">{{v.Total_reactive_power?Math.floor((v.Total_reactive_power*100))/100 : 0}}</div>
            </div>
            <div class="flex1 flex-sc mt12">
              <div class="">总视在功率（kVA）</div>
              <div class="flex1 tr">{{v.Total_apparent_power?Math.floor((v.Total_apparent_power*100))/100 : 0}}</div>
            </div>
            <div class="flex1 flex-sc mt12">
              <div class="">日发电电量（kWh）</div>
              <div class="flex1 tr">{{v.pv_daily_energy?Math.floor((v.pv_daily_energy*100))/100 : 0}}</div>
            </div>
            <div class="flex1 flex-sc mt12">
              <div class="">累计发电电量（kWh）</div>
              <div class="flex1 tr">{{v.Total_Output?Math.floor((v.Total_Output*100))/100 : 0}}</div>
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

<script lang="ts" setup>
  const { proxy }: any = getCurrentInstance();
  const publicStore = proxy.publicStore();
  const configStore = proxy.configStore();
  const state = reactive({
    ...publicStore.$state,
    active:"All",
    actives:[
      {name:"全部", value:"All", color: ''},
      {name:"停止", value:"0", color: 'i6'},
      {name:"运行", value:"1", color: 'i11'},
      {name:"异常", value:"2", color: 'i8'},
      {name:"正常", value:"3", color: 'i15'},
    ]
  });
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

<style scoped lang="scss">
.btn-bg1{background: linear-gradient(90deg,rgba(65, 165, 176, 1) 0%,rgba(49, 199, 209, 0) 100%);border-radius: 4px;}
.btn-bg2{background: linear-gradient(90deg,rgba(44, 115, 222, 1) 0%,rgba(162, 187, 255, 0) 100%);border-radius: 4px;}
</style>
