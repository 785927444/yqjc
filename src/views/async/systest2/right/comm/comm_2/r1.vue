<template>
	<div class="layout-col bo-i16-1 p15" style="border-left: none;">
    <!-- 前置 -->
    <Fronts ref="frontsRef"/>
		<!-- 次数 -->
		<div class="ww100 flex-sc mt15 ce">
      <div>通讯次数：</div>
      <el-input type="number" v-if="publicStore.active&&publicStore.active.attr" class="w50x4" v-model.trim="publicStore.active.attr.count" placeholder="请输入数字" />
      <div class="ml8">次</div>
		</div>
		<!-- 频率 -->
		<div class="ww100 flex-sc mt15 ce">
      <div>通讯频率：</div>
      <el-input type="number" v-if="publicStore.active&&publicStore.active.attr" class="w50x4" v-model.trim="publicStore.active.attr.frequency" placeholder="请输入数字" />
      <div class="ml8">秒</div>
		</div>
    <!-- 内容 -->
    <div class="layout-col mt15 ba1">
     <div class="row bgi22">
        <div class="w50 tc">选择</div>
        <div class="w50x4">设备类型</div>
        <div class="w50x2">添加</div>
        <div class="w50x4">测试设备</div>
        <div class="w50x4">测量属性</div>
        <div class="w50x4">标准数值</div>
        <div class="w50x4">允许误差 %</div>
        <div class="w50x2"></div>
      </div>
      <div class="table" v-if="!isNull(publicStore.active) && !isNull(publicStore.active.attr)">
        <div class="row cursor" v-for="(item, index) in props.childs?props.childs:[]" :key="index" :class="index%2 == 1?'bgi23':'bgi18'">
          <div class="w50 tc" @click.stop="handleClick('active', item)">
            <span  class="w14 h14 rad2 m-auto cursor flex-cc p2" :class="!isNull(publicStore.active.attr.childs)&&publicStore.active.attr.childs.find(a=>a.type == item['type'])?'bgi16 white':'bg-white'">
            <i-ep-select v-if="!isNull(publicStore.active.attr.childs)&&publicStore.active.attr.childs.find(a=>a.type == item['type'])" class="f10" />
            </span>
          </div>
          <div class="w50x4">
            <span v-if="!isNull(publicStore._public) && !isNull(publicStore._public.deviceTypes)">{{find(publicStore._public.deviceTypes, ['type', item['type']], 'name')}}</span>
            <span v-else>{{ item['type'] }}</span>
          </div>
          <div class="w50x2">
            <span class="cursor bgi7 i22 rad100 p2 w16 h16 flex-cc" @click.stop="handleClick('add', item)"><i-ep-plus /></span>
          </div>
          <div class="w100x9 flex-col" v-if="!isNull(publicStore.active.attr.childs) && !isNull(find(publicStore.active.attr.childs, ['type', item.type], 'items'))">
            <div class="ww100 flex-sc" style="padding-top: 5px; padding-bottom: 5px;" v-for="(v, i) in find(publicStore.active.attr.childs, ['type', item.type], 'items')" :key="i">
              <div class="w50x4 pr10" v-if="!isNull(item.sensors)">
                <el-select class="ww100" v-model="v.sensor_id" placeholder="测试设备" clearable filterable >
                  <el-option v-for="sel in item.sensors" :key="sel['id']" :value="sel['id']" :label="sel['name']" />
                </el-select>
              </div>
              <div class="w50x4 pr10" v-else><el-input style="width: 100%;" v-model="v.sensor_id" placeholder="测试设备" /></div>
              <div class="w50x4 pr10" v-if="!isNull(item.meas)">
                <el-select class="ww100" v-model="v.code" placeholder="测量属性" clearable filterable >
                  <el-option v-for="sel in item.meas" :key="sel['code']" :value="sel['code']" :label="sel['name']" />
                </el-select>
              </div>
              <div class="w50x4 pr10" v-else><el-input style="width: 100%;" v-model="v.code" placeholder="测量属性" /></div>
              <div class="w50x4 pr10"><el-input style="width: 100%;" v-model="v.value" placeholder="标准数值" /></div>
              <div class="w50x4 pr10"><el-input type="number" :max="100" :min="0" style="width: 100%;" v-model="v.error" placeholder="允许误差 %"  @input="handleErrorInput(v)" @keydown="handleForbidKeydown" @paste="handleForbidPaste" /></div>
              <div class="w50x2 pr10">
                <i-ep-delete class="cursor i7" @click.stop="find(publicStore.active.attr.childs, ['type', item.type], 'items').splice(i, 1)" />
              </div>
            </div>
          </div>
          <div class="w100x9 flex-col" v-else></div>
        </div>
        <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
      </div>
    </div>
	</div>
