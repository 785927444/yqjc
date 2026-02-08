<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title :title="'【'+(publicStore.active?publicStore.active.name:'')+'】测试结果'"><template #right-content></template></aa-title>
    <!-- 内容 -->
    <div class="ww100 hh100 flex-ss warp i15 ba1 p8">
      <div class="ww20 hh100 p8">
        <div class="ww100 hh100 p2 rad2 bgi16">
          <div class="layout-row octagon">
            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                <span class="pt5 pb5">调控日期<span></span></span>
                <span class="pb5 f16  white">{{ publicStore.active?.res?.date != null ? publicStore.active.res.date:'--' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ww20 hh100 p8">
        <div class="ww100 hh100 p2 rad2 bgi16">
          <div class="layout-row octagon">
            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                <span class="pt5 pb5">调控时段<span></span></span>
                <span class="pb5 f16  white">{{ publicStore.active?.res?.period != null ? publicStore.active.res.period:'--' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ww20 hh100 p8">
        <div class="ww100 hh100 p2 rad2 bgi16">
          <div class="layout-row octagon">
            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                <span class="pt5 pb5">持续时间<span></span></span>
                <span class="pb5 f16  white">{{ publicStore.active?.res?.duration != null ? publicStore.active.res.duration + ' s':'--' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ww20 hh100 p8">
        <div class="ww100 hh100 p2 rad2 bgi16">
          <div class="layout-row octagon">
            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                <span class="pt5 pb5">响应速率<span></span></span>
                <span class="pb5 f16  white">{{ publicStore.active?.res?.average != null ? publicStore.active.res.average + ' ms':'--' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ww20 hh100 p8">
        <div class="ww100 hh100 p2 rad2 bgi16">
          <div class="layout-row octagon">
            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                <span class="pt5 pb5">功率调节精度<span></span></span>
                <span class="pb5 f16  white">{{ publicStore.active?.res?.accuracy != null ? publicStore.active.res.accuracy:'--' }}</span>
            </div>
          </div>
        </div>
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
  