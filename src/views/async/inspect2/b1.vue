<template>
  <div class="layout-col">
    <!-- 标题 -->
	<div class="h40 ww100 flex-sc relative mb10">
		<img class="hh100" src="@/assets/imgs/title4.png" />
		<div class="ww100 hh100 flex-sc absolute pl35">
			<span class="fw flex1 ptb5">{{state.actives[state.active].name}}<span class="pl30 c60E7FF">{{publicStore._public.data?publicStore._public.data.name:''}}</span></span>
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
			<div :style="{textAlign: v.align}" v-for="(v, i) in state['content'+state.active]" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width">{{v.name}}</div>
		</div>
		<div class="table">
			<div class="row" :class="index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in publicStore._public['info'+state.active]" :key="index" @click="handleClick('active', item)">
				<div v-show="v.show" :class="v.width" :style="{textAlign: v.align}" v-for="(v, i) in state['content'+state.active]" :key="i">
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
					<span v-else>{{isNull(item[v.key]) && v.key!=''? '/' : item[v.key]}}</span>
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
	let statuss = $ref([
		{name: '异常', value: '0', color: 'i8'},
		{name: '正常', value: '1', color: 'i11'},
	])
	let alarms = $ref([
		{name: '异常', value: '0', color: 'i8'},
		{name: '正常', value: '1', color: 'i11'},
	])
  const state = reactive({
	  ...publicStore.$state,
	  active:0,
	  actives:[{name:"组串式逆变器",value:0}, {name:"环境检测仪",value:1}],
	  content0: [
      { width: 'w50x4', show: true, align: 'center', key: 'name', name: '名称' },
      { width: 'w50x4', show: true, align: 'center', key: 'electricity1', name: '直流电联1（A）' },
      { width: 'w50x4', show: true, align: 'center', key: 'electricity2', name: '直流电联2（A）' },
      { width: 'w50x4', show: true, align: 'center', key: 'inpower', name: '输入总功率（kw）' },
      { width: 'w50x4', show: true, align: 'center', key: 'outpower', name: '输出总功率（kw）' },
      { width: 'w50x4', show: true, align: 'center', key: 'efficiency', name: '转换效率（%）' },
      { width: 'w50x4', show: true, align: 'center', key: 'day_generated energy', name: '日发电量（kwh）' },
      { width: 'w50x3', show: true, align: 'center', key: 'all_generated energy', name: '总发电量（kwh）' },
			{ width: 'w50x3', show: true, align: 'center', key: 'status', name: '状态', type: 'select', list: statuss, value: 'value', label: 'name' },
			{ width: 'w50x2', show: true, align: 'center', key: 'isAlarm', name: '报警状态', type: 'select', list: alarms, value: 'value', label: 'name' },
    ],
	  content1: [
      { width: 'w50x4', show: true, align: 'center', key: 'name', name: '名称' },
      { width: 'w50x4', show: true, align: 'center', key: 'temperature', name: '环温(°C)' },
      { width: 'w50x4', show: true, align: 'center', key: 'radiation_day', name: '总辐射1日累计值(MJ/m)' },
      { width: 'w50x4', show: true, align: 'center', key: 'humidity', name: '环境湿度(%RH)' },
      { width: 'w50x4', show: true, align: 'center', key: 'radiation_now', name: '总辐射1瞬时值(W/m)' },
      { width: 'w50x4', show: true, align: 'center', key: 'wind_direction', name: '风向瞬时值' },
      { width: 'w50x4', show: true, align: 'center', key: 'wind_speed', name: '风速瞬时值(m/s)' },
    ],
  })

</script>
 
<style scoped lang="scss">
.c60E7FF{
	color:#60E7FF
}
</style>
