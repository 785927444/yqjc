<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title :title="'【'+(publicStore.active?publicStore.active.name:'')+'】测试结果'"><template #right-content></template></aa-title>
    <!-- 内容 -->
    <div class="ww100 hh100 flex-ss warp i15 ba1 p8">
      <div class="ww20 hh50 p8">
        <div class="ww100 hh100 p2 rad2 bgi16">
          <div class="layout-row octagon">
            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                <span class="pt5 pb5">测试日期<span></span></span>
                <span class="pb5 f16  white">{{ publicStore.active?.res?.date != null ? publicStore.active.res.date:'--' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ww20 hh50 p8">
        <div class="ww100 hh100 p2 rad2 bgi16">
          <div class="layout-row octagon">
            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                <span class="pt5 pb5">测试时段<span></span></span>
                <span class="pb5 f16  white">{{ publicStore.active?.res?.period != null ? publicStore.active.res.period:'--' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ww20 hh50 p8">
        <div class="ww100 hh100 p2 rad2 bgi16">
          <div class="layout-row octagon">
            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                <span class="pt5 pb5">测试时长<span></span></span>
                <span class="pb5 f16  white">{{ publicStore.active?.res?.duration != null ? publicStore.active.res.duration + ' s':'--' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ww20 hh50 p8">
        <div class="ww100 hh100 p2 rad2 bgi16">
          <div class="layout-row octagon">
            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                <span class="pt5 pb5">平均响应时间<span></span></span>
                <span class="pb5 f16  white">{{ publicStore.active?.res?.average != null ? publicStore.active.res.average + ' us':'--' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ww20 hh50 p8">
        <div class="ww100 hh100 p2 rad2 bgi16">
          <div class="layout-row octagon">
            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                <span class="pt5 pb5">最大延迟<span></span></span>
                <span class="pb5 f16  white">{{ publicStore.active?.res?.delay != null ? publicStore.active.res.delay + ' us':'--' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ww20 hh50 p8">
        <div class="ww100 hh100 p2 rad2 bgi16">
          <div class="layout-row octagon">
            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                <span class="pt5 pb5">总数据包数<span></span></span>
                <span class="pb5 f16  white">{{ publicStore.active?.res?.packet != null ? publicStore.active.res.packet:'--' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ww20 hh50 p8">
        <div class="ww100 hh100 p2 rad2 bgi16">
          <div class="layout-row octagon">
            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                <span class="pt5 pb5">数据完整度<span></span></span>
                <span class="pb5 f16  white">{{ publicStore.active?.res?.integrity != null ? publicStore.active.res.integrity + ' %':'--' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ww20 hh50 p8">
        <div class="ww100 hh100 p2 rad2 bgi16">
          <div class="layout-row octagon">
            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                <span class="pt5 pb5">成功传输数<span></span></span>
                <span class="pb5 f16  white">{{ publicStore.active?.res?.success_trans != null ? publicStore.active.res.success_trans:'--' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ww20 hh50 p8">
        <div class="ww100 hh100 p2 rad2 bgi16">
          <div class="layout-row octagon">
            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                <span class="pt5 pb5">失败传输数<span></span></span>
                <span class="pb5 f16  white">{{ publicStore.active?.res?.fail_trans != null ? publicStore.active.res.fail_trans:'--' }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="ww20 hh50 p8">
        <div class="ww100 hh100 p2 rad2 bgi16">
          <div class="layout-row octagon">
            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                <span class="pt5 pb5">丢包率<span></span></span>
                <span class="pb5 f16  white">{{ publicStore.active?.res?.lossrate != null ? publicStore.active.res.lossrate + ' %':'--' }}</span>
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
  })
	// 父子双向绑定
	const props = defineProps(['publicStore.active'])
</script>
  
<style scoped lang="scss">

</style>
  