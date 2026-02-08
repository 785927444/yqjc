<template>
	<div class="layout-col" style="border-top: none;">
	  <!-- 标题 -->
		<div class="ww100 flex-sc h40 plr10" style="background: rgba(7, 55, 100, 0.7)">
      <div class="fontStyle" @click="tabss">选择设备</div>
			<!-- <div class="flex1 flex-ec" v-if="!isNull(configStore.user)">
				<span v-if="configStore.user.role_id == '1'" @click.stop="handleClick('add', {...state.addItem})"><i-ep-plus class="f12 i15 cursor" /></span>
			</div> -->
		</div>
		<!-- 底部 -->
		<aa-foot></aa-foot>
		<!-- 内容 -->
		<div class="layout-col">
      <div class="table" v-if="!isNull(publicStore.active) && !isNull(publicStore.active.attr)">
        <div class="ww100 flex-col cursor" v-for="(item, index) in !isNull(publicStore._public)&&publicStore._public.childs?publicStore._public.childs:[]" :key="index" :class="index%2 == 1?'bgi23':'bgi18'">
          <div class="row" style="padding: 6px 2px;">
            <div class="w30" @click.stop="handleClick('active', item)">
              <span class="w14 h14 rad100 m-auto cursor flex-cc p2" :class="!isNull(publicStore.active.attr.childs)&&publicStore.active.attr.childs.find(a=>a.type == item['type'])?'bgi16 white':'bg-white'">
              <i-ep-select v-if="!isNull(publicStore.active.attr.childs)&&publicStore.active.attr.childs.find(a=>a.type == item['type'])" class="f10" />
              </span>
            </div>
            <div class="flex1" @click.stop="handleClick('active', item)">
              <span v-if="!isNull(publicStore._public) && !isNull(publicStore._public.deviceTypes)">{{find(publicStore._public.deviceTypes, ['type', item['type']], 'name')}}</span>
              <span v-else>{{ item['type'] }}</span>
            </div>
            <!-- 属性 -->
            <!-- <div class="w50x3" v-if="!isNull(item.meas) && !isNull(configStore.user) && configStore.user.role_id == '1'">
              <el-select class="ww100" v-model="item.code" placeholder="测量属性" clearable filterable size="small" @change="handleClick('change', item)">
                <el-option v-for="sel in item.meas" :key="sel['code']" :value="sel['code']" :label="sel['name']" />
              </el-select>
            </div> -->
            <!-- <div class="w50x2" v-else><el-input style="width: 100%;" v-model="v.code" placeholder="测量属性" /></div> -->

            <!-- 价格 -->
            <div class="flex-ec" style="display: flex;"  v-if="publicStore.active.type.indexOf('enti')!=-1">
              <div class="w80 ml15" v-if="!isNull(configStore.user)">
                <el-select class="ww100" v-model="item['price_type']" placeholder="调整" clearable filterable size="small" @change="handleClick('change', item)">
                  <el-option v-for="sel in state.priceTypes" :key="sel['value']" :value="sel['value']" :label="sel['name']" />
                </el-select>
              </div>
              <div class="w80 ml15" v-else>{{ find(state.priceTypes, ['value', item['price_type']], 'name') }}</div>
              <div class="w80 ml15" v-if="!isNull(configStore.user)">
                <el-input class="ww100" v-model="item['price']" placeholder="价格" size="small" @change="handleClick('change', item)" />
              </div>
              <div class="w80 ml15" v-else>{{ item['price'] }}</div>
              <div class="f12 ml15 mr5">元</div>
            </div>
            <!-- 设备 -->
            <div class="flex-ec i7" style="display: flex;" v-if="publicStore.active.type!='comm_4' && publicStore.active.type.indexOf('enti')==-1" @click.stop="state.isFalse = true; state.item = JSON.parse(JSON.stringify(item))">
              <span class="cursor bo-i7-1 i7 rad100 p2 w13 h13 flex-cc"><i-ep-plus /></span>
              <span class="ml5 mr5">设备</span>
            </div>
          </div>
          <!-- 设备选择 -->
          <div class="ww100 flex-sc plr5 pb5 warp" v-if="!isNull(publicStore.active.attr.childs) && !isNull(find(publicStore.active.attr.childs, ['type', item.type], 'items'))">
            <div class="ww50 flex-sc p5 cursor" style="padding-top: 5px; padding-bottom: 5px;" v-for="(v, i) in find(publicStore.active.attr.childs, ['type', item.type], 'items')" :key="i">
              <div class="ww100 flex-sc rad2 ptb5 plr10 f12" style="background: rgba(0, 216, 255, 0.3)" v-if="!isNull(item.sensors)">
                <span class="flex1 line1">{{ find(item.sensors, ['id', v.sensor_id], 'name') }}</span>
                <i-ep-circle-close class="cursor i7" @click.stop="find(publicStore.active.attr.childs, ['type', item.type], 'items').splice(i, 1)" />
              </div>
              <div class="w50x4 pr10" v-else>{{ v.sensor_id }}</div>
            </div>
          </div>
          <div class="ww100 flex-col" v-else></div>
        </div>
        <div v-if="state.empty" class="flex-cc ww100 tc ptb13 bgi18">没有数据</div>
      </div>
		</div>
    <!-- 设置 -->
    <el-dialog v-model="state.isFalse" title="选择设备" :draggable="true" width="42%">
      <div class="ww100 flex-col ce p10" v-if="!isNull(publicStore.active.attr) && !isNull(publicStore.active.attr)">
        <div class="ww100 flex-col hidden" v-if="!isNull(state.item)">
          <div class="ww100 flex-sc mb20" v-if="!isNull(state.item.sensors)">
            <div class="ww100 flex-sc warp" v-if="!isNull(publicStore.active.attr.childs) && !isNull(find(publicStore.active.attr.childs, ['type', state.item.type], 'items'))">
              <div class="ww25 flex-sc p5 cursor" v-for="(v, i) in state.item.sensors.filter(a => !find(publicStore.active.attr.childs, ['type', state.item.type], 'items').some(b => b.sensor_id === a.id))" :key="i" @click.stop="v.click = !v.click">
                  <div class="ww100 flex-sc rad2 p10" style="background: rgba(0, 216, 255, 0.3)">
                    <span class="w14 h14 rad2 cursor flex-cc p2 mr10" :class="v.click?'bgi16 white':'bg-white'"><i-ep-select v-if="v.click" class="f10" /></span>
                    <span class="f14">{{ v.name }}</span>
                  </div>
                </div>
            </div>
            <div class="ww100 flex-sc warp" v-else>
              <div class="ww25 flex-sc p5 cursor" v-for="(v, i) in state.item.sensors" :key="i" @click.stop="v.click = !v.click">
                <div class="ww100 flex-sc rad2 p10" style="background: rgba(0, 216, 255, 0.3)">
                  <span class="w14 h14 rad2 cursor flex-cc p2 mr10" :class="v.click?'bgi16 white':'bg-white'"><i-ep-select v-if="v.click" class="f10" /></span>
                  <span class="f14">{{ v.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ww100 flex-ec mt10 white">
          <div class="rad4 ptb10 plr25 tc ml20 cursor bgc" @click.stop="state.isFalse=!state.isFalse">取 消</div>
          <div class="rad4 ptb10 plr25 tc ml20 cursor bgi1" @click.stop="handleClick('add', state.item)">确 定</div>
        </div>
      </div>
    </el-dialog>
	</div>
</template>

<script lang="ts" setup>
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
    content: [],
    item: {}
	})
	// 父子双向绑定
	const props = defineProps(['childs'])
	// 父子绑定方法
	const emit = defineEmits(['init'])

  // 点击方法
  const handleClick = (remark, val) => {
    if(proxy.isNull(publicStore.active)) return publicStore.active = {}
    if(proxy.isNull(publicStore.active.attr)) publicStore.active.attr = {}
    if(proxy.isNull(publicStore.active.attr.childs)) publicStore.active.attr.childs = []
    if(remark == 'front') {
      publicStore.active.attr.front = '1' 
    }
    if(remark == 'add'){
      let child = publicStore.active.attr.childs.find(a =>a.type == val.type)
      if(!child) {
        publicStore.active.attr.childs = []
        child = {type: val.type, code: '', items: [], price_type: '', price: ''}
        publicStore.active.attr.childs.push(child)
      }
      if(proxy.isNull(child.items)) child.items = []
      val.sensors.forEach(v => {
        if(v.click) {
          let exist = child.items.find(a=>a.sensor_id == v.id)
          if(!exist){
            let item = {sensor_id: v.id, code: val.code}
            child.items.push(item)
          }
        }
      })
      state.isFalse = false
    }
    if(remark == 'active'){
      let index = publicStore.active.attr.childs.findIndex(a =>a.type == val.type)
      if(index == -1) {
        // publicStore.active.attr.fields = [] 
        publicStore.active.attr.childs = []
        let code = ''
        if(!proxy.isNull(val.meas)) {
          const exist = val.meas.find(a=>a.ismapping2star == '1')
          if(exist) code = exist.code
        }
        let item = {type: val.type, code: code, items: [], price_type: '', price: ''}
        publicStore.active.attr.childs.push(item)
      } else{
        publicStore._public.childs[index]['code'] = ''
        publicStore._public.childs[index]['price_type'] = ''
        publicStore._public.childs[index]['price'] = ''
        publicStore.active.attr.childs.splice(index, 1)
      }
    }
    if(remark == 'change') {
      let child = publicStore.active.attr.childs.find(a =>a.type == val.type)
      if(child) {
        child.code = val.code
        child.items.forEach(v => { v.code = val.code })
        child.price_type = val.price_type
        child.price = val.price
      }
    }
  }

</script>

<style lang="scss">
 
</style>