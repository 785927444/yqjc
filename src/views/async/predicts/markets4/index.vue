<template>
  <div class="layout-col plr15 pb15">
    <div class="flex-sc ww100 mb15">
      <div class="ptb5 plr15 rad3 cursor mr15" :class="activeTab === 'config'? 'bgi16' : 'ba2'" @click="activeTab = 'config'"> 参数生成 </div>
      <div class="ptb5 plr15 rad3 cursor mr15" :class="activeTab === 'generate'? 'bgi16' : 'ba2'" @click="activeTab = 'generate'"> 配置参数 </div>
    </div>
      
    <div v-show="activeTab === 'generate'" class="layout-col">
      <!-- 标题 -->
      <div class="h40 ww100 flex-sc relative mb10">
        <img class="hh100" src="@/assets/imgs/title4.png" />
        <div class="ww100 hh100 flex-sc absolute pl35">
          <span class="fw flex1 ptb5">光伏储能系统配置参数</span>
          <div class="flex-ec flex1 hh100">
            <el-button type="primary"  @click="saveConstraints">
              保存配置
            </el-button>
            <el-button class="reset-button"  @click="refreshData">
              重置修改 
            </el-button>
          </div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="flex1 ww100 flex-col ptb20 pl20 ba1 relative">
        <div class="ww100 flex-col-ss">
          <div class="fw f18 pb15 pr25">
            <span class="bob-i15-2 pb5">光伏系统配置</span>
          </div>
          <div class=" flex-col ww100">
            <div class="ww100 flex-ss">
              <div class="flex1 pr15">
                <span>光伏系统单位造价（元/kW）：</span>
                <el-input class="mt5" v-model="state.constraints.capital_cost_pv"  placeholder="请输入" />
              </div>
              <div class="flex1 pr15">
                <span>光伏系统运维成本（元/kWh）：</span>
                <el-input class="mt5" v-model="state.constraints.operational_cost_pv"  placeholder="请输入" />
              </div>
              <div class="flex1 pr15">
                <span>可用安装面积（㎡）：</span>
                <el-input class="mt5" v-model="state.constraints.area_available"  placeholder="请输入" />
              </div>
              <div class="flex1 pr15">
                <span>单块光伏组件占地面积（㎡/块）：</span>
                <el-input class="mt5" v-model="state.constraints.panel_area"  placeholder="请输入" />
              </div>
            </div>
            <div class="ww100 flex-ss mt10">
              <div class="flex1 pr15">
                <span>光伏组件功率（kW/块）：</span>
                <el-input class="mt5" v-model="state.constraints.panel_power"  placeholder="请输入"/>
              </div>
              <div class="flex1 pr15">
                <span>最大售电比例-光伏发电量比例：</span>
                <el-input class="mt5" v-model="state.constraints.max_export_fraction"  placeholder="请输入"/>
              </div>
              <div class="flex1 pr15">
                <span>项目生命周期（年）：</span>
                <el-input class="mt5" v-model="state.constraints.project_lifetime"  placeholder="请输入"/>
              </div>
              <div class="flex1 pr15">
                <span>电网供电碳排放强度（kg/kWh）：</span>
                <el-input class="mt5" v-model="state.constraints.grid_carbon_intensity"  placeholder="请输入"/>
              </div>
            </div>
          </div>
        </div>

        <div class="ww100 flex-col-ss pt20">
          <div class="fw f18 pb15 pr25">
            <span class="bob-i15-2 pb5">储能系统配置</span>
          </div>
          <div class=" flex-col ww100">
            <div class="ww100 flex-ss">
              <div class="flex1 pr15">
                <span>储能电池单位造价（元/kWh）：</span>
                <el-input class="mt5" v-model="state.constraints.capital_cost_battery"  placeholder="请输入" />
              </div>
              <div class="flex1 pr15">
                <span>储能电池运维成本（元/kWh）：</span>
                <el-input class="mt5" v-model="state.constraints.operational_cost_battery"  placeholder="请输入" />
              </div>
              <div class="flex1 pr15">
                <span>电池最大配置容量（kWh）：</span>
                <el-input class="mt5" v-model="state.constraints.max_battery_size"  placeholder="请输入" />
              </div>
              <div class="flex1 pr15">
                <span>电池使用寿命（年）：</span>
                <el-input class="mt5" v-model="state.constraints.battery_lifetime"  placeholder="请输入" />
              </div>
            </div>
            <div class="ww100 flex-ss mt10">
              <div class="flex1 pr15">
                <span>电池充电效率（%）：</span>
                <el-input class="mt5" v-model="state.constraints.charging_efficiency"  placeholder="请输入"/>
              </div>
              <div class="flex1 pr15">
                <span>电池放电效率（%）：</span>
                <el-input class="mt5" v-model="state.constraints.discharging_efficiency"  placeholder="请输入"/>
              </div>
              <div class="flex1 pr15"></div>
              <div class="flex1 pr15"></div>
            </div>
          </div>
        </div>
       
        <div class="ww100 flex1 flex-col-ss pt20">
          <div class="fw f18 pb15 pr25">
            <span class="bob-i15-2 pb5">电价与时段配置</span>
          </div>
          <div class="flex-col flex1 ww100">
            <div class="ww100 flex-ss">
              <div class="flex1 pr15">
                <span>谷段电价（元/kWh）：</span>
                <el-input class="mt5" v-model="state.constraints.valley_price"  placeholder="请输入" />
              </div>
              <div class="flex1 pr15">
                <span>售电电价-向电网售电（元/kWh）：</span>
                <el-input class="mt5" v-model="state.constraints.export_price"  placeholder="请输入" />
              </div>
              <div class="flex1 pr15">
                <span>平段电价（元/kWh）：</span>
                <el-input class="mt5" v-model="state.constraints.base_price"  placeholder="请输入" />
              </div>
              <div class="flex1 pr15">
                <span>峰段电价（元/kWh）：</span>
                <el-input class="mt5" v-model="state.constraints.peak_price"  placeholder="请输入" />
              </div>
            </div>
            <div class="ww100 flex-ss mt10">
              <div class="flex1 pr15">
                <div class="ww100 flex-bc">
                  <span>峰段时段（h）：</span>
                  <span class="flex-cc plr10 ptb6 ba2 rad3 f14 cursor" @click.stop="addNewPeakRange">
                  <i-ep-plus class="f12 white mr2" />增加</span>
                </div>
                <div class="mt5 h50x3 ww100 overlay">
                  <div v-for="(range, index) in peakTimeRanges" :key="index" class="mb10 flex-sc">
                    <el-time-picker
                      class="flex1"
                      is-range
                      arrow-control
                      v-model="peakTimeRanges[index]"
                      range-separator="-"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围"
                      @change="updatePeakHours"
                      value-format="HH:mm"
                      format="HH:mm"
                    >
                    </el-time-picker>
                    <span class="flex-cc plr10 ptb6 bgi8 rad3 f14 cursor ml10" @click.stop="removePeakRange(index)">
                    <i-ep-delete class="f12 white mr2" />删除</span>
                  </div>
                </div>
              </div>
              <div class="flex1 pr15">
                <div class="ww100 flex-bc">
                  <span>谷段时段（h）：</span>
                  <span class="flex-cc plr10 ptb6 ba2 rad3 f14 cursor" @click.stop="addNewValleyRange">
                  <i-ep-plus class="f12 white mr2" />增加</span>
                </div>
                <div class="mt5 h50x3 ww100 overlay">
                  <div v-for="(range, index) in valleyTimeRanges" :key="index" class="mb10 flex-sc">
                    <el-time-picker
                      class="flex1"
                      is-range
                      arrow-control
                      v-model="valleyTimeRanges[index]"
                      range-separator="-"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围"
                      @change="updateValleyHours"
                      value-format="HH:mm"
                      format="HH:mm"
                    ></el-time-picker>
                    <span class="flex-cc plr10 ptb6 bgi8 rad3 f14 cursor ml10" @click.stop="removeValleyRange(index)">
                    <i-ep-delete class="f12 white mr2" />删除</span>
                  </div>
                </div>
              </div>
              <div class="flex1 pr15">
                <div class="ww100 flex-bc pr15">
                  <span>正常时段（h）：</span>
                  <span class="flex-cc h26 rad3 f14 cursor h10"></span>
                </div>
                <div class="mt10">
                  <div v-for="(range, index) in baseTimeRanges" :key="index" class="mb10 flex-sc">
                    <el-time-picker
                      is-range
                      arrow-control
                      v-model="baseTimeRanges[index]"
                      range-separator="-"
                      start-placeholder="开始时间"
                      end-placeholder="结束时间"
                      placeholder="选择时间范围"
                      @change="updatePeakHours"
                      value-format="HH:mm"
                      format="HH:mm"
                    >
                    </el-time-picker>
                  </div>
                </div>
              </div>
              <div class="flex1 pr15"></div>
            </div>
          </div>
        </div>
       
      </div>
    </div>
    
    <div v-show="activeTab === 'config'" class="layout-col">

      <div class="ww100 p15 flex-sc ba1 hidden">
        <span class="generate-text">年用电量（kWh）：</span>
        <el-input class="w100x2 mlr10" placeholder="请输入" v-model="targetAnnualLoad" />
        <div class="plr10 ptb5 rad3 bgi1 cursor" @click="calculateLoad">一键生成</div>
      </div>

      <div class="ww100 flex-sc hidden mt15">
        <div class="layout-row mb10">
          <div class="ww1428 hidden pr15">
            <div class="ww100 bs1 flex-sc pt15 pb5 pl15">
                <img class="" src="@/assets/imgs/guangfu.png"  alt="光伏图标">
                <div class="ml15 flex-col-ss flex1">
                  <span>最优光伏装机容量</span>
                  <div class="mt5">
                    <span class="fw f16">{{ Math.floor(100*(state.generationResults.pv_size))/100 || '0' }}</span>
                    <span class="ml2">kW</span>
                  </div>
                </div>
            </div>
          </div>
          <div class="ww1428 hidden pr15">
            <div class="ww100 bs1 flex-sc pt15 pb5 pl15">
                <img class="" src="@/assets/imgs/chuneng.png"  alt="光伏图标">
                <div class="ml15 flex-col-ss flex1">
                  <span>最优储能电池容量</span>
                  <div class="mt5">
                    <span class="fw f16">{{ Math.floor(100*(state.generationResults.battery_size))/100 || '0' }}</span>
                    <span class="ml2">kW</span>
                  </div>
                </div>
            </div>
          </div>
          <div class="ww1428 hidden pr15">
            <div class="ww100 bs1 flex-sc pt15 pb5 pl15">
                <img class="" src="@/assets/imgs/touzi.png"  alt="光伏图标">
                <div class="ml15 flex-col-ss flex1">
                  <span>初始投资额</span>
                  <div class="mt5">
                    <span class="fw f16">{{ Math.floor(100*(state.generationResults.initial_investment))/100 || '0' }}</span>
                    <span class="ml2">元</span>
                  </div>
                </div>
            </div>
          </div>
          <div class="ww1428 hidden pr15">
            <div class="ww100 bs1 flex-sc pt15 pb5 pl15">
                <img class="" src="@/assets/imgs/niandu.png"  alt="光伏图标">
                <div class="ml15 flex-col-ss flex1">
                  <span>年度能源成本节约额</span>
                  <div class="mt5">
                    <span class="fw f16">{{ Math.floor(100*(state.generationResults.annual_savings))/100 || '0' }}</span>
                    <span class="ml2">元</span>
                  </div>
                </div>
            </div>
          </div>
          <div class="ww1428 hidden pr15">
            <div class="ww100 bs1 flex-sc pt15 pb5 pl15">
                <img class="" src="@/assets/imgs/huishou.png"  alt="光伏图标">
                <div class="ml15 flex-col-ss flex1">
                  <span>投资回收期</span>
                  <div class="mt5">
                    <span class="fw f16">{{ Math.floor(100*(state.generationResults.payback_period))/100 || '0' }}</span>
                    <span class="ml2">年</span>
                  </div>
                </div>
            </div>
          </div>
          <div class="ww1428 hidden pr15">
            <div class="ww100 bs1 flex-sc pt15 pb5 pl15">
                <img class="" src="@/assets/imgs/jingxian.png"  alt="光伏图标">
                <div class="ml15 flex-col-ss flex1">
                  <span>净现值</span>
                  <div class="mt5">
                    <span class="fw f16">{{ Math.floor(100*(state.generationResults.npv))/100 || '0' }}</span>
                    <span class="ml2">元</span>
                  </div>
                </div>
            </div>
          </div>
          <div class="ww1428 hidden pr15">
            <div class="ww100 bs1 flex-sc pt15 pb5 pl15">
                <img class="" src="@/assets/imgs/nian.png"  alt="光伏图标">
                <div class="ml15 flex-col-ss flex1">
                  <span>年碳减排量</span>
                  <div class="mt5">
                    <span class="fw f16">{{ Math.floor(100*(state.generationResults.yearly_carbon_reduction))/100 || '0' }}</span>
                    <span class="ml2">t</span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-bc flex4 ww100 hidden">
        <c1 class="flex1 hidden mr10" />
        <r2 class="flex1 hidden ml10" />
        <l2 class="flex1 hidden ml10" />
      </div>
      <r1 class="flex5 ww100 hidden mt15" />
    </div>
  </div>
