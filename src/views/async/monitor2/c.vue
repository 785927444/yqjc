<template>
  <div class="layout-col absolute t0 l0 cursor">
		<div class="ww100 hh100" id="container"></div>
		<!-- 头部统计 -->
		<div class="ww100 flex-cc absolute t80 z1" v-if="publicStore._public.homeInfo">
			<div class="ww44 flex-col-ss h50x3 mt15">
				<div class="ww100 flex-sc h42 i15">
					<div class="fw f16">光伏板累计发电量</div>
					<div class="flex-sc mlr10">
            <div class="bs11 w42 h42 lh42 fw tc mlr2 f20" v-for="(v, i) in publicStore._public.photovoltaicInfo&&publicStore._public.photovoltaicInfo.Total_Output?Math.floor((publicStore._public.photovoltaicInfo.Total_Output*10))/10 +'':'0'">{{ v }}</div>
					</div>
					<div class="fw f16 flex1">kWh</div>
				</div>
				<div class="ww100 flex-sc h42 i15 mt4">
					<div class="fw f16">储能柜累计充电量</div>
					<div class="flex-sc mlr10">
            <div class="bs11 w42 h42 lh42 fw tc mlr2 f20" v-for="(v, i) in publicStore._public.energyInfo&&publicStore._public.energyInfo.Total_Input?Math.floor((publicStore._public.energyInfo.Total_Input*10))/10 +'':'0'">{{ v }}</div>
					</div>
					<div class="fw f16 flex1">kWh</div>
				</div>
				<div class="ww100 flex-sc h42 i15 mt4">
					<div class="fw f16">储能柜累计放电量</div>
					<div class="flex-sc mlr10">
            <div class="bs11 w42 h42 lh42 fw tc mlr2 f20" v-for="(v, i) in publicStore._public.energyInfo&&publicStore._public.energyInfo.Total_Output?Math.floor((publicStore._public.energyInfo.Total_Output*10))/10 +'':'0'">{{ v }}</div>
					</div>
					<div class="fw f16 flex1">kWh</div>
				</div>
				<div class="ww100 flex-sc h42 i15 mt4">
					<div class="fw f16">充电桩累计充电量</div>
					<div class="flex-sc mlr10">
            <div class="bs11 w42 h42 lh42 fw tc mlr2 f20" v-for="(v, i) in publicStore._public.chargeInfo&&publicStore._public.chargeInfo.Total_Input?Math.floor((publicStore._public.chargeInfo.Total_Input*10))/10 +'':'0'">{{ v }}</div>
					</div>
					<div class="fw f16 flex1">kWh</div>
				</div>
			</div>
		</div>
		<!-- 底部导航 -->
    <div class="ww100 absolute b20 flex-col-cc">
			<div class="ww46 flex-cc hidden mb15 f12 i15">
				<!-- 总览 -->
				<div class="flex-cc flex1">
					<div class="flex-ss w50x4 plr10">
						<img class="w50" src="@/assets/imgs/ele1.png" />
						<div class="flex1 flex-col">
							<div class="flex1 flex-bc hidden mb5">
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">总数</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.homeInfo&&publicStore._public.homeInfo.sum? publicStore._public.homeInfo.sum : '0' }}</span>
								</div>
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">其他</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.homeInfo&&publicStore._public.homeInfo.none? publicStore._public.homeInfo.none : '0' }}</span>
								</div>
							</div>
							<div class="flex1 flex-bc hidden">
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">在线</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.homeInfo&&publicStore._public.homeInfo.offline0? publicStore._public.homeInfo.offline0 : '0' }}</span>
								</div>
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">离线</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.homeInfo&&publicStore._public.homeInfo.offline1? publicStore._public.homeInfo.offline1 : '0' }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 光伏 -->
				<div class="flex-cc flex1">
					<div class="flex-ss w50x4 plr10">
						<img class="w50" src="@/assets/imgs/home11.png" />
						<div class="flex1 flex-col">
							<div class="flex1 flex-bc hidden mb5">
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">总数</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.photovoltaicInfo&&publicStore._public.photovoltaicInfo.sum? publicStore._public.photovoltaicInfo.sum : '0' }}</span>
								</div>
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">其他</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.photovoltaicInfo&&publicStore._public.photovoltaicInfo.none? publicStore._public.photovoltaicInfo.none : '0' }}</span>
								</div>
							</div>
							<div class="flex1 flex-bc hidden">
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">在线</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.photovoltaicInfo&&publicStore._public.photovoltaicInfo.offline0? publicStore._public.photovoltaicInfo.offline0 : '0' }}</span>
								</div>
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">离线</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.photovoltaicInfo&&publicStore._public.photovoltaicInfo.offline1? publicStore._public.photovoltaicInfo.offline1 : '0' }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 储能 -->
				<div class="flex-cc flex1">
					<div class="flex-ss w50x4 plr10">
						<img class="w50" src="@/assets/imgs/home22.png" />
						<div class="flex1 flex-col">
							<div class="flex1 flex-bc hidden mb5">
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">总数</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.energyInfo&&publicStore._public.energyInfo.sum? publicStore._public.energyInfo.sum : '0' }}</span>
								</div>
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">其他</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.energyInfo&&publicStore._public.energyInfo.none? publicStore._public.energyInfo.none : '0' }}</span>
								</div>
							</div>
							<div class="flex1 flex-bc hidden">
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">在线</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.energyInfo&&publicStore._public.energyInfo.offline0? publicStore._public.energyInfo.offline0 : '0' }}</span>
								</div>
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">离线</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.energyInfo&&publicStore._public.energyInfo.offline1? publicStore._public.energyInfo.offline1 : '0' }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 充电 -->
				<div class="flex-cc flex1">
					<div class="flex-ss w50x4 plr10">
						<img class="w50" src="@/assets/imgs/home33.png" />
						<div class="flex1 flex-col">
							<div class="flex1 flex-bc hidden mb5">
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">总数</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.chargeInfo&&publicStore._public.chargeInfo.sum? publicStore._public.chargeInfo.sum : '0' }}</span>
								</div>
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">其他</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.chargeInfo&&publicStore._public.chargeInfo.none? publicStore._public.chargeInfo.none : '0' }}</span>
								</div>
							</div>
							<div class="flex1 flex-bc hidden">
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">在线</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.chargeInfo&&publicStore._public.chargeInfo.offline0? publicStore._public.chargeInfo.offline0 : '0' }}</span>
								</div>
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">离线</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.chargeInfo&&publicStore._public.chargeInfo.offline1? publicStore._public.chargeInfo.offline1 : '0' }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!-- 风机 -->
				<!-- <div class="flex-cc flex1">
					<div class="flex-ss w50x4 plr10">
						<img class="w50" src="@/assets/imgs/home44.png" />
						<div class="flex1 flex-col">
							<div class="flex1 flex-bc hidden mb5">
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">在线</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.windInfo&&publicStore._public.windInfo.offline0? publicStore._public.windInfo.offline0 : '0' }}</span>
								</div>
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">离线</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.windInfo&&publicStore._public.windInfo.offline1? publicStore._public.windInfo.offline1 : '0' }}</span>
								</div>
							</div>
							<div class="flex1 flex-bc hidden">
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">运行</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.windInfo&&publicStore._public.windInfo.Operation_State1? publicStore._public.windInfo.Operation_State1 : '0' }}</span>
								</div>
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">停止</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.windInfo&&publicStore._public.windInfo.Operation_State0? publicStore._public.windInfo.Operation_State0 : '0' }}</span>
								</div>
							</div>
						</div>
					</div>
				</div> -->
				<!-- 空调 -->
				<!-- <div class="flex-cc flex1">
					<div class="flex-ss w50x4 plr10">
						<img class="w50" src="@/assets/imgs/home55.png" />
						<div class="flex1 flex-col">
							<div class="flex1 flex-bc hidden mb5">
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">在线</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.airconditionerInfo&&publicStore._public.airconditionerInfo.offline0? publicStore._public.airconditionerInfo.offline0 : '0' }}</span>
								</div>
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">离线</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.airconditionerInfo&&publicStore._public.airconditionerInfo.offline1? publicStore._public.airconditionerInfo.offline1 : '0' }}</span>
								</div>
							</div>
							<div class="flex1 flex-bc hidden">
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">运行</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.airconditionerInfo&&publicStore._public.airconditionerInfo['20221']? publicStore._public.airconditionerInfo['20221'] : '0' }}</span>
								</div>
								<div class="flex1 flex-col-cc hidden">
									<span class="z1">停止</span>
									<span class="h10 w40 mts"></span>
									<span class="fw mt2">{{ publicStore._public.airconditionerInfo&&publicStore._public.airconditionerInfo['20220']? publicStore._public.airconditionerInfo['20220'] : '0' }}</span>
								</div>
							</div>
						</div>
					</div>
				</div> -->
			</div>
			<!-- 按钮区 -->
			<div class="ww46 flex-cc warp hidden">
				<div class="flex1 flex-col mlr10 hidden" v-for="(v, i) in state.actives" :key="i">
					<!-- <div class="flex-sc ww100 mb15 f12"></div> -->
					<div class="flex-cc ww100 relative" @click.stop="publicStore.actIndex = v.key">
						<img class="hh100" v-if="publicStore.actIndex == v.key" src="@/assets/imgs/gg.png">
						<img class="hh100" v-else src="@/assets/imgs/g.png">
						<span class="absolute f20 ls2 mt5" :class="publicStore.actIndex == v.key?'i1':''">{{v.name}}</span>
					</div>
				</div>
			</div>
		</div>
  </div>
