<template>
  <div class="layout-col">
    <!-- 面包屑 -->
    <div class="ww100 flex-sc bs2 h40 mb15">
      <div class="cursor hh100 ptb10 plr20 i21"></div>
      <div class="cursor hh100 ptb10 plr20 i21"></div>
      <div class="flex1 hh100 flex-ec">
        <img src="@/assets/imgs/uu1.png" />
        <span class="ml15 cb cursor" @click.stop="router.go(-1)">返回</span>
        <span class="mlr10 cc">/</span>
        <span class="mr10 cursor fontStyle">测试结果</span>
        <img src="@/assets/imgs/uu2.png" />
      </div>
    </div>
		<!-- 内容 -->
    <div class="layout-col plr15 pb15" v-if="$route.query.type">
      <Comm_1 v-if="$route.query.type=='comm_1'" />
      <Comm_2 v-if="$route.query.type=='comm_2'" />
      <Comm_3 v-if="$route.query.type=='comm_3'" />
      <Comm_4 v-if="$route.query.type=='comm_4'" />
      <Calc_1 v-if="$route.query.type=='calc_1'" />
      <Calc_2 v-if="$route.query.type=='calc_2'" />
      <Enti_1 v-if="$route.query.type=='enti_1'" />
      <Enti_2 v-if="$route.query.type=='enti_2'" />
      <Enti_3 v-if="$route.query.type=='enti_3'" />
      <Enti_4 v-if="$route.query.type=='enti_4'" />
      <Unit_1 v-if="$route.query.type=='unit_1'" />
      <Unit_2 v-if="$route.query.type=='unit_2'" />
      <Unit_3 v-if="$route.query.type=='unit_3'" />
      <Unit_4 v-if="$route.query.type=='unit_4'" />
      <Unit_5 v-if="$route.query.type=='unit_5'" />
      <Unit_6 v-if="$route.query.type=='unit_6'" />
      <Unit_7 v-if="$route.query.type=='unit_7'" />
      <Unit_8 v-if="$route.query.type=='unit_8'" />
		</div>
  </div>
</template>

<script lang="ts" setup>
  import Comm_1 from './comm/comm_1'
  import Comm_2 from './comm/comm_2'
  import Comm_3 from './comm/comm_3'
  import Comm_4 from './comm/comm_4'
  import Calc_1 from './calc/calc_1'
  import Calc_2 from './calc/calc_2'
  import Enti_1 from './enti/enti_1'
  import Enti_2 from './enti/enti_2'
  import Enti_3 from './enti/enti_3'
  import Enti_4 from './enti/enti_4'
  import Unit_1 from './unit/unit_1'
  import Unit_2 from './unit/unit_2'
  import Unit_3 from './unit/unit_3'
  import Unit_4 from './unit/unit_4'
  import Unit_5 from './unit/unit_5'
  import Unit_6 from './unit/unit_6'
  import Unit_7 from './unit/unit_7'
  import Unit_8 from './unit/unit_8'
  const router = useRouter()
  const route = useRoute()
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
	})
</script>

<style lang="scss">
 
</style>
