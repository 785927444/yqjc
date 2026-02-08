<template>
  <div class="layout-col">
    <!-- 标题 -->
	<div class="h40 ww100 flex-sc relative mb10">
		<!-- <img class="hh100" src="@/assets/imgs/title1.png" /> -->
		<div class="ww100 hh100 flex-ec absolute pl35">
			<!-- <span class="fw flex1 ptb5">总体情况</span> -->
			<div class="flex-ec w50x5">
				<el-tree-select v-model="state.distributId" placeholder="请选择" 
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
				node-key="id" />
			</div>
		</div>
	</div>
    <div class="flex1 layout-row ba1 p20 i15">
		<div class="flex4 hh100 flex-sc warp mr15">
           <div class="ww50 hh33 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 bs2">
                  <span>充电桩总数量（个）</span>
				  <span class="white f16 mt2">8</span>
			   </div>
		   </div>
           <div class="ww50 hh33 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 bs2">
                  <span>当前充电桩使用中（个）</span>
				  <span class="white f16 mt2">5</span>
			   </div>
		   </div>
           <div class="ww50 hh33 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 bs2">
                  <span>全站实时充电功率（kW）</span>
				  <span class="white f16 mt2">3183.54</span>
			   </div>
		   </div>
           <div class="ww50 hh33 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 bs2">
                  <span>全站总容量（kWh）</span>
				  <span class="white f16 mt2">248385.54</span>
			   </div>
		   </div>
           <div class="ww50 hh33 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 bs2">
                  <span>当前充电负荷率（%）</span>
				  <span class="white f16 mt2">32.00</span>
			   </div>
		   </div>
           <div class="ww50 hh33 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 bs2">
                  <span>全站充电功率设定值（kW）</span>
				  <span class="white f16 mt2">503183.03</span>
			   </div>
		   </div>
		</div>
		<div class="flex3 hh100"><img class="hh100 ww100" src="@/assets/imgs/test3.png" /></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const state = reactive({
	  ...publicStore.$state,
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
