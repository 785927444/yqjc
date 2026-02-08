<template>
  <div class="topclass">
    <el-dialog v-model="state.isFalse" :title="state.title" :before-close="onVisable" :draggable="true" width="30%">
      <el-form class="p20" ref="formRef" :model="state.form" :rules="state.ruleList" label-width="85px">
        <el-form-item label="结果" prop="confirm">
            <el-radio-group  v-model="state.form.confirm">
                <el-radio v-for="(v, i) in confirmss" :key="i" :value="v.value">{{v.name}}</el-radio>
            </el-radio-group>
        </el-form-item>          
        <el-form-item label="通知" prop="confirm_text">
          <el-input size="large" v-model="state.form.confirm_text" placeholder="请输入" type="textarea" />
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
    title: '确认中标',
    ruleList: {
      confirm: [{ required: true, message: '请选择', trigger: 'blur' }],
    }
  })
  const confirmss = [
    {name: '中标', value: '1'},
    {name: '放弃', value: '2'},
  ]
  const emit = defineEmits(['init'])
  let formRef = $ref()

  // 打开关闭弹窗
  const onVisable = async (val, task) => {
    state.isFalse = !state.isFalse
    if(!state.isFalse) return
    state.task = {...task}
    state.form = {confirm: '', confirm_text: ''}
    state.forms = [...val]
  }

  const handleSubmit =(formEl) => {
    formEl.validate(async valid =>{
      if(!valid) return
      let time = new Date().getTime()
      let params = {model: 't_invit', list: []}
      params.list = state.forms.map(v => {
        return {id: v.invit_id, confirm: state.form.confirm, confirm_text: state.form.confirm_text, confirm_time: time }
      })
      api.updApi(params).then((res:any) => {
        if(res.code == 200){
          ElNotification({ title: '提示', message: '确认成功', type: 'success' })
          onVisable()
          setTaskStatus('2')
          emit('init')
        }else{
          ElNotification({ title: '提示', message: '确认失败', type: 'error' })
        }
      }).catch((err) => {
        ElNotification({ title: '提示', message: '确认失败', type: 'error' })
      })
	  }).catch((err:any) =>{
		  console.log('表单错误信息：', err);
	  })
  }

 const setTaskStatus = async(status) => {
    if(state.task.status != '1') return
    let params = {model: 't_invit_task', list: [{id: state.task.id, status: status}]}
    api.updApi(params).then((res:any) => {
      if(res.code == 200){
        // ElNotification({ title: '提示', message: '状态更新成功', type: 'success' })
      }else{
        ElNotification({ title: '提示', message: '状态更新失败', type: 'error' })
      }
    }).catch((err) => {
      ElNotification({ title: '提示', message: '状态更新失败', type: 'error' })
    })
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
