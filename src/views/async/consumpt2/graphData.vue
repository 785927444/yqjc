<template>
    <div class="hh100 ww100 flex-col-ss" style="background: #000">
       <div class="ww100 hh100" ref="refSvgGraph"></div>
    </div>
</template>
  
  <script lang="ts" setup>
    import axios from 'axios'
    import Hammer from 'hammerjs'
    import svgPanZoom from 'svg-pan-zoom'
    import svgData from '@/assets/imgs/g.svg'
    let mElSvgGraph
    let elSvg
    let minZoom = $ref(0.2)
    let maxZoom = $ref(10)
    let zoomAtPointScale = ref(1)
    let screenCenterScale = ref(2)
    let instancePanZoom
    const refSvgGraph = ref()
    const { proxy }:any = getCurrentInstance()
    const publicStore = proxy.publicStore()
    const state = reactive({
        ...publicStore.$state,
        refPanZoom:null,
    })
    
    onMounted(async() => {
        initData(refSvgGraph.value);
    })

    const initData = async(el) => {
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
   
  <style scoped lang="scss">
  
  </style>
  