</template>

<script lang="ts" setup>
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
  let frontRefs = $ref()
	const state = reactive({
		...publicStore.$state,
    content: [
      { width: 'w70',   show: true, align: 'center', key: '-', name: '选择' },
      { width: 'w50x4', show: true, align: 'left', key: 'type', name: '设备类型' },
      { width: 'w50x4', show: true, align: 'left', key: 'code', name: '测量属性' },
      { width: 'w50x4', show: true, align: 'left', key: 'value', name: '标准数值' },
      { width: 'w50x4', show: true, align: 'left', key: 'error', name: '允许误差' },
      { width: 'flex1', show: true, align: 'right', key: {adds: '添加'}, name: '操作' },
    ],
	})
	// 父子双向绑定
	const props = defineProps(['childs'])
	// 父子绑定方法
	const emit = defineEmits(['init'])

  // 允许误差输入校验：限制不超过100，不低于0
  const handleErrorInput = (v) => {
    // 第一步：过滤非法字符（仅保留数字和单个小数点，移除e/E/+/-等）
    let val = v.error?.replace(/[^0-9.]/g, '') || '';
    
    // 处理多个小数点的情况（比如100..5 → 100.5）
    if (val.includes('.')) {
      const [integer, decimal] = val.split('.');
      val = `${integer}.${decimal?.replace(/\./g, '') || ''}`;
    }

    // 第二步：校验数值范围
    const numVal = Number(val);
    if (isNaN(numVal)) {
      v.error = ''; // 非数字清空
      return;
    }
    if (numVal > 100) {
      v.error = '100';
      proxy.$message?.warning('允许误差不能超过100%');
    } else if (numVal < 0) {
      v.error = '0';
      proxy.$message?.warning('允许误差不能为负数');
    } else {
      v.error = val; // 合法值则更新（避免残留非法字符）
    }
  };
  const handleForbidKeydown = (e) => {
    const forbiddenKeys = ['e', 'E', '+', '-'];
    if (forbiddenKeys.includes(e.key)) {
      e.preventDefault(); // 阻止按键输入
    }
  };

  const handleForbidPaste = (e) => {
    const pasteContent = e.clipboardData.getData('text');
    if (/[eE\+\-]/.test(pasteContent)) {
      e.preventDefault(); // 阻止粘贴
      proxy.$message?.warning('禁止粘贴包含非法字符的内容');
    }
  };
  // 点击方法
  const handleClick = (remark, val) => {
    if(proxy.isNull(publicStore.active)) return
    if(proxy.isNull(publicStore.active.attr)) publicStore.active.attr = {}
    if(proxy.isNull(publicStore.active.attr.childs)) publicStore.active.attr.childs = []
    if(remark == 'front'){
      publicStore.active.attr.front = '1' 
    }
    if(remark == 'add'){
      let child = publicStore.active.attr.childs.find(a =>a.type == val.type)
      if(!child) {
        child = {type: val.type, items: []}
        publicStore.active.attr.childs.push(child)
      }
      if(proxy.isNull(child.items)) child.items = []
      let item = {sensor_id: '', code: '', value: '', error: '10'}
      child.items.push(item)
    }
    if(remark == 'active'){
      let index = publicStore.active.attr.childs.findIndex(a =>a.type == val.type)
      if(index == -1) {
        let item = {type: val.type, items: []}
        publicStore.active.attr.childs.push(item)
      } else{
        publicStore.active.attr.childs.splice(index, 1)
      }
    }
  }
</script>

<style lang="scss">
 
</style>
