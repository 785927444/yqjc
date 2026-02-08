<template>
    <div class="layout-row pl15 mt15 mb15 relative">
        <r1 class="flex2 mr15"></r1>
        <div class="flex7 layout-col mr15">
            <c1 class="mb15"></c1>
            <c2></c2>
        </div>
        <div class="absolute r5 layout-col2 bgstl3 tt40 plr5 ptb5 z10" @click="initData()">
            <span class="pb3">接</span>
            <span class="pb3">线</span>
            <span class="pb3">图</span>
            <div class="cosp">
                <IconExpand v-if="state.graphState==0"></IconExpand>
                <IconCollapse v-if="state.graphState==1"></IconCollapse>
            </div>
        </div>
    </div>
    <div class="absolute ww95 hh100 bgb1 r0" v-show="state.graphState==1" ref="refSvgGraph"></div>
</template>
<script lang="ts" setup>
    import MyTree from "../Tree.vue"
    import r1 from "./r1.vue"
    import c1 from "./c1.vue"
    import c2 from "./c2.vue"
    import IconExpand from './expand.vue'
    import IconCollapse from "./collapse.vue"
    import axios from 'axios'
    import Hammer from 'hammerjs'
    import svgPanZoom from 'svg-pan-zoom'
    import svgData from '@/assets/imgs/g.svg'
    import scheduled from "@/utils/scheduled"
    let mElSvgGraph
    let elSvg
    let minZoom = $ref(0.2)
    let maxZoom = $ref(10)
    let zoomAtPointScale = ref(1)
    let screenCenterScale = ref(2)
    let instancePanZoom
    const refSvgGraph = ref()
	const { createScheduled } = scheduled()
	const { proxy }:any = getCurrentInstance()
	const configStore = proxy.configStore()
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
        graphState:0,
        refPanZoom:null,
	})
	
	onMounted(async() => {
       init()
	//    createScheduled('home', 10*60*1000, () => { init() })
	})

	const init = async() => {
		getOverview()
	}

	const getOverview = async() => {
        // let query = {model: "t_v_consumption_overview"}
        // let params = {Api: query}
        // let res = await publicStore.http(params)
        let res = [
        {
            "alarm_num": 1,
            "electricity_demand": 2400,
            "frequency": 49.98,
            "harmonic": 10.2,
            "house_electricity_consumption_info": "{\"data\":{\"timeRange\":[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\",\"23\",\"24\"],\"pd1\":[\"26.21\",\"15.33\",\"27.83\",\"31.92\",\"33.05\",\"31.27\",\"15.89\",\"0.05\",\"17.58\",\"4.23\",\"20.89\",\"0.99\",\"9.96\",\"46.65\",\"34.88\",\"30.51\",\"12.15\",\"31.28\",\"23.87\",\"22.96\",\"17.91\",\"49.87\",\"38.22\",\"5.00\"],\"pd2\":[\"28.70\",\"93.45\",\"42.86\",\"73.96\",\"9.00\",\"73.05\",\"27.57\",\"78.91\",\"93.63\",\"55.33\",\"57.89\",\"66.04\",\"78.39\",\"0.63\",\"31.08\",\"76.56\",\"54.93\",\"77.56\",\"63.57\",\"49.24\",\"96.00\",\"3.43\",\"39.42\",\"87.28\"],\"pd3\":[\"50.72\",\"73.89\",\"90.63\",\"43.30\",\"23.91\",\"0.73\",\"92.14\",\"68.94\",\"42.63\",\"10.17\",\"99.26\",\"11.29\",\"34.24\",\"30.15\",\"35.71\",\"53.68\",\"37.07\",\"32.23\",\"14.26\",\"4.21\",\"56.18\",\"32.75\",\"12.23\",\"67.71\"]}}",
            "house_load_info": "{\"data\":{\"timeRange\":[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\",\"23\",\"24\"],\"pd1\":[\"26.21\",\"15.33\",\"27.83\",\"31.92\",\"33.05\",\"31.27\",\"15.89\",\"0.05\",\"17.58\",\"4.23\",\"20.89\",\"0.99\",\"9.96\",\"46.65\",\"34.88\",\"30.51\",\"12.15\",\"31.28\",\"23.87\",\"22.96\",\"17.91\",\"49.87\",\"38.22\",\"5.00\"],\"pd2\":[\"28.70\",\"93.45\",\"42.86\",\"73.96\",\"9.00\",\"73.05\",\"27.57\",\"78.91\",\"93.63\",\"55.33\",\"57.89\",\"66.04\",\"78.39\",\"0.63\",\"31.08\",\"76.56\",\"54.93\",\"77.56\",\"63.57\",\"49.24\",\"96.00\",\"3.43\",\"39.42\",\"87.28\"],\"pd3\":[\"50.72\",\"73.89\",\"90.63\",\"43.30\",\"23.91\",\"0.73\",\"92.14\",\"68.94\",\"42.63\",\"10.17\",\"99.26\",\"11.29\",\"34.24\",\"30.15\",\"35.71\",\"53.68\",\"37.07\",\"32.23\",\"14.26\",\"4.21\",\"56.18\",\"32.75\",\"12.23\",\"67.71\"]}}",
            "id": 1,
            "installed_capacity": 2500,
            "month_electric_charge": 352012,
            "month_electricity_consumption": 156888,
            "month_electricity_consumption_info": "{\"data\":{\"timeRange\":[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\"],\"sc\":[\"2343.60\",\"15102.09\",\"10245.41\",\"6043.62\",\"10324.12\",\"13537.85\",\"11438.08\",\"16037.07\",\"11370.87\",\"5269.86\",\"8258.16\",\"6641.47\"],\"kt\":[\"12332.54\",\"693.98\",\"20025.25\",\"20553.87\",\"32455.71\",\"31706.59\",\"28671.06\",\"14284.31\",\"5682.48\",\"3486.57\",\"30770.75\",\"28491.46\"],\"zm\":[\"1182.93\",\"1504.94\",\"1009.51\",\"1861.11\",\"2775.52\",\"1320.58\",\"2657.38\",\"688.647\",\"3110.74\",\"2275.69\",\"1501.15\",\"2321.98\"],\"qt\":[\"1007.29\",\"1090.09\",\"2231.78\",\"5912.43\",\"46.9611\",\"4728.63\",\"7286.40\",\"5130.32\",\"5989.20\",\"249.623\",\"6154.79\",\"4257.49\"]}}",
            "offline_num": 150,
            "power_factor": 0.98,
            "real_time_load_info": "{\"data\":{\"timeRange\":[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"10\",\"11\",\"12\",\"13\",\"14\",\"15\",\"16\",\"17\",\"18\",\"19\",\"20\",\"21\",\"22\",\"23\",\"24\"],\"sc\":[\"0.71\",\"27.80\",\"37.05\",\"9.54\",\"49.91\",\"47.82\",\"19.19\",\"33.93\",\"2.06\",\"41.20\",\"30.09\",\"12.41\",\"28.09\",\"12.82\",\"36.54\",\"19.59\",\"40.23\",\"8.35\",\"13.78\",\"0.07\",\"21.14\",\"6.85\",\"35.70\",\"24.61\"],\"kt\":[\"15.06\",\"9.06\",\"23.03\",\"98.02\",\"98.01\",\"91.61\",\"77.10\",\"2.84\",\"58.76\",\"12.78\",\"59.74\",\"55.87\",\"26.09\",\"80.72\",\"47.55\",\"92.29\",\"89.33\",\"88.59\",\"44.54\",\"65.49\",\"53.77\",\"46.78\",\"65.77\",\"67.27\"],\"zm\":[\"9.96\",\"2.54\",\"4.25\",\"8.53\",\"3.89\",\"4.13\",\"2.39\",\"4.81\",\"1.71\",\"7.17\",\"3.44\",\"3.56\",\"3.48\",\"4.16\",\"2.26\",\"8.95\",\"2.08\",\"6.57\",\"5.99\",\"4.11\",\"8.71\",\"1.40\",\"6.62\",\"5.49\"],\"qt\":[\"18.03\",\"10.46\",\"1.62\",\"13.81\",\"3.71\",\"16.74\",\"16.63\",\"16.01\",\"0.21\",\"12.76\",\"2.02\",\"10.24\",\"11.81\",\"18.98\",\"9.62\",\"13.67\",\"11.36\",\"6.98\",\"3.27\",\"12.66\",\"6.92\",\"16.95\",\"16.15\",\"12.10\"]}}",
            "real_time_total_load": 652.2,
            "total_load": 35.5,
            "total_num": 151,
            "transformer_num": 3,
            "unbalance": 29,
            "year_electricity_consumption": 2500000
        }
        ]
        publicStore._public.overview = proxy.isNull(res)? {} : res[0]
        if(!proxy.isNull(publicStore._public.overview)){
            try{
                let info1 = JSON.parse(publicStore._public.overview.real_time_load_info)
                let info2 = JSON.parse(publicStore._public.overview.month_electricity_consumption_info)   
                let info3 = JSON.parse(publicStore._public.overview.house_load_info)
                let info4 = JSON.parse(publicStore._public.overview.house_electricity_consumption_info)

                let charts1 = [{name: '总负荷', data: []}, {name: '生产负荷', data: []}, {name: '空调负荷', data: []}, {name: '其他负荷', data: []}]
                info1.data.timeRange.forEach((v, i) => {
                    let temp0 = [v, info1.data.zm[i]]
                    let temp1 = [v, info1.data.sc[i]]
                    let temp2 = [v, info1.data.kt[i]]
                    let temp3 = [v, info1.data.qt[i]]
                    charts1[0].data.push(temp0)
                    charts1[1].data.push(temp1)
                    charts1[2].data.push(temp2)
                    charts1[3].data.push(temp3)
                })
                publicStore._public.lines1 = charts1

                let charts2 = [{name: '总负荷', data: []}, {name: '生产负荷', data: []}, {name: '空调负荷', data: []}, {name: '其他负荷', data: []}]
                info2.data.timeRange.forEach((v, i) => {
                    let temp0 = [v, info2.data.zm[i]]
                    let temp1 = [v, info2.data.sc[i]]
                    let temp2 = [v, info2.data.kt[i]]
                    let temp3 = [v, info2.data.qt[i]]
                    charts2[0].data.push(temp0)
                    charts2[1].data.push(temp1)
                    charts2[2].data.push(temp2)
                    charts2[3].data.push(temp3)
                })
                publicStore._public.lines2 = charts2

                let charts3 = [{name: '配电房1', data: []}, {name: '配电房2', data: []}, {name: '配电房3', data: []}]
                info3.data.timeRange.forEach((v, i) => {
                    let temp0 = [v, info3.data.pd1[i]]
                    let temp1 = [v, info3.data.pd2[i]]
                    let temp2 = [v, info3.data.pd3[i]]
                    charts3[0].data.push(temp0)
                    charts3[1].data.push(temp1)
                    charts3[2].data.push(temp2)
                })
                publicStore._public.lines3 = charts3

                let charts4 = [{name: '配电房1', data: []}, {name: '配电房2', data: []}, {name: '配电房3', data: []}]
                info4.data.timeRange.forEach((v, i) => {
                    let temp0 = [v, info4.data.pd1[i]]
                    let temp1 = [v, info4.data.pd2[i]]
                    let temp2 = [v, info4.data.pd3[i]]
                    charts4[0].data.push(temp0)
                    charts4[1].data.push(temp1)
                    charts4[2].data.push(temp2)
                })
                publicStore._public.lines4 = charts4
            }catch(err) {
                console.error('json 解析错误')
            }
        }
	}

    const initData = async() => {
        if(state.graphState == 1) return state.graphState = 0
        state.graphState = 1
        const el = refSvgGraph.value
        const svgDatas = await axios.get(svgData)
        let svg = svgDatas
        mElSvgGraph = el
        mElSvgGraph.innerHTML = svgDatas.data
        elSvg = mElSvgGraph.getElementsByTagName('svg')[0]
        // setData(elSvg)
        adjustToFreezeWidth(elSvg)
    }

    const adjustToFreezeWidth = (elSvg) => {
        elSvg.removeAttribute("width");
        elSvg.removeAttribute("height");
        elSvg.setAttribute("width", '100%');
        elSvg.setAttribute('height', '100%');
        // const rect = elSvg.getElementById("HeadClass").getElementsByTagName("rect")[0];
        // rect.style.fillOpacity = "0";
        initZoom(elSvg)
    }

    const initZoom = (elSvg) => {
        let initialScale = 1, pannedX = 0, pannedY = 0;
        let panZoomSizes;
        const options = {
            minZoom: minZoom,
            maxZoom: maxZoom,
            center: true,
            dblClickZoomEnabled: false,
            controlIconsEnabled: false,
            customEventsHandler: {
                haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel'], init: function (options) {
                    instancePanZoom = options.instance;
                    panZoomSizes = instancePanZoom.getSizes();
                    // console.log('init panZoom')
                    // console.log(panZoomSizes)
                    // Init Hammer
                    this.hammer = Hammer(options.svgElement, {
                        // inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.MouseInput : Hammer.TouchInput
                        inputClass: Hammer.TouchMouseInput
                    })
                    // Enable pinch
                    this.hammer.get('pinch').set({enable: true})

                    // Handle pinch
                    this.hammer.on('pinchstart pinchmove', (evt) => {
                        if (evt.type === 'pinchstart') {
                            initialScale = instancePanZoom.getZoom()
                            instancePanZoom.zoomAtPoint(initialScale * evt.scale, {
                                x: evt.center.x / zoomAtPointScale,
                                y: evt.center.y
                            })
                        }
                        instancePanZoom.zoomAtPoint(initialScale * evt.scale, {
                            x: evt.center.x / zoomAtPointScale,
                            y: evt.center.y
                        })
                        // console.log('zoomAtPointScale');
                        // console.log(zoomAtPointScale)
                    })

                    // Handle pan
                    this.hammer.on('panstart panmove', (evt) => {
                        // On pan start reset panned variables
                        if (evt.type === 'panstart') {
                            pannedX = 0
                            pannedY = 0
                        }
                        // Pan only the difference
                        instancePanZoom.panBy({x: evt.deltaX - pannedX, y: evt.deltaY - pannedY})
                        pannedX = evt.deltaX
                        pannedY = evt.deltaY
                    })

                    // Prevent moving the page on some devices when panning over SVG
                    options.svgElement.addEventListener('touchmove', (evt) => {
                        evt.preventDefault();
                    });

                    // 长按事件
                    this.hammer.get('press').set({
                        time: 500
                    });
                },
                // Destroy custom events handler
                destroy: function () {
                    this.hammer.destroy()
                }
            },
            onZoom: (scale) => {
                // console.log("setZoomScale=" + scale)
                panZoomSizes = instancePanZoom.getSizes();
                // console.log('panZoomSizes', panZoomSizes)
            }
        }
        svgPanZoom(elSvg, options);
        // 初始化完成
        // svgGraphEventBus.emitSvgPanZoomInit();
    }
</script>