<template>
	<div class="layout-col bo-i16-1">
	  <!-- 标题 -->
		<div class="ww100 flex-sc h40 plr10" style="background: rgba(7, 55, 100, 0.7)">
      <div class="fontStyle">待测资源调控终端</div>
			<div class="flex1 flex-ec" v-if="!isNull(configStore.user) && !isNull(publicStore._public) && publicStore._public.terminals && !isNull(publicStore.active) && !isNull(publicStore.active.attr) && publicStore.active.attr.terminal">
				<span class="flex-ec cursor i7" v-if="['comm_1', 'comm_2'].includes(publicStore.active.type) || publicStore.active.type.indexOf('unit')!=-1"></span>
				<span class="flex-ec cursor i7" v-else
           @click.stop="state.from={...publicStore._public.terminals.find(a=>a.id === publicStore.active.attr.terminal)}; state.isFalse=true">
          <i-ep-edit class="cursor pt2 mr5" />
          <span>设置</span>
        </span>
			</div>
		</div>
		<!-- 底部 -->
		<aa-foot></aa-foot>
		<!-- 内容 -->
		<div class="layout-col">
      <div class="row bgi22" style="padding: 6px 2px;">
        <div :style="{textAlign: v.align}" v-for="(v, i) in ['comm_1', 'comm_2'].includes(publicStore.active.type) || publicStore.active.type.indexOf('unit')!=-1? state.content2 : state.content" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width">{{v.name}}</div>
      </div>
      <div class="table">
        <div class="ww100 row cursor ce" style="padding: 6px 2px;" :class="index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in publicStore._public?.terminals?publicStore._public.terminals:[]" :key="index" @click="handleClick('active', item)">
          <div v-show="v.show" :class="v.width" :style="{textAlign: v.align}" v-for="(v, i) in ['comm_1', 'comm_2'].includes(publicStore.active.type) || publicStore.active.type.indexOf('unit')!=-1? state.content2 : state.content" :key="i">
            <span v-if="typeof(v.key) == 'object'" class="cursor mlr5" :class="kk=='add'||state.auth[kk] == false?'none':'i15'" v-for="(vv, kk, ii) in v.key" :key="ii" @click.stop="handleClick(kk, item)">
              <span v-if="configStore.user.role_id == '1' && kk=='upd'"><i-ep-edit class="f12" /></span>
              <span v-else-if="configStore.user.role_id == '1' && kk=='del'"><i-ep-delete class="f12" /></span>
						</span>
            <div v-else-if="v.key=='-'" class="w14 h14 rad100 m-auto cursor flex-cc p2" :class="!isNull(publicStore.active)&&!isNull(publicStore.active.attr)&&!isNull(publicStore.active.attr.terminal) && publicStore.active.attr.terminal == item.id?'bgi16 white':'bg-white'" @click.stop="handleClick('active', item)">
              <i-ep-select v-if="!isNull(publicStore.active)&&!isNull(publicStore.active.attr)&&!isNull(publicStore.active.attr.terminal) && publicStore.active.attr.terminal == item.id" class="f10" />
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
            <span v-else>
              <!-- <span v-if="v.key=='up_adjustable'||v.key=='down_adjustable'" title="可输入数字"><el-input class="select_input" v-model="item[v.key]" /></span> -->
              <span>{{isNull(item[v.key]) && v.key!=''? '' : item[v.key]}}</span>
            </span>
          </div>
        </div>
        <!-- <div v-if="isNull(props.terminals)" class="flex-cc ww100 tc ptb10 i15">没有数据</div> -->
      </div>
			<!-- <Add @init="init" :state="state" ref="addRef" /> -->
		</div>
    <!-- 设置 -->
    <el-dialog v-model="state.isFalse" title="设置" :draggable="true" width="30%">
      <div class="ww100 flex-col i15 p10">
        <div class="ww100 flex-sc mb20">
          <span class="w50x3">最大上调(kW)</span>
          <el-input v-model="state.from.up_adjustable" placeholder="请输入" size="large" />
        </div>
        <div class="ww100 flex-sc mb20">
          <span class="w50x3">最大下调(kW)</span>
          <el-input v-model="state.from.down_adjustable" placeholder="请输入" size="large" />
        </div>
        <div class="ww100 flex-ec mt10 white">
          <div class="rad4 ptb10 plr25 tc ml20 cursor bgc" @click.stop="state.isFalse=!state.isFalse">取 消</div>
          <div class="rad4 ptb10 plr25 tc ml20 cursor bgi1" @click.stop="setTerminals()">确 定</div>
        </div>
      </div>
    </el-dialog>
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
      { width: 'w30', show: true, align: 'left', key: '-', name: '' }, 
      { width: 'flex1', show: true, align: 'left', key: 'name', name: '名称' }, 
      { width: 'w80', show: true, align: 'left', key: 'up_adjustable', name: '最大上调' }, 
      { width: 'w80', show: true, align: 'left', key: 'down_adjustable', name: '最大下调' }, 
    ],
    content2: [
      { width: 'w30', show: true, align: 'left', key: '-', name: '' }, 
      { width: 'flex1', show: true, align: 'left', key: 'name', name: '名称' }, 
    ],
    clickArr: [],
    addItem: {type: 'terminal'},
	})
	// 父子双向绑定
	const props = defineProps(['type'])
	// 父子绑定方法
	const emit = defineEmits(['init', 'getChild'])
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
        publicStore.active.attr.terminal = val.id 
        publicStore.active.attr.up_adjustable = val.up_adjustable 
        publicStore.active.attr.down_adjustable = val.down_adjustable 
        emit('init')
      }
    }
  }
 
  // 设置参数
  const setTerminals = async() => {
    if(proxy.isNull(publicStore.active)) return
    if(proxy.isNull(publicStore.active.attr)) return
    if(proxy.isNull(publicStore.active.attr.terminal)) return
    let terminal = publicStore._public.terminals.find(a=>a.id === publicStore.active.attr.terminal)
    if(!terminal) return
    Object.assign(terminal, state.from)
    publicStore.active.attr.up_adjustable = state.from.up_adjustable 
    publicStore.active.attr.down_adjustable = state.from.down_adjustable 
    state.isFalse = !state.isFalse
  }
</script>

<style scoped lang="scss">
:deep(.select_input .el-input__inner){
  color: inherit;
  -webkit-text-fill-color: inherit;
  height: 20px;
}
:deep(.select_input .el-input.is-disabled .el-input__inner){
  color: inherit;
  -webkit-text-fill-color: inherit;
}
:deep(.select_input .el-input.is-disabled .el-input__inner){
  color: inherit;
  -webkit-text-fill-color: inherit;
}
:deep(.select_input .el-input__wrapper) {
  min-height: auto;
  color: inherit;
  padding: 0;
  background: none !important;
  box-shadow: 0 0 0 0px #276dd6 inset !important;
}
:deep(.select_input .el-input__inner) {
  font-weight: normal;
  color: inherit;
}
:deep(.select_input .el-select__wrapper){
  min-height: auto;
  color: inherit;
  padding: 0;
  background: none;
  box-shadow: 0 0 0 0px #276dd6 inset !important;
}
:deep(.select_input .el-select__input){
  color: inherit !important;
}
:deep(.select_input .el-select__selected-item){
  color: inherit !important;
}
</style>
