<template>
  <div class="topclass">
    <el-dialog v-model="state.isFalse" :title="state.title" :before-close="onVisable" :draggable="true" width="40%">
      <el-form class="p20" ref="formRef" :model="state.form" :rules="state.ruleList" label-width="85px">
        <el-form-item label="出清价格" prop="deal_price">
          <el-input size="large" v-model="state.form.deal_price" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="响应开始" prop="deal_start">
          <el-date-picker size="large" v-model="state.form.deal_start" placeholder="请选择"  style="width: 100%;" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" />
        </el-form-item>
        <el-form-item label="响应结束" prop="deal_end">
          <el-date-picker size="large" v-model="state.form.deal_end" placeholder="请选择"  style="width: 100%;" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" />
        </el-form-item>
        <el-form-item label="响应容量" prop="deal_capacity">
          <el-input size="large" v-model="state.form.deal_capacity" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="响应设备" prop="deal_devices">
          <div class="row bgi22 white">
            <div :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i" v-show="v.show" :class="typeof(v.key) == 'object'?v.width +' '+ 'mlr5':v.width">
              <span v-if="v.name">{{v.name}}</span>
              <div v-else class="w16 h16 rad2 m-auto cursor flex-cc" :class="state.click?'bgi21 white':'bg-white'" @click.stop="handleClick('selectAll', item)">
                <i-ep-select v-if="state.click" class="f10" />
              </div>
            </div>
          </div>
          <div class="table white">
            <div class="row" :class="index%2 == 1?'bgi23':'bgi18'" v-for="(item, index) in state.list" :key="index" @click.stop="handleClick('active', item)">
              <div v-show="v.show" :class="v.width" :style="{textAlign: v.align}" v-for="(v, i) in state.content" :key="i">
                <span v-if="typeof(v.key) == 'object'" class="i21 cursor mlr5" :class="kk=='add'?'none':''" v-for="(vv, kk, ii) in v.key" :key="ii" @click.stop="handleClick(kk, item)">{{vv}}</span>
                <div v-else-if="v.key=='-'" class="w16 h16 rad2 m-auto cursor flex-cc" :class="item['click']?'bgi21 white':'bg-white'" @click.stop="handleClick('active', item)">
                  <i-ep-select v-if="item['click']" class="f10" />
                </div>
                <span v-else-if="v.key=='*'">{{(state.page-1)*state.limit + index+1}}</span>
                <span v-else-if="v.type == 'time'">{{item[v.key] == 0?'':parseTime(item[v.key])}}</span>
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
            <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button size="large" type="info" class="i23 bg-white" @click="onVisable">取 消</el-button>
          <el-button size="large" type="info" class="white bgi22" @click.stop="handleSubmit(formRef)">提 交</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import api from '@/api'
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const state = reactive({
	  ...publicStore.$state,
    title: '出清',
    ruleList: {
      deal_price: [{ required: true, message: '请输入', trigger: 'blur' }],
    },
    content: [
      { width: 'w50',   show: true, align: 'center', key: '-', name: '' },
      { width: 'w50x3', show: true, align: 'left', key: 'id', name: 'ID', type: 'icon5' },  
      { width: 'w50x3', show: true, align: 'left', key: 'name', name: '名称' },
      { width: 'w50x2', show: true, align: 'center', key: 'capacity', name: '装机容量' },
    ],
    click: false,
    clickArr: [],
  })
  const emit = defineEmits(['init'])
  let formRef = $ref()

  // 打开关闭弹窗
  const onVisable = async (val, task) => {
    state.isFalse = !state.isFalse
    if(!state.isFalse) return
    state.task = {...task}
    state.form = {...val}
    if(state.form.deal_start) state.form.deal_start = proxy.parseTime(state.form.deal_start)
    if(state.form.deal_end) state.form.deal_end = proxy.parseTime(state.form.deal_end)
    getDevies()
  }

  const getDevies = async() => {
    let query = {model: 't_invit_sensor', args: `customer_id='${state.form.id}'`}
    let res = await publicStore.http({Api: query})
    state.list = proxy.isNull(res)? [] : res
    if(!proxy.isNull(state.form.deal_devices)) {
      let clickArr = []
      let deal_devices = JSON.parse(state.form.deal_devices)
      deal_devices.forEach(v => {
        let device = state.list.find(a=>a.id == v)
        if(device) {
          device.click = true
          clickArr.push(device)
        }
      })
      state.clickArr = clickArr
    }
  }

  const handleSubmit =(formEl) => {
    formEl.validate(async valid =>{
      if(!valid) return
      let time = new Date().getTime()
      let deal_start = Date.parse(state.form.deal_start)
      let deal_end = Date.parse(state.form.deal_end)
      if(state.task.start_time > deal_start)  return ElNotification({ title: '提示', message: '响应开始时间有误', type: 'error' })
      if(state.task.end_time < deal_start)  return ElNotification({ title: '提示', message: '响应开始时间有误', type: 'error' })
      if(state.task.start_time > deal_end)  return ElNotification({ title: '提示', message: '响应结束时间有误', type: 'error' })
      if(state.task.end_time < deal_end)  return ElNotification({ title: '提示', message: '响应结束时间有误', type: 'error' })
      let form = {
        id: state.form.invit_id, 
        deal_price: state.form.deal_price, 
        deal_capacity: state.form.deal_capacity, 
        deal_devices: !proxy.isNull(state.clickArr)? JSON.stringify(state.clickArr.map(item => item.id)) : '',
        deal_start: deal_start, 
        deal_end: deal_end,
        deal_time: time 
      }
      if(state.form.status == '1') {
        form.status = '2'
        form.confirm = '0'
      }
      let params = {model: 't_invit', list: [form]}
      api.updApi(params).then((res:any) => {
        if(res.code == 200){
          ElNotification({ title: '提示', message: '出清成功', type: 'success' })
          onVisable()
          emit('init')
        }else{
          ElNotification({ title: '提示', message: '出清失败', type: 'error' })
        }
      }).catch((err) => {
        ElNotification({ title: '提示', message: '出清失败', type: 'error' })
      })
	  }).catch((err:any) =>{
		  console.log('表单错误信息：', err);
	  })
  }

 const handleClick = (remark, val) => {
    if(remark == 'active'){
      let clickIndex = state.clickArr.findIndex(a=>a[state.key] == val[state.key])
      if(clickIndex != -1){
        val.click = false
        state.clickArr.splice(clickIndex, 1)
      }else{
        val.click = true
        state.clickArr.push(val)
      }
      setCapacity()
    }
    if(remark == 'selectAll'){
      let clickIndex = state.list.findIndex(a=>{ return a['click'] })
      if(clickIndex == -1){
        state.click = true
        state.list.forEach(item => {
          item.click = true
          state.clickArr.push(item)
        })
      }else{
        state.click = false
        state.clickArr = []
        state.list.forEach(item => {delete item['click']})
      }
      setCapacity()
    }
  }

  const setCapacity = () => {
    state.form.deal_capacity = state.clickArr.reduce((sum, item) => sum + Number(item.capacity), 0)
  }

  // 暴露给父组件
  defineExpose({
    onVisable,
  })
</script>

<style scoped lang="scss">
  :deep(input:-webkit-autofill) {
    -webkit-text-fill-color: #f5f5f5 !important;
  }
  // :deep(.el-dialog){
  //   border-radius: 0;
  // }
  // :deep(.el-dialog__header){
  //   border-radius: 0;
  // }
  // :deep(.el-dialog__body){
  //   padding: 0;
  //   height: calc(100% - 60px);
  // }
</style>
