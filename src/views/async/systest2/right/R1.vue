<template>
	<div class="layout-col bo-i16-1 p15" style="border-left: none;">
    <!-- 前置 -->
    <Fronts ref="frontsRef"/>
		<!-- 场景 -->
		<div class="ww100 flex-sc mt15 ce" v-if="['comm_3', 'comm_4', 'calc_1', 'calc_2'].includes(publicStore.active.type)">
      <div>场景类型：</div>
      <div class="flex1 flex-sc">
        <div class="plr15 h40 rad2 mr15 cursor relative flex-cc" :class="publicStore.active.attr?.scene && publicStore.active.attr.scene == v.value?'bo-i16-1 i16 triangle':'bo-i15-1 i15'" v-for="(v, i) in state.scenes" :key="i" @click.stop="publicStore.active.attr.scene = v.value">
            <i-ep-check class="absolute t0 r0 white z1 f12 p2" v-if="publicStore.active.attr?.scene && publicStore.active.attr.scene == v.value" />
            <i-ep-warn-triangle-filled class="mr4" />
            <span>{{ v.name }}</span>
        </div>
      </div>
		</div>
		<!-- 策略 -->
		<!-- <div class="ww100 flex-sc mt15 ce">
      <div>控制策略：</div>
      <div class="flex1 flex-sc">
        <div class="mr20 cursor relative flex-sc i15" v-for="(v, i) in state.strategys" :key="i" @click.stop="publicStore.active.attr.strategy = v.value">
            <span  class="w14 h14 rad100 m-auto cursor flex-cc p2 bo-i16-1 mr8">
              <span class="w6 h6 rad100" :class="publicStore.active.attr?.strategy && publicStore.active.attr.strategy == v.value?'bgi16':''"></span>
            </span>
            <span>{{ v.name }}</span>
        </div>
      </div>
		</div> -->
		<!-- 次数 -->
		<!-- <div class="ww100 flex-sc mt15 ce">
      <div>通讯次数：</div>
      <el-input v-if="publicStore.active&&publicStore.active.attr" class="w50x4" v-model.trim="publicStore.active.attr.count" placeholder="请输入数字" />
      <div class="ml8">次</div>
		</div> -->
		<!-- 频率 -->
		<div class="ww100 flex-sc mt15 ce">
      <div>通讯频率：</div>
      <el-input type="number" v-if="publicStore.active&&publicStore.active.attr" class="w50x4" v-model.trim="publicStore.active.attr.frequency" placeholder="请输入数字" />
      <div class="ml8">秒</div>
		</div>
    <!-- 内容 -->
    <div class="layout-col mt15">
      <l2 class="ww100 flex2 flex-col" />
    </div>
	</div>
</template>

<script lang="ts" setup>
  import l2 from './L2';
  import ec from "@/utils/chart";
  const { drawChart } = ec();
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
  let frontRefs = $ref()
	const state = reactive({
		...publicStore.$state,
    types: [
      {name: '下降', value: '0'},
      {name: '上调', value: '1'},
    ],
    scenes: [
      {name: '削峰', value: 'peak_shaving'},
      {name: '填谷', value: 'valley_filling'},
      {name: '缓解重过载', value: 'alleviating_heavy_overload'},
      {name: '需求响应', value: 'demand_response'},
    ],
    strategys: [
      {name: '自适应', value: '1'},
      {name: '经济优先', value: '2'},
      {name: '响应优先', value: '3'},
    ],
	})

  // 点击方法
  // const handleClick = (remark, val) => {
  //   if(remark == 'active'){
  //     if(!proxy.isNull(publicStore.active)){
  //       if(proxy.isNull(publicStore.active.attr)) publicStore.active.attr = {}
  //       publicStore.active.attr.front = '1' 
  //     }
  //   }
  // }
</script>

<style lang="scss">
.triangle::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 20px; /* 10px * √2 ≈ 14.14px，取稍大值确保覆盖 */
  height: 20px;
  background-color: #0A87C1;
  transform: rotate(0deg);
  transform-origin: 100% 0;
  clip-path: polygon(100% 0, 100% 100%, 0 0);
  box-sizing: border-box;
}
</style>
