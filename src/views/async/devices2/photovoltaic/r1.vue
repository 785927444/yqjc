<template>
  <div class="layout-col hidden">
		<div class="ww100 h40 flex-sc relative mb5 i15">
			<div class="flex-sc flex1 hh100">
				<div class="mr5">区域：</div>
				<div class="w50x4">
					<el-tree-select v-model="publicStore.active.id" placeholder="请选择" 
					@change="changeSelect"
					ref="treeRef" 
					class="flex1 c8" 
					:default-expand-all="true" 
					highlight-current 
					accordion 
					clearable 
					filterable 
					check-strictly 
					:render-after-expand="false"
					:data="publicStore._public.tree?publicStore._public.tree:[]" 
					:props="defaultProps" 
					node-key="id" />
				</div>
			</div>
		</div>
		<div class="ww100 flex1 tc ba1 hidden flex-sc">
      <!-- <img class="hh100 ww100" v-if="!isNull(publicStore.active) && !isNull(publicStore.active.images) && publicStore.active.parent_id!='0'" :src="publicStore.active.images" /> -->
			<el-carousel :interval="5000" arrow="always" class="hh100 ww100 tc" v-if="(!isNull(publicStore.active) && !isNull(publicStore.active.images)) || !isNull(publicStore._public) && !isNull(publicStore._public.images)">
				<el-carousel-item v-for="item in !isNull(publicStore.active.images)?publicStore.active.images:!isNull(publicStore._public.images)?publicStore._public.images:[]" :key="item">
					<img class="hh100 ww100" :src="item" />
				</el-carousel-item>
			</el-carousel>
		</div>
  </div>
</template>

<script lang="ts" setup>
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
	const configStore = proxy.configStore()
  const dictStore = proxy.dictStore()
  const state = reactive({
	  ...publicStore.$state,
  })
  const defaultProps = {
    children: 'children',
    label: 'station_name',
  }
  let treeRef = $ref()

  const changeSelect = async(val) => {
		let node = proxy.findNode(publicStore._public.tree?publicStore._public.tree:[], (node) => { return node[state.key] == val })
		if(node) publicStore.active = Object.assign({}, node)
  }

</script>
 
<style scoped lang="scss">
:deep(.el-carousel__container){
	height: 100%;
}
:deep(.el-carousel__arrow){
	background: rgba(28,128,245,0.2);
}
</style>
