<template>
  <div class="layout-col ba1">
    <!-- 标题 -->
    <div class="h40 ww100 flex-sc relative mb10">
      <img class="hh100" src="@/assets/imgs/title.png" />
      <div class="ww100 hh100 flex-sc absolute pl35">
        <span class="fw flex1 ptb5">经营主体</span>
        <div class="flex-ec flex1 hh100">
          <span class="hh100 flex-cc plr10 cursor i1" @click.stop="state.isFalse = !state.isFalse">
            <span>更多</span>
            <i-ep-arrowRightBold class="f12 ml2" />
          </span>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="flex1 ww100 flex-bc  mr15 relative">
      <div class="absolute t5 r5 z1" v-if="!isNull(configStore.user) && configStore.user.id == '1'">
        <el-button size="small" type="info" @click.stop="handleClick('out')">模板</el-button>
        <el-button size="small" type="primary" @click.stop="handleClick('in')">导入</el-button>
        <el-button size="small" type="danger" @click.stop="handleClick('del')">清空</el-button>
      </div>
      <div class="flex1 hh100 flex-col-cc hidden">
        <div class="w50x4 h50x4 relative p20" v-if="publicStore._public.responsesRate1">
          <img class="ww100" src="@/assets/imgs/tt1.png" />
          <div class="absolute-cc ww100 hh100" id="Pie_responsesRate1"></div>
          <div class="absolute-cc cursor tc">
            <div class="f16 mb2 fw">{{ state.data&&state.data.value?state.data.value:'0' }}</div>
            <div class="f12">电力用户·家</div>
          </div>
        </div>
      </div>
      <div class="flex-col-cs flex1 relative ml20">
        <div class="ww100 flex-sc tl p5 cursor" v-if="publicStore._public.responsesRate1" v-for="(v, i) in publicStore._public.responsesRate1" :key="i">
          <div class="w10 h10 rad100 mr8" :style="{background: v.color}"></div>
          <div class="w80 i15">{{v.name}}</div>
          <div class="flex1 f24 fw">{{v.value?v.value:0}}</div>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog v-model="state.isFalse" title="市场信息披露" :draggable="true" :destroy-on-close="true" width="80%">
      <div class="ww100 hidden h100x6 relative">
        <div style="width: 100%; height: 180vh; position: absolute; top: -80px; left: 0; overflow: scroll;">
          <iframe class="ww100" style="height: 240vh; border: none; overflow: hidden;" :src="state.iframe" frameborder="0" 
            scrolling="no" sandbox="allow-same-origin allow-scripts allow-forms">
          </iframe> 
        </div> 
      </div>
    </el-dialog> 
    <!-- 导入 -->
    <ImportData @init="init" :state="state" ref="importRef"/>
  </div>
</template>

<script lang="ts" setup>
  import api from '@/api'
  import ec from "@/utils/chart";
  const { drawChart } = ec();
  const { proxy }: any = getCurrentInstance();
  const publicStore = proxy.publicStore();
  const configStore = proxy.configStore();
  let importRef = $ref()
  const state = reactive({
    ...publicStore.$state,
    iframe: "http://pm.gd.csg.cn/portal/#/home/informationDisclosure/MarketSubject/PublicityInfo/SellElectricity",
    model: 't_medium_user_sum'
  });

	onMounted(async() => {
    init()
	})

  const init = async() => {
    state.query = {model: state.model}
    let res = await publicStore.http({Api: state.query})
    let chart = []
    res.forEach(v => {
      if(v.type == 'all') {
        state.data = {...v}
      } else {
        v.value = Number(v.value)
        v.color = v.type=='1'?'#54CFF3':v.type=='2'?'#3E6AE3':v.type=='3'?'#F9B74A':''
        chart.push(v)
      }
    })
    publicStore._public.responsesRate1 = [...chart]
  }

  watch(() => publicStore._public.responsesRate1, async (val, old) => {
    if(proxy.isNull(val)) return
    if(JSON.stringify(val) == JSON.stringify(old)) return
    await nextTick();
    setChart(val);
  },{ immediate: false, deep: true });

	const setChart = async(data) => {
		let chart = 'Pie'
		let id = 'Pie_responsesRate1'
		let params = {
			colorList: [],
			labelShow: false,
			internalDiameterRatio: 0.8, 
			distance: 200, 
			alpha: 30, 
			pieHeight: 20, 
			opacity: 0.8
		}
		drawChart(chart, id, {}, data, params)
	}

  const handleClick = async(remark) => {
    if(remark == 'out'){
      let res = await publicStore.http({Api: state.query})
      let list = [...res]
      let name = '经营主体-模板'
      let content = [
        {key: 'id', name: 'ID'},
        {key: 'name', name: '名称'},
        {key: 'type', name: '类型'},
        {key: 'value', name: '数值'}
      ]
      proxy.handleExport(content, list, name)
    } 
    if(remark == 'in'){
      let content = [
        {key: 'id', name: 'ID'},
        {key: 'name', name: '名称'},
        {key: 'type', name: '类型'},
        {key: 'value', name: '数值'}
      ]
      let ctx = {content: content, key: state.key, query: state.query, unique: ''}
      importRef.onVisable(ctx)
    }
    if(remark == 'del'){
      ElMessageBox.confirm('是否确定删除?', '删除提示', {confirmButtonText: '确定', cancelButtonText: '关闭', type: 'error'}).then(async() => {
        let res = await publicStore.http({Api: state.query})
        let params = {model: state.model, list: res}
        api.delApi(params).then((res:any) => {
          if(res.code == 200){
            init()
            ElNotification({ title: '提示', message: '操作成功', type: 'success' })
          }else{
            ElNotification({ title: '提示', message: res.msg?res.msg:'操作失败', type: 'error' })
          }
        }).catch((err) => {
          ElNotification({ title: '提示', message: '操作失败', type: 'error' })
        })
      })
    }
  }
</script>

<style scoped lang="scss">

</style>
