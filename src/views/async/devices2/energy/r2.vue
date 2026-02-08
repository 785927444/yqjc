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
    <div class="layout-row overlay warp p8 ba1">
      <div class="p8 ww25 cursor" v-for="(v, i) in !isNull(publicStore._public.homeDevices)?
      state.active!='All'&&!state.airName?publicStore._public.homeDevices.filter(a =>a['Operation_State']==state.active) : 
      state.active=='All'&&state.airName?publicStore._public.homeDevices.filter(a => a.name.indexOf(state.airName)!=-1) :
      state.active!='All'&&state.airName?publicStore._public.homeDevices.filter(a =>a['Operation_State']==state.active&&a.name.indexOf(state.airName)!=-1) :
      state.active=='All'&&!state.airName?publicStore._public.homeDevices : [] : []" :key="i" @click.stop="toPath('/detail', {id: v.id, stationNum: v.stationNum, type: v.type, code: 'Input_Power', code2: 'Daily_Input'})">
        <div class="ww100 flex-col rad6 i15 bs">
          <div class="flex-col ww100 p15">
            <div class="flex1 flex-sc">
              <div class="w32 h32"><img class="ww100" src="@/assets/imgs/zz-4.png" /></div>
              <div class="f15 ml10 fontStyle">{{v.name}}</div>
            </div>
            <div class="flex1 flex-sc mt12">
              <div class="">当前状态</div>
              <div class="flex1 tr" :class="v.Input_Power? v.Input_Power > 0? 'i12' : v.Input_Power < 0 ? 'i6' : '' : ''">
                {{ v.Input_Power? v.Input_Power > 0? '放电' : v.Input_Power < 0 ? '充电' : '' : '' }}
              </div>
            </div>
            <div class="flex1 flex-sc mt12">
              <div class="">SOC信息（%）</div>
              <div class="flex1 tr">{{v.SOC?Math.floor((v.SOC*100))/100 : 0}}</div>
            </div>
            <div class="flex1 flex-sc mt12">
              <div class="">{{v.Input_Power? v.Input_Power > 0? '充电功率' : v.Input_Power < 0 ? '放电功率' : '实时功率' : '实时功率'}}（kW）</div>
              <div class="flex1 tr">{{v.Input_Power? v.Input_Power > 0? Math.floor((v.Input_Power*100))/100 : v.Input_Power < 0 ? Math.floor((v.Input_Power*100))/100 : 0 : 0}}</div>
            </div>
            <div class="flex1 flex-sc mt12">
              <div class="">日充电量（kWh）</div>
              <div class="flex1 tr">{{v.Daily_Input?Math.floor((v.Daily_Input*100))/100 : 0}}</div>
            </div>
            <div class="flex1 flex-sc mt12">
              <div class="">日放电量（kWh）</div>
              <div class="flex1 tr">{{v.Daily_Output?Math.floor((v.Daily_Output*100))/100 : 0}}</div>
            </div>
            <div class="flex1 flex-sc mt12">
              <div class="">累计充电量（kWh）</div>
              <div class="flex1 tr">{{v.Total_Input?Math.floor((v.Total_Input*100))/100 : 0}}</div>
            </div>
             <div class="flex1 flex-sc mt12">
              <div class="">累计放电量（kWh）</div>
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
      {name:"充电", value:"0", color: 'i11'},
      {name:"放电", value:"1", color: 'i6'},
      {name:"故障", value:"2", color: 'i8'},
      {name:"停止", value:"3", color: 'i8'}
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