</template>
 
<script lang="ts" setup>
import r2 from './r2'
import c1 from './c1'
import r1 from './r1.vue'
import l2 from './l2.vue'
import ec from "@/utils/chart";
const { drawChart } = ec();
const { proxy }: any = getCurrentInstance();
const publicStore = proxy.publicStore();
const configStore = proxy.configStore();
const state = reactive({
  ...publicStore.$state,
  constraints: {
    capital_cost_pv: 0,
    capital_cost_battery: 0,
    operational_cost_pv: 0,
    operational_cost_battery: 0,
    base_price: 0,
    peak_price: 0,
    valley_price: 0,
    export_price: 0,
    grid_carbon_intensity: 0,
    area_available: 0,
    panel_power: 0,
    panel_area: 0,
    max_battery_size: 0,
    charging_efficiency: 0,
    discharging_efficiency: 0,
    project_lifetime: 0,
    discount_rate: 0,
    battery_lifetime: 0,
    max_export_fraction: 0,
    peak_hours: [],
    valley_hours: [],
    base_hours: [],
  },
  generationResults: {
    pv_size: 0,         
    battery_size: 0,    
    initial_investment: 0, 
    annual_savings: 0,   
    payback_period: 0,   
    npv: 0,             
    yearly_carbon_reduction: 0,
    PV_Production: 0,
    Direct_PV_Consumption: 0,
    Grid_Export: 0,
    Battery_Charging: 0,
    Battery_Discharging: 0,
    Battery_Losses: 0
  }
});

