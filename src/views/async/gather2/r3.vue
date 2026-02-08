<template>
  <div class="layout-col ba1">
    <div class="row ba11">
      <div :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width">{{v.name}}</div>
    </div>
    <div class="table">
      <div class="row" :class="publicStore.active[state.key] == item[state.key] || item['click']?'active':index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in publicStore._public.mainList" :key="index" @click="handleClick('active', item)">
        <div v-show="v.show" :class="v.width" :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i">
          <span v-if="typeof(v.key) == 'object'" class="i21 cursor mlr5" :class="kk=='add'?'none':kk=='deal'&&item['clear_type']!=0?'none':''" v-for="(vv, kk, ii) in v.key" :key="ii" @click.stop="handleClick(kk, item)">{{vv}}</span>
          <span v-else-if="v.key=='*'">{{(state.page-1)*state.limit + index+1}}</span>
          <span v-else-if="v.type == 'time'">{{item[v.key] == 0?'/':parseTime(item[v.key])}}</span>
          <span v-else-if="v.type == 'find'" :class="find(v.value[0], [v.value[1], item[v.key]], 'color')?find(v.value[0], [v.value[1], item[v.key]], 'color'):''">
            {{find(v.value[0], [v.value[1], item[v.key]], v.value[2])}}
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
      <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
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
    key: 'id',
    query: {"o": "o_sensor_alarm_log"},
    content: [
      { width: 'w70',   show: true, align: 'center', key: '*', name: '序号' },
      { width: 'w50x4', show: true, align: 'left',  key: 'area', name: '所属区域' },
      { width: 'w50x4', show: true, align: 'left',  key: 'name', name: '名称' },
      { width: 'w50x4', show: true, align: 'left',  key: 'user_name', name: '户名' },
      { width: 'w50x3', show: true, align: 'left',  key: 'rated', name: '额定功率' },
      { width: 'w50x3', show: true, align: 'left',  key: 'out', name: '实时功率' },
      { width: 'w50x3', show: true, align: 'left',  key: 'load_type', name: '负荷类型' },
      { width: 'flex1', show: true, align: 'left',  key: 'address', name: '地址' },
      // { width: 'flex1', show: true, align: 'right', key: {deal: '处理', view: '查看'},  name: '操作' },
    ],
  });

</script>

<style scoped lang="scss">

</style>
