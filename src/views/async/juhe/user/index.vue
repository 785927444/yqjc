<template>
  <div class="page-container">
    <div class="search-section">
      <el-form :model="searchForm" inline class="form-area">
        <el-form-item label="用户户号">
          <el-input v-model="searchForm.userNo" placeholder="请输入内容" class="user-input"></el-input>
        </el-form-item>
        <el-form-item label="行业类型">
          <el-select v-model="searchForm.industryType" placeholder="请选择内容" class="indstry-select">
            <el-option label="光伏发电用户" value="pv_user"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="行政区划">
          <el-select v-model="searchForm.region" placeholder="请选择内容" class="region-select">
            <el-option label="珠海市香洲区" value="zhuhai_xiangzhou"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="search-btn">
        <el-button @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </div>
    </div>

    <div class="header-section">
      <span class="count-text">负荷用户总数：{{ tableData.length }}个</span>
      <el-button type="primary" @click="handleAdd">
        <template #icon>
          <el-icon><Plus /></el-icon>
        </template>
        新增
      </el-button>
    </div>

    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="loadUser" label="负荷用户" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="industryType" label="行业类型" />
      <el-table-column prop="region" label="行政区划" />
      <el-table-column prop="isSigned" label="是否签约" />
      <el-table-column prop="preDayResponse" label="参与日前响应" />
      <el-table-column prop="inDayResponse" label="参与日内响应" />
      <el-table-column prop="deviceCount" label="设备数量（台）" />
      <el-table-column prop="maxUpPower" label="最大上调量（kW）" />
      <el-table-column prop="maxDownPower" label="最大下调量（kW）" />
      <el-table-column prop="contact" label="联系人" />
      <el-table-column prop="contactPhone" label="联系方式" />
      <el-table-column label="操作" width="180">
        <template #default="{ row }">
          <div class="operate-buttons">
            <el-button size="small" type="text" @click="handleMore(row)">更多</el-button>
            <el-button size="small" type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button size="small" type="text" @click="handleDelete(row)" danger>删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-section">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        background
      />
    </div>

    <!-- 动态绑定抽屉标题 -->
    <el-drawer
      v-model="drawerVisible"
      :title="isEdit ? '聚合用户编辑' : '聚合用户新增'"
      direction="rtl"
      size="500px"
      :with-header="true"
    >
      <el-form :model="formData" label-width="130px" class="drawer-form custom-drawer-form">
        <el-row :gutter="20">
          <!-- 第一行：户号 + 户名 -->
          <el-col :span="12">
            <el-form-item class="user-name" label="户号" prop="userNo" required>
              <el-input v-model="formData.userNo" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="user-name" label="户名" prop="userName" required>
              <el-input v-model="formData.userName" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          
          <!-- 第二行：行业类型 + 是否已签约 -->
          <el-col :span="12">
            <el-form-item class="user-name" label="行业类型" prop="industryType" required>
              <el-select v-model="formData.industryType" placeholder="请选择内容">
                <el-option label="光伏发电用户" value="pv_user"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="user-name" label="是否已签约" prop="isSigned" required>
              <el-radio-group v-model="formData.isSigned">
                <el-radio label="是" value="是"></el-radio>
                <el-radio label="否" value="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          
          <!-- 第三行：供电公司 + 行政区划 -->
          <el-col :span="12">
            <el-form-item class="user-name" label="供电公司" prop="powerSupply" required>
              <el-select v-model="formData.powerSupply" placeholder="请选择内容"></el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="user-name" label="行政区划" prop="region" required>
              <el-select v-model="formData.region" placeholder="请选择内容">
                <el-option label="珠海市香洲区" value="zhuhai_xiangzhou"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          
          <!-- 第四行：电压等级（独占一行） -->
          <el-col :span="24">
            <el-form-item class="user-name" label="电压等级（kV）" prop="voltageLevel" required>
              <el-input v-model="formData.voltageLevel" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          
          <!-- 第五行：运行容量 + 合同容量 -->
          <el-col :span="12">
            <el-form-item class="user-name" label="运行容量（kW）" prop="runCapacity" required>
              <el-input v-model="formData.runCapacity" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="user-name" label="合同容量（kW/kVA）" prop="contractCapacity" required>
              <el-input v-model="formData.contractCapacity" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          
          <!-- 第六行：联系人 + 手机号码 -->
          <el-col :span="12">
            <el-form-item class="user-name" label="联系人" prop="contact" required>
              <el-input v-model="formData.contact" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="user-name" label="手机号码" prop="contactPhone" required>
              <el-input v-model="formData.contactPhone" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          
          <!-- 第七行：用电地址（独占一行） -->
          <el-col :span="24">
            <el-form-item class="user-name" label="用电地址" prop="address" required>
              <el-input v-model="formData.address" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          
          <!-- 第八行：参与日前响应 + 参与日内响应 -->
          <el-col :span="12">
            <el-form-item class="user-name" label="参与日前响应" prop="preDayResponse" required>
              <el-radio-group v-model="formData.preDayResponse">
                <el-radio label="是" value="是"></el-radio>
                <el-radio label="否" value="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="user-name" label="参与日内响应" prop="inDayResponse" required>
              <el-radio-group v-model="formData.inDayResponse">
                <el-radio label="是" value="是"></el-radio>
                <el-radio label="否" value="否"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          
          <!-- 第九行：设备数量 + 设备类型 -->
          <el-col :span="12">
            <el-form-item class="user-name" label="设备数量（台）" prop="deviceCount" required>
              <el-input v-model="formData.deviceCount" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="user-name" label="设备类型" prop="deviceType" required>
              <el-select v-model="formData.deviceType" placeholder="请选择内容"></el-select>
            </el-form-item>
          </el-col>
          
          <!-- 第十行：最大上调容量 + 最大下调容量 -->
          <el-col :span="12">
            <el-form-item class="user-name" label="最大上调容量" prop="maxUpPower" required>
              <el-input v-model="formData.maxUpPower" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item class="user-name" label="最大下调容量" prop="maxDownPower" required>
              <el-input v-model="formData.maxDownPower" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <!-- 底部按钮单独一行 -->
        <div class="drawer-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </div>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import router from '@/router'
