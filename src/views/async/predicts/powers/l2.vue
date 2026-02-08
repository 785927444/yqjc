<template>
  <div class="layout-col">
    <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb10">
      <img class="hh100" src="@/assets/imgs/title.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="fw flex1 ptb5">发电设备</span>
        <div class="flex-ec flex1 hh100">
          <span class="hh100 flex-cc plr10 cursor" 
          :class="state.active==v.value?'bs4 white':'i14'" 
          v-for="(v, i) in state.actives" :key="i"
          @click.stop="state.active=v.value">{{v.name}}</span>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="flex1 ww100 flex-col p20 ba1">
			<!-- 光伏 -->
			<div class="flex-sc flex1 ww100">
				<div class="flex-cc ww100 plr10">
					<img class="w80" src="@/assets/imgs/home11.png" />
					<div class="flex1 hh100 flex-col-cc">
						<div class="f16">光伏</div>
						<div class="f16 i15 mt10 fw">100</div>
					</div>
					<div class="flex1 flex-col">
						<div class="flex1 flex-bc hidden mb5">
							<div class="flex1 flex-col-cc hidden">
								<span class="z1">在线</span>
								<span class="h10 w40 mts"></span>
								<span class="fw mt2">90</span>
							</div>
							<div class="flex1 flex-col-cc hidden">
								<span class="z1">离线</span>
								<span class="h10 w40 mts"></span>
								<span class="fw mt2">10</span>
							</div>
						</div>
						<div class="flex1 flex-bc hidden">
							<div class="flex1 flex-col-cc hidden">
								<span class="z1">运行</span>
								<span class="h10 w40 mts"></span>
								<span class="fw mt2">88</span>
							</div>
							<div class="flex1 flex-col-cc hidden">
								<span class="z1">停止</span>
								<span class="h10 w40 mts"></span>
								<span class="fw mt2">2</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- 分界 -->
			<div class="ww100 h1" style="background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);"></div>
			<!-- 风机 -->
			<div class="flex-sc flex1 ww100">
				<div class="flex-cc ww100 plr10">
					<img class="w80" src="@/assets/imgs/home44.png" />
					<div class="flex1 hh100 flex-col-cc">
						<div class="f16">风机</div>
						<div class="f16 i15 mt10 fw">150</div>
					</div>
					<div class="flex1 flex-col">
						<div class="flex1 flex-bc hidden mb5">
							<div class="flex1 flex-col-cc hidden">
								<span class="z1">在线</span>
								<span class="h10 w40 mts"></span>
								<span class="fw mt2">140</span>
							</div>
							<div class="flex1 flex-col-cc hidden">
								<span class="z1">离线</span>
								<span class="h10 w40 mts"></span>
								<span class="fw mt2">10</span>
							</div>
						</div>
						<div class="flex1 flex-bc hidden">
							<div class="flex1 flex-col-cc hidden">
								<span class="z1">运行</span>
								<span class="h10 w40 mts"></span>
								<span class="fw mt2">135</span>
							</div>
							<div class="flex1 flex-col-cc hidden">
								<span class="z1">停止</span>
								<span class="h10 w40 mts"></span>
								<span class="fw mt2">5</span>
							</div>
						</div>
					</div>
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
  });

</script>

<style scoped lang="scss">
.mts {
	margin-top: -10px;
	border-radius: 15px 0 0 15px; 
	background: linear-gradient(90deg, #6097FF 0%, rgba(96, 151, 255, 0) 100%);
}
</style>
