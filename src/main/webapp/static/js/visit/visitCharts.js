function visitDay() {
    var n = 60;
    $.ajax({
        url: APP_PATH + "/api/rest/nanshengbbs/v3.0/visit/getVisitRecordDay/" + n,
        type: "get",
        dataType: "json",
        success: function (data) {
            // 状态码
            var code = data.code;
            // 提示信息
            var msg = data.msg;
            if (code == 200) {
                var data = data.data;
                // 最近n天的数据
                var charts_day = echarts.init(document.getElementById('visitCharts_day'));
                charts_day.setOption(optionVisit(data, "最近"+ n +"天的访问信息", "day"));
                /*----------------------------------------- 所有年份的数据-end -----------------------------------------*/
            } else if (code == 500) {
                layer.msg(msg, {icon: 5});
            }
        },
        error: function () {
            layer.msg("出错！", {icon: 5});
        }
    });
}

/**
 * 构造折线图
 * @param data 数据
 * @param description 描述
 * @param timeType 时间类型
 */
function optionVisit(data, description, timeType) {
    // 横轴数据
    var echart_x = new Array();
    // 纵轴数据
    var echart_y = new Array();

    for (var i = 0; i < data.length; i++) {
        if (timeType == "day") {    // 天
            echart_x.push(dateFormatMD_zh(data[i].visittime));
        } else if (timeType == "month") {    // 周
            echart_x.push(dateFormatYM(data[i].visittime));
        } else if (timeType == "year") {     // 年
            echart_x.push(dateFormatY(data[i].visittime));
        }
        echart_y.push(data[i].count)
    }

    var option = {
        title: {
            text: description,
            subtext: '会话周期(30min)内多次访问只记录一次',
            left: 'center',
            textStyle:{color: '#193150'}
        },
        tooltip: {
            trigger: 'axis',
            formatter: function(data) {
                var color = '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:2px;background-color:#00a65a;"></span>';
                return data[0].name + ' 访问量<br>' + color + data[0].value + '次';
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: echart_x,
            axisLine: {
                lineStyle: {
                    color: '#fff' // x轴颜色
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#8c8c8c' // x轴文字颜色
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#fff' // y轴颜色
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#8c8c8c' // y轴文字颜色
                }
            },
            splitLine:{
                show: true,
                lineStyle:{
                    color: '#dedddd', // 网格线颜色
                    width: 1,
                    type: 'solid'
                }
            }//去除网格线
        },
        series: [{
            data: echart_y,
            type: 'line',
            areaStyle: {},
            markPoint: {
                data: [
                    {
                        type: 'max',
                        name: '最大值',
                        itemStyle:{
                            color: '#5d90f8'
                        },
                        symbolSize: 45
                    },
                    {
                        type: 'min',
                        name: '最小值',
                        itemStyle:{
                            color: '#ff9800'
                        },
                        symbolSize: 38
                    }
                ]
            },
            markLine: {
                data: [
                    {
                        type: 'average',
                        name: '平均值',
                        itemStyle:{
                            color: '#009688'
                        }
                    }
                ],
            },
            itemStyle:{
                color: '#d6e3fd',
                borderColor: '#000'
            },
            lineStyle:{
                color:'#5d90f8' //改变折线颜色
            },
            symbol: 'none'  // 取消折线上的小圆点
        }],
        backgroundColor: '#fff'
    };

    return option;
}