const targetAnnualLoad = ref('100000');
const activeTab = ref('config')
const peakTimeRanges = ref([]);
const valleyTimeRanges = ref([]);
const baseTimeRanges = ref([]);

const convertHoursToRanges = (hours: number[]) => {
  if (!hours || hours.length === 0) return [];
  const normalizedHours = hours.map(normalizeHour);
  const sortedHours = [...new Set(normalizedHours)].sort((a, b) => a - b);
  const ranges = [];
  let start = sortedHours[0];
  let end = start;
  for (let i = 1; i < sortedHours.length; i++) {
    if (sortedHours[i] === end + 1) {
      end = sortedHours[i];
    } else {
      ranges.push([start, end]);
      start = sortedHours[i];
      end = start;
    }
  }
  ranges.push([start, end]);
  return ranges.map(range => {
    return [
      `${formatHour(range[0]).toString().padStart(2, '0')}:00`,
      `${formatHour(range[1]).toString().padStart(2, '0')}:00`
    ];
  });
};

const convertRangesToHours = (ranges: string[][]) => {
  const hours = [];
  ranges.forEach(range => {
    if (!range || range.length < 2) return;
      const startHour = normalizeHour(parseInt(range[0].split(':')[0]));
      const endHour = normalizeHour(parseInt(range[1].split(':')[0]));
    if (endHour < startHour) {
      for (let h = startHour; h < 24; h++) hours.push(h);
      for (let h = 0; h <= endHour; h++) hours.push(h);
    } else {
      for (let h = startHour; h <= endHour; h++) hours.push(h);
    }
  });
  return [...new Set(hours)].sort((a, b) => a - b);
};