</template>

<script lang="ts" setup>
  import { gsap } from "gsap"
  import * as THREE from "three"
	import Viewer from '@/utils/three/Viewer'
	import scheduled from "@/utils/scheduled"
	const { createScheduled } = scheduled()
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...configStore.$state,
		...publicStore.$state,
		models: {},
		boxs: {},
		css2dLabel: {},
		css3dLabel: {},
		actives: [
			{name: '综合情况', key: 'home', front: [-15, 15, 55], back: [0, 5, 0], type: 'all'},
			{name: '光伏区',   key: 'gf',   front: [26, 15, -6], back: [0, 2, -6], type: 'photovoltaic'},
			{name: '储能柜',   key: 'cn',   front: [-22.6, 2, -19], back: [-22.6, 0, -12], type: 'energy'},
			{name: '充电桩',   key: 'cd',   front: [-14, 2, -22], back: [-22, 0, -22], type: 'charge'},
			// {name: '风电站',   key: 'wind', front: [-15, 15, 55], back: [0, 5, 0], type: 'wind'},
			// {name: '空调区',   key: 'air',  front: [-15, 15, 55], back: [0, 5, 0], type: 'airconditioner'},
		],
		timeNum: 0,
		timeKey: '',
		loadModel: false
	})
  // 动画
  let timeen = {}
  // 轨迹
  let curve = {}
	// 测试点
	let markPoints = [[-15, 0, 20], [20, 0, 20], [20, 0, 6], [-20, 0, 6], [-20, 0, -17], [20.5, 0, -17], [20.5, 0, 20]]
	// 动作
  let animalIndex = 0
	// 调节速度
	let scaled = 0.01	
	// 门状态
	let isopen = false
	// 栅栏
	let Mesh26 = null
	let	isDriver = false

	onBeforeUnmount(async() => {
		if (state.viewer) {
			state.viewer.dispose()
			state.viewer = {}
		}
	})

	onMounted(async() => {
		publicStore.actIndex = 'home'
		// 场景
		await setInit()
		// 模型
		await setModel()
		// 事件
		state.viewer.startSelectEvent('click', true, (model, point)=>{
			console.log("model---", model)
			console.log("point---", point)
		})
	})

  // 监控鼠标移动
  window.addEventListener('mousemove', function(event) {
    state.timeNum = 0
  })

  // 监控视角切换
  watch(() => publicStore.actIndex, async (val) => {
    if(proxy.isNull(val)) return
		if(val == -1) return
    await nextTick()
		let x, y, z
		let x2, y2, z2
		let active = state.actives.find(a=>a.key == publicStore.actIndex)
		if(!active)	active = state.actives.find(a=>a.key == 'home')
		x = active.front[0]
		y = active.front[1]
		z = active.front[2]
		x2 = active.back[0]
		y2 = active.back[1]
		z2 = active.back[2]
		state.viewer.controls.target = new THREE.Vector3(x2, y2, z2)
		gsap.to(state.viewer.camera.position, {
			x: x,	
			y: y,	
			z: z,	
			duration: 2,
			ease: 'Bounce.inOut'
		})
		setLabels()
  },{ immediate: false, deep: true });

  // 监控动态模型
  watch(() => publicStore._public.bays, async (val) => {
    if(proxy.isNull(val)) return
    await nextTick()
		state.loadModel = false
		let bays = publicStore._public.bays.filter(a=>a.mark)
		let length = bays.length
		let index = 0
		// 有间隔
		if(bays.length > 0){
			bays.forEach((v, i) => {
				// 有文件名称
				if(v.mark){
					let url = `glb/gc_${v.mark}.glb`
					state.viewer.modelLoader.loadModelToScene(url, (model) => {
						index++
						if(length == index) state.loadModel = true 
						// 属性配置
						let id = v.id
						let name = v.station_name
						let mark = v.mark
						model.object.key = id
						model.object.name = name
						model.object.userData = {id: id}
						model.object.scale.set(1, 1, 1)
						// 获取坐标
						let instlPos = v.instlPos? v.instlPos.match(/[-+]?[0-9]*\.?[0-9]+/g).map(Number) : [0, 0, 0]
						model.object.position.set(instlPos[0], instlPos[1], instlPos[2])
						// 特殊处理---储能柜
						if(mark.indexOf('cn') != -1){
							model.cloneModel([instlPos[0]-0.8, instlPos[1], instlPos[2]])
							model.cloneModel([instlPos[0]-1.6, instlPos[1], instlPos[2]])
						}
						// 开启投影
						model.openCastShadow()
						// 接收阴影
						model.openReceiveShadow()
						// 存储模型
						state.models[id] = model
						// 存储盒子
						state.boxs[id] = model.getBox()
						// 添加标签
						setLabel(v)
					})
				}
	  	})
		}
  },{ immediate: false, deep: true });

  // 监控动态标签
  watch([() => publicStore._public.baysData, () => state.loadModel], async ([val1, val2]) => {
    if(!val1 || proxy.isNull(val1)) return
		if(!val2 || proxy.isNull(val2)) return
    await nextTick()
		setLabels()
  },{ immediate: false, deep: true });

  // 初始数据
	const setInit = async() => {
		state.sky = 'night'
		state.viewer = new Viewer("container", {sky: state.sky})
		state.viewer.controls.target = new THREE.Vector3(0, 5, 0)
		state.viewer.camera.position.set(-15, 15, 55)
		// 定时切换
		state.viewer.addAnimate({fun: ()=>{
			state.timeNum++
			// console.log("state.timeNum", state.timeNum)
			if (state.timeNum < 500*1) return
			state.timeNum -=150
			if(state.timeKey == '' || state.timeKey == 'home'){
        state.timeKey = 'gf'
				publicStore.actIndex = 'gf'
			}else if(state.timeKey == 'gf'){
				state.timeKey = 'cn'
        publicStore.actIndex = 'cn'
			}else if(state.timeKey == 'cn'){
				state.timeKey = 'cd'
        publicStore.actIndex = 'cd'
			}else if(state.timeKey == 'cd'){
				state.timeKey = 'home'
        publicStore.actIndex = 'home'
			}
		}, content: {}})
	}
  
	// 初始模型
	const setModel = async() => {
		// 地面
		setGround()
		// 围栏
		setFence()
		// 车辆
		setCar()
		// 其他
		setOther()
		// 楼层
		setFloor()
		// 光伏
		// setGf()
		// 充电
		// setCd()
		// 储能
		// setCn()
	}
  
	// 地面模型
	const setGround = async() => {
		state.viewer.modelLoader.loadModelToScene('glb/gc_ground.glb', (model) => {
			// console.log('ground-model---', model)
			// 属性配置
			const key = 'ground'
			model.object.key = key
			model.object.name = '地面'
			model.object.userData = {id: '1'}
      model.object.position.set(0, 0, 0)
			model.object.scale.set(1, 1, 1)
      // 开启投影
			model.openCastShadow()
			// 接收阴影
			model.openReceiveShadow()
			// 存储
      state.models[key] = model
		})
	}

  // 围栏模型
	const setFence = async() => {
		state.viewer.modelLoader.loadModelToScene('glb/gc_fence.glb', (model) => {
			// console.log('fence-model---', model)
			// 属性配置
			const key = 'fence'
			model.object.key = key
			model.object.name = '围栏'
			model.object.userData = {id: '2'}
      model.object.position.set(0, 0, 0)
			model.object.scale.set(1, 1, 1)
      // 开启投影
			model.openCastShadow()
			// 接收阴影
			model.openReceiveShadow()
			// 存储
      state.models[key] = model
		  // 开门后执行
			// model.object.children.forEach((item) => {
			// 	if (item.name === 'Mesh26') {
			// 		Mesh26 = item
			// 	}
			// })
			// setCurve('car')
		})
	}

  // 其他模型
	const setOther = async() => {
		state.viewer.modelLoader.loadModelToScene('glb/gc_other.glb', (model) => {
			// console.log('other-model---', model)
			// 属性配置
			const key = 'other'
			model.object.key = key
			model.object.name = '其他'
			model.object.userData = {id: '3'}
      model.object.position.set(0, 0, 0)
			model.object.scale.set(1, 1, 1)
      // 开启投影
			model.openCastShadow()
			// 接收阴影
			model.openReceiveShadow()
			// 存储
      state.models[key] = model
		})
	}

  // 汽车模型
	const setCar = () => {
		state.viewer.modelLoader.loadModelToScene('glb/gc_car1.glb', (model) => {
			// console.log('car1-model---', model)
			// 属性配置
			const key = 'car1'
			model.object.key = key
			model.object.name = '奥迪'
			model.object.userData = {id: '4'}
      model.object.position.set(0, 0, 0)
			model.object.scale.set(1, 1, 1)
      // 开启投影
			model.openCastShadow()
			// 接收阴影
			model.openReceiveShadow()
			// 存储
      state.models[key] = model
		})
		// state.viewer.modelLoader.loadModelToScene('glb/gc_car2.glb', (model) => {
		// 	// console.log('car2-model---', model)
		// 	// 属性配置
		// 	const key = 'car2'
		// 	model.object.key = key
		// 	model.object.name = '黄车'
		// 	model.object.userData = {id: '5'}
    //   model.object.position.set(0, 0, 2)
		// 	model.object.scale.set(1, 1, 1)
    //   // 开启投影
		// 	model.openCastShadow()
		// 	// 接收阴影
		// 	model.openReceiveShadow()
		// 	// 存储
    //   state.models[key] = model
		// })
	}

  // 大楼模型
	const setFloor = async() => {
		state.viewer.modelLoader.loadModelToScene('glb/gc_floor.glb', (model) => {
			// console.log('floor-model---', model)
			// 属性配置
			const key = 'floor'
			model.object.key = key
			model.object.name = '大楼'
			model.object.userData = {id: '10'}
      model.object.position.set(0, 0, 0)
			model.object.scale.set(1, 1, 1)
     // 导入材质1
			model.forEach((child) => {
				if (child.isMesh && child.name == "玻璃门") {
					// child.visible = false
					child.material.depthWrite = false
					child.material.transparent = true
					child.material.opacity = 0.3
				}
			})
      // 开启投影
			model.openCastShadow()
			// 接收阴影
			model.openReceiveShadow()
			// 存储
      state.models[key] = model
		})
	}

  // 重载标签
  const setLabels = () => {
    if(proxy.isNull(publicStore._public.bays)) return
		let baysData = !proxy.isNull(publicStore._public.baysData)? publicStore._public.baysData : publicStore._public.bays
		let bays = baysData.filter(a=>a.mark)
		bays.forEach(v => {
			setLabel(v)
		})
	}

  // 设置标签
  const setLabel = (v) => {
		if(!v.mark) return
		let id = v.id
		let name = v.station_name
		let mark = v.mark
		let box = state.boxs[id]
		let model = state.models[id]
		let className = ''
    let innerHTML = ''
		if(mark.indexOf('gf') != -1){
			className = publicStore.actIndex == 'home'?"elementTagRights" : "elementTagRight"
			innerHTML = 
			`<div class="elementContent">
				<div class="${publicStore.actIndex == 'home'?'titles':'title'}">名称：${name}</div>
				<p>有功功率：${v.pv_active_power !== null && v.pv_active_power !== undefined ? Math.floor((v.pv_active_power*10))/10:'?'} kW</p>
				<p>日发电量：${v.pv_daily_energy !== null && v.pv_daily_energy !== undefined ? Math.floor((v.pv_daily_energy*10))/10:'?'} kWh</p>
			</div>`
		}
		if(mark.indexOf('cn') != -1){
			className = publicStore.actIndex == 'home'?"elementTagLefts2" : "elementTagRight"
			innerHTML = 
			`<div class="elementContent">
				<div class="${publicStore.actIndex == 'home'?'titles':'title'}">名称：${name}</div>
				<p>充电功率：${v.Input_Power !== null && v.Input_Power !== undefined ? Math.floor((v.Input_Power*10))/10:'?'} kW</p>
				<p>日充电量：${v.Daily_Input !== null && v.Daily_Input !== undefined ? Math.floor((v.Daily_Input*10))/10:'?'} kWh</p>
				<p>日放电量：${v.Daily_Output !== null && v.Daily_Output !== undefined ? Math.floor((v.Daily_Output*10))/10:'?'} kWh</p>
			</div>`
		}
		if(mark.indexOf('cd') != -1){
			className = publicStore.actIndex == 'home'?"elementTagLefts" : "elementTagLeft"
			innerHTML = 
			`<div class="elementContent">
				<div class="${publicStore.actIndex == 'home'?'titles':'title'}">名称：${name}</div>
				<p>实时功率：${v.Input_Power !== null && v.Input_Power !== undefined ? Math.floor((v.Input_Power*10))/10 : '?'} kW</p>
				<p>日充电量：${v.Daily_Input !== null && v.Daily_Input !== undefined ? Math.floor((v.Daily_Input*10))/10 : '?'} kWh</p>
			</div>`
		}
		if(publicStore.actIndex == 'home' || mark.indexOf(publicStore.actIndex) != -1){
		  state.viewer.labelIns.addCss2dLabelId(id, {x: (box.max.x + box.min.x)/2, y: box.max.y + 0.5, z: (box.max.z + box.min.z)/2}, innerHTML, className)
		}else{
			state.viewer.labelIns.delCss2dLabelId(id)
		}
	}

  // 快递车模型
	// const setActCar = () => {
	// 	state.viewer.modelLoader.loadModelToScene('glb/car13.gltf', (model) => {
	// 		console.log('car-model---', model)
	// 		// 属性配置
	// 		const key = 'car'
	// 		model.object.key = key
	// 		model.object.name = '快递车'
	// 		model.object.userData = {id: '6'}
  //     model.object.position.set(-15, 0, 20)
	// 		model.object.scale.set(0.5, 0.5, 0.5)
	// 		model.object.rotateY(Math.PI / 2)
  //     // 开启投影
	// 		model.openCastShadow()
	// 		// 接收阴影
	// 		model.openReceiveShadow()
	// 		// 存储
  //     state.models[key] = model
	// 	})
	// }
  
	// 设置轨道
	// const setCurve = (key) => {
	// 	curve = new THREE.CatmullRomCurve3(markPoints.map(v => { return new THREE.Vector3(v[0], v[1], v[2]) }))
	// 	// 曲线类型
	// 	curve.curveType = 'catmullrom'
	// 	// 是否封闭 
	// 	curve.closed = true 
	// 	// 线的张力，0为无弧度折线
	// 	curve.tension = 0 
	// 	// 自定义
	// 	curve.division = 50
	// 	// 物体运动时在运动路径的初始位置，范围0~1
	// 	curve.progress = 0
	// 	// 影响运动速率的一个值，范围0~1，需要和渲染频率结合计算才能得到真正的速率
	// 	curve.velocity = 0.0008
	// 	// 为曲线添加材质在场景中显示出来，不显示也不会影响运动轨迹，相当于一个Helper
	// 	const points = curve.getPoints(curve.division) // 获取曲线上的点, 平均多少份
	// 	const geometry = new THREE.BufferGeometry().setFromPoints(points) // 创建几何体
	// 	const material = new THREE.LineBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0 }) // 线材质
	// 	const curveLine = new THREE.Line(geometry, material) // 线
	// 	curveLine.position.y = 1
	// 	state.viewer.scene.add(curveLine)
  //   // 添加到动画
  //   timeen[key] = {fun: moveCurve, content: {model: state.models[key], key: key}}
  //   state.viewer.addAnimate(timeen[key])
	// }

  // 开始运动
	// const moveCurve = (content) => {
	// 	if(!content) return
	// 	const key = content.key
	// 	const model = state.models[key].object
	// 	const name = model.name
	// 	if (model && curve) {
	// 		if (curve.progress <= 1 - curve.velocity) {
	// 			if(key == 'car'){
	// 				// 进入开门
	// 				if ((model.position.x == 20 && model.position.z.toFixed(2) >= 17 && model.position.z.toFixed(2) <= 17.5) || (model.position.x == 20.5 && model.position.z.toFixed(2) >= 11 && model.position.z.toFixed(2) <= 11.5)) {
	// 					if (!isopen) {
	// 						gsap.to(Mesh26.scale, {
	// 							x: Mesh26.scale.x / 8,
	// 							duration: 5,
	// 							ease: 'power1.inOut',
	// 							onComplete: () => {
	// 								isopen = true
	// 								state.viewer.addAnimate(timeen[key])
	// 								gsap.to(Mesh26.scale, {
	// 									x: Mesh26.scale.x * 8,
	// 									duration: 5,
	// 									ease: 'power1.inOut',
	// 									onComplete: () => {
	// 										isopen = false
	// 										curve.velocity = 0.0008
	// 									}
	// 								})
	// 							},
	// 							onStart: () => {
	// 								isopen = false
	// 								state.viewer.removeAnimate(timeen[key])
	// 							}
	// 						})
	// 					}
	// 				}
	// 			}
	// 		  const point = curve.getPointAt(curve.progress) // 获取样条曲线指定点坐标
	// 			const pointBox = curve.getPointAt(curve.progress + curve.velocity) // 获取样条曲线指定点坐标
	// 			if (point && pointBox) {
	// 				model.position.set(point.x, point.y, point.z)
	// 				//因为这个模型加载进来默认面部是正对Z轴负方向的，所以直接lookAt会导致出现倒着跑的现象，这里用重新设置朝向的方法来解决。
	// 				model.lookAt(pointBox.x, pointBox.y, pointBox.z)
	// 				// const offsetAngle = 22 // 目标移动时的朝向偏移
	// 				//以下代码在多段路径时可重复执行
	// 				// const mtx = new THREE.Matrix4() // 创建一个4维矩阵
	// 				// mtx.lookAt(model.position, pointBox, model.up) // 设置朝向
	// 				// mtx.multiply(
	// 				// new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(0, offsetAngle, 0)))
	// 				// const toRot = new THREE.Quaternion().setFromRotationMatrix(mtx) //计算出需要进行旋转的四元数值
	// 				// model.quaternion.slerp(toRot, 0.2)
	// 			}
	// 		  curve.progress += curve.velocity
	// 		} else {
	// 		  curve.progress = 0
	// 		}
	// 	}
	// }

  // 暴露给父组件

</script>

<style scoped lang="scss">
.mts {
	margin-top: -10px;
	border-radius: 15px 0 0 15px; 
	background: linear-gradient(90deg, #6097FF 0%, rgba(96, 151, 255, 0) 100%);
}
</style>
