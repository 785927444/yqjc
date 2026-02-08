<template>
  <div class="layout-col">
		<!-- 标题 -->
		<aa-title title="选择测试案例">
      <template #right-content>
        <div class="ww100 flex-ec" v-if="!isNull(configStore.user)">
          <div class="flex-cc bs4 p5 ml10 cursor relative" v-if="configStore.user.role_id == '1'" @click.stop="handleClick('add', {...{parent_id: '0'}, ...state.addItem})">
            <i-ep-plus class="f12 fw mr5 white" />
            <span class="fontStyle">顶级</span>
          </div>
          <div class="flex-cc bs4 p5 ml10 cursor relative" @click.stop="handleClick('addchild')">
            <div class="ww100 hh100 z1 absolute-cc flex-cc black-rgba30" v-if="isNull(publicStore.active) || (!isNull(publicStore.active) && publicStore.active.parent_id=='0')"><i-ep-warningFilled class="fw i8" /></div>
            <i-ep-plus class="f12 fw mr5 white" />
            <span class="fontStyle">用例</span>
          </div>
        </div>
      </template>
    </aa-title>
    <!-- 内容 -->
    <div class="table-col ba1 pb15">
      <el-tree 
      class="ww100" 
      ref="treeRef" 
      :data="state.tree"
      :node-key="state.key" 
      :default-expand-all="true"
      :current-node-key="defaultId"
      :props="state.defaultProps"
      highlight-current    
      @node-click="handleNodeClick"
      empty-text="暂无数据">
        <template #default="{ node, data }">
          <span class="row ce select_input" style="padding: 0;align-items: start;">
            <div v-show="v.show" :class="v.width" :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i">
              <span v-if="!isNull(configStore.user) && typeof(v.key) == 'object'" class="cursor f12" v-for="(vv, kk, ii) in v.key" :key="ii" :class="kk=='add'||state.auth[kk] == false?'none':'i15'" @click.stop="handleClick(kk, data)">
                <span class="mlr5" title="子添加" v-if="configStore.user.role_id == '1' && kk=='child'"><i-ep-plus class="f12" /></span>
                <span class="mlr5" title="复制" v-else-if="(configStore.user.role_id == '1' || data['parent_id']!='0') && kk=='copy'"><i-ep-connection class="f12" /></span>
                <span class="mlr5" title="编辑" v-else-if="(configStore.user.role_id == '1' || data['station_num']) && kk=='upd'"><i-ep-edit class="f12" /></span>
                <span class="mlr5" title="删除" v-else-if="(configStore.user.role_id == '1' || data['station_num']) && kk=='del'"><i-ep-delete class="f12" /></span>
              </span>
              <span v-else-if="v.type == 'select'" :class="find(v.list, [v.value, data[v.key]], 'color')?find(v.list, [v.value, data[v.key]], 'color'):''">
                {{find(v.list, [v.value, data[v.key]], v.label)}}
              </span>
              <span v-else-if="data.parent_id == 0" class="line2 fontStyle i5">
                <span v-if="!data['click']">{{isNull(data[v.key]) && v.key!=''? '' : data[v.key]}}</span>
                <el-input v-else v-model="data[v.key]" placeholder="请输入" @blur="handleApi('upd', data, state.model)" />
              </span>
              <div v-else class="line2">
                <div v-if="!data['click']">{{isNull(data[v.key]) && v.key!=''? '' : data[v.key]}}</div>
                <el-input v-else v-model="data[v.key]" placeholder="请输入" @blur="handleApi('upd', data, state.model)" />
              </div>
            </div>
          </span>
        </template>
      </el-tree>
    </div>
		<!-- 底部 -->
		<aa-foot></aa-foot>
    <Add @init="init" :state="state" ref="addRef" />
  </div>
</template>

