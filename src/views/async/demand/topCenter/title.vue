<template>
	<div class="ww100 flex-bc m-auto mb15">
		<div class="flex-sc flex3">
			<img v-if="!isNull(configStore.provinceId)" src="@/assets/imgs/home.png" class="cursor w45" @click="goBack(-1)">
			<div v-if="!isNull(configStore.provinceId)" class="bs ptb9 f16" style="border-radius: 6px;">
				<!-- 省会 -->
				<span v-if="!isNull(configStore.provinceId)" class="cursor" 
				:class="isNull(configStore.cityId) && isNull(configStore.districtId) && isNull(configStore.supplyId) && isNull(configStore.distributId)?'i21':''" 
				@click="goBack('1')">{{configStore.provinceName}}</span>
				<!-- 城市 -->
				<span v-if="!isNull(configStore.cityId)" class="mlr5">/</span>
				<span v-if="!isNull(configStore.cityId)" class="cursor" 
				:class="isNull(configStore.districtId) && isNull(configStore.supplyId) && isNull(configStore.distributId)?'i21':''" 
				@click="goBack('2')">{{configStore.cityName}}</span>
				<!-- 地区 -->
				<span v-if="!isNull(configStore.districtId)" class="mlr5">/</span>
				<span v-if="!isNull(configStore.districtId)" class="cursor" 
				:class="isNull(configStore.supplyId) && isNull(configStore.distributId)?'i21':''"  
				@click="goBack('3')">{{configStore.districtName}}</span>
				<!-- 供电所 -->
				<span v-if="!isNull(configStore.supplyId)" class="mlr5">/</span>
				<span v-if="!isNull(configStore.supplyId)" class="cursor" 
				:class="isNull(configStore.distributId)?'i21':''"  
				@click="goBack('4')">{{find(configStore.stationList, ['id', configStore.supplyId], 'name')}}</span>
				<!-- 配电房 -->
				<span v-if="!isNull(configStore.distributId)" class="mlr5">/</span>
				<span v-if="!isNull(configStore.distributId)" class="cursor i11" 
				@click="goBack('5')">{{find(configStore.stationList, ['id', configStore.distributId], 'name')}}</span>
			</div>
		</div>
		<div class="flex-ec flex2" v-if="configStore.config.level.length == 0">
			<el-input class="w50x5 mr10" size="large" v-model="state.text" placeholder="请输入关键字" clearable/>
			<div class="rad4 ptb9 plr18 flex-cc cursor i1 bo-i20-1" @click="publicStore._public.text = state.text">搜索</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import axios from 'axios'
	// import MAPDATA from '@/utils/map'
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
	  ...publicStore.$state,
	  stationList: [],
	})

	// 监控搜索
	watch(() => publicStore._public.text, async(val, old) => {
		if(!val) return
		await setstation()
		handlerChange(val) 
	}, {immediate: false, deep: true})

    const setstation = async() => {
		state.stationList = [];
		for (const item of configStore.stationList) {
			let json = Object.assign({ districtName: "" }, item);
			if (!item.districtId) {
				state.stationList.push(json);
			} else {
				const tempMap = (await axios.get(`./china/${item.districtId}.json`)).data;
				tempMap.features.forEach(v => {
					if (v.properties.adcode === item.districtId) {
						const newJson = Object.assign({}, json);
						newJson.districtName = v.properties.name;
						state.stationList.push(newJson);
					}
				});
			}
		}
	}
 
	// 搜索
	const handlerChange = async(val) => {
		if(val.length == 0) return
		val = val.trim()
		let adcode = ''
		// let mapData = MAPDATA.adcode.find(a=>{ return a.name.indexOf(val) != -1 })
		// if(mapData){
		// 	adcode = mapData.adcode
		// 	configStore.$patch({ districtId: '', districtName: '', supplyId: '', supplyName: '',  distributId: '', distributName: '' })
		// }else{
		// 	// 优先判断区
		// 	let value1 = state.stationList.find(a=>{ return a.districtName.indexOf(val) != -1 })
		// 	if(value1){
		// 		adcode = value1.districtId
		// 		if(!publicStore.cityId) MAPDATA.getDistrictName(value1.districtId)
		// 		configStore.$patch({ districtId: value1.districtId, districtName: value1.districtName, supplyId: '', supplyName: '', distributId: '', distributName: '' })
		// 	}else{
		// 		// 判断供电所
		// 		let value2 = {}
		// 		if(publicStore.districtId){
		// 		   value2 = publicStore.supplyList.find(a=>{ return a.name.indexOf(val) != -1 })
		// 		}else{
		// 		   value2 = proxy.findNode(state.stationList, (node) => { return node.name.indexOf(val) != -1 })
		// 		}
		// 		if(!proxy.isNull(value2) && value2.node_type == 0){
		// 			adcode = value2.districtId
		// 			configStore.$patch({ supplyId: value2.id, supplyName: value2.name })
		// 		}else{
		// 			// 判断配电房
		// 			let value3 = {}
		// 			if(value2 && value2.node_type == 1){
    //                    value3 = Object.assign({}, value2)
		// 			}
		// 			if(publicStore.supplyId) value3 = publicStore.distributList.find(a=>{ return a.name.indexOf(val) != -1 })
		// 			if(!proxy.isNull(value3)){
		// 			   let parent = proxy.findNode(state.stationList, (node) => { return node.id == value3.up_id })
		// 			   if(!publicStore.supplyId) configStore.$patch({ supplyId: parent.id, supplyName: parent.name })
		// 				adcode = parent.districtId
		// 				configStore.adcode = adcode
		//                 publicStore._public.text = ''
		// 				configStore.$patch({ distributId: value3.id, distributName: value3.name })
		// 			}else{
		// 				return ElMessage.error('搜索内容不存在')
		// 			}
		// 		}
		// 	}
		// }
		configStore.adcode = adcode
		publicStore._public.text = ''
  }
  
	// 回退
  const goBack = async(val) => {
	if(state.text) state.text = ''
    if(val == -1){
		if(configStore.config.level && configStore.config.level.length > 0) return
		configStore.$patch({
			adcode: 100000, 
			provinceId: '', provinceName: '',
			cityId: '', cityName: '', 
			districtId: '', districtName: '',
			supplyId: '', supplyName: '', 
			distributId: '', distributName: '',
		})
    }
    if(val == 1){
		if(configStore.config.level && configStore.config.level.length > 1) return
		configStore.$patch({
			adcode: configStore.provinceId,
			cityId: '', cityName: '', 
			districtId: '', districtName: '',
			supplyId: '', supplyName: '', 
			distributId: '', distributName: '',
		})
    }
    if(val == 2){
		if(configStore.config.level && configStore.config.level.length > 2) return
		configStore.$patch({
			adcode: configStore.cityId, 
			districtId: '', districtName: '',
			supplyId: '', supplyName: '', 
			distributId: '', distributName: '',
		})
}
    if(val == 3){
		if(configStore.config.level && configStore.config.level.length > 3) return
		configStore.$patch({
			adcode: configStore.districtId, 
			supplyId: '', supplyName: '', 
			distributId: '', distributName: '',
		})
    }
    if(val == 4){
		configStore.$patch({
			distributId: '', distributName: '',
		})
    }
    if(val == 5){
      console.log('已是最后一级')
    }
  }
</script>

<style scoped lang="scss">
:deep(.el-input){
	box-shadow: 0 0 0 1px #2663AA #2663AA inset!important;
}
:deep(.el-input--large .el-input__wrapper){
	color: #ffffff !important;
	background: rgba(17, 8, 73, 0.3) !important;
	box-shadow: 0 0 0 1px #2663AA inset!important;
	border-radius: 5px !important;
	width: 100%;
    box-sizing: border-box;
}
:deep(.el-input--large .el-input__inner){
	color: #fff !important;
}
</style>
