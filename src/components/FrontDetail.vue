<template>
  <!-- 生成弹窗 -->
  <div class="topclass">
    <el-dialog v-model="state.isFalse" :title="`【${state.title}】- 详情`" :draggable="true" :fullscreen="true" :destroy-on-close="true">
      <div class="layout-row white p15" element-loading-background="rgba(0, 0, 0, 0.1)" v-loading="state.loading? true : false"  element-loading-text="请求中...">
        <div class="layout-row hidden relative" v-if="!isNull(state.data)">
          <!-- 步骤 -->
          <div class="flex1 hh100 flex-col hidden ba1 p5">
            <div class="ww100 fw f16 plr10 pt10 pb5">方案流程</div>
            <div class="ww100 hh100 flex-col overlay p10">
              <div class="ww100 flex-col mb20" v-for="(v, i) in !isNull(state.data)?state.data.schemeStepList:[]" :key="i">
                <!-- 阶段标题 -->
                <div class="ww100 flex-sc fw">
                  <div class="w16 h16 bo-i1-5 bg-white rad100 mr5"></div>
                  <!-- <span>{{ v.stepStage }}</span>
                  <span>、</span> -->
                  <span>{{ v.stepStageName }}</span>
                </div>
                <div class="ww100 flex-col mt10 pl20" v-for="(vv, ii) in !isNull(v.childs)?v.childs:[]" :key="ii">
                  <!-- 步骤标题 -->
                  <div class="ww100 flex-sc">
                    <span>{{ vv.stepIndex }}</span>
                    <span class="mr5">.</span>
                    <span>{{ vv.stepName }}</span>
                  </div>
                  <!-- 设备 -->
                  <div v-if="vv.id!='zdy'" class="ww100 flex-col mt10 pl30" v-for="(vvv, iii) in !isNull(vv.chooseList)?vv.chooseList:[]" :key="iii">
                    <div class="ww100 flex-col">
                      <div class="flex-sc i15">
                        <!-- <span class="rad50 bo-i15-2 p2 flex-cc"><span class="w4 h4 bgi15 rad50"></span></span>
                        <span class="mr5"></span> -->
                        <span>{{ vvv.chooseName }}</span>
                      </div>
                      <div class="flex-col i15 mt10 pl15" v-for="(vvvv, iiii) in !isNull(vvv.stepCmdList)?vvv.stepCmdList:[]" :key="iiii">
                        <span>{{ vvvv.deviceCode }}</span>
                      </div>
                    </div>
                  </div>
                  <!-- 设备参数 -->
                  <div v-if="vv.id=='zdy'" class="ww100 flex-col mt10 pl20" v-for="(vvv, iii) in !isNull(vv.chooseList)?vv.chooseList:[]" :key="iii">
                    <div class="ww100 flex-col">
                      <div class="flex-sc i15">
                        <span class="rad50 bo-i15-2 p2 flex-cc"><span class="w4 h4 bgi15 rad50"></span></span>
                        <span class="mr5"></span>
                        <span class="bob-i15-1 pb5 cursor" @click.stop="handleClick('params', vvv)">{{ vvv.deviceName }}</span>
                      </div>
                      <div class="flex-col i15 mt10 pl15" v-for="(vvvv, iiii) in !isNull(vvv.stepCmdList)?vvv.stepCmdList:[]" :key="iiii">
                        <span>{{ vvvv.deviceCode }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- svg -->
          <div class="flex4 hh100 flex-col hidden ba1 p15 relative ml15">
            <div class="fw f16 absolute t15 l15">svg图</div>
            <div ref="refSvgGraph" class="ww100 hh100"></div>
          </div>
        </div>
      </div>
      <!-- <div v-else class="ww100 hh100 flex-cc hidden relative white p15 f20">暂无</div> -->
       <FrontParams ref="frontParamsRef"/>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
  import Hammer from 'hammerjs'
  import svgPanZoom from 'svg-pan-zoom'
  import { Refresh, Search,Plus } from '@element-plus/icons-vue'
  import api from '@/api'
  const { proxy }:any = getCurrentInstance()
  const publicStore = proxy.publicStore()
  const configStore = proxy.configStore()
  const refSvgGraph = ref(null)
  let mElSvgGraph
  let elSvg
  let minZoom = $ref(0.2)
  let maxZoom = $ref(10)
  let zoomAtPointScale = ref(1)
  let screenCenterScale = ref(2)
  let instancePanZoom
  let frontParamsRef = $ref()
  const state = reactive({
    ...publicStore.$state,
    iframe: ''
  })

  const props = defineProps({
    state: {
      type: [Object, Array],
      default: ()=>{return {}}
    },
  })
  // const emit = defineEmits(['init'])

  // 弹窗
  const onVisable = async (val?: any) => {
    mElSvgGraph = ''
    state.data = {}
    state.isFalse = !state.isFalse
    if(!state.isFalse) return
    state.title = val&&val.schemeName?val.schemeName:'暂无'
    state.active = {...val}
    // state.iframe = `http://${publicStore.link.ip}:${publicStore.link.port}/#/scheme/runScheme/${val.id}?name=base`
    init()
  }

  const init = async() => {
    state.loading = true
    const query = `id=${state.active.id}`
    const params = {ip: publicStore.link.ip, port: publicStore.link.port, url: `/api/v1/vpp/detailScheme?${query}`, method: 'GET'}
    const res = await publicStore.http({httpApi: params})
    state.loading = false
    state.data = !proxy.isNull(res) && !proxy.isNull(res.data)? res.data : {}
    if(!proxy.isNull(state.data) && !proxy.isNull(state.data.schemeStepList)){
      if(!proxy.isNull(state.data.devConf)){
        try {
          state.data.devConf = JSON.parse(state.data.devConf)
          const maxstepIndex = Math.max(...state.data.schemeStepList.filter(item => item.stepStage === 1).map(item => item.stepIndex))
          if(maxstepIndex != -1) {
            let temp = {"id": "zdy","stepIndex": maxstepIndex + 1, "stepName": "设备参数设置", "stepStage": 1, "stepStageName": "台区设备初始状态", "chooseList": []}
            if(!proxy.isNull(state.data.devConf)){
              Object.entries(state.data.devConf).forEach(([key, value]) => {
                // console.log("---", key, value)
                if(value instanceof Array){
                  temp.chooseList = [{ "chooseId": "", "id": "", "stepId": "", "chooseName": value[0]['deviceCode'] + value[0]['deviceName'] }]
                }else{
                  temp.chooseList.push(value)
                }
              })
            }
            state.data.schemeStepList.push(temp)
          }
        } catch(e) {}
      }
      state.data.schemeStepList = groupAndSortSteps(state.data.schemeStepList)
      // console.log("state.data", state.data)
    }
    if(!proxy.isNull(state.data) && !proxy.isNull(state.data.svg)){
      let svg = decodeURIComponent(state.data.svg)
      if(svg){
        await nextTick()
        mElSvgGraph = refSvgGraph.value
        mElSvgGraph.innerHTML = svg
        elSvg = mElSvgGraph.getElementsByTagName('svg')[0]
        // console.log("elSvg---", elSvg)
        adjustToFreezeWidth(elSvg)
      }
    } else{
      svg = ''
      mElSvgGraph = ''
    }
  }

  const groupAndSortSteps = (data) => {
    // 先排序
    const sorted = [...data].sort((a, b) => 
        a.stepStage - b.stepStage || a.stepIndex - b.stepIndex
    );
    
    // 使用 reduce 分组
    const groups = sorted.reduce((acc, item) => {
        const key = `${item.stepStage}_${item.stepStageName}`;
        
        if (!acc[key]) {
          acc[key] = {
              stepStage: item.stepStage,
              stepStageName: item.stepStageName,
              childs: []
          };
        }
        
        acc[key].childs.push({
          stepIndex: item.stepIndex,
          stepName: item.stepName,
          chooseList: item.chooseList,
          id: item.id
        });
        
        return acc;
    }, {});
    // 转换为数组并确保按 stepStage 排序
    return Object.values(groups).sort((a, b) => a.stepStage - b.stepStage);
  }

  // 事件
  const handleClick = async(remark, val, index?: any) => {
    if(remark == 'params'){
      frontParamsRef.onVisable(val)
    }
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
            // Halt all touch events
            haltEventListeners: ['touchstart', 'touchend', 'touchmove', 'touchleave', 'touchcancel']

            // Init custom events handler
            , init: function (options) {
                instancePanZoom = options.instance;
                panZoomSizes = instancePanZoom.getSizes();
                // console.log('init panZoom')
                // console.log(panZoomSizes)

                /**
                 * 自定义鼠标事件
                 */
                // Hammer.inherit(Hammer.MouseInput, Hammer.Input, {
                //     handler: (evt) => {
                //         if (!evtEnableLongClickDevice) {
                //             return;
                //         }
                //         let eventType = MOUSE_INPUT_MAP[evt.type];
                //         if (eventType & Hammer.INPUT_START && evt.button === 2) {
                //             isLongClick = true;
                //         }

                //         if (eventType & Hammer.INPUT_MOVE && evt.which !== 3) {
                //             eventType = Hammer.INPUT_END;
                //         }

                //         if (!isLongClick) {
                //             return;
                //         }

                //         if (eventType & Hammer.INPUT_END) {
                //             isLongClick = false;
                //             console.log("svg设备激动右键", evt)
                //             _hammerPressNode(evt);
                //         }
                //     }
                // });

                // Init Hammer
                this.hammer = Hammer(options.svgElement, {
                    // inputClass: Hammer.SUPPORT_POINTER_EVENTS ? Hammer.MouseInput : Hammer.TouchInput
                    inputClass: Hammer.TouchMouseInput
                })

                // Handle double tap
                // this.hammer.on('doubletap', function () {
                //     instanceZoom.zoomOut()
                // })

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
                // this.hammer.on('press', (evt) => {
                //     console.log(evt);
                //     if (!evtEnableLongClickDevice) {
                //         return;
                //     }
                //     _hammerPressNode(evt);
                // });
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

  // 暴露
  defineExpose({
    onVisable
  })
</script>

<style lang="scss" scoped>
  :deep(.el-dialog){
    border-radius: 0;
  }
  :deep(.el-dialog__header){
    border-radius: 0;
  }
  :deep(.el-dialog__body){
    padding: 0;
    height: calc(100% - 60px);
  }
</style>