<script lang="ts" setup>
  import scheduled from "@/utils/scheduled"
  const { createScheduled } = scheduled()
	const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const dictStore = proxy.dictStore()
  let addRef = $ref()
  let treeRef = $ref()
  let defaultId = $ref()
  let types1 = [
    {value: 'comm', name: '控制终端性能'},
    {value: 'calc', name: '算法性能/准确性'},
    {value: 'enti', name: '总体性能'},
    {value: 'unit', name: '单体资源'},
  ]
  let types2 = [
    {value: 'comm_1', type: 'comm', name: '通信协议一致性测试'},
    {value: 'comm_2', type: 'comm', name: '指令执行准确性测试'},
    {value: 'comm_3', type: 'comm', name: '控制终端削峰能力测试'},
    {value: 'comm_4', type: 'comm', name: '控制终端填谷能力测试'},
    {value: 'calc_1', type: 'calc', name: '策略与算法功能/准确性测试'},
    {value: 'calc_2', type: 'calc', name: '策略与算法抗干扰能力测试'},
    {value: 'enti_1', type: 'enti', name: '调峰调节性能测试（包括削峰和填谷)'},
    {value: 'enti_2', type: 'enti', name: 'APC调节性能测试'},
    {value: 'enti_3', type: 'enti', name: '分布式台区缓解重过载场景的虚拟电厂响应能力测试'},
    {value: 'enti_4', type: 'enti', name: '分布式台区日内需求响应场景的虚拟电厂响应能力测试'},
    {value: 'unit_1', type: 'unit', name: '充电桩连续调节能力测试'},
    {value: 'unit_2', type: 'unit', name: '充电桩非连续调节能力测试'},
    {value: 'unit_3', type: 'unit', name: '光伏连续调节能力测试'},
    {value: 'unit_4', type: 'unit', name: '光伏非连续调节能力测试'},
    {value: 'unit_5', type: 'unit', name: '储能连续调节能力测试'},
    {value: 'unit_6', type: 'unit', name: '储能非连续调节能力测试'},
    {value: 'unit_7', type: 'unit', name: '分体空调调节能力测试'},
    {value: 'unit_8', type: 'unit', name: '中央空调系统半实物仿真调控装置能力测试'},
  ]

  const state = reactive({
	  ...publicStore.$state,
    content: [
      { width: 'w50x4', show: true, align: 'left', key: 'name', name: '名称' }, 
      { width: 'flex1', show: true, align: 'right', key: {child:'添加', upd:'编辑', del: '删除', copy:'复制'},  name: '操作' },
    ],
    editFrom: [
      { required: true,  editshow: false, name: '上级', key: 'parent_id', type: 'tree', list: [], node_key: 'id', parent_key: 'parent_id', top_name: '顶级' },
      { required: true,  editshow: true,  name: '名称', key: 'name', type: ['input'] },
      { required: false, editshow: false, name: '类型', key: 'type', type: 'select', list: [], value: 'value', label: 'name' },
      { required: false, editshow: true,  name: '排序', key: 'order', type: ['input'] },
    ],
    addItem: {},
    model: 't_test_task',
  })

  onMounted(async() => {
    await getInit()
    init()
    // createScheduled("systest", 5 * 1000, () => { getData() })
  })

	watch(() => publicStore.handleClick, async(val, old) => {
    if(proxy.isNull(val)) return
    if(val == 0) return
    if(val == 1){
      console.log("监控创建", val)
      handleClick('addchild', true)
    }
    if(val == -1){
      console.log("监控更新", val)
      init(defaultId)
      publicStore.handleClick = 0
    }
	}, { immediate: false, deep: true });

  const getData = async() => {
    if(proxy.isNull(publicStore.active)) return
    if(!publicStore.active.id) return
    let query1 = {model: 't_test_task_execute', args: `model_id='${publicStore.active.id}'`, field: `COUNT(*)`}
    let query2 = {model: 't_test_task_complete', args: `model_id='${publicStore.active.id}'`, field: `COUNT(*)`}
    let res = await publicStore.http({Api1: query1, Api2: query2})
    publicStore.active.executeCount = proxy.isNull(res.Api1)? [] : res.Api1[0]['COUNT(*)']
		publicStore.active.completeCount = proxy.isNull(res.Api2)? [] : res.Api2[0]['COUNT(*)']
  }

  const getInit = async() => {
    let query3 = {model: 't_sensor_template', args: `attribute='0'`}
		let query4 = {model: 't_sensor', args: !proxy.isNull(configStore.distributId)&&configStore.distributId!='0'? `stationNum='${configStore.distributId}' and type='ZYTJZD'` : `type='ZYTJZD'`}
    let res = await publicStore.http({Api3: query3, Api4: query4})
    publicStore._public.deviceTypes = proxy.isNull(res.Api3)? [] : res.Api3
    publicStore._public.terminals = proxy.isNull(res.Api4)? [] : res.Api4
  }

  const init = async(key) => {
    let query = !proxy.isNull(configStore.distributId)&&configStore.distributId!='0'? {model: state.model, args: `station_num='${configStore.distributId}'OR station_num IS NULL OR station_num = ''`} : {model: state.model}
    let res = await publicStore.http({Api: query})
    let list = proxy.isNull(res)? [] : res.sort((a, b) => a.order - b.order)
    state.list = list.map(v => {
      if(v.attr) {
        v.execute = true
        try {
          v.attr = JSON.parse(v.attr)
        } catch (err) {
          console.error("解析失败:", err.message)
        }
      }else {
        v.attr = {}
      }
      return v
    })
    publicStore._public.list = state.list
    state.editFrom[0].list = state.list
    state.empty = proxy.isNull(res)? true : false
    if(!key && configStore.actIndex != -1){
      key = configStore.actIndex
      configStore.actIndex = -1
    }
    setTree(key)
  }

   const setTree = async(key) => {
    state.tree = proxy.treeData(state.list, state.key, state.parent, 'children')
    let node1 = proxy.findNode(state.tree, (node) => { return !node.children })
    let node2 = proxy.findNode(state.tree, (node) => { return node[state.key] == key })
    let node = proxy.isNull(node2)? node1 : node2
    await nextTick()
    handleNodeClick(node)
  }

  const handleNodeClick = async(val) => {
    await nextTick()
    defaultId = val[state.key]
    treeRef.setCurrentKey(defaultId, true)
    if(!proxy.isNull(publicStore.active) && publicStore.active.id && val.id && publicStore.active.id == val.id ) return
    publicStore.active = JSON.parse(JSON.stringify(val))
    getData()
  }

  const handleClick = async(remark, val) => {
    if(remark == 'add' || remark == 'upd'){
      let editFrom = state.editFrom.find(a=>a.key == 'type')
      // 顶级
      if(val.parent_id == '0') editFrom.list = types1
      // 非顶级
      if(val.parent_id != '0' && val.type) {
        let type = types2.find(a=>a.value == val.type)
        if(type) editFrom.list = types2.filter(a=>a.type == type.type)
      }
      addRef.onVisable(val)
    }
    if(remark == 'child'){
      let editFrom = state.editFrom.find(a=>a.key == 'type')
      // 顶级
      if(val.parent_id == '0') editFrom.list = types2.filter(a=>a.type == val.type)
      // 非顶级
      if(val.parent_id != '0') {
        let type = types2.find(a=>a.value == val.type)
        if(type) editFrom.list = types2.filter(a=>a.type == type.type)
      }
      addRef.onVisable({...{parent_id: val.id}, ...state.addItem})
    }
    if(remark == 'copy'){
      if(proxy.isNull(val)) return ElNotification({ title: '提示', message: '请选中一个', type: 'error' })
      if(val.parent_id == '0') return ElNotification({ title: '提示', message: '请选择非顶级', type: 'error' })
      let from = {...val}
      from.station_num = !proxy.isNull(configStore.distributId)&&configStore.distributId!='0'?configStore.distributId:''
      from.id = ''
      from.name = from.name + '（copy）'
      delete from.order
      if(proxy.isNull(from.attr)){
        from.attr = ''
      }else{
        from.attr = JSON.stringify(from.attr )
      }
      let res = await proxy.handleApi('add', from, state.model)
      if(res.code == 200){
        init()
      }
    }
    if(remark == 'addchild'){
      if(proxy.isNull(publicStore.active)) return ElNotification({ title: '提示', message: '请选中一个', type: 'error' })
      if(publicStore.active.parent_id == '0') return ElNotification({ title: '提示', message: '请选择非顶级', type: 'error' })
      let from = {...publicStore.active}
      from.station_num = configStore.distributId
      from.id = ''
      delete from.order
      if(!proxy.isNull(val)){
        publicStore.handleClick = 0
        from.name = from.name + '（new）'
        if(proxy.isNull(from.attr)){
          from.attr = ''
        }else{
          from.attr = JSON.stringify(from.attr )
        }
        let res = await proxy.handleApi('add', from, state.model)
        if(res.code == 200){
          init()
        }
      }else{
        publicStore.active = {...from}
      }
    }
    if(remark == 'del'){
      addRef.del(val)
    }
  }
