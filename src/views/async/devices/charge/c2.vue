<template>
	<div class="ww100 relative overlay tc flex-ss warp hidden ptb1">
		<div class="tack list2-15 rad8 flex-col-ss cursor p20 relative i15 bs4" style="height: auto;"
			v-for="(v, i) in isNull(publicStore._public.mainData)? [] : publicStore._public.mainData">
			<div class="ww100 flex-sc">
        <img class="h42 mr15" src="@/assets/imgs/m1.png" alt="" />
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
        <span>储能容量（kWh）</span>
        <span>{{v.capacity}}</span>
      </div>
			<div class="ww100 flex-bc mt12">
        <span>额定功率（kW）</span>
        <span>{{v.rated}}</span>
      </div>
			<div class="ww100 flex-bc mt12">
        <span>输出功率（kW）</span>
        <span>{{v.out}}</span>
      </div>
      <div class="ww100 flex-bc mt12 ba5 ce ptb5 pl10">接车辆信息</div>
			<div class="ww100 flex-bc mt12">
        <span>车牌号</span>
        <span>{{v.car_id}}</span>
      </div>
			<div class="ww100 flex-bc mt12">
        <span>车型</span>
        <span>{{v.car_type}}</span>
      </div>
			<div class="ww100 flex-bc mt12">
        <span>充电开始时间</span>
        <span>{{v.start_time}}</span>
      </div>
			<div class="ww100 flex-bc mt12">
        <span>预计结束时间</span>
        <span>{{v.end_time}}</span>
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
  });

</script>

<style scoped lang="scss">

</style>