const calcRate = (partValue, totalValue) => {
  if (totalValue === 0 || isNaN(partValue) || isNaN(totalValue)) { return '0%';}
  const rate = Math.floor((partValue / totalValue) * 10000) / 100;
  return `${rate}%`;
};
 
onMounted(async () => {
  await getData()
  await calculateLoad()
  peakTimeRanges.value  = convertHoursToRanges(state.constraints.peak_hours)  || [];
  valleyTimeRanges.value = convertHoursToRanges(state.constraints.valley_hours)  || [];
  updateBaseTimeRanges();
})

// 监听时间段变化
watch(peakTimeRanges, (newRanges) => {
  state.constraints.peak_hours = convertRangesToHours(newRanges);
  updateBaseTimeRanges();
}, { deep: true });

watch(valleyTimeRanges, (newRanges) => {
  state.constraints.valley_hours = convertRangesToHours(newRanges);
  updateBaseTimeRanges();
}, { deep: true });

watch(baseTimeRanges, (newRanges) => {
  state.constraints.base_hours = convertRangesToHours(newRanges);
}, { deep: true });


const addNewPeakRange = () => {
  const getAllFreeHours = () => {
    const allHours = Array.from({ length: 24 }, (_, i) => i);
    const occupiedHours = state.constraints.peak_hours.map(normalizeHour);
    const uniqueOccupied = [...new Set(occupiedHours)].sort((a, b) => a - b);
    return allHours.filter(hour => !uniqueOccupied.includes(hour)).sort((a, b) => a - b);
  };
  const getFirstAvailable1HourRange = () => {
    const freeHours = getAllFreeHours();
    if (freeHours.length === 0) return null;
    const firstFree = freeHours[0];
    const nextHour = firstFree + 1 === 24 ? 0 : firstFree + 1;
    return [
      `${firstFree.toString().padStart(2, '0')}:00`,
      `${nextHour.toString().padStart(2, '0')}:00`
    ];
  };

  const defaultRange = getFirstAvailable1HourRange();
  if (!defaultRange) {
    ElMessage.warning('已无可用的峰段时段可添加');
    return;
  }
  
  if (isRangeOverlap(defaultRange, peakTimeRanges.value)) {
    ElMessage.warning('新增时段与已有峰段时段重叠，请选择其他时段');
    return;
  }
  
  peakTimeRanges.value.push(defaultRange);
};


