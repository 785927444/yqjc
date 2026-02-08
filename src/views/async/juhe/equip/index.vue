<template>
  <div class="page-container">
    <!-- 顶部用户与概览卡片 -->
    <div class="header-section">
      <div class="user-info">
        <span class="user-label">用户1</span>
        <span class="user-id">TXDKLDAJFD</span>
        <el-tag size="small" type="success">在线</el-tag>
        <span class="update-time">更新时间：2025-10-25 11:00:00</span>
        <el-button type="text" icon="el-icon-user">查看</el-button>
        <el-button type="text" icon="el-icon-edit">编辑</el-button>
      </div>

      <div class="overview-cards">
        <el-card class="stat-card">
          <div class="card-label">设备总数</div>
          <div class="card-value">33个</div>
          <div class="card-sub">通信正常 12 个</div>
        </el-card>
        <el-card class="stat-card">
          <div class="card-label">接入总功率</div>
          <div class="card-value">33 W</div>
        </el-card>
        <el-card class="stat-card">
          <div class="card-label">可调负荷容量</div>
          <div class="card-value">27 kW</div>
        </el-card>
        <el-card class="stat-card">
          <div class="card-label">当前实时负荷</div>
          <div class="card-value">65 kW</div>
        </el-card>
      </div>
    </div>

    <!-- 历史用电量图表 -->
    <div class="chart-section">
      <div class="chart-header">
        <span class="chart-title">历史用电量</span>
        <el-radio-group v-model="timeRange" class="radio-group">
          <el-radio label="day">日</el-radio>
          <el-radio label="week">周</el-radio>
          <el-radio label="month">月</el-radio>
        </el-radio-group>
      </div>
      <div class="chart-container">
        <div id="electricityChart" style="width: 100%; height: 250px;"></div>
      </div>
    </div>

    <div class="history-response">历史响应</div>
    <div class="response-section">
      <!-- 左侧统计卡片 -->
      <div class="response-stats">
        <el-card class="stat-item">
          <div class="stat-label">总响应次数</div>
          <div class="stat-value">20 次</div>
        </el-card>
        <el-card class="stat-item success">
          <div class="stat-label">响应结束</div>
          <div class="stat-value">12 次</div>
        </el-card>
        <el-card class="stat-item processing">
          <div class="stat-label">正在响应</div>
          <div class="stat-value">3 次</div>
        </el-card>
        <el-card class="stat-item pending">
          <div class="stat-label">未响应</div>
          <div class="stat-value">3 次</div>
        </el-card>
        <el-card class="stat-item failed">
          <div class="stat-label">响应失败</div>
          <div class="stat-value">2 次</div>
        </el-card>
      </div>

      <!-- 右侧响应表格 -->
      <div class="response-table">
        <el-table :data="responseTableData" border style="width: 100%">
          <el-table-column prop="id" label="序号" width="60" />
          <el-table-column prop="deviceNo" label="响应编号" />
          <el-table-column prop="name" label="响应名称" />
          <el-table-column prop="date" label="响应日期" />
          <el-table-column prop="time" label="响应时段" />
          <el-table-column prop="type" label="需求类型" />
          <el-table-column prop="declareCap" label="申报容量(kW)" />
          <el-table-column prop="targetCap" label="中标容量(kW)" />
          <el-table-column prop="actualCap" label="实际相应容量(kW)" />
          <el-table-column prop="accuracy" label="响应准确率" />
          <el-table-column prop="profit" label="本次收益(Y)" />
          <el-table-column prop="status" label="状态" />
        </el-table>

        <!-- 分页 -->
        <div class="pagination">
          <span class="page-info">10 条/页</span>
          <el-pagination
            v-model:current-page="currentPage"
            :page-size="10"
            :total="220"
            layout="prev, pager, next, jumper, ->, total"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

// 时间范围切换
const timeRange = ref('day')

