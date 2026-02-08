<template>
  <div class="dashboard-container">
    <!-- 🔹 顶部统计卡片行 -->
    <div class="stats-row">
      <div class="stat-col">
        <div class="stat-card">
          <div class="stat-icon user-icon"></div>
          <div class="stat-info">
            <div class="stat-title">接入用户总数</div>
            <div class="stat-value">{{ statsData.userCount }}<span class="stat-suffix">个</span></div>
          </div>
        </div>
      </div>
      <div class="stat-col">
        <div class="stat-card">
          <div class="stat-icon load-icon"></div>
          <div class="stat-info">
            <div class="stat-title">实时总负荷</div>
            <div class="stat-value">{{ statsData.realTimeLoad }}<span class="stat-suffix">kW</span></div>
          </div>
        </div>
      </div>
      <div class="stat-col">
        <div class="stat-card">
          <div class="stat-icon device-icon"></div>
          <div class="stat-info">
            <div class="stat-title">设备总数</div>
            <div class="stat-value">{{ statsData.deviceCount }}<span class="stat-suffix">个</span></div>
          </div>
        </div>
      </div>
      <div class="stat-col">
        <div class="stat-card">
          <div class="stat-icon capacity-icon"></div>
          <div class="stat-info">
            <div class="stat-title">当前可调容量</div>
            <div class="stat-value">{{ statsData.adjustCapacity }}<span class="stat-suffix">kW</span></div>
          </div>
        </div>
      </div>
      <div class="stat-col">
        <div class="stat-card">
          <div class="stat-icon online-icon"></div>
          <div class="stat-info">
            <div class="stat-title">设备在线率</div>
            <div class="stat-value">{{ statsData.onlineRate }}<span class="stat-suffix">%</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图表与数据表格行 -->
    <div class="content-row">
      <!-- 总负荷曲线 -->
      <div class="chart-col large">
        <div class="chart-card">
          <div class="chart-title">总负荷曲线</div>
          <div ref="loadChartRef" class="chart-container"></div>
        </div>
      </div>

      <!-- 用户负荷排名 -->
      <div class="chart-col medium">
        <div class="chart-card">
          <div class="chart-title">用户负荷排名</div>
          <div ref="rankChartRef" class="chart-container"></div>
        </div>
      </div>
    </div>

    <!-- 交易与市场需求行 -->
    <div class="content-row">
      <!-- 进行中的交易 -->
      <div class="table-col large">
        <div class="data-card">
          <div class="card-title">进行中的交易</div>
          <el-table :data="transactionData" border style="width: 100%">
            <el-table-column prop="tradeNo" label="交易编号" />
            <el-table-column prop="responseDate" label="响应日期" />
            <el-table-column prop="responseTime" label="响应时段" />
            <el-table-column prop="demandType" label="需求类型" />
            <el-table-column prop="applyCap" label="申报容量(kW)" />
            <el-table-column prop="winCap" label="中标容量(kW)" />
            <el-table-column prop="status" label="状态" />
            <el-table-column label="操作">
              <template #default>
                <el-button type="text">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!-- 市场需求 -->
      <div class="table-col medium">
        <div class="data-card">
          <div class="card-title">市场需求 <span class="more">更多</span></div>
          <div class="demand-list">
            <div class="demand-item" v-for="item in demandData" :key="item.id">
              <div class="demand-id">交易ID {{ item.id }}</div>
              <div class="demand-cap">需求容量: {{ item.capacity }}kW</div>
              <div class="demand-time">需求时段: {{ item.timePeriod }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts'

// 🔹 模拟数据
const statsData = ref({
  userCount: 12,
  realTimeLoad: 274,
  deviceCount: 198,
  adjustCapacity: 198,
  onlineRate: 95
})

const loadChartRef = ref(null)
const rankChartRef = ref(null)
let loadChart = null
let rankChart = null

// 负荷曲线数据
const loadChartData = {
  xAxis: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
  series: [
    { name: '昨日负荷', data: [35, 50, 25, 40, 65, 55, 70] },
    { name: '今日负荷', data: [30, 45, 20, 35, 60, 50, 75] }
  ]
}

// 用户排名数据
const rankChartData = {
  xAxis: ['302kW', '321kW', '350kW', '367kW', '398kW', '432kW', '457kW'],
  yAxis: ['用户7', '用户6', '用户5', '用户4', '用户3', '用户2', '用户1'],
  data: [302, 321, 350, 367, 398, 432, 457],
  colors: ['#8392A5', '#8392A5', '#8392A5', '#409EFF', '#E6A23C', '#E6A23C', '#F56C6C']
}

// 交易表格数据
const transactionData = ref([
  { id: 1, tradeNo: 23245, responseDate: '2025-10-11', responseTime: '10:00-12:00', demandType: '填谷', applyCap: 43.00, winCap: 43.00, status: '带出错(市场)' },
  { id: 2, tradeNo: 23245, responseDate: '2025-10-11', responseTime: '10:00-12:00', demandType: '填谷', applyCap: 43.00, winCap: 43.00, status: '待执行' },
  { id: 3, tradeNo: 23245, responseDate: '2025-10-11', responseTime: '10:00-12:00', demandType: '填谷', applyCap: 43.00, winCap: 43.00, status: '正在执行' },
  { id: 4, tradeNo: 23245, responseDate: '2025-10-11', responseTime: '10:00-12:00', demandType: '填谷', applyCap: 43.00, winCap: 43.00, status: '执行完成' },
  { id: 5, tradeNo: 23245, responseDate: '2025-10-11', responseTime: '10:00-12:00', demandType: '填谷', applyCap: 43.00, winCap: 43.00, status: '执行完成' },
  { id: 6, tradeNo: 23245, responseDate: '2025-10-11', responseTime: '10:00-12:00', demandType: '填谷', applyCap: 43.00, winCap: 43.00, status: '执行完成' }
])

// 市场需求数据
const demandData = ref([
  { id: 'JY45234165', capacity: 350000, timePeriod: '2026-02-01 10:00-12:00' },
  { id: 'JY123452565', capacity: 350000, timePeriod: '2026-02-01 10:00-12:00' },
  { id: 'JY123452565', capacity: 350000, timePeriod: '2026-02-01 10:00-12:00' }
])

// 🔹 初始化图表
const initCharts = () => {
  // 总负荷曲线
  if (loadChartRef.value) {
    loadChart = echarts.init(loadChartRef.value)
    loadChart.setOption({
      tooltip: { trigger: 'axis' },
      legend: { data: ['昨日负荷', '今日负荷'], top: 0 },
      xAxis: { type: 'category', data: loadChartData.xAxis },
      yAxis: { type: 'value', name: 'kW' },
      series: [
        { name: '昨日负荷', type: 'line', data: loadChartData.series[0].data, lineStyle: { color: '#909399' } },
        { name: '今日负荷', type: 'line', data: loadChartData.series[1].data, lineStyle: { color: '#409EFF' } }
      ]
    })
  }

  // 用户负荷排名
  if (rankChartRef.value) {
    rankChart = echarts.init(rankChartRef.value)
    rankChart.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      xAxis: { type: 'value', boundaryGap: [0, 0.01] },
      yAxis: { type: 'category', data: rankChartData.yAxis },
      series: [
        {
          name: '负荷',
          type: 'bar',
          data: rankChartData.data,
          itemStyle: {
            color: (params) => rankChartData.colors[params.dataIndex]
          }
        }
      ]
    })
  }
}

