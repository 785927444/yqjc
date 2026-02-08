<template>
  <div class="layout-col">
    <div class="ww100 flex-sc">
      <span class="flex-cc plr15 pb5 pt10 cursor" 
      :class="state.active==v.value?'bs4 white':'i14'" 
      v-for="(v, i) in state.actives" :key="i"
      @click.stop="state.active=v.value">{{v.name}}</span>
    </div>
    <div class="ww100 relative overlay tc flex-ss warp hidden ptb1">
      <div class="tack list2-15 rad8 flex-col-ss cursor p20 relative i15 bs4" style="height: auto;"
        v-for="(v, i) in isNull(publicStore._public.mainData)? [] : publicStore._public.mainData">
        <div class="ww100 flex-sc">
          <img class="h42 mr15" src="@/assets/imgs/m3.png" alt="" />
          <span>{{v.name}}</span>
        </div>
        <div class="ww100 flex-bc mt12">
          <span>设备型号</span>
          <span>{{v.id}}</span>
        </div>
        <div class="ww100 flex-bc mt12">
          <span>运行状态</span>
          <span :class="v.run?v.run=='1'?'i12':v.run=='2'?'i8':'':''">{{v.run?v.run=='1'?'运行中':v.run=='2'?'已停止':'':''}}</span>
        </div>
        <div class="ww100 flex-bc mt12">
          <span>额定功率（kW）</span>
          <span>{{v.rated}}</span>
        </div>
        <div class="ww100 flex-bc mt12">
          <span>输出功率（kW）</span>
          <span>{{v.out}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { proxy }: any = getCurrentInstance();
  const publicStore = proxy.publicStore();
  const configStore = proxy.configStore();
  const state = reactive({
    ...publicStore.$state,
    active: '1',
    actives: [
      {value: '1', name: '制冷机'},
      {value: '2', name: '公共照明'},
      {value: '3', name: '通风机'},
      {value: '4', name: '新风机组'},
      {value: '5', name: '电梯'},
      {value: '6', name: '冷冻水泵'},
      {value: '7', name: '锅炉'},
    ]
  });

</script>

<style scoped lang="scss">

</style>
