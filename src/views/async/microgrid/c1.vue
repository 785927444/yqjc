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
    <div class="layout-col ba1 p20 i15">
		<div class="ww100 flex-sc warp">
           <div class="ww12 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 h50 ba8 white rad5">
                  <span>光伏发电1</span> 
			   </div>
		   </div>
           <div class="ww22 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 h50 bs2">
                  <span>总容量（kW）</span>
				  <span class="white f16 mt2">302.23</span>
			   </div>
		   </div>
           <div class="ww22 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 h50 bs2">
                  <span>今日发电量（kWh）</span>
				  <span class="white f16 mt2">36.21</span>
			   </div>
		   </div>
           <div class="ww22 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 h50 bs2">
                  <span>有功功率（kW）</span>
				  <span class="white f16 mt2">34.28</span>
			   </div>
		   </div>
           <div class="ww22 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 h50 bs2">
                  <span>无功功率（kW）</span>
				  <span class="white f16 mt2">15.13</span>
			   </div>
		   </div>
		</div>
		<div class="ww100 flex-sc warp mt10">
           <div class="ww12 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 h50 ba8 white rad5">
                  <span>光伏发电2</span> 
			   </div>
		   </div>
           <div class="ww22 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 h50 bs2">
                  <span>总容量（kW）</span>
				  <span class="white f16 mt2">201.20</span>
			   </div>
		   </div>
           <div class="ww22 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 h50 bs2">
                  <span>今日发电量（kWh）</span>
				  <span class="white f16 mt2">45.13</span>
			   </div>
		   </div>
           <div class="ww22 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 h50 bs2">
                  <span>有功功率（kW）</span>
				  <span class="white f16 mt2">35.45</span>
			   </div>
		   </div>
           <div class="ww22 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 h50 bs2">
                  <span>无功功率（kW）</span>
				  <span class="white f16 mt2">12.24</span>
			   </div>
		   </div>
		</div>
		<div class="ww100 flex-sc warp mt10">
           <div class="ww12 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 h50 ba8 white rad5">
                  <span>光伏发电3</span> 
			   </div>
		   </div>
           <div class="ww22 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 h50 bs2">
                  <span>总容量（kW）</span>
				  <span class="white f16 mt2">185.28</span>
			   </div>
		   </div>
           <div class="ww22 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 h50 bs2">
                  <span>今日发电量（kWh）</span>
				  <span class="white f16 mt2">65.26</span>
			   </div>
		   </div>
           <div class="ww22 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 h50 bs2">
                  <span>有功功率（kW）</span>
				  <span class="white f16 mt2">25.73</span>
			   </div>
		   </div>
           <div class="ww22 plr5 flex-col-cc">
			   <div class="flex-col-cc ptb4 ww100 h50 bs2">
                  <span>无功功率（kW）</span>
				  <span class="white f16 mt2">9.13</span>
			   </div>
		   </div>
		</div>
		<div class="ww100 hh50 mt15 rad3 hidden">
			<img class="hh100 ww100" src="@/assets/imgs/test4.png" />
		</div>
		<div class="ww100 flex1 mt15 rad3 hidden overlay">
            ‌虚拟电厂（Virtual Power Plant, VPP）是一种通过先进信息通信技术和软件系统，实现分布式电源、储能系统、可控负荷、电动汽车等分布式能源资源（DER）的聚合和协调优化，以作为一个特殊电厂参与电力市场和电网运行的电源协调管理系统‌。‌
						虚拟电厂和微网都是实现分布式能源并网的有效形式，但二者在设计理念和应用场景上有所不同。微网强调自治和就地应用，而虚拟电厂则强调参与和优化资源配置。虚拟电厂通过先进的技术手段聚合多种DER，提供更灵活的电力管理和市场交易服务。
		</div>
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
