<template>
  <div class="layout-col">
      <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb10">
      <img class="hh100" src="@/assets/imgs/title.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="fw ptb5">{{$t('monitor.l2_title')}}</span>
        <div class="flex-ec flex1"></div>
      </div>
    </div>
    <div class="layout-col p10 ba1 i15 overlay">
      <div class="h44 ww100 p5">
        <div class="bgi28 ww100 hh100 rad6 relative flex-sc">
        <img class="hh100" src="@/assets/imgs/tit2.png" />
        <div class="absolute t8 l10 white w50x3">{{$t('monitor.l2_c1')}}</div>
        <div class="flex1 flex-bc plr10 tl">
          <div class="flex2 white"><span>12</span> {{$t('comm.a')}}</div>
          <div class="flex3">{{$t('monitor.l2_c2')}} <span>9</span> {{$t('comm.a')}}</div>
          <div class="flex3">{{$t('monitor.l2_c3')}} <span>3</span> {{$t('comm.a')}}</div>
        </div>
        </div>
      </div>
      <div class="h44 ww100 p5">
        <div class="bgi28 ww100 hh100 rad6 relative flex-sc">
        <img class="hh100" src="@/assets/imgs/tit2.png" />
        <div class="absolute t8 l10 white w50x3">{{$t('monitor.l2_c4')}}</div>
        <div class="flex1 flex-bc plr10 tl">
          <div class="flex2 white"><span>85</span> {{$t('comm.a')}}</div>
          <div class="flex3">{{$t('monitor.l2_c2')}} <span>65</span> {{$t('comm.a')}}</div>
          <div class="flex3">{{$t('monitor.l2_c3')}} <span>20</span> {{$t('comm.a')}}</div>
        </div>
        </div>
      </div>
      <div class="h44 ww100 p5 flex-bc">
        <div class="bgi28 ww49 hh100 rad6 relative flex-sc">
          <img class="hh100" src="@/assets/imgs/tit2.png" />
          <div class="absolute t8 l10 white w50x3">{{$t('monitor.l2_c5')}}</div>
          <div class="flex1 flex-bc plr10">
            <div class="flex2 white"><span>85461</span> {{$t('comm.yuan')}}</div>
          </div>
        </div>
        <div class="bgi28 ww49 hh100 rad6 relative flex-sc">
          <img class="hh100" src="@/assets/imgs/tit2.png" />
          <div class="absolute t8 l10 white w50x3">{{$t('monitor.l2_c6')}}</div>
          <div class="flex1 flex-bc plr10">
            <div class="flex2 white"><span>93</span> %</div>
          </div>
        </div>
	    </div>
      <div class="h44 ww100 p5">
        <div class="bgi28 ww100 hh100 rad6 relative flex-sc">
        <img class="hh100" src="@/assets/imgs/tit2.png" />
        <div class="absolute t8 l10 white w50x3">{{$t('monitor.l2_c7')}}</div>
        <div class="flex1 flex-bc plr10 tl">
          <div class="flex2 white"><span>2.1</span> MW</div>
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
