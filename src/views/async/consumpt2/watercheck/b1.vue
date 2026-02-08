<template>
    <div class="layout-col ba1">
        <div class="row ba11 mr15">
            <div :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width">{{v.name}}</div>
        </div>
        <div class="table">
            <div class="row" :class="index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in publicStore._public.lists?publicStore._public.lists:[]" :key="index" @click="handleClick('active', item)">
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
</template>

<script setup lang="ts">
 const { proxy }:any = getCurrentInstance();
const publicStore = proxy.publicStore()
const state = reactive({
    ...publicStore.$state,
    content:[ 
      { width: 'w100x3',   show: true, align: 'center', key: 'time', name: '时间' },
      { width: 'w100x3', show: true, align: 'center',  key: 'device_name', name: '设备名称' },
      { width: 'w100x3', show: true, align: 'center',  key: 'value', name: '日流量（吨）' },
    ]
})
</script>