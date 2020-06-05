function showCountrysProvinces(data) {
    // 统计访问信息-国家
    var visitCountrys = data.visitCountryCount;
    var countrys = new Array();//地址
    var country_count = new Array()//个数
    for (var i = 0; i < visitCountrys.length; i++) {
        var visitCountry = visitCountrys[i];
        countrys.push(visitCountry.visitcountry);
        country_count.push({"value": visitCountry.count, "name": visitCountry.visitcountry})
    }
    var myCharts1 = echarts.init(document.getElementById('visit_country'));
    option = {
        title: {
            text: '按国家统计',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        calculable: true,
        series: [
            {
                name: '国家',
                type: 'pie',
                radius: [6, 75],
                center: ['49%', 150],
                roseType: 'area',
                x: '50%',               // for funnel
                max: 40,                // for funnel
                sort: 'ascending',     // for funnel
                data: country_count
            }
        ]
    };
    myCharts1.setOption(option);

    //统计访问信息-中国省份
    var visitProvinces = data.visitProvinceCount;
    var provinces = new Array();//地址
    var province_count = new Array()//个数
    for (var i = 0; i < visitProvinces.length; i++) {
        var visitProvince = visitProvinces[i];
        provinces.push(visitProvince.visitprovince);
        province_count.push({"value": visitProvince.count, "name": visitProvince.visitprovince})
    }
    var myCharts2 = echarts.init(document.getElementById('visit_province'));
    option2 = {
        title: {
            text: '按中国省份统计',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        calculable: true,
        series: [
            {
                name: '省份',
                type: 'pie',
                radius: '55%',
                center: ['51%', '60%'],
                data: province_count
            }
        ]
    };
    myCharts2.setOption(option2);
}