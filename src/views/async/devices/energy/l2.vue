<template>
  <div class="layout-col">
    <!-- 标题 -->
	<div class="h40 ww100 flex-sc relative mb10">
		<img class="hh100" src="@/assets/imgs/title.png" />
		<div class="ww100 hh100 flex-sc absolute pl35">
			<span class="fw flex1 ptb5">储能站实时信息</span>
			<div class="flex-ec flex1"></div>
		</div>
	</div>
    <!-- 内容 -->
    <div class="layout-row p12 ba1 warp i15">
      <div class="ww50 hh50 flex-bc p8">
        <div class="ww100 hh100 bs3 flex-bc p15">
          <img class="h50" src="@/assets/imgs/e1.png" />
          <div class="flex1 tr flex-col">
            <span>储能功率</span>
            <span class="mt5"><span class="white mr5 f16">3.4</span>MW</span>
          </div>
        </div>
      </div>
      <div class="ww50 hh50 flex-bc p8">
        <div class="ww100 hh100 bs3 flex-bc p15">
          <img class="h50" src="@/assets/imgs/e2.png" />
          <div class="flex1 tr flex-col">
            <span>负荷功率</span>
            <span class="mt5"><span class="white mr5 f16">12.5</span>MW</span>
          </div>
        </div>
      </div>
      <div class="ww50 hh50 flex-bc p8">
        <div class="ww100 hh100 bs3 flex-bc p15">
          <img class="h50" src="@/assets/imgs/e3.png" />
          <div class="flex1 tr flex-col">
            <span>今日充电量</span>
            <span class="mt5"><span class="white mr5 f16">9.2</span>MWh</span>
          </div>
        </div>
      </div>
      <div class="ww50 hh50 flex-bc p8">
        <div class="ww100 hh100 bs3 flex-bc p15">
          <img class="h50" src="@/assets/imgs/e4.png" />
          <div class="flex1 tr flex-col">
            <span>可用电总量</span>
            <span class="mt5"><span class="white mr5 f16">12.3</span>MWh</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import ec from "@/utils/chart";
  const { drawChart } = ec();
  const { proxy }: any = getCurrentInstance();
  const publicStore = proxy.publicStore();
  const configStore = proxy.configStore();
  const state = reactive({
    ...publicStore.$state,
  });

</script>

<style scoped lang="scss">

</style>