const drawerVisible = ref(false)
const isEdit = ref(false)
const editIndex = ref(-1)

const searchForm = reactive({
  userNo: '',
  industryType: '',
  region: ''
})

const formData = reactive({
  userNo: '',
  userName: '',
  industryType: '',
  isSigned: '是',
  powerSupply: '',
  region: '',
  voltageLevel: '',
  runCapacity: '',
  contractCapacity: '',
  contact: '',
  contactPhone: '',
  address: '',
  preDayResponse: '是',
  inDayResponse: '是',
  deviceCount: '',
  deviceType: '',
  maxUpPower: '',
  maxDownPower: ''
})

const tableData = ref([
  {
    loadUser: '23427',
    userName: '用户1',
    industryType: '光伏发电用户',
    region: '珠海市香洲区',
    isSigned: '是',
    preDayResponse: '是',
    inDayResponse: '是',
    deviceCount: 12,
    maxUpPower: 32,
    maxDownPower: 20,
    contact: '张三',
    contactPhone: '12000000000'
  },
  {
    loadUser: '23427',
    userName: '用户2',
    industryType: '光伏发电用户',
    region: '珠海市香洲区',
    isSigned: '是',
    preDayResponse: '是',
    inDayResponse: '是',
    deviceCount: 12,
    maxUpPower: 32,
    maxDownPower: 20,
    contact: '张三',
    contactPhone: '12000000000'
  },
  {
    loadUser: '23427',
    userName: '用户3',
    industryType: '光伏发电用户',
    region: '珠海市香洲区',
    isSigned: '是',
    preDayResponse: '是',
    inDayResponse: '是',
    deviceCount: 12,
    maxUpPower: 32,
    maxDownPower: 20,
    contact: '张三',
    contactPhone: '12000000000'
  },
  {
    loadUser: '23427',
    userName: '用户1',
    industryType: '光伏发电用户',
    region: '珠海市香洲区',
    isSigned: '是',
    preDayResponse: '是',
    inDayResponse: '是',
    deviceCount: 12,
    maxUpPower: 32,
    maxDownPower: 20,
    contact: '张三',
    contactPhone: '12000000000'
  },
  {
    loadUser: '23427',
    userName: '用户1',
    industryType: '光伏发电用户',
    region: '珠海市香洲区',
    isSigned: '是',
    preDayResponse: '是',
    inDayResponse: '是',
    deviceCount: 12,
    maxUpPower: 32,
    maxDownPower: 20,
    contact: '张三',
    contactPhone: '12000000000'
  },
  {
    loadUser: '23427',
    userName: '用户1',
    industryType: '光伏发电用户',
    region: '珠海市香洲区',
    isSigned: '是',
    preDayResponse: '是',
    inDayResponse: '是',
    deviceCount: 12,
    maxUpPower: 32,
    maxDownPower: 20,
    contact: '张三',
    contactPhone: '12000000000'
  },
  {
    loadUser: '23427',
    userName: '用户1',
    industryType: '光伏发电用户',
    region: '珠海市香洲区',
    isSigned: '是',
    preDayResponse: '是',
    inDayResponse: '是',
    deviceCount: 12,
    maxUpPower: 32,
    maxDownPower: 20,
    contact: '张三',
    contactPhone: '12000000000'
  },
  {
    loadUser: '23427',
    userName: '用户1',
    industryType: '光伏发电用户',
    region: '珠海市香洲区',
    isSigned: '是',
    preDayResponse: '是',
    inDayResponse: '是',
    deviceCount: 12,
    maxUpPower: 32,
    maxDownPower: 20,
    contact: '张三',
    contactPhone: '12000000000'
  },
  {
    loadUser: '23427',
    userName: '用户1',
    industryType: '光伏发电用户',
    region: '珠海市香洲区',
    isSigned: '是',
    preDayResponse: '是',
    inDayResponse: '是',
    deviceCount: 12,
    maxUpPower: 32,
    maxDownPower: 20,
    contact: '张三',
    contactPhone: '12000000000'
  },
  {
    loadUser: '23427',
    userName: '用户1',
    industryType: '光伏发电用户',
    region: '珠海市香洲区',
    isSigned: '是',
    preDayResponse: '是',
    inDayResponse: '是',
    deviceCount: 12,
    maxUpPower: 32,
    maxDownPower: 20,
    contact: '张三',
    contactPhone: '12000000000'
  },
  {
    loadUser: '23427',
    userName: '用户1',
    industryType: '光伏发电用户',
    region: '珠海市香洲区',
    isSigned: '是',
    preDayResponse: '是',
    inDayResponse: '是',
    deviceCount: 12,
    maxUpPower: 32,
    maxDownPower: 20,
    contact: '张三',
    contactPhone: '12000000000'
  },
  {
    loadUser: '23427',
    userName: '用户1',
    industryType: '光伏发电用户',
    region: '珠海市香洲区',
    isSigned: '是',
    preDayResponse: '是',
    inDayResponse: '是',
    deviceCount: 12,
    maxUpPower: 32,
    maxDownPower: 20,
    contact: '张三',
    contactPhone: '12000000000'
  }
])

