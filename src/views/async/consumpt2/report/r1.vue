<template>
    <div class="layout-col">
        <div class="h40 ww100 flex-sc relative mb10">
            <div class="ww100 hh100 flex-sc absolute">
                <div class="flex-sc ww100 hh100">
                    <span>报表:</span>
                    <span class="ww16 pl15">
                        <el-select v-model="publicStore.actIndex">
                            <el-option v-for="(item,index) in state.reportTypes" :key="index" :value="item.value" :label="item.name"></el-option>
                        </el-select>
                    </span>
                    <span class="plr20">时间:</span>
                    <div class="w100x4">
                        <el-date-picker class="ww100" v-model="publicStore.datetime" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                        type="datetimerange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
                    </div>
                    <span class="flex-sc ml15">
                        <el-button type="primary">查询</el-button>
                        <el-button type="primary">重置</el-button>
                    </span>
                </div>
            </div>
            <div class="hh100 flex-sc absolute r0">
                <el-button class="ml15" type="primary" :icon="IconDown">下载表格</el-button>
            </div>
        </div>
        <div class="layout-col ba1">
            <div class="flex-cc f20 ptb13">{{find(state.reportTypes, ['value' , publicStore.actIndex], 'name')}}</div>
            <div class="row ba11 mr15">
                <div :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width">{{v.name}}</div>
            </div>
            <div class="table">
                <div class="row" :class="index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in publicStore._public.list?publicStore._public.list:[]" :key="index" @click="handleClick('active', item)">
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
                        <span v-else>{{isNull(item[v.key]) && v.key!=''? '/' : item[v.key]}}</span>
                    </div>
                </div>
            </div>
            <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
        </div>
    </div>
</template>

<script setup lang="ts">
  const { proxy }: any = getCurrentInstance();
  import IconDown from "../iconDown.vue";
  const publicStore = proxy.publicStore();
  const configStore = proxy.configStore();
  const state = reactive({
    ...publicStore.$state,
    reportTypes: [
        {name:"太阳能发电日报",value:1},
        {name:"太阳能发电月报",value:2},
        {name:"太阳能发电季报",value:3},
        {name:"太阳能发电年报",value:4},
        {name:"太阳能发电日报定制",value:5},
    ],
    content: [
      { width: 'w100x2', show: true, align: 'center', key: 'day', name: '时间' },
      { width: 'w100x3', show: true, align: 'center',  key: 'solar_radiation', name: '太阳辐射量（Mj/m2）' },
      { width: 'w100x3', show: true, align: 'center',  key: 'inverter1', name: '1#逆变器发电量（kwh）' },
      { width: 'w100x3', show: true, align: 'center',  key: 'inverter2', name: '2#逆变器发电量（kwh）' },
      { width: 'w100x3', show: true, align: 'center',  key: 'power_generation_capacity', name: '总发电量（kwh）' },
      { width: 'w100x3', show: true, align: 'center',  key: 'after_current_connection', name: '余电上网电量（kwh）' },
      { width: 'w100x2', show: true, align: 'center',  key: 'generating_efficiency', name: '发电效率（%）' },
      { width: 'w100x3', show: true, align: 'center',  key: 'dynamoelectric_benefit', name: '光伏发电效益（元）' },
    ],
  })
</script>