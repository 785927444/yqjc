  import * as echarts from 'echarts'
  import dictStore from '@/stores/dictStore'
  import { isNull, newSize } from "@/utils/common"
  /* 
  参数
  id      dom节点
  data    数据
  params  可选参数
  attr    属性  
          最大值：  max: 0,           （空：取最大值）   
          最小值：  min: 0,           （空：取最大值负值）
          幅度值：  extent: 4         （空：默认4 min、max空有效）
          颜色列表: colorList: []     （空：默认）
          图例列表：legendArr: []     （空：默认）
          图例显隐：legendShow: false （空：隐藏）
          点值显隐：labelShow: false  （空：隐藏）
          面积显隐：areaShow: false   （空：隐藏）
          线上圆点：symbol：false     （空：圆点）
          y轴名称： y_name: '温度'    （空：无）
          窗单位：  tool_dw： '°C'    （空：无）
          窗x名称： tool_name_x '时间'（空：无）
          窗y名称： tool_name_y '值'  （空：无）
  */
  const colorLists = dictStore().colorLists
  const setOption = {
    Line(attr:any, data:any, pramas:any){
      var extent = attr.extent?attr.extent:4
      var colorList = !isNull(attr.colorList)? attr.colorList : colorLists
      var legendArr = !isNull(attr.legendArr)?attr.legendArr:['']
      var seriesArr = []
      var visualMap = []
			for (var i = 0; i <= legendArr.length-1; i++) {
        let series = {
					name: legendArr[i],type: 'line',connectNulls:true,smooth: attr.smooth?false:true,sampling: 'average',large: true,animation: false,clip: true, 
          symbolSize: attr.symbol? 0 : function (d) {if (d[4] && d[4] > 0) {return 6} else {return 5}},
					itemStyle: {color:colorList[i].color},
          label: {show: attr.labelShow,position: 'top',color: '#1BFFDF',fontSize: newSize(12),fontWeight: 'bold', 
            rich:{ 
              a:{fontSize: newSize(12), padding: [0, 0, 8, 0]},
              b:{fontSize: newSize(12), padding: [0, 0, 8, 0], color: '#FF4D4F'},
              c:{fontSize: newSize(12), padding: [0, 0, 8, 0], color: '#DC1185'},
              d:{fontSize: newSize(12), padding: [0, 0, 8, 0], color: '#FEC746'},
            },
					  // formatter: function(p) {
            //   if (p.value[2] == 'isAlarm') {
            //     return `${p.value[4]}`
            //   }else if (p.value[2] == 'offline') {
            //     if(p.value[1] == 0) return `在线`
            //     else if(p.value[1] == 1) return `{c|离线}`
            //     else return `{d|故障}`
            //   } else {
            //     if(p.value[3] == 0) return Math.floor((p.value[1]*100))/100
            //     if(p.value[3] == 1) return `{b|${Math.floor((p.value[1]*100))/100}}`
            //   }
            // }
					},
          yAxisIndex: attr.y_name2&&i==1? i : 0,
					data: [],
				}
        // if(!isNull(attr.symbol)) series.symbol = 'none'
        if(isNull(attr.visualMap)) series.lineStyle = {color:colorList[i].color, type: colorList[i].type?colorList[i].type:'solid'}
        if(attr.areaShow) series.areaStyle = {color: {type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: colorList[i].start}, { offset: 1, color: colorList[i].end}], global: false}} 
        seriesArr.push(series)
			}
      if(!isNull(attr.visualMap)){
        visualMap = attr.visualMap.map(v => {
          let t = {pieces: [], top: 0, right: 0, itemHeight: 2, itemWidth: 20, textStyle: {color: '#FFFFFF', fontSize: newSize(12)},}
          v.pieces.forEach((vv,ii) => {
            let tt = {color: vv.color, label: vv.label}
            if(ii==0){
              tt.lte = vv.value[0]
            }else if(ii!=0&&ii==v.pieces.length-1){
              tt.gt = vv.value[0]
            }else{
              tt.gt = vv.value[0]
              tt.lte = vv.value[1]
            }
            t.pieces.push(tt)
          })
          return t
        })
      }
      let allShow = attr.allAxisShow===false?false:true;
			let grid = [{top: 30, bottom: '0', left: '0', right: newSize(24), containLabel: true}]
			let tooltip = {show: true, backgroundColor:'rgba(0,0,0,0.5)', textStyle: {color: '#FFFFFF'}, trigger: 'item', 
			formatter: function (p:any) {return (attr.tool_name_x?attr.tool_name_x:'x：') + p.value[0] + '<br />' + (attr.tool_name_y?attr.tool_name_y:'y：') + (Math.floor((p.value[1]*100))/100) + ' ' + (attr.tool_dw?attr.tool_dw:'')}}
			// let tooltip = {show: true, backgroundColor:'rgba(0,0,0,0.5)', textStyle: {color: '#FFFFFF'}, trigger: 'axis', axisPointer: {type: 'line', lineStyle: {color: '#6f8dcb'}}}
      let legend = {show: attr.legendShow,data: legendArr,align:'left',x:attr.legendX?attr.legendX:'right',y: 'top',top: -2,icon: "roundRect",itemWidth: 18,itemHeight: 1,
				textStyle: {color: '#FFFFFF',rich: {a: {verticalAlign: 'middle'}},padding:[4,0,0,0]}}
			let dataZoom = [{type: 'inside',show : true,realtime : true,startValue: attr.zoomStart?attr.zoomStart:0,endValue: attr.zoomEnd?attr.zoomEnd:1000}]
			let xAxis = {
				type: 'category',
        boundaryGap: false,
 				//刻度线
        axisTick: {show: false},
				// 轴线
				axisLine: {lineStyle: {color: '#6f8dcb',fontSize: newSize(12)},show:true},
				// 分割线
				splitLine: {show: false,lineStyle: {color: '#6f8dcb'}},
				// 轴文字
				axisLabel: {color: '#6f8dcb',show: true,fontSize: newSize(12),formatter:function(value:any) {return value.replace(' ', '\n')}},
				z: 10
			}
      
      let yLineShow  = attr.yAxisShow===false?false:true;
			let yAxis = [{
				name: attr.y_name,
				type: 'value',
				min: attr.min == 0 || attr.min ? attr.min : (value) => {
          // 对于负值数据，确保min比数据最小值更小
          if (value.min < 0) {
            return Math.floor(value.min * 1.1); // 向下扩展10%
          }
          return 0; // 正值数据从0开始
        },
				max: attr.max == 0 || attr.max ? attr.max : (value) => {
          // 确保max比数据最大值更大
          const padding = Math.abs(value.max) * 0.1; // 10%的padding
          return Math.ceil(value.max + padding);
        },
        //刻度线
        axisTick: {show: false},
        // 轴线
				axisLine: {show: yLineShow,lineStyle: {color: '#6f8dcb'}},
        // 分割线
				splitLine: {show: !yLineShow,lineStyle: {color: '#939393'}},
        // 轴文字
				axisLabel: {color: '#6f8dcb',fontSize: newSize(12),formatter: '{value}'}
			}]
      // 双y轴
      if(attr.y_name2){
        let yAxis2 = {
          name: attr.y_name2,
          type: 'value',
          min: attr.min2==0||attr.min2?attr.min2:(value) => {
            // 对于负值数据，确保min比数据最小值更小
            if (value.min < 0) {
              return Math.floor(value.min * 1.1); // 向下扩展10%
            }
            return 0; // 正值数据从0开始
          },
          max: attr.max2==0||attr.max2?attr.max2:(value) => {
            // 确保max比数据最大值更大
            const padding = Math.abs(value.max) * 0.1; // 10%的padding
            return Math.ceil(value.max + padding);
          },
          //刻度线
          axisTick: {show: false},
          // 轴线
          axisLine: {show: yLineShow,lineStyle: {color: '#6f8dcb'}},
          // 分割线
          splitLine: {show: !yLineShow,lineStyle: {color: '#939393'}},
          // 轴文字
          axisLabel: {color: '#6f8dcb',fontSize: newSize(12),formatter: '{value}'}
        }
        yAxis.push(yAxis2)
      }
      if(!allShow){
       xAxis.axisLabel.formatter=()=>""
       yAxis.forEach(item=>{ item.show=false})
      }
			const option = {
				grid: grid,
				tooltip: tooltip,
				legend: legend,
				dataZoom: dataZoom,
        visualMap: visualMap,
				xAxis: xAxis,
				yAxis: yAxis,
				series: seriesArr
			};
			return option
		},
    Lines(attr:any, data:any, pramas:any){
      var extent = attr.extent?attr.extent:4
      var colorList = !isNull(attr.colorList)? attr.colorList : colorLists
      var legendArr = !isNull(attr.legendArr)?attr.legendArr:['']
      var seriesArr = []
      var visualMap = []
      const legendData = legendArr.map((item: any, index: number) => {
        return {
          name: item.name,
          itemHeight: item.type === 'bar' ? 10 : 1,
        }
      })
			for (var i = 0; i <= legendArr.length-1; i++) {
        let series = {
					name: legendArr[i].name?legendArr[i].name:'',type: legendArr[i].type?legendArr[i].type:'line',barWidth: newSize(10),connectNulls:true,smooth: attr.smooth?false:true,sampling: 'average',large: true,animation: false,clip: true, 
          symbolSize: attr.symbol? 0 : function (d) {if (d[4] && d[4] > 0) {return 6} else {return 5}},
					itemStyle: {color:colorList[i].color},
          label: {show: attr.labelShow,position: 'top',color: '#1BFFDF',fontSize: newSize(12),fontWeight: 'bold', 
            rich:{ 
              a:{fontSize: newSize(12), padding: [0, 0, 8, 0]},
              b:{fontSize: newSize(12), padding: [0, 0, 8, 0], color: '#FF4D4F'},
              c:{fontSize: newSize(12), padding: [0, 0, 8, 0], color: '#DC1185'},
              d:{fontSize: newSize(12), padding: [0, 0, 8, 0], color: '#FEC746'},
            },
					},
          // yAxisIndex: attr.y_name2&&i==1? i : 0,
          yAxisIndex: legendArr[i].type&&legendArr[i].type=='bar'? 0 : 1,
					data: [],
				}
        if(isNull(attr.visualMap)) series.lineStyle = {color:colorList[i].color, type: colorList[i].type?colorList[i].type:'solid'}
        if(attr.areaShow) series.areaStyle = {color: {type: 'linear', x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: colorList[i].start}, { offset: 1, color: colorList[i].end}], global: false}} 
        seriesArr.push(series)
			}
      if(!isNull(attr.visualMap)){
        visualMap = attr.visualMap.map(v => {
          let t = {pieces: [], top: 0, right: 0, itemHeight: 2, itemWidth: 20, textStyle: {color: '#FFFFFF', fontSize: newSize(12)},}
          v.pieces.forEach((vv,ii) => {
            let tt = {color: vv.color, label: vv.label}
            if(ii==0){
              tt.lte = vv.value[0]
            }else if(ii!=0&&ii==v.pieces.length-1){
              tt.gt = vv.value[0]
            }else{
              tt.gt = vv.value[0]
              tt.lte = vv.value[1]
            }
            t.pieces.push(tt)
          })
          return t
        })
      }
      let allShow = attr.allAxisShow===false?false:true;
			let grid = [{top: 50, bottom: '0', left: '0', right: newSize(24), containLabel: true}]
			let tooltip1 = {show: true, backgroundColor:'rgba(0,0,0,0.5)', textStyle: {color: '#FFFFFF'}, trigger: 'item', 
			formatter: function (p:any) {return (attr.tool_name_x?attr.tool_name_x:'x：') + p.value[0] + '<br />' + (attr.tool_name_y?attr.tool_name_y:'y：') + (Math.floor((p.value[1]*100))/100) + ' ' + (attr.tool_dw?attr.tool_dw:'')}}
      
      let tooltip2 = {show: true, backgroundColor:'rgba(0,0,0,0.5)', textStyle: {color: '#FFFFFF'}, trigger: 'axis',
        axisPointer: {
          type: 'line', 
          lineStyle: {color: '#6f8dcb', width: 1, type: 'dashed',  opacity: 0.5},
          label: {show: true, backgroundColor: '#6f8dcb', color: '#fff'}
        },
        // 自定义formatter显示所有数据
        formatter: function (params: any) {
          let result = `<div style="font-weight: bold; margin-bottom: 5px;">${params[0].value[0]}</div>`;
          params.forEach((param: any) => {
            const value = Math.floor((param.value[1] * 100)) / 100;
            const seriesName = param.seriesName;
            const color = param.color;
            const seriesType = param.seriesType; // 获取系列类型
            
              // 修改部分：根据系列类型显示不同的图标
              let iconHTML = '';
              if (seriesType === 'bar') {
                // bar系列显示长方形图标（高度较高）
                iconHTML = `<span style="display: inline-block; width: 12px; height: 10px; border-radius: 2px; background: ${color}; margin-right: 5px;"></span>`;
              } else {
                // 其他系列（line）显示圆圈加线条的组合
                iconHTML = `
                  <span style="display: inline-block; position: relative; width: 12px; height: 10px; margin-right: 5px;">
                    <!-- 圆圈 -->
                    <span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 8px; height: 8px; background: #FFFFFF; border: 1px solid ${color}; border-radius: 50%; z-index: 1"></span>
                    <!-- 横线 -->
                    <span style="position: absolute; top: 50%; left: 0; transform: translateY(-50%); width: 100%; height: 1px; background: ${color};"></span>
                  </span>
                `;
              }
              result += `
                <div style="display: flex; align-items: center; margin: 2px 0;">
                  ${iconHTML}
                  <span style="flex: 1;">${seriesName}:</span>
                  <span style="font-weight: bold; margin-left: 10px;">${value} ${attr.tool_dw || ''}</span>
                </div>
              `;
            });
            return result;
        }
      }
      let legend = {show: attr.legendShow,data: legendData,align:'left',x:attr.legendX?attr.legendX:'right',y: 'top',top: -2, itemWidth: 18,
				textStyle: {color: '#FFFFFF',rich: {a: {verticalAlign: 'middle'}},padding:[4,0,0,0]}
      }
			let dataZoom = [{type: 'inside',show : true,realtime : true,startValue: attr.zoomStart?attr.zoomStart:0,endValue: attr.zoomEnd?attr.zoomEnd:1000}]
			let xAxis = {
				type: 'category',
        // boundaryGap: false,
 				//刻度线
        axisTick: {show: false},
				// 轴线
				axisLine: {lineStyle: {color: '#6f8dcb',fontSize: newSize(12)},show:true},
				// 分割线
				splitLine: {show: true,lineStyle: {color: '#cccccc', type: 'dashed', opacity: 0.1}},
				// 轴文字
				axisLabel: {color: '#6f8dcb',show: true,fontSize: newSize(12),formatter:function(value:any) {return value.replace(' ', '\n')}},
				z: 10
			}
      
      let yLineShow  = attr.yAxisShow===false?false:true;
			let yAxis = [{
				name: attr.y_name,
        nameTextStyle: {
          lineHeight: 16,
          align: 'center' 
        },
				type: 'value',
				min: attr.min == 0 || attr.min ? attr.min : (value) => {
          // 对于负值数据，确保min比数据最小值更小
          if (value.min < 0) {
            return Math.floor(value.min * 1.1); // 向下扩展10%
          }
          return 0; // 正值数据从0开始
        },
				max: attr.max == 0 || attr.max ? attr.max : (value) => {
          // 确保max比数据最大值更大
          const padding = Math.abs(value.max) * 0.1; // 10%的padding
          return Math.ceil(value.max + padding);
        },
        //刻度线
        axisTick: {show: false},
        // 轴线
				axisLine: {show: yLineShow,lineStyle: {color: '#6f8dcb'}},
        // 分割线
				splitLine: {show: true,lineStyle: {color: '#cccccc', type: 'dashed', opacity: 0.1}},
        // 轴文字
				axisLabel: {color: '#6f8dcb',fontSize: newSize(12),formatter: '{value}'}
			}]
      // 双y轴
      if(attr.y_name2){
        let yAxis2 = {
          name: attr.y_name2,
          nameTextStyle: {
            lineHeight: 16,
            align: 'center' 
          },
          type: 'value',
          min: attr.min2==0||attr.min2?attr.min2:(value) => {
            // 对于负值数据，确保min比数据最小值更小
            if (value.min < 0) {
              return Math.floor(value.min * 1.1); // 向下扩展10%
            }
            return 0; // 正值数据从0开始
          },
          max: attr.max2==0||attr.max2?attr.max2:(value) => {
            // 确保max比数据最大值更大
            const padding = Math.abs(value.max) * 0.1; // 10%的padding
            return Math.ceil(value.max + padding);
          },
          //刻度线
          axisTick: {show: false},
          // 轴线
          axisLine: {show: yLineShow,lineStyle: {color: '#6f8dcb'}},
          // 分割线
          splitLine: {show: !yLineShow,lineStyle: {color: '#939393'}},
          // 轴文字
          axisLabel: {color: '#6f8dcb',fontSize: newSize(12),formatter: '{value}'}
        }
        yAxis.push(yAxis2)
      }
      if(!allShow){
       xAxis.axisLabel.formatter=()=>""
       yAxis.forEach(item=>{ item.show=false})
      }
			const option = {
				grid: grid,
				tooltip: attr.tooltip? tooltip2 : tooltip1,
				legend: legend,
				dataZoom: dataZoom,
        visualMap: visualMap,
				xAxis: xAxis,
				yAxis: yAxis,
				series: seriesArr
			};
			return option
		},
  }
  export default setOption