const handleAdd = () => {
  // 新增时重置状态
  isEdit.value = false
  drawerVisible.value = true
  // 打开抽屉时重置表单
  Object.keys(formData).forEach(key => {
    if (['isSigned', 'preDayResponse', 'inDayResponse'].includes(key)) {
      formData[key] = '是'
    } else {
      formData[key] = ''
    }
  })
}

const handleEdit = (row: any) => {
  console.log('编辑', row)
  isEdit.value = true
  editIndex.value = tableData.value.findIndex(item => item.loadUser === row.loadUser && item.userName === row.userName)
  drawerVisible.value = true
  
  formData.userNo = row.loadUser
  formData.userName = row.userName
  formData.industryType = row.industryType === '光伏发电用户' ? 'pv_user' : row.industryType
  formData.isSigned = row.isSigned
  formData.powerSupply = '' // 表格中无该字段，默认空
  formData.region = row.region === '珠海市香洲区' ? 'zhuhai_xiangzhou' : row.region
  formData.voltageLevel = '' // 表格中无该字段，默认空
  formData.runCapacity = '' // 表格中无该字段，默认空
  formData.contractCapacity = '' // 表格中无该字段，默认空
  formData.contact = row.contact
  formData.contactPhone = row.contactPhone
  formData.address = '' // 表格中无该字段，默认空
  formData.preDayResponse = row.preDayResponse
  formData.inDayResponse = row.inDayResponse
  formData.deviceCount = row.deviceCount
  formData.deviceType = '' // 表格中无该字段，默认空
  formData.maxUpPower = row.maxUpPower
  formData.maxDownPower = row.maxDownPower
}

const handleMore = (row: any) => {
  router.push({
    path: '/juhe/user/more',
  })
}

const handleCancel = () => {
  drawerVisible.value = false
}