const isRangeOverlap = (newRange: string[], existingRanges: string[][]) => {
  if (!newRange || newRange.length < 2 || newRange.some(item => !item || item.trim() === '')) {
    return false;
  }
  const parseHour = (timeStr: string) => {
    const hour = parseInt(timeStr.split(':')[0]);
    return isNaN(hour) ? -1 : normalizeHour(hour);
  };
  const newStart = parseHour(newRange[0]);
  const newEnd = parseHour(newRange[1]);
  if (newStart === -1 || newEnd === -1) {
    return false;
  }
  for (const range of existingRanges) {
    if (!range || range.length < 2 || range.some(item => !item || item.trim() === '')) {
      continue;
    }
    const existStart = parseHour(range[0]);
    const existEnd = parseHour(range[1]);
    if (existStart === -1 || existEnd === -1) {
      continue;
    }
    if (newEnd > newStart) {
      if (existEnd > existStart) {
        if (!(newEnd <= existStart || newStart >= existEnd)) {
          return true;
        }
      } 
      else {
        if (newStart >= existStart || newEnd <= existEnd) {
          return true;
        }
      }
    }
    else {
      if (existEnd > existStart) {
        if (existStart >= newStart || existEnd <= newEnd) {
          return true;
        }
      }
      else {
        return true;
      }
    }
  }
  return false;
};

