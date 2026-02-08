<template>
    <div class="layout-col">
        <div class="h40 ww100 flex-sc relative mb10">
            <div class="ww100 hh100 flex-sc absolute">
                <div class="flex-sc flex1 hh100">
                <span class="hh100 flex-cc plr15 cursor mr5" 
                :class="state.active==v.value?'bs4 white':'i14 bgstl2'" 
                v-for="(v, i) in state.actives" :key="i"
                @click.stop="state.active=v.value">{{v.name}}</span>
                </div>
            </div>
        </div>
        <div class="layout-col ba1">
            <div class="row ba11 mr15">
                <div :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width">{{v.name}}</div>
            </div>
            <div class="table">
                <div class="row" :class="index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in publicStore._public.list?publicStore._public.list:[]" :key="index" @click="handleClick('active', item)">
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
            </div>
            <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
        </div>
    </div>
</template>

<script setup lang="ts">
  const { proxy }: any = getCurrentInstance();
  const publicStore = proxy.publicStore();
  const configStore = proxy.configStore();
  const state = reactive({
    ...publicStore.$state,
    active:0,
    actives:[
        {name:"遥测值",value:0},
        // {name:"遥信值",value:1},
        // {name:"电度值",value:2},
    ],
    content: [
      { width: 'w70', show: true, align: 'center', key: '*', name: '序号' },
      { width: 'w100x2', show: true, align: 'left', key: 'yccode', name: '数据对象' },
      { width: 'w100x2', show: true, align: 'left', key: 'value', name: '实时值' },
      { width: 'w100x2', show: true, align: 'left', key: 'unit', name: '单位' },
      { width: 'w100x2', show: true, align: 'left', key: 'timestamp', name: '时间' },
    ],
  })
</script>