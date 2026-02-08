<template>
  <div class="layout-col">
    <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb10">
      <img class="hh100" src="@/assets/imgs/title.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="fw flex1 ptb5">调节幅度排名</span>
        <div class="flex-ec flex1 hh100">
          <span class="hh100 flex-cc plr10 cursor" 
          :class="state.active==v.value?'bs4 white':'i14'" 
          v-for="(v, i) in state.actives" :key="i"
          @click.stop="state.active=v.value">{{v.name}}</span>
        </div>
      </div>
    </div>
    <div class="layout-col p10 ba1 i15">
      <div class="relative layout-col">
        <!-- <div class="absolute w6 hh100 bg-white t0 l6" style="z-index: -1"></div> -->
        <div class="ww100 relative overlay tc flex-ss warp hidden ptb1 p5">
          <div class="tack flex-sc cursor relative i15 ww100" style="height: auto;" :class="i==0?'':'mt15'"
          v-for="(v, i) in isNull(publicStore._public.mainData)? [] : publicStore._public.mainData">
            <div class="bgi23 w9 h9 rad100 bo-white-2"></div>
            <div class="w60" :class="i==0?'i6':i==1?'i21':i==2?'i3':''">NO.{{i+1}}</div>
            <div class="flex1 flex-sc relative">
              <img class="h36" src="@/assets/imgs/tit3.png" />
              <div class="ww100 hh100 flex-sc absolute plr15">
                <div>{{v.name}}</div>
                <div class="flex1 flex-ec">
                  <span class="w100">调节幅度</span>
                  <span class="w100">{{v.value}}<span class="f12 ml2">kW</span></span>
                </div>
              </div>
            </div>
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
    active: '1',
    actives: [
      {value: '1', name: '上调'},
      {value: '2', name: '下调'},
    ]
  })
</script>

<style scoped lang="scss">

</style>