const addNewValleyRange = () => {
  const now = new Date();
  const nextHour = new Date(now.getTime()  + 60*60*1000);
  valleyTimeRanges.value.push([ 
    `${now.getHours().toString().padStart(2,  '0')}:00`,
    `${nextHour.getHours().toString().padStart(2,  '0')}:00`
  ]);
}

const calculateBaseHours = () => {
  const normalizedPeak = state.constraints.peak_hours.map(normalizeHour);
  const normalizedValley = state.constraints.valley_hours.map(normalizeHour);
  const combinedHours = [...new Set([...normalizedPeak, ...normalizedValley])];
  const allHours = Array.from({ length: 24 }, (_, i) => i);
  const baseHours = allHours.filter(hour => !combinedHours.includes(hour)).sort((a, b) => a - b);
  return baseHours;
};

const updateBaseTimeRanges = () => {
  const baseHours = calculateBaseHours();
  state.constraints.base_hours = baseHours;
  baseTimeRanges.value = convertHoursToRanges(baseHours);
};
const normalizeHour = (hour: number) => { return hour === 24 ? 0 : hour;};
const formatHour = (hour: number) => { return hour === 0 ? 24 : hour;};
const removePeakRange = (index) => { peakTimeRanges.value.splice(index,  1);};
const removeValleyRange = (index) => { valleyTimeRanges.value.splice(index,  1);};
const updatePeakHours = () => { state.constraints.peak_hours  = convertRangesToHours(peakTimeRanges.value); };
const updateValleyHours = () => { state.constraints.valley_hours = convertRangesToHours(valleyTimeRanges.value); }
const calculateLoad = async () => {
  if (!targetAnnualLoad.value  || Number(targetAnnualLoad.value)  <= 0) {
    ElMessage.error(' 请输入有效的年用电量值');
    return;
  }
  try {
    const targetLoad = Number(targetAnnualLoad.value); 
    let params = { ip: 'https://vpp.contron.com.cn', port: "8808", url: "/api/v1.0/p3000/cul", query: { target_annual_load: targetLoad }};
    let res = await publicStore.http({httpApi:  params})
    state.generationResults.Grid_Export = res.Grid_Export;
    state.generationResults.PV_Production = res.PV_Production,
    state.generationResults.Direct_PV_Consumption = res.Direct_PV_Consumption;
    console.log(res.PV_Production, res.Direct_PV_Consumption,res.Grid_Export, '打印res接口返回的内容')
    if (res) {
      let chart = [{name: '储能日充电量', code: 'Daily_Input', data: [['电池充电量',Math.floor(res.Battery_Charging*100)/100], ['电池放电量',Math.floor(res.Battery_Discharging*100)/100 ], ['电池损耗量', Math.floor(res.Battery_Losses*100)/100]]}]
      let devicesChart = [{name: '储能日充电量', code: 'Daily_Input', data: [['电网购电量',Math.floor(res.Grid_Import*100)/100], ['上网电量',Math.floor(res.Grid_Export*100)/100 ]]}]
      const lossValue = Math.max(0, res.PV_Production - res.Direct_PV_Consumption - res.Grid_Export);
      const pieChart = [
        { name: '光伏发电量', value: Math.floor(res.PV_Production * 100) / 100, color: '#54CFF3',rate: '100%',key: 'count_A',hideSector: true},
        { name: '光伏直接消耗电量', value: Math.floor(res.Direct_PV_Consumption * 100) / 100, color: '#3E6AE3',rate: calcRate(res.Direct_PV_Consumption, res.PV_Production),key: 'count_B'},
        { name: '上网电量', value: Math.floor(res.Grid_Export * 100) / 100, color: '#F9B74A', rate: calcRate(res.Grid_Export, res.PV_Production), key: 'count_C'},
        { name: '光伏损耗量', value: Math.floor(lossValue * 100) / 100, color: '#f11212',rate: calcRate(lossValue, res.PV_Production),key: 'count_D'}
      ];
      const npvChartData = res.v_npv.map(item => { return [`${item.year}年`, item.npv];});
      const LineChart = [{name: '净值（元）',data: npvChartData}];
      publicStore._public.actionData1 = [{name: '屋顶光伏出力',data: npvChartData}]
      publicStore._public.DevicesDailyOutput = chart
      publicStore._public.responsesRate2 = pieChart
      publicStore._public.actionData1 = LineChart
      publicStore._public.DevicesDailyInput = devicesChart
      state.generationResults.pv_size  = res.Optimal_PV_Size;
      state.generationResults.battery_size  = res.Optimal_Battery_Size;
      state.generationResults.initial_investment  = res.Initial_Investment;
      state.generationResults.annual_savings  = res.Annual_Energy_Cost_Savings;
      state.generationResults.payback_period  = res.Payback_Period;
      state.generationResults.npv  = res.Net_Present_Value;
      state.generationResults.yearly_carbon_reduction  = res.Yearly_Carbon_Reduction;
      await nextTick();
      // ElMessage.success(' 参数生成成功！');
    } else { ElMessage.error(' 未获取到有效数据');}
  } catch (error) { ElMessage.error(' 生成失败，请稍后重试');}
}
 