// 表格假数据
const responseTableData = ref([
  {
    id: 1,
    deviceNo: '23245',
    name: '响应标题',
    date: '2025-10-11',
    time: '10:00-12:00',
    type: '填谷',
    declareCap: '43.00',
    targetCap: '43.00',
    actualCap: '43.00',
    accuracy: '99.99%',
    profit: '26',
    status: '已结算'
  },
  {
    id: 2,
    deviceNo: '23245',
    name: '响应标题',
    date: '2025-10-11',
    time: '10:00-12:00',
    type: '填谷',
    declareCap: '43.00',
    targetCap: '43.00',
    actualCap: '/',
    accuracy: '/',
    profit: '/',
    status: '进行中'
  },
  {
    id: 3,
    deviceNo: '23245',
    name: '响应标题',
    date: '2025-10-11',
    time: '10:00-12:00',
    type: '填谷',
    declareCap: '43.00',
    targetCap: '/',
    actualCap: '/',
    accuracy: '/',
    profit: '/',
    status: '未中标'
  },
  {
    id: 4,
    deviceNo: '23245',
    name: '响应标题',
    date: '2025-10-11',
    time: '10:00-12:00',
    type: '填谷',
    declareCap: '43.00',
    targetCap: '43.00',
    actualCap: '43.00',
    accuracy: '99.99%',
    profit: '26',
    status: '已结算'
  },
  {
    id: 5,
    deviceNo: '23245',
    name: '响应标题',
    date: '2025-10-11',
    time: '10:00-12:00',
    type: '填谷',
    declareCap: '43.00',
    targetCap: '43.00',
    actualCap: '43.00',
    accuracy: '99.99%',
    profit: '26',
    status: '已结算'
  }
])

// 分页
const currentPage = ref(1)

// 初始化图表
onMounted(() => {
  const chartDom = document.getElementById('electricityChart')
  const myChart = echarts.init(chartDom)

  const option = {
    xAxis: {
      type: 'category',
      data: ['10-11', '10-12', '10-13', '10-14', '10-15', '10-16', '10-17'],
      axisLine: { show: false },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      max: 100,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { type: 'dashed' } }
    },
    series: [
      {
        data: [85, 60, 90, 70, 25, 60, 30],
        type: 'line',
        smooth: true,
        itemStyle: { color: '#69B1FF' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(105, 177, 255, 0.3)' },
            { offset: 1, color: 'rgba(105, 177, 255, 0)' }
          ])
        }
      }
    ],
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true }
  }

  myChart.setOption(option)
})
</script>

<style scoped>
.page-container {
  padding: 16px;
  background: #f5f7fa;
  min-height: 100vh;
}

.header-section {
  background: #fff;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #ebeef5;
}

.user-label {
  color: black;
  font-weight: bold;
}
.user-id {
  color: black;
}

.update-time {
  color: #909399;
  font-size: 12px;
}

.overview-cards {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.el-card {
  display: flex;
  align-items: center;
}

.stat-card {
  width: 263px;
  flex-direction: row;
  align-items: center;
  height: 42px;
  border-radius: 4px;
  opacity: 1;
  gap: 16px;
  background: linear-gradient(180deg, rgba(232, 242, 253, 0) 0%, #C4DCFF 100%);
}

.card-label {
  color: #909399;
  font-size: 14px;
  margin-left: 16px;
}

.card-value {
  font-size: 13px;
  font-weight: bold;
  color: #303133;
  margin-left: 8px;
}

.card-sub {
  font-size: 12px;
  color: #909399;
  display: flex;
  align-items: center;
  margin-left: 16px;
}

.chart-section {
  background: #fff;
  padding: 16px;
  border-radius: 4px;
  margin-bottom: 16px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #F1F2F7;
}

.chart-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  color: #313233;
  margin-left: 26px;
}

.radio-group {
  background: #f5f7fa;
  padding: 4px;
  border-radius: 4px;
}

.response-section {
  display: flex;
  gap: 16px;
}

.response-stats {
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-item {
  text-align: center;
}

.stat-item.success {
  border-left: 4px solid #67c23a;
}

.stat-item.processing {
  border-left: 4px solid #e6a23c;
}

.stat-item.pending {
  border-left: 4px solid #909399;
}

.stat-item.failed {
  border-left: 4px solid #f56c6c;
}

.stat-label {
  color: #909399;
  font-size: 14px;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 20px;
  font-weight: bold;
  color: #303133;
}

.response-table {
  flex: 1;
  background: #fff;
  padding: 16px;
  border-radius: 4px;
}

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.page-info {
  color: #909399;
  font-size: 12px;
}
.history-response {
  font-family: PingFang SC;
  font-size: 14px;
  font-weight: 500;
  height: 32px;
  color: #313233;
  margin-left: 26px;
  box-sizing: border-box;
  background: #F1F2F7;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}
.stat-item {
  background: linear-gradient(270deg, rgba(27, 232, 255, 0.4) 0%, rgba(27, 232, 255, 0) 100%), linear-gradient(270deg, rgba(232, 242, 253, 0) 0%, #C4DCFF 100%);
  box-sizing: border-box;
  width: 162px;
  height: 42px;
  border: 1px solid;
  border-image: linear-gradient(270deg, rgba(47, 116, 235, 0) 0%, #6E9EE7 100%) 1;
}
:deep(.el-card__body) {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 !important;
}
</style>