<template>
  <div class="layout-col">
    <!-- 标题 -->
	<div class="h40 ww100 flex-sc relative mb10">
		<img class="hh100" src="@/assets/imgs/title.png" />
		<div class="ww100 hh100 flex-sc absolute pl35">
			<span class="fw flex1 ptb5">需求响应邀约</span>
			<div class="flex-ec flex1"></div>
		</div>
	</div>
    <div class="layout-col p10 ba1 i15">
      <div class="h44 ww100 p5">
		  <div class="bgi28 ww100 hh100 rad6 relative flex-sc">
            <img class="hh100" src="@/assets/imgs/tit2.png" />
			<div class="absolute t8 l10 white w50x3">申报事件数量</div>
			<div class="flex1 flex-bc plr10">
                <div class="flex2 white"><span>8</span> 个</div>
				<div class="flex3">约定型 <span>2</span> 个</div>
				<div class="flex3">实时型 <span>2</span> 个</div>
			</div>
		  </div>
	  </div>
      <div class="h44 ww100 p5">
		  <div class="bgi28 ww100 hh100 rad6 relative flex-sc">
            <img class="hh100" src="@/assets/imgs/tit2.png" />
			<div class="absolute t8 l10 white w50x3">申报用户数量</div>
			<div class="flex1 flex-bc plr10">
                <div class="flex2 white"><span>8</span> 个</div>
				<div class="flex3">约定型 <span>2</span> 个</div>
				<div class="flex3">实时型 <span>2</span> 个</div>
			</div>
		  </div>
	  </div>
      <div class="h44 ww100 p5 flex-bc">
		  <div class="bgi28 ww49 hh100 rad6 relative flex-sc">
            <img class="hh100" src="@/assets/imgs/tit2.png" />
			<div class="absolute t8 l10 white w50x3">资源可用率</div>
			<div class="flex1 flex-bc plr10">
                <div class="flex2 white"><span>8</span> 个</div>
			</div>
		  </div>
		  <div class="bgi28 ww49 hh100 rad6 relative flex-sc">
            <img class="hh100" src="@/assets/imgs/tit2.png" />
			<div class="absolute t8 l10 white w50x3">平均申报用时</div>
			<div class="flex1 flex-bc plr10">
                <div class="flex2 white"><span>8</span> 小时</div>
			</div>
		  </div>
	  </div>
      <div class="h44 ww100 p5">
		  <div class="bgi28 ww100 hh100 rad6 relative flex-sc">
            <img class="hh100" src="@/assets/imgs/tit2.png" />
			<div class="absolute t8 l10 white w50x3">最近截止时间</div>
			<div class="flex1 flex-bc plr10">
                <div class="flex2 white"><span>8</span> 个</div>
				<div class="flex3">约定型 <span>2</span> 个</div>
				<div class="flex3">实时型 <span>2</span> 个</div>
			</div>
		  </div>
	  </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const state = reactive({
	  ...publicStore.$state,
  })
</script>

<style scoped lang="scss">

</style>
