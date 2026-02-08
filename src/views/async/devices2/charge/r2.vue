<template>
  <div class="layout-col">
    <div class="ww100 flex-sc pr15 i15 mb10">  
      <span class="mr5 i15">名称：</span>
      <div class="w50x4">
        <el-input v-model="state.airName" placeholder="请输入"></el-input>
      </div>
      <!-- <el-button class="rad4 ptb5 plr8 flex-cc cursor bgi1 i15 ml10" @click.stop="handleClick('controls')">批量控制</el-button> -->
    </div>
    <!-- 内容 -->
    <div class="layout-row overlay warp p8 ba1">
      <div class="p8 ww50 cursor" v-for="(v, i) in !isNull(publicStore._public.sensorNodes)?
      state.active!='All'&&!state.airName?publicStore._public.sensorNodes.filter(a =>a['Operation_State']==state.active) : 
      state.active=='All'&&state.airName?publicStore._public.sensorNodes.filter(a => a.name.indexOf(state.airName)!=-1) :
      state.active!='All'&&state.airName?publicStore._public.sensorNodes.filter(a =>a['Operation_State']==state.active&&a.name.indexOf(state.airName)!=-1) :
      state.active=='All'&&!state.airName?publicStore._public.sensorNodes : [] : []" :key="i">
        <div class="ww100 flex-col rad6 i15 bs">
          <div class="flex-col ww100">
            <div class="flex1 flex-sc plr20 pt20">
              <div class="w36 h36"><img class="ww100" src="@/assets/imgs/zz-5.png" /></div>
              <div class="f15 ml10 fontStyle">{{v.name}}</div>
            </div>
            <div class="flex-ss hidden ww100">
              <div class="flex-ss hidden flex1 pr20 pb20 cursor" v-for="(vv, ii) in !isNull(v.children)?v.children.length>2?v.children.slice(0, 2):v.children.length==2?v.children:v.children.length==1?[...v.children,...[]]:[{},{}]:[{},{}]" :key="ii"
                @click.stop="toPath('/detail', {id: vv.id, stationNum: vv.stationNum, type: vv.type, code: 'Input_Power', code2: 'Daily_Input'})">
                <div v-if="ii!=0" class="h100x2 flex-cc hidden pr20">
                  <img class="hh100 w2" src="@/assets/imgs/line.png" />
                </div>
                <div v-else class="h100x2 w2 flex-cc hidden pr15"></div>
                <div class="flex-col ww100">
                  <div class="flex1 flex-cc mt20">
                    <img class="w20 h20" src="@/assets/imgs/zz-6.png" />
                    <span class="f15 ml10 fontStyle">{{vv.name}}</span>
                  </div>
                  <div class="flex1 flex-sc mt12">
                    <div class="">当前状态</div>
                    <div class="flex1 tr" :class="find(state.actives, ['value', vv.Operation_State], 'color')?find(state.actives, ['value', vv.Operation_State], 'color'):''">
                      {{find(state.actives, ['value', vv.Operation_State], 'name')}}
                    </div>
                  </div>
                  <div class="flex1 flex-sc mt12">
                    <div class="">充电功率（kW）</div>
                    <div class="flex1 tr">{{vv.Input_Power?Math.floor((vv.Input_Power*100))/100 : 0}}</div>
                  </div>
                  <div class="flex1 flex-sc mt12">
                    <div class="">日充电量（kWh）</div>
                    <div class="flex1 tr">{{vv.Daily_Input?Math.floor((vv.Daily_Input*100))/100 : 0}}</div>
                  </div>
                  <div class="flex1 flex-sc mt12">
                    <div class="">累计充电量（kWh）</div>
                    <div class="flex1 tr">{{vv.Total_Input?Math.floor((vv.Total_Input*100))/100 : 0}}</div>
                  </div>
                  <div class="flex1 flex-sc mt12">
                    <div class="">更多操作</div>
                    <div class="flex1 tr i21 cursor" >详情</div>
                  </div>
                </div>
              </div>
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
      {name:"离网", value:"0", color: 'ca'},
      {name:"空闲", value:"1", color: 'i6'},
      {name:"占用中", value:"2", color: 'i7'},
      {name:"充电中", value:"3", color: 'i11'},
      {name:"已预约", value:"4", color: 'i11'},
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
