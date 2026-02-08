<template>
	<div class="layout-col bo-i16-1" style="border-top: none;">
	  <!-- 标题 -->
		<div class="ww100 flex-sc h40 plr10" style="background: rgba(7, 55, 100, 0.7)">
      <div class="fontStyle" @click="tabss">选择通信协议</div>
			<!-- <div class="flex1 flex-ec" v-if="!isNull(configStore.user)">
				<span v-if="configStore.user.role_id == '1'" @click.stop="handleClick('add', {...state.addItem})"><i-ep-plus class="f12 i15 cursor" /></span>
			</div> -->
		</div>
		<!-- 底部 -->
		<aa-foot></aa-foot>
		<!-- 内容 -->
		<div class="layout-col">
      <div class="table">
        <div class="ww100 row cursor ce" style="padding: 6px 2px;" :class="index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in publicStore._public && publicStore.active && publicStore.active.type.indexOf('calc')!=-1? publicStore._public.algorithms : dictStore.agreements" :key="index" @click="handleClick('active', item)">
          <div v-show="v.show" :class="v.width" :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i">
            <span v-if="typeof(v.key) == 'object'" class="cursor mlr5" :class="kk=='add'||state.auth[kk] == false?'none':'i15'" v-for="(vv, kk, ii) in v.key" :key="ii" @click.stop="handleClick(kk, item)">
                <span v-if="configStore.user.role_id == '1' && kk=='upd'"><i-ep-edit class="f12" /></span>
                <span v-else-if="configStore.user.role_id == '1' && kk=='del'"><i-ep-delete class="f12" /></span>
						</span>
            <div v-else-if="v.key=='-'" class="w14 h14 rad100 m-auto cursor flex-cc p2" :class="!isNull(publicStore.active)&&!isNull(publicStore.active.attr)&&!isNull(publicStore.active.attr.agreement) && publicStore.active.attr.agreement == item.value?'bgi16 white':'bg-white'" @click.stop="handleClick('active', item)">
              <i-ep-select v-if="!isNull(publicStore.active)&&!isNull(publicStore.active.attr)&&!isNull(publicStore.active.attr.agreement) && publicStore.active.attr.agreement == item.value" class="f10" />
            </div>
            <span v-else-if="v.key=='*'">{{(state.page-1)*state.limit + index+1}}</span>
            <span v-else-if="v.type == 'time'">{{item[v.key] == 0?'/':parseTime(item[v.key])}}</span>
            <span v-else-if="v.type == 'select'" :class="find(v.list, [v.value, item[v.key]], 'color')?find(v.list, [v.value, item[v.key]], 'color'):''">
              {{find(v.list, [v.value, item[v.key]], v.label)}}
            </span>
            <span v-else-if="v.type == 'switch'">
              <el-switch v-model="item[v.key]" :active-text="v.value[1].name" :inactive-text="v.value[0].name" :active-value="v.value[1].value" :inactive-value="v.value[0].value" inline-prompt @change="handleClick('switch', item)"></el-switch>
            </span>
            <span v-else-if="v.type == 'input'"><el-input v-model="item[v.value]" placeholder="请输入" style="width: 150px;" size="small" /></span>
            <span v-else-if="v.type == 'preload'&&v.filed">{{item[v.key]?item[v.key][v.filed]:''}}</span>
            <span v-else-if="v.type == 'image'" class="flex-sc warp">
              <div class="flex-sc" v-if="typeof(item[v.key]) == 'string'">
                <el-image class="w25 h25 m2 rad3 cursor" v-if="item[v.key].length!=0" :src="I(item[v.key])" :preview-src-list="state.srcList" @click.stop="state.srcList= [];state.srcList.push(I(item[v.key]))" />
                <span class="w50 h25 ca flex-sc" v-else>暂无</span>
              </div>
              <div class="flex-sc" v-else v-for="(img, ii) in item[v.key]" :key="ii">
                <el-image :class="ii==0?'':'ml5'" class="w25 h25 rad3 cursor" :src="I(img)" :preview-src-list="state.srcList" @click.stop="state.srcList= [];state.srcList.push(I(img))" />
              </div>
            </span>
            <span v-else>{{isNull(item[v.key]) && v.key!=''? '/' : item[v.key]}}</span>
          </div>
        </div>
        <!-- <div v-if="isNull(dictStore.agreements)" class="flex-cc ww100 tc ptb10 i15">没有数据</div> -->
      </div>
			<!-- <Add @init="init" :state="state" ref="addRef" /> -->
		</div>
	</div>
</template>

<script lang="ts" setup>
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
  const dictStore = proxy.dictStore()
	let addRef = $ref()
	const state = reactive({
		...publicStore.$state,
    content: [
      { width: 'w30', show: true, align: 'left', key: '-', name: '单选' }, 
      { width: 'flex1', show: true, align: 'left', key: 'name', name: '名称' }, 
    ],
    clickArr: [],
    addItem: {},
    model: 't_dict',
	})
	// 父子双向绑定
	// const props = defineProps(['agreements'])
	// 父子绑定方法
	// const emit = defineEmits(['init'])
  // 回调父组件
	// const init= (key) => emit('init', key)
  // 点击方法
  const handleClick = (remark, val) => {
    if(remark == 'add' || remark == 'upd'){
      addRef.onVisable(val)
    }
    if(remark == 'del'){
      addRef.del(val)
    }
    if(remark == 'active'){
      if(!proxy.isNull(publicStore.active)){
        if(proxy.isNull(publicStore.active.attr)) publicStore.active.attr = {}
        if(publicStore.active.type.indexOf('calc')!=-1){
          publicStore.active.attr.algorithm = val.value
        }else{
          publicStore.active.attr.agreement = val.value 
        }
      }
    }
  }
</script>

<style lang="scss">
 
</style>
