<template>
    <div class="layout-col">
        <!-- 标题 -->
        <aa-title title="总功率趋势">
            <template #right-content>
                <div class="ww100 flex-ec ml20">
                    <!-- <span class="plr10">时间</span>
                    <span class="w50x8">
                    <el-date-picker style="width:100%;" v-model="state.datetime" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss"
                        type="datetimerange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
                    </span> -->
                </div>
            </template>
        </aa-title>
        <!-- 图表 -->
        <div class="layout-col ba1">
            <div class="flex1 hh100 flex-col ptb10 pl10 pr20">
                <div class="hh100 ww100" id="Line_DevicesPower"></div>
            </div>
        </div>
        <!-- 底部 -->
        <aa-foot></aa-foot>
    </div>
</template>

<script setup lang="ts">
    import ec from "@/utils/chart";
    const { drawChart } = ec();
    const { proxy }: any = getCurrentInstance();
    const publicStore = proxy.publicStore();
    const state = reactive({
        ...publicStore.$state,
        content: [
        { width: 'w70',   show: true, align: 'center', key: '*', name: '序号' },
        { width: 'w50x3', show: true, align: 'left', key: 'name', name: '名称' },
        { width: 'flex1', show: true, align: 'right', key: 'Total_Power', name: '功率' }, 
        ],
    })

    watch(() => publicStore._public.DevicesPower, async(val, old) => {
        if(proxy.isNull(val)) return
        if(JSON.stringify(val) == JSON.stringify(old)) return
        await nextTick();
        setChart(val);
    }, { immediate: false, deep: true });

    const setChart = async(data) => {
        let chart = 'Line'
        let id = 'Line_DevicesPower'
        let attr = {
            min: 0, 
            // max: 100,
            extent: 4, 
            colorList: [{color: '#60E7FF', start: 'rgba(96, 231, 255, 1)', end: 'rgba(96, 231, 255, 0)'}],
            legendArr: [],
            legendShow: false,
            labelShow: false,
            areaShow: true,
            y_name: '数值',
            tool_dw: '', 
            tool_name_x: '日期：', 
            tool_name_y: '数值：', 
        }
        let series = {data: []}
        series = data.map(v => {
            attr.legendArr.push(v.name)
            let data = v.data
            return {data}
        })
        drawChart(chart, id, attr, {series: series, xAxis: {}}, {});
    }

    const handleClick = async(remark, val) => {
        if(remark == 'add' || remark == 'upd'){
        val.bayNum = publicStore.active.bayNum
        addRef.onVisable(val)
        }
        if(remark == 'del'){
        addRef.del(val)
        }
    }
</script>