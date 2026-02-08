<template>
  <div class="layout-col">
    <!-- 标题 -->
	<div class="h40 ww100 flex-sc relative mb10">
		<img class="hh100" src="@/assets/imgs/title1.png" />
		<div class="ww100 hh100 flex-sc absolute pl35">
			<span class="fw flex1 ptb5">邀约信息</span>
			<div class="flex-ec flex1 hh100">
				<span class="hh100 flex-cc plr10 cursor" 
				:class="state.active==v.value?'bs4 white':'i14'" 
				v-for="(v, i) in state.actives" :key="i"
				@click.stop="state.active=v.value">{{v.name}}</span>
			</div>
		</div>
	</div>
    <div class="flex1 layout-col ba1">
      <div class="row ba11 mr15">
        <div :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width">{{v.name}}</div>
      </div>
      <div class="table">
        <div class="row relative" :class="index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in publicStore._public.responsesInvits?publicStore._public.responsesInvits:[]" :key="index" @click="handleClick('active', item)">
          <div v-if="item.new=='1'" class="absolute t2 l2 z1 bo-i19-1 i19 rad20 f12 flex-cc" style="transform: rotate(-15deg)">new</div>
          <div v-show="v.show" :class="v.width" :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i">
            <span v-if="typeof(v.key) == 'object'" class="i21 cursor mlr5" :class="kk=='add'?'none':kk=='deal'&&item['clear_type']!=0?'none':''" v-for="(vv, kk, ii) in v.key" :key="ii" @click.stop="handleClick(kk, item)">{{vv}}</span>
            <span v-else-if="v.key=='*'">{{(state.page-1)*state.limit + index+1}}</span>
            <span v-else-if="v.type == 'time'">{{item[v.key] == 0?'/':parseTime(item[v.key])}}</span>
            <span v-else-if="v.type == 'select'" :class="find(v.list, [v.value, item[v.key]], 'color')?find(v.list, [v.value, item[v.key]], 'color'):''">
              {{find(v.list, [v.value, item[v.key]], v.label)}}
            </span>
            <span v-else-if="v.type == 'range'" :class="findRange(v.value[0], [v.value[1], item[v.key]], 'color')?findRange(v.value[0], [v.value[1], item[v.key]], 'color'):''">
              {{findRange(v.value[0], [v.value[1], item[v.key]], v.value[2])}}
            </span>
            <span v-else-if="v.type == 'switch'">
              <el-switch v-model="item[v.key]" :active-text="v.value[1].name" :inactive-text="v.value[0].name" :active-value="v.value[1].value" :inactive-value="v.value[0].value" inline-prompt @change="handleClick('switch', item)"></el-switch>
            </span>
            <span v-else-if="v.type == 'input'"><el-input v-model="item[v.value]" placeholder="请输入" style="width: 150px;" size="small" /></span>
            <span v-else>{{isNull(item[v.key]) && v.key!=''? '' : item[v.key]}}</span>
          </div>
        </div>
      </div>
      <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const types = [
    {value: '0', name: '日前'},
    {value: '1', name: '日内'},
  ]
  const statuss = [
    {value: '1', name: '已申报'},
    {value: '2', name: '已中标'},
    {value: '3', name: '未中标'},
  ]
  const state = reactive({
	  ...publicStore.$state,
	  content: [
      { width: 'w50x2', show: true, align: 'center', key: 'date', name: '响应日期' },
      { width: 'w50x2', show: true, align: 'center', key: 'type', name: '响应类型', type: 'select', list: types, value: 'value', label: 'name'  },
      { width: 'w50x2', show: true, align: 'center', key: 'timeRange', name: '受邀时段' },
      { width: 'w50x4', show: true, align: 'center', key: 'value', name: '需求响应量（kW）' },
			{ width: 'w50x2', show: true, align: 'center', key: 'status', name: '状态', type: 'select', list: statuss, value: 'value', label: 'name' },
      { width: 'w50x4', show: true, align: 'center', key: 'rate', name: '应邀/中标响应量（kW）' },
      // { width: 'flex1', show: true, align: 'right', key: {detail: '详情'}, name: '操作' },
    ],
  })

</script>
 
<style scoped lang="scss">
.c60E7FF{
	color:#60E7FF
}
</style>
