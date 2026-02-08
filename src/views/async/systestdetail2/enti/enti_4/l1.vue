<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title title="配置信息"><template #right-content></template></aa-title>
    <!-- 内容 -->
    <div class="layout-col ba1 p20 i15">
      <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">当前状态</span>
        <span :class="publicStore.active?publicStore.active.status=='1'?'i12':publicStore.active.status=='2'?'i6':'':''">{{ publicStore.active?publicStore.active.status=='1'?'进行中':publicStore.active.status=='2'?'已完成':'':'' }}</span>
      </div>
      <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">开始时间</span>
        <span class="white">{{ publicStore.active&&publicStore.active.start_time?parseTime(publicStore.active.start_time):'' }}</span>
      </div>
      <div class="flex-sc cursor mb15 z1 relative" v-if="publicStore.active&&publicStore.active.end_time">
        <span class="w50x2 mr10">结束时间</span>
        <span class="white">{{ publicStore.active&&publicStore.active.end_time?parseTime(publicStore.active.end_time):'' }}</span>
      </div>
      <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">操作人员</span>
        <span class="white">{{ publicStore.active&&publicStore.active.user_name?decrypt(publicStore.active.user_name):'' }}</span>
      </div>
      <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">前置记录</span>
        <span class="i1 cursor">查看</span>
      </div>
      <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">调控终端</span>
        <span class="white">{{ publicStore.active&&publicStore.active.attr&&publicStore.active.attr.terminal?find(terminals, ['id', publicStore.active.attr.terminal], 'name'):'' }}</span>
      </div>
      <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">协议规约</span>
        <span class="white">{{ publicStore.active&&publicStore.active.attr&&publicStore.active.attr.agreement?find(dictStore.agreements, ['value', publicStore.active.attr.agreement], 'name'):'' }}</span>
      </div>
      <!-- <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">通讯时长</span>
        <span class="white">{{ publicStore.active&&publicStore.active.attr&&publicStore.active.attr.time?publicStore.active.attr.time:'' }} s</span>
      </div> -->
      <!-- <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">通讯次数</span>
        <span class="white">{{ publicStore.active&&publicStore.active.attr&&publicStore.active.attr.count?publicStore.active.attr.count:'' }} 次</span>
      </div> -->
      <div class="flex-sc cursor mb15 z1 relative">
        <span class="w50x2 mr10">采样周期</span>
        <span class="white">{{ publicStore.active&&publicStore.active.attr&&publicStore.active.attr.frequency?publicStore.active.attr.frequency:'' }} s</span>
      </div>
      <div class="flex-col cursor mb15 z1 relative">
        <span class="w50x2 mr10">选择类型</span>
        <span class="flex1 hh100 white mt10">
          <div class="table" v-if="!isNull(publicStore.active) && !isNull(publicStore.active.attr)">
            <div class="ww100 flex-col cursor" v-for="(item, index) in publicStore.active.attr.childs?publicStore.active.attr.childs:[]" :key="index" :class="index%2 == 1?'bgi23':'bgi18'">
              <div class="row" style="padding: 6px 5px; background: rgba(0, 101, 255, 0.1) !important;">
                <div class="flex1">
                  <span v-if="!isNull(publicStore._public) && !isNull(publicStore._public.deviceTypes)">{{find(publicStore._public.deviceTypes, ['type', item['type']], 'name')}}</span>
                  <span v-else>{{ item['type'] }}</span>
                </div>
                <div v-if="!isNull(item.meas)" class="flex1 f12 i6">{{ item.code? find(item.meas, ['code', item.code], 'name') : '' }}</div>
                <div class="w60">{{ find(state.priceTypes, ['value', item['price_type']], 'name') }}</div>
                <div class="w60"><span>{{ item['price'] }}</span><span class="f12 ml5">元</span></div>
              </div>
              <div class="ww100 flex-sc warp" v-if="!isNull(publicStore.active.attr.childs) && !isNull(find(publicStore.active.attr.childs, ['type', item.type], 'items'))">
                <div class="ww50 flex-sc p5 cursor" style="padding-top: 5px; padding-bottom: 5px;" v-for="(v, i) in find(publicStore.active.attr.childs, ['type', item.type], 'items')" :key="i">
                  <div class="ww100 flex-sc rad2 ptb5 plr10 f12" style="background: rgba(0, 216, 255, 0.3)" v-if="!isNull(item.sensors)">
                    <span class="flex1 line1">{{ find(item.sensors, ['id', v.sensor_id], 'name') }}</span>
                  </div>
                  <!-- <div class="w50x4 pr10" v-else>{{ v.sensor_id }}</div> -->
                </div>
              </div>
              <div class="ww100 flex-col" v-else></div>
            </div>
            <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
          </div>
        </span>
      </div> 
      <div class="flex-col cursor mb15 z1 relative">
        <span class="w50x2 mr10">响应时间</span>
        <span class="flex1 hh100 white mt10">
          <div class="table" v-if="!isNull(publicStore.active) && !isNull(publicStore.active.attr)">
            <div class="ww100 flex-col cursor" v-for="(item, index) in publicStore.active.attr.fields?publicStore.active.attr.fields:[]" :key="index" :class="index%2 == 1?'bgi23':'bgi18'">
              <div class="row" style="padding: 6px 5px; background: rgba(0, 101, 255, 0.1) !important;">
                <div class="flex1 flex-col">
                  <span v-if="!isNull(item['datetime'])">{{ item['datetime'][0].split(' ')[1] }} ~ {{ item['datetime'][1].split(' ')[1] }}</span>
                </div>
                <div class="w60">
                  <span>{{item['type']? find(state.types, ['value', item['type']], 'name') : ''}}</span>
                </div>
                 <div class="w60">
                  <span>{{item['value']? item['value'] : ''}} <span class="f12 ml5">kW</span></span>
                </div>
                <div v-if="!isNull(item.meas)" class="f12 i6">{{ item.code? find(item.meas, ['code', item.code], 'name') : '' }}</div>
              </div>
            </div>
            <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
          </div>
        </span>
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
  const dictStore = proxy.dictStore()
  const state = reactive({
	  ...publicStore.$state,
    types: [
      {name: '下降', value: '0'},
      {name: '上调', value: '1'},
    ],
    priceTypes: [
      {name: '下降', value: '0'},
      {name: '上调', value: '1'},
    ],
  })
	// 父子双向绑定
	const props = defineProps(['terminals'])

</script>
  
<style scoped lang="scss">

</style>
  