<template>
  <div class="data">
    <!-- header卡片 -->
    <el-card class="box-card">
      <div class="box">
        <div class="blue" v-text="one"></div>
        <span>今日新增</span>
      </div>
      <div class="box">
        <div class="blue" v-text="two"></div>
        <span>总用户量</span>
      </div>
      <div class="box">
        <div class="orage" v-text="three"></div>
        <span>新增试题</span>
      </div>
      <div class="box">
        <div class="orage" v-text="fore"></div>
        <span>总试题量</span>
      </div>
      <div class="box">
        <div class="green" v-text="six"></div>
        <span>总刷题量</span>
      </div>
      <div class="box">
        <div class="green" v-text="serven"></div>
        <span>人均刷题量</span>
      </div>
    </el-card>
    <!-- main卡片 -->
    <el-card class="box-card">
      <div ref="earch" style="width: 1000px;height:570px;"></div>
    </el-card>
  </div>
</template>

<script>
// 引入earch图表
import echarts from "echarts";
export default {
  data() {
    return {
      one: 0,
      two: 0,
      three: 0,
      fore: 0,
      five: 0,
      six: 0,
      serven: 0,
      eight: 0
    };
  },
  //生命周期钩子
  mounted() {
    var myChart = echarts.init(this.$refs.earch);

    // 指定图表的配置项和数据
    var option = {
      // color:['#FF409EFF','#FFF76137','#FFF9B358'],
      title: {
        text: "整体数据",
        x: "left",
        top: 60
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "right",
        data: ["黑马", "阿里", "京东"],
        itemGap: 30,
        left: 800,
        top: 80
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: "黑马" },
            { value: 310, name: "阿里" },
            { value: 234, name: "京东" }
          ]
        }
      ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  }
};
</script>

<style lang='less'>
.data {
  .el-card__body {
    display: flex;
    justify-content: space-around;
  }
  .box {
    // flex: 1;
    text-align: center;
  }
  .blue {
    width: 99px;
    height: 99px;
    border: 2px solid rgba(0, 134, 250, 1);
    border-radius: 50%;
    margin-bottom: 8px;
    text-align: center;
    line-height: 99px;
    font-size: 35px;
    color: rgba(0, 134, 250, 1);
  }
  .orage {
    width: 99px;
    height: 99px;
    border: 2px solid rgba(247, 97, 55, 1);
    border-radius: 50%;
    margin-bottom: 8px;
    text-align: center;
    line-height: 99px;
    font-size: 35px;
    color: rgba(247, 97, 55, 1);
  }
  .green {
    width: 99px;
    height: 99px;
    border: 2px solid rgba(85, 205, 120, 1);
    border-radius: 50%;
    margin-bottom: 8px;
    text-align: center;
    line-height: 99px;
    font-size: 35px;
    color: rgba(85, 205, 120, 1);
  }
}
</style>