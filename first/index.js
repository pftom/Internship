/*
 * data表示一个“嫌疑犯”的所有收发邮件的记录
 * name： 标志这条记录的 `名字`
 * value: 
 *  第一个字段: 标记这条邮件记录的收发 `时间`
 *  第二个字段：标题这个时间点收发邮件的 `条数`
 */

var data_zhangsan = [
  {name:'2016/12/18 6:38:08', value:['2016/12/18 6:38:08', 80]},
  {name:'2016/12/18 7:38:08', value:['2016/12/18 7:38:08', 60]},
  {name:'2016/12/18 16:18:18', value:['2016/12/18 16:18:18', 60]},
  {name:'2016/12/19 19:18:18', value:['2016/12/18 19:18:18', 90]},
  {name:'2016/12/19 19:18:18', value:['2016/12/19 19:18:18', 100]},
  {name:'2016/12/20 19:18:18', value:['2016/12/20 19:18:18', 120]},
  {name:'2016/12/21 19:18:18', value:['2016/12/21 19:18:18', 40]},
  {name:'2016/12/21 22:18:18', value:['2016/12/21 22:18:18', 20]},
];

var data_lisi = [
  {name:'2016/12/18 6:38:08', value:['2016/12/18 6:38:08', 80]},
  {name:'2016/12/18 7:38:08', value:['2016/12/18 7:38:08', 50]},
  {name:'2016/12/18 16:18:18', value:['2016/12/18 16:18:18', 40]},
  {name:'2016/12/19 19:18:18', value:['2016/12/18 19:18:18', 20]},
  {name:'2016/12/19 19:18:18', value:['2016/12/19 19:18:18', 70]},
  {name:'2016/12/20 19:18:18', value:['2016/12/20 19:18:18', 400]},
  {name:'2016/12/21 19:18:18', value:['2016/12/21 19:18:18', 123]},
  {name:'2016/12/21 22:18:18', value:['2016/12/21 22:18:18', 78]},
]

/*
 * legend 数据用来切换不同的嫌疑人以进行对比
 * 举个例子：
 *  张三：的收邮件的数据为上面 的  `data`
 *
 * 
 */ 
const legendData = ['张三', '李四']

/*
 * anchor 数据用来扩展  时间表示格式 到“小时”  不可删改。
 * 
 */
var anchor = [
  {name:'2016/12/18 00:00:00', value:['2016/12/18 00:00:00', 0]},
  {name:'2016/12/25 00:00:00', value:['2016/12/25 00:00:00', 0]}
  ];

option = {
      title : {
          text: '收发邮件趋势图',
          x: 'center',
          textStyle:{
            fontSize:16
          }
      },
    color:["#80cbc4"],
    grid: {
          bottom: 70
      },
      legend:{
        /* 
         * 表示选择多个不同的“嫌疑犯”进行比较
         * 每增加一个嫌犯， 就在legendData 增加一个嫌犯的 `名字`
         */ 

        data: legendData,
        x:'left'
      },
      tooltip : {
          trigger: 'axis',
          axisPointer:{
            lineStyle:{
              type:'dashed',
              color:'#a4a4a4',
              opacity:0.7
            }
          },
          formatter: function (params) {
                      params = params[0];
                      var date = new Date(params.name);
                      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
                  },
      },
      dataZoom:[
        {
          show:true,
          realtime:true,
          start:30,
          end:70,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            handleSize: '30%',
            handleStyle: {
                color: '#80cbc4'
            },
              fillerColor:'#d8faf4',
             borderColor:"#b1b1b1"
        }
      ],
      xAxis : [
          {
              type : 'time',
              axisTick: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#90979c'
                }
            },
              
          }
      ],
      yAxis: [
          {
            boundaryGap: [0, '100%'],
              type: 'value'
          }
      ],
      series: [
          {
              name:'张三',
              type:'line',
//		            smooth:true,
              hoverAnimation:true,
              symbolSize:8,
              itemStyle:{
                emphasis:{
                  color:'#80cbc4',
                  borderColor:'#fff',
                  borderWidth:4,
                  borderType:'solid',
                  shadowBlur:5,
                  shadowColor:'#9c9a9b',	
                }
              },
              lineStyle: {
                  normal: {
                      width: 1,
                  }
              },
              data: data_zhangsan,
          },
          /* 以上是一个`嫌疑犯`的数据
           * 如果想要增加嫌疑人数据，添加一个类似的上述 `对象`， 然后将 `data` 字段给与不同的数据。
           * 同时给 legendData 加上 `嫌疑犯名字`
           */ 
          {
            name:'李四',
            type:'line',
//		            smooth:true,
            hoverAnimation:true,
            symbolSize:8,
            itemStyle:{
              emphasis:{
                color:'#80cbc4',
                borderColor:'#fff',
                borderWidth:4,
                borderType:'solid',
                shadowBlur:5,
                shadowColor:'#9c9a9b',	
              }
            },
            lineStyle: {
                normal: {
                    width: 1,
                }
            },
            data: data_lisi,
        },
          {
                  name:'.anchor',
                  type:'line', 
                  showSymbol:false, 
                  data:anchor,
                  itemStyle:{normal:{opacity:0}},
                  lineStyle:{normal:{opacity:0}}
              }
      ]
  };