</script>
  
<style scoped lang="scss">
:deep(.el-tree-node__content){
  height: auto;
  padding: 2px 0;
  padding-left: 0 !important;
}
:deep(.el-tree-node__content:hover){
  padding: 2px 0;
}
:deep(.el-tree-node__expand-icon){
  color: #A7BFDC;
}
:deep(.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content) {
  position: relative;
  padding: 2px 0;
  background: linear-gradient(90deg, rgba(0, 138, 255, 0.5) 0%, rgba(1, 66, 107, 0) 100%) !important;
  box-sizing: border-box;
}

:deep(.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content)::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background-color: #008AFF;
}
:deep(.fontStyle .el-input__inner){
  color: inherit;
  -webkit-text-fill-color: inherit;
  background: -webkit-linear-gradient(top, #FAFCFF 0%, #1EA1FF 159%);
  background: linear-gradient(180deg, #FAFCFF 0%, #1EA1FF 159%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.104167vw;
  font-weight: bold;
}
:deep(.fontStyle .el-input.is-disabled .el-input__inner){
  color: inherit;
  -webkit-text-fill-color: inherit;
  background: -webkit-linear-gradient(top, #FAFCFF 0%, #1EA1FF 159%);
  background: linear-gradient(180deg, #FAFCFF 0%, #1EA1FF 159%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 0.104167vw;
  font-weight: bold;
}
:deep(.el-input.is-disabled .el-input__inner){
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
  