const getData = async () => {
  try {
    let params = { ip: 'https://vpp.contron.com.cn', port: "8808", url: "/api/v1.0/p3000/get"}
    let res = await publicStore.http({httpApi: params})
    if (res) { Object.assign(state.constraints,  res) }
    ElMessage.info(' 配置已刷新为最新数据')
  } catch (err) { console.error('API 请求错误:', err)}
}

const saveConstraints = async () => {
  try {
    const saveData = {
      capital_cost_pv: state.constraints.capital_cost_pv,
      capital_cost_battery: state.constraints.capital_cost_battery,
      operational_cost_pv: state.constraints.operational_cost_pv,
      operational_cost_battery: state.constraints.operational_cost_battery,
      base_price: state.constraints.base_price,
      peak_price: state.constraints.peak_price,
      valley_price: state.constraints.valley_price,
      export_price: state.constraints.export_price,
      grid_carbon_intensity: state.constraints.grid_carbon_intensity,
      area_available: state.constraints.area_available,
      panel_power: state.constraints.panel_power,
      panel_area: state.constraints.panel_area,
      max_battery_size: state.constraints.max_battery_size,
      charging_efficiency: state.constraints.charging_efficiency,
      discharging_efficiency: state.constraints.discharging_efficiency,
      project_lifetime: state.constraints.project_lifetime,
      discount_rate: state.constraints.discount_rate,
      battery_lifetime: state.constraints.battery_lifetime,
      max_export_fraction: state.constraints.max_export_fraction,
      peak_hours: state.constraints.peak_hours,
      valley_hours: state.constraints.valley_hours,
      base_hours: state.constraints.base_hours  
    };
    let params = {ip: 'https://vpp.contron.com.cn', port: "8808",url: "/api/v1.0/p3000/cfg",query: saveData };
    let res = await publicStore.http({  httpApi: params});
    await getData();
  } catch (err) {ElMessage.error(' 保存失败：' + err.message); }
};
 
const refreshData = async () => {
  try {
    let params = { ip: 'https://vpp.contron.com.cn', port: "8808", url: "/api/v1.0/p3000/def"}
    let res = await publicStore.http({httpApi: params})
    await getData()
  } catch (error) {}
}
</script>

<style lang="scss" scoped>
 .ww1428 {
  width: 14.28%;
 }
</style>