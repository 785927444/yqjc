  import configStore from '@/stores/configStore'
  import publicStore from '@/stores/publicStore'
  import { isNull, parseTime } from '@/utils/common'
  import api from '@/api'

	export async function getChild (status?: any, type?: any) {
		if(isNull(publicStore()._public)) return
		if(isNull(publicStore()._public.terminals)) return
		if(isNull(publicStore().active)) return
		if(isNull(publicStore().active.attr)) return
		if(isNull(publicStore().active.attr.terminal)) return
		let terminal = publicStore()._public.terminals.find(a=>a.id == publicStore().active.attr.terminal)
		publicStore()._public.childs = []
		// 不存在终端
		if(!terminal) {
      console.log("不存在终端")
      publicStore().active.attr.childs = []
      publicStore().active.attr.fields = []
      return
    }
		// 未关联前置
		if(!terminal.parent_type)	{
      console.log("未关联前置")
      publicStore().active.attr.childs = []
      publicStore().active.attr.fields = []
      return 
    }
    let query_node = {model: 't_sensor', args: `parent_id='${terminal.parent_type}'`}
		let nodes = await publicStore().http({Api: query_node})
		// 前置无节点
		if(isNull(nodes)) {
      console.log("前置无节点")
      publicStore().active.attr.childs = []
      publicStore().active.attr.fields = []
      return 
    }
		let ids = [...new Set(nodes.map(a => a.id))].map(a => `'${a}'`).join(',')
		let query_sensor = {model: 't_sensor', args: `parent_id IN (${ids})`}
		let devices = await publicStore().http({Api: query_sensor})
		// 前置无设备
		if(isNull(devices)) {
      console.log("前置无设备")
      publicStore().active.attr.childs = []
      publicStore().active.attr.fields = []
      return 
    }
    if(type) devices = devices.filter(a=>a.type == type)
		// 判断是否包含
		if(!isNull(publicStore().active.attr.childs)){
			const isExist = publicStore().active.attr.childs.some(g => g.items.some(i => devices.some(d => d.id === i.sensor_id)))
      if(!isExist) {
        console.log("不包含设备", publicStore().active.attr.childs)
        // publicStore().active.attr.childs = []
        // publicStore().active.attr.fields = []
      }
		}
    // 判断是否首次
    if(!status){
        publicStore().active.attr.childs = []
        publicStore().active.attr.fields = []
    }
	  // 开始处理资源
		let childs = Array.from(
			devices.reduce((map, device) => {
				const group = map.get(device.type) || { type: device.type, meas: [], sensors: [] }
				group.sensors.push(device)
				map.set(device.type, group)
				return map
			}, new Map())
			.values()
		)
		let types = [...new Set(childs.map(a => a.type))].map(a => `'${a}'`).join(',')
		let query_mea = {model: 't_sensor_template_measure_point', args: `sensor_type IN (${types})`}
    let meas = await publicStore().http({Api1: query_mea})
    // let meas = res.sort((a, b) => a.order - b.order).filter(c=>c.name.includes("功率"))
		// let query_control = {model: 't_sensor_template_control_point', args: `sensor_type IN (${types})`}
		// let res = await publicStore().http({Api1: query_mea, Api2: query_control})
		// let meas = res.Api1.sort((a, b) => a.order - b.order).filter(c=>c.name.includes("功率"))
		// let controls = res.Api2.map(v => {
    //   if(v.calcRuleExpres){
    //     try {
    //       v.calcRuleExpres = JSON.parse(v.calcRuleExpres)
    //       Object.assign(v, v.calcRuleExpres)
    //       delete v.calcRuleExpres
    //     } catch (err) {
    //       console.error(err)
    //     }
    //   }
    //   return v
		// })
    // 子资源数据自定义
    childs.forEach(v => { 
      if(!isNull(meas)) v.meas = meas.filter(a=>a.sensor_type == v.type)
      // if(!isNull(controls)) {
      //   v.controls = controls.filter(a=>a.sensor_type == v.type)
      //   v.controls.forEach(vv => {
      //     if(!isNull(vv.action)) vv.value_type = vv.action[0]['action_type']
      //   })
      // }
      if(!isNull(publicStore()._public) && !isNull(publicStore()._public.deviceTypes)) {
        const deviceType = publicStore()._public.deviceTypes.find(a=>a.type == v.type)
        if(deviceType) v.name = deviceType.name
      }
    })
    // 已保存资源自定义
		if(!isNull(publicStore().active.attr.childs)){
			publicStore().active.attr.childs.forEach(v => {
				let child = childs.find(a=>a.type == v.type)
				if(child) {
          child.code = v.code?v.code:''
          child.price_type = v.price_type?v.price_type:''
          child.price = v.price?v.price:''
        }
			})
		}
		publicStore()._public.childs = childs
    if(isNull(publicStore()._public.childs)) return publicStore().active.attr.fields = []
    if(isNull(publicStore().active.attr.childs)) return publicStore().active.attr.fields = []
	} 

  // 检查是否可以保存
  export async function checkStatus (val?: any) {
    // 公共判断
    if(isNull(publicStore().active)) return {status: false, msg: `请选择用例`}
    if(isNull(publicStore().active.attr)) return {status: false, msg: `请配置参数`}
    if(isNull(publicStore().active.attr.terminal)) return {status: false, msg: `请选择终端`}
    if(isNull(publicStore().active.attr.front)) return {status: false, msg: `请设置前置条件`}
    if(isNull(publicStore().active.attr.frequency)) return {status: false, msg: `请设置通讯频率`}
    // console.log("publicStore().active.attr---", publicStore().active.attr)
    // 分标判断
    if(publicStore().active.type == 'comm_1') {
      if(isNull(publicStore().active.attr.agreement)) return {status: false, msg: `请选择通讯协议`}
      if(isNull(publicStore().active.attr.count)) return {status: false, msg: `请设置通讯次数`}
    }
    if(publicStore().active.type == 'comm_2') {
      if(isNull(publicStore().active.attr.agreement)) return {status: false, msg: `请选择通讯协议`}
      if(isNull(publicStore().active.attr.count)) return {status: false, msg: `请设置通讯次数`}
      if(isNull(publicStore().active.attr.childs)) return {status: false, msg: `请设置资源`}
    }
    if(['comm_3', 'comm_4'].includes(publicStore().active.type)) {
      if(isNull(publicStore().active.attr.agreement)) return {status: false, msg: `请选择通讯协议`}
    }
    if(['calc_1', 'calc_2'].includes(publicStore().active.type)) {
      if(isNull(publicStore().active.attr.algorithm)) return {status: false, msg: `请选择算法`}
    }
    if(['comm_3', 'comm_4', 'calc_1', 'calc_2'].includes(publicStore().active.type)) {
      if(isNull(publicStore().active.attr.scene)) return {status: false, msg: `请设置场景`}
      // if(isNull(publicStore().active.attr.strategy)) return {status: false, msg: `请设置策略`}
      if(isNull(publicStore().active.attr.childs)) return {status: false, msg: `请设置资源`}
    }
    if(['enti_1', 'enti_2', 'enti_3', 'enti_4'].includes(publicStore().active.type)) {
      if(isNull(publicStore().active.attr.agreement)) return {status: false, msg: `请选择通讯协议`}
      if(isNull(publicStore().active.attr.childs)) return {status: false, msg: `请设置资源`}
    }
    if(['unit_1', 'unit_2', 'unit_3', 'unit_4', 'unit_5', 'unit_6', 'unit_7', 'unit_8'].includes(publicStore().active.type)) {
      if(isNull(publicStore().active.attr.power)) return {status: false, msg: `请输入目标功率`}
      if(isNull(publicStore().active.attr.childs)) return {status: false, msg: `请设置资源`}
    }
    // 判断控制时段
    if(val && val == '1'){
      if(publicStore().active.type != 'comm_1' && publicStore().active.type != 'comm_2'){
        if(isNull(publicStore().active.attr.fields)) return {status: false, msg: `请设置控制时段`}
      }
    }
    // 判断次数是否正整数
    if(publicStore().active.attr.count && !isValidPositiveInteger(publicStore().active.attr.count)) return {status: false, msg: `通讯次数必须为0的正整数`}
    // 判断频率是否正整数
    if(publicStore().active.attr.frequency && !isValidPositiveInteger(publicStore().active.attr.frequency)) return {status: false, msg: `通讯次数必须为0的正整数`}
    // 判断目标功率是否正整数
    if(publicStore().active.attr.power && !isValidPositiveInteger(publicStore().active.attr.power)) return {status: false, msg: `目标功率必须为0的正整数`}
    // 判断控制时段
    if(publicStore().active.attr.fields) {
      if(publicStore().active.type.indexOf('unit')==-1 && publicStore().active.attr.fields.length > 1) return {status: false, msg: `只能设置一个控制时段`}
      let check = isFieldsValid(publicStore().active.attr.fields)
      if(!check.status) return check
    }
    // 判断资源列表
    if(publicStore().active.attr.childs) {
      let check = await isChildsValid(publicStore().active.attr.childs)
      if(!check.status) return check
    }
    return {status: true, msg: ''}
  }

  // 设备检测
	export async function isDevicesValid() {
	  try {
	    // 1. 获取有效ID列表并转为字符串数组
	    const validIds = (await publicStore().http({ Api: { model: 't_sensor', args: '' } })).map(item => String(item.id))
	    // 2. 使用 some 检查是否存在无效项，取反后直接返回 boolean
	    return !publicStore().active.attr.childs?.some(child =>
	      child.items?.some(item => 
	        item.sensor_id && !validIds.includes(String(item.sensor_id))
	      )
	    )
	  } catch {
	    return false
	  }
	}

  // 判断是否正整数
  export function isValidPositiveInteger (value: any) {
		// 1. 空值/非字符串/非数字直接返回false
		if (value === null || value === undefined || value === '' || typeof value === 'boolean') return false;
		// 2. 转换为数字（处理字符串类型的数字，如"1.2"）
		const num = Number(value);
		// 3. 先判断是否为有效数字（排除NaN），再判断是整数且>1
		if (isNaN(num)) return false;
		return Number.isInteger(num) && num > 0;
	}

  // 校验的childs每一行数据是否完整 （类型，属性，设备） 
  export async function isChildsValid () {
    let check = {status: true, msg: ''}
    let devicesStatus = false
    // 遍历每个child
    publicStore().active.attr.childs.forEach(child => {
      if(!check.status) return
      // 检查是否选择设备类型
      if(!child.hasOwnProperty("type") || !child.type) return check = { status: false, msg: `【选择资源】设备类型不能为空` }
      // 检查是否选择类型属性
      if(['comm_3', 'comm_4', 'calc_1', 'calc_2', 'unit_1', 'unit_2', 'unit_3', 'unit_4', 'unit_5', 'unit_6', 'unit_7', 'unit_8'].includes(publicStore().active.type)) {
        if(!child.hasOwnProperty("code") || !child.code) return check = { status: false, msg: `【选择资源】类型属性不能为空` }
      }
      // 检查是否选择金额
      if(['enti_1', 'enti_2', 'enti_3', 'enti_4'].includes(publicStore().active.type)) {
        if(!child.hasOwnProperty("price_type") || !child.price_type) return check = { status: false, msg: `【选择资源】调整类型不能为空` }
        if(!child.hasOwnProperty("price") || !child.price) return check = { status: false, msg: `【选择资源】金额不能为空` }
        if(!isNaN(Number(child.price)) && Number(child.price) < 0) return check = { status: false, msg: `【选择资源】金额需大于0` }
      }
      // 检查当前child的items是否存在且为非空数组
      if (Array.isArray(child.items) && child.items.length > 0) {
        devicesStatus = true
        // 遍历每个item，检查四个字段是否都非空（去除首尾空格）
        if(publicStore().active.type == 'comm_2'){
          child.items.forEach((item, index) => {
            const sensorId = String(item.sensor_id ?? '').trim();
            const code = String(item.code ?? '').trim();
            const value = String(item.value ?? '').trim();
            const error = String(item.error ?? '').trim();
            if (!sensorId || !code || !value || !error) {
              let errorMsg = `【选择资源】类型${child.type} 第${index + 1}行数据：`;
              if (!sensorId) errorMsg += '设备必须；';
              if (!code) errorMsg += '属性必须；';
              if (!value) errorMsg += '标准数值必须；';
              if (!error) errorMsg += '允许误差必须；';
              check.status = false
              check.msg = errorMsg
            }
          })
        }
        // if(['comm_3', 'comm_4'].includes(publicStore().active.type)){
        //   child.items.forEach((item, index) => {
        //     const sensorId = String(item.sensor_id ?? '').trim()
        //     if (!sensorId) {
        //       let errorMsg = `【选择资源】类型${child.type} 第${index + 1}行数据不完整：`
        //       if (!sensorId) errorMsg += '设备必须；'
        //       return check = { status: false, msg: `${errorMsg}` }
        //     }
        //   })
        // }
      }
    })
    // 判断设备
    if(devicesStatus) {
      let isDevices = await isDevicesValid()
      if(!isDevices) return {status: false, msg: `请删除已删除设备的配置后再提交`}
    }
		return check
	}

  // 校验的fields每一行数据是否完整
  export function isFieldsValid () {
    const now = new Date()
		// 遍历每一行，检查三个核心字段
    let check = {status: true, msg: ''}
		publicStore().active.attr.fields.forEach((item, index) => {
      if(!check.status) return
      // 检查时间范围：必须是长度为2的数组，且开始/结束时间都非空
      const datetimeValid = Array.isArray(item.datetime) && item.datetime.length === 2 && item.datetime[0] && item.datetime[1];
      // 检查时间范围是否大于当前时间
      let futureValid = true;
      if (datetimeValid) {
        const startTime = new Date(item.datetime[0]);
        const endTime = new Date(item.datetime[1]);
        futureValid = startTime > now && endTime > now;
      }
      // 检查调节功率：非空且是大于0的数字
      const valueValid = item.value !== '' && item.value !== null && item.value !== undefined && !isNaN(Number(item.value));
      if (!datetimeValid || !futureValid || !valueValid) {
        // 提示具体哪一行有问题，精准定位
        let errorMsg = `【控制时段】第${index + 1}行数据：`;
        if (!datetimeValid) errorMsg += '时间范围必须选择完整的开始/结束时间；';
        if (!futureValid) errorMsg += '开始和结束时间都必须大于当前时间；';
        if (!valueValid) errorMsg += '设置值必须填写数字；';
        check.status = false
        check.msg = errorMsg
      }
		})
		return check
	}