// 🔹 自适应窗口
const resizeCharts = () => {
  loadChart?.resize()
  rankChart?.resize()
}

onMounted(() => {
  initCharts() // 取消注释，初始化图表
  window.addEventListener('resize', resizeCharts)
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCharts)
  loadChart?.dispose()
  rankChart?.dispose()
})
</script>

<style scoped>
.dashboard-container {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.stats-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  height: 100px;
}

.stat-col {
  flex: 1;
  min-width: 160px;
}

.stat-card {
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

/* 图标统一尺寸 */
.stat-icon {
  width: 24px;
  height: 24px;
  margin-right: 12px;
  background-size: contain;
  background-repeat: no-repeat;
}

.user-icon { background-image: url(../../../../assets/imgs/user.png); }
.load-icon { background-image: url(../../../../assets/imgs/load.png); }
.device-icon { background-image: url(../../../../assets/imgs/device.png); }
.capacity-icon { background-image: url(../../../../assets/imgs/capacity.png); }
.online-icon { background-image: url(../../../../assets/imgs/online.png); }

.stat-info {
  flex: 1;
}

.stat-title {
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.stat-suffix {
  font-size: 12px;
  font-weight: normal;
  color: #999;
  margin-left: 2px;
}

/* 图表与表格布局 */
.content-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.chart-col {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.chart-col.large {
  flex: 2;
  min-width: 400px;
}

.chart-col.medium {
  flex: 1;
  min-width: 300px;
}

.table-col {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 15px;
}

.table-col.large {
  flex: 2;
  min-width: 500px;
}

.table-col.medium {
  flex: 1;
  min-width: 300px;
}

.chart-title, .card-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  color: #333;
}

.chart-container {
  width: 100%;
  height: 250px;
}

.data-card {
  height: 100%;
}

.more {
  font-size: 14px;
  color: #409EFF;
  float: right;
  cursor: pointer;
}

.demand-list {
  margin-top: 10px;
}

.demand-item {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.demand-item:last-child {
  border-bottom: none;
}

.demand-id {
  font-weight: bold;
  margin-bottom: 4px;
}

.demand-cap, .demand-time {
  font-size: 14px;
  color: #666;
}
</style>