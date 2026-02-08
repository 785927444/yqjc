<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title :title="'【'+(publicStore.active?publicStore.active.name:'')+'】测试结果'"><template #right-content></template></aa-title>
    <!-- 内容 -->
    <div class="layout-col ba1">
     <div class="row bgi22">
        <div class="w70 tc">序号</div>
        <div class="w50x4">设备类型</div>
        <span class="ww100 flex-sc">
          <div class="w50x4">测试设备</div>
          <div class="w50x4">测量属性</div>
          <div class="w50x3">标准数值</div>
          <div class="w50x3">采样数值</div>
          <div class="w50x3">允许误差 %</div>
          <div class="w50x3">超差次数</div>
          <div class="w50x3">结果判断</div>
          <div class="w50x3">原因</div>
        </span>
      </div>
      <div class="table" v-if="!isNull(publicStore.active) && !isNull(publicStore.active.attr)">
        <div class="row cursor" v-for="(item, index) in publicStore.active.attr.childs?publicStore.active.attr.childs:[]" :key="index" :class="index%2 == 1?'bgi23':'bgi18'">
          <div class="w70 tc">{{index+1}}</div>
          <div class="w50x4">
            <span v-if="!isNull(publicStore._public) && !isNull(publicStore._public.deviceTypes)">{{find(publicStore._public.deviceTypes, ['type', item['type']], 'name')}}</span>
            <span v-else>{{ item['type'] }}</span>
          </div>
          <span class="ww100 flex-col" v-if="!isNull(publicStore.active.res.childs) && !isNull(find(publicStore.active.res.childs, ['type', item.type], 'items'))">
            <div class="ww100 flex-sc" style="padding-top: 5px; padding-bottom: 5px;" v-for="(v, i) in find(publicStore.active.res.childs, ['type', item.type], 'items')" :key="i">
              <div class="w50x4 pr10" v-if="!isNull(item.sensors)">{{ v.sensor_id? find(item.sensors, ['id', v.sensor_id], 'name') : '' }}</div>
              <div class="w50x4 pr10" v-else>{{ v.sensor_id? v.sensor_id : '' }}</div>
              <div class="w50x4 pr10" v-if="!isNull(item.meas)">{{ v.code? find(item.meas, ['code', v.code], 'name') : '' }}</div>
              <div class="w50x4 pr10" v-else>{{ v.code? v.code : '' }}</div>
              <div class="w50x3 pr10">{{ v.value? v.value : '' }}</div>
              <div class="w50x3 pr10">{{ v.act_value? v.act_value : '' }}</div>
              <div class="w50x3 pr10">{{ v.error? v.error : '' }}</div>
              <div class="w50x3 pr10">{{ v.act_error? v.act_error : '' }}</div>
              <div class="w50x3 pr10" :class="v.act_res? find(state.ress, ['value', v.act_res], 'color') : ''">{{ v.act_res? find(state.ress, ['value', v.act_res], 'name') : '' }}</div>
              <div class="w50x3 pr10">{{ v.act_reason?v.act_reason : '' }}</div>
            </div>
          </span>
          <span class="ww100 flex-col" v-else>
            <div class="ww100 flex-sc" v-if="!isNull(publicStore.active.attr.childs)" style="padding-top: 5px; padding-bottom: 5px;" v-for="(v, i) in find(publicStore.active.attr.childs, ['type', item.type], 'items')" :key="i">
              <div class="w50x4 pr10" v-if="!isNull(item.sensors)">{{ v.sensor_id? find(item.sensors, ['id', v.sensor_id], 'name') : '' }}</div>
              <div class="w50x4 pr10" v-else>{{ v.sensor_id? v.sensor_id : '' }}</div>
              <div class="w50x4 pr10" v-if="!isNull(item.meas)">{{ v.code? find(item.meas, ['code', v.code], 'name') : '' }}</div>
              <div class="w50x4 pr10" v-else>{{ v.code? v.code : '' }}</div>
              <div class="w50x3 pr10">{{ v.value? v.value : '' }}</div>
              <div class="w50x3 pr10">{{ v.act_value? v.act_value : '' }}</div>
              <div class="w50x3 pr10">{{ v.error? v.error : '' }}</div>
              <div class="w50x3 pr10">{{ v.act_error? v.act_error : '' }}</div>
              <div class="w50x3 pr10" :class="v.act_res? find(state.ress, ['value', v.act_res], 'color') : ''">{{ v.act_res? find(state.ress, ['value', v.act_res], 'name') : '' }}</div>
              <div class="w50x3 pr10">{{ v.act_reason?v.act_reason : '' }}</div>
            </div>
          </span>
        </div>
        <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
      </div>
    </div>
    <!-- 底部 -->
		<aa-foot></aa-foot>
  </div>
</template>

<script lang="ts" setup>
	const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const state = reactive({
	  ...publicStore.$state,
    ress: [
      {name: '失败', value: '0', color: 'i8'},
      {name: '通过', value: '1', color: 'i12'},
    ],
  })
</script>
  
<style scoped lang="scss">

</style>
  