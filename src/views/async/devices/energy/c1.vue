<template>
  <div class="layout-col">
    <!-- 标题 -->
	<div class="h40 ww100 flex-sc relative mb10">
		<!-- <img class="hh100" src="@/assets/imgs/title1.png" /> -->
		<div class="ww100 hh100 flex-sc absolute pl35">
			<!-- <span class="fw flex1 ptb5">总体情况</span> -->
			<div class="flex-ec flex1">
				<el-select v-model="state.station" placeholder="请选择" style="width: 30%" clearable filterable @change="state.sensor_id=''">
					<el-option label="全部" value="-1" />
					<el-option v-for="(v, i) in state.stations" :key="v.id" :label="v.name" :value="v.id" />
				</el-select>
				<!-- <el-tree-select v-model="state.distributId" placeholder="请选择" 
				@change="changeSelect"
				ref="treeRef" 
				class="w50x5 c8" 
				:default-expand-all="true" 
				highlight-current 
				accordion 
				clearable 
				filterable 
				check-strictly 
				:render-after-expand="false"
				:data="configStore.stationList" 
				:props="defaultProps" 
				node-key="id" /> -->
			</div>
		</div>
	</div>
    <div class="flex1 layout-row ba1 p20 i15">
		<div class="flex4 hh100 flex-sc warp mr15">
           <div class="ww50 hh33 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 bs2">
                  <span>今日充电量（MWh）</span>
				  <span class="white f16 mt2">9.2</span>
			   </div>
		   </div>
           <div class="ww50 hh33 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 bs2">
                  <span>今日放电量（MWh）</span>
				  <span class="white f16 mt2">8.5</span>
			   </div>
		   </div>
           <div class="ww50 hh33 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 bs2">
                  <span>当月充电量（MWh）</span>
				  <span class="white f16 mt2">276.8</span>
			   </div>
		   </div>
           <div class="ww50 hh33 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 bs2">
                  <span>当月放电量（MWh）</span>
				  <span class="white f16 mt2">273.5</span>
			   </div>
		   </div>
           <div class="ww50 hh33 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 bs2">
                  <span>当年充电量（MWh）</span>
				  <span class="white f16 mt2">3312.8</span>
			   </div>
		   </div>
           <div class="ww50 hh33 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 bs2">
                  <span>当年放电量（MWh）</span>
				  <span class="white f16 mt2">3311.1</span>
			   </div>
		   </div>
		</div>
		<div class="flex3 hh100"><img class="hh100 ww100" src="@/assets/imgs/test2.png" /></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const dictStore = proxy.dictStore()
  const state = reactive({
	  ...publicStore.$state,
		station: '-1',
		stations: [
			{id: '1', name: '高新产业园'},
			{id: '2', name: '科创产业园'},
			{id: '3', name: '智造产业园'},
		]
  })
  const defaultProps = {
    children: 'children',
    label: 'name',
  }
  const changeSelect = async(val) => {
    let distribut = proxy.findNode(configStore.stationList, (node) => { return node.id == val })
    if(distribut.node_type == '1') {
      let supply = proxy.findNode(configStore.stationList, (node) => { return node.id == distribut.up_id })
      if(supply){
        configStore.$patch({
          provinceId: supply.provinceId, 
          cityId: supply.cityId, 
          districtId: supply.districtId, 
          supplyId: supply.id, 
          distributId: distribut.id
        })
      }
    }
  }
</script>
 
<style scoped lang="scss">

</style>