const handleSubmit = () => {
  console.log('提交表单数据：', formData)
  
  if (isEdit.value) {
    // 编辑模式：更新现有数据
    if (editIndex.value > -1) {
      tableData.value[editIndex.value] = {
        loadUser: formData.userNo,
        userName: formData.userName,
        industryType: formData.industryType === 'pv_user' ? '光伏发电用户' : formData.industryType,
        region: formData.region === 'zhuhai_xiangzhou' ? '珠海市香洲区' : formData.region,
        isSigned: formData.isSigned,
        preDayResponse: formData.preDayResponse,
        inDayResponse: formData.inDayResponse,
        deviceCount: formData.deviceCount,
        maxUpPower: formData.maxUpPower,
        maxDownPower: formData.maxDownPower,
        contact: formData.contact,
        contactPhone: formData.contactPhone
      }
    }
  } else {
    // 新增模式：添加新数据
    tableData.value.push({
      loadUser: formData.userNo,
      userName: formData.userName,
      industryType: formData.industryType === 'pv_user' ? '光伏发电用户' : formData.industryType,
      region: formData.region === 'zhuhai_xiangzhou' ? '珠海市香洲区' : formData.region,
      isSigned: formData.isSigned,
      preDayResponse: formData.preDayResponse,
      inDayResponse: formData.inDayResponse,
      deviceCount: formData.deviceCount,
      maxUpPower: formData.maxUpPower,
      maxDownPower: formData.maxDownPower,
      contact: formData.contact,
      contactPhone: formData.contactPhone
    })
  }
  
  drawerVisible.value = false
}

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(200)
const handleSearch = () => console.log('搜索触发', searchForm)
const handleReset = () => {
  searchForm.userNo = ''
  searchForm.industryType = ''
  searchForm.region = ''
}
const handleDelete = (row: any) => console.log('删除', row)
</script>

<style scoped>
.search-section {
  margin-bottom: 16px;
  display: flex;
}
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ebeef5;
}
.count-text {
  color: #606266;
  font-size: 14px;
}
.pagination-section {
  margin-top: 16px;
  text-align: right;
  display: flex;
  justify-content: end;
}
:deep(.el-form-item__label) {
  color: black !important;
  display: flex;
  justify-content: flex-start;
}
:deep(.el-input__wrapper) {
  box-shadow: none !important;
}
.user-input {
  width: 200px;
  height: 32px;
}
.indstry-select {
  box-shadow: none !important;
  width: 200px;
  height: 32px;
}
.region-select {
  box-shadow: none !important;
  width: 200px;
  height: 32px;
}
.form-area {
  width: 976px;
  height: 32px;
}
.search-btn {
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
}

.operate-buttons {
  display: flex;
  justify-content: center;
  align-items: center;    
  gap: 12px;         
  width: 100%;  
}

.drawer-form {
  padding: 20px;
}
.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
}
/* 确保表单容器适应两列布局 */
.custom-drawer-form {
  padding: 16px 20px;
  height: 100%;
  overflow-y: auto; /* 允许表单内容滚动 */
}

/* 表单项样式优化 */
.custom-drawer-form .el-form-item {
  margin-bottom: 16px;
  width: 100%;
}

/* 输入框和选择框占满列宽度 */
:deep(.custom-drawer-form .el-input__wrapper),
:deep(.custom-drawer-form .el-select .el-input__wrapper) {
  width: 100%;
  background: #f5f7fa;
  box-shadow: none;
  border-radius: 4px;
  height: 36px;
}

/* 单选框组水平排列 */
:deep(.custom-drawer-form .el-radio-group) {
  display: flex;
  align-items: center;
  height: 36px;
}

:deep(.custom-drawer-form .el-radio) {
  margin-right: 16px;
}

/* 底部按钮区域样式 */
.drawer-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
}

/* 必填星号样式 */
:deep(.custom-drawer-form .el-form-item--required:not(.el-form-item--no-label) .el-form-item__label:before) {
  content: "*";
  color: #F56C6C;
  margin-right: 4px;
  position: absolute;
  left: -12px;
  top: 0;
}

:deep(.custom-drawer-form .el-form-item__label) {
  padding-right: 12px;
  color: #303133;
  font-weight: 500;
  position: relative;
}
:deep(.el-drawer__header) {
  width: 500px;
  height: 56px;
  background-color: #FFFFFF;
  border-bottom: 1px solid #E7E7E7;
}
:deep(.el-drawer__close-btn) {
  padding: 0px 58px 18px 0px;
  width: 16px;
  height: 16px;
}
.user-name {
  display: flex;
  flex-direction: column;
}
:deep(.el-input__inner) {
  color: #939599;
}
.search_input {
  width: 240px;
  height: 32px;
}
</style>