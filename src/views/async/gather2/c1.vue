<template>
  <div class="layout-col">
    <!-- 标题 -->
	<div class="h40 ww100 flex-sc relative mb10">
		<!-- <img class="hh100" src="@/assets/imgs/title1.png" /> -->
		<div class="ww100 hh100 flex-sc absolute pl35">
			<!-- <span class="fw flex1 ptb5">总体情况</span> -->
			<div class="flex-ec flex1">
				<div class="w50x5 c8 mr5">
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
	</div>
	<div class="ba1 p10 layout-col">
		<div class="ww100 relative overlay tc flex-ss warp hidden ptb1 p5">
			<div class="tack list2-15 rad8 flex-col-ss cursor p20 relative i15 bs4" style="height: auto;"
				v-for="(v, i) in isNull(publicStore._public.mainData)? [] : publicStore._public.mainData">
				<div class="ww100 flex-sc">
					<img class="h42 mr15" src="@/assets/imgs/m4.png" alt="" />
					<span>证书</span>
				</div>
				<div class="ww100 flex-bc mt12">
					<span>名称</span>
					<span>{{v.name}}</span>
				</div>
				<div class="ww100 flex-bc mt12">
					<span>运行状态</span>
					<span :class="v.run?v.run=='1'?'i12':v.run=='2'?'i8':'':''">{{v.run?v.run=='1'?'运行中':v.run=='2'?'已停止':'':''}}</span>
				</div>
				<div class="ww100 flex-bc mt12">
					<span>额定功率（kwh）</span>
					<span>{{v.rated}}</span>
				</div>
				<div class="ww100 flex-bc mt12">
					<span>输出功率（kwh）</span>
					<span>{{v.out}}</span>
				</div>
				<div class="ww100 flex-bc mt12">
					<span>所属区域</span>
					<span>{{v.area}}</span>
				</div>
				<div class="ww100 flex-bc mt12">
					<span>属性</span>
					<span>{{v.attr}}</span>
				</div>
			</div>
		</div>
	</div>
  </div>
</template>

<script lang="ts" setup>
  const { proxy }: any = getCurrentInstance();
  const publicStore = proxy.publicStore();
  const configStore = proxy.configStore();
  const state = reactive({
    ...publicStore.$state,
  });
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
