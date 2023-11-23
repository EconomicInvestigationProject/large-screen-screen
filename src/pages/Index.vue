<template>
	<el-row :gutter="20" style="margin-left: 0;margin-right: 0px;margin-top: 1vh;">
		<el-col :span="8">
			<!-- 最新公告 -->
			<chartpanel title="最新公告" style="height: 30vh;margin-top: 1vh;">
				<vue3-seamless-scroll :list="newsdatas" class="indexscroll">
					<div class="item flex" v-for="(item, index) in newsdatas" :key="index">
						<div class="flex_item">{{item.title}}</div>
						<div class="date">{{item.date}}</div>
						<div class="status">{{item.status}}</div>
					</div>
				</vue3-seamless-scroll>
			</chartpanel>
			<!-- 基础信息（入住人数、户数、车位数、楼栋数等） -->
			<chartpanel title="基本信息" style="height: 30vh;">
				<div class="flex">
					<div class="flex_item">
						<div ref="allchart" id="allchart" style="height:26vh;position: relative"></div>
					</div>
					<div class="flex_item" style="padding-top: 2vh;">
						<div class="flex" style="margin-top:1vh;">
							<div class="flex_item">
								<div class="baseitem text_color_1">
									<div class="value">{{baseinfo.count}}</div>
									<div class="label">住户数</div>
								</div>
							</div>
							<div class="split_line_h"></div>
							<div class="flex_item">
								<div class="baseitem text_color_2">
									<div class="value">{{baseinfo.car}}</div>
									<div class="label">车位数</div>
								</div>
							</div>
						</div>
						<div class="split_line_w"></div>
						<div class="flex" style="margin-top:1vh;">
							<div class="flex_item">
								<div class="baseitem text_color_3">
									<div class="value">{{baseinfo.empty}}</div>
									<div class="label">空置率</div>
								</div>
							</div>
							<div class="split_line_h"></div>
							<div class="flex_item">
								<div class="baseitem text_color_4">
									<div class="value">{{baseinfo.used}}</div>
									<div class="label">入住率</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</chartpanel>
		</el-col>
		<el-col :span="16">
			<!-- 社区照片 -->
			<chartpanel style="height: 61vh;">
				<div class="images">
					<img src="@/assets/1.webp" class="images" />
					<div class="bg"></div>
					<span class="title_1">智慧社区</span>
					<span class="title_2">依山傍水，幸福之家</span>
				</div>
			</chartpanel>
		</el-col>
	</el-row>
	<el-row :gutter="20" style="margin-left: 0;margin-right: 0px;margin-top: 1vh;">
		<el-col :span="8">
			<chartpanel title="设备监控" style="height: 29vh;">
				<v-chart ref="devicechart" style="height:25vh" :option="devicechartoption" />
			</chartpanel>
		</el-col>
		<el-col :span="16" class="index">
			<chartpanel title="视频监控" style="height: 29vh;">
				<!-- Swiper -->
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<!-- <div class="item flex" v-for="(item, index) in videos" :key="index">
							<div class="swiper-slide">
								<img :src="'./src'+item" style="width: 100%;height:100%;">
							</div>
						</div> -->
						<div class="swiper-slide">
							<img src="@/assets/11.webp" style="width: 100%;height:100%;">
						</div>
						<div class="swiper-slide">
							<img src="@/assets/10.webp" style="width: 100%;height:100%;">
						</div>
						<div class="swiper-slide">
							<img src="@/assets/9.webp" style="width: 100%;height:100%;">
						</div>
						<div class="swiper-slide">
							<img src="@/assets/8.webp" style="width: 100%;height:100%;">
						</div>
						<div class="swiper-slide">
							<img src="@/assets/7.webp" style="width: 100%;height:100%;">
						</div>
						<div class="swiper-slide">
							<img src="@/assets/6.webp" style="width: 100%;height:100%;">
						</div>
						<div class="swiper-slide">
							<img src="@/assets/5.webp" style="width: 100%;height:100%;">
						</div>
						<div class="swiper-slide">
							<img src="@/assets/4.webp" style="width: 100%;height:100%;">
						</div>
						<div class="swiper-slide">
							<img src="@/assets/3.webp" style="width: 100%;height:100%;">
						</div>
						<div class="swiper-slide">
							<img src="@/assets/2.webp" style="width: 100%;height:100%;">
						</div>
					</div>
				</div>
			</chartpanel>
		</el-col>
	</el-row>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		onBeforeUnmount,
		computed
	} from 'vue'

	import VChart, {
		THEME_KEY
	} from "vue-echarts";

	import {
		Vue3SeamlessScroll
	} from "vue3-seamless-scroll";

	import config from '@/js/config.js'
	import utils from '@/js/utils.js'
	import chartutils from '@/js/chartutils.js'

	import * as echarts from 'echarts';
	import 'echarts-extension-amap';
	import 'echarts-wordcloud';
	import 'echarts-liquidfill';
	
	import Swiper from 'swiper';
	import 'swiper/dist/css/swiper.min.css';

	import chartpanel from '@/components/chartpanel.vue'

	const $echarts = echarts;
	
	const baseinfo = reactive({
		count:utils.random(1000),
		empty:utils.random(1000),
		car:utils.random(1000),
		used:utils.random(1000)
	});

	//新闻资讯数据
	const newsdatas = reactive([{
		title: '业主投诉，公共卫生问题',
		date: '15:11',
		status: '待处理'
	}, {
		title: '业主投诉，车位被占用问题',
		date: '15:11',
		status: '待处理'
	}, {
		title: '大门摄像头故障',
		date: '15:11',
		status: '待处理'
	}, {
		title: '业主投诉，车位被占用问题',
		date: '15:11',
		status: '待处理'
	}, {
		title: '大门摄像头故障',
		date: '15:11',
		status: '待处理'
	}, {
		title: '业主投诉，车位被占用问题',
		date: '15:11',
		status: '待处理'
	}, {
		title: '大门摄像头故障',
		date: '15:11',
		status: '待处理'
	}, {
		title: '业主投诉，车位被占用问题',
		date: '15:11',
		status: '待处理'
	}, {
		title: '大门摄像头故障',
		date: '15:11',
		status: '待处理'
	}]);

	//综合统计图标
	let allchart = ref();
	let allchartoption = reactive({});
	let allchartvalue = ref(utils.random(100));
	
	//设备统计
	let devicechart = ref();
	let devicechartoption = reactive({});
	let devicechartcategory = reactive(['正常','故障','信号弱','离线','告警']);
	let devicechartvalues = reactive([]);
	
	//视频监控
	let swiper = null;

	//初始化图标
	const initCharts = () => {
		initAllChart1();

		// option, category, values, color, title
		devicechartcategory.forEach((item,index)=>{
			devicechartvalues.push(utils.random(1000));
		})
		chartutils.initBarChart(devicechartoption, devicechartcategory, devicechartvalues, '#6648FF');
		
		setTimeout(()=>{
			swiper = new Swiper('.swiper-container', {
				slidesPerView: 4,
				spaceBetween: 20,
				freeMode: true,
				autoplay : 1000,
				loop : true
			});
		},300);
	}

	let timer = null;
	const startRefreshChart = () => {
		timer && clearInterval(timer);

		//获取刷新周期，TODO 配置变动时，此处需自动更新
		let refreshtime = 60 * 1000;
		config.getConfig().forEach(function(item, index) {
			if (item.key == 'refreshtime') {
				refreshtime = item.value;
			}
		});

		timer = setInterval(function() {
			allchartvalue.value = utils.random(100);
			allchartoption.graphic[0].children[0].style.text = (allchartvalue.value)+'%';
			allchartoption.series[0].data[0] = allchartvalue.value/100;
			allchart.setOption(allchartoption);
			
			devicechartvalues.forEach((item,index)=>{
				devicechartvalues[index] = utils.random(1000);
			})
			
			baseinfo.count = utils.random(1000),
			baseinfo.empty = utils.random(1000),
			baseinfo.car = utils.random(1000),
			baseinfo.used = utils.random(1000)
		}, refreshtime);
	}

	//挂
	onMounted(() => {
		initCharts();
		startRefreshChart();

		//图表尺寸自适应
		window.onresize = () => {
			allchart && allchart.resize();
			devicechart && devicechart.resize();
		}
	});
	onBeforeUnmount(() => {
		timer && clearInterval(timer);
	});

	const initAllChart1 = () => {
		let option = {
			title: {
				text: '社区入住率',
				textStyle: {
					fontSize: 24,
					color: "#fff",
					rich: {
						a: {
							fontSize: 36,
						}
					}
				},
				x: "center",
				y: "55%"
			},
			graphic: [{
				type: "group",
				left: "center",
				top: "45%",
				children: [{
					type: "text",
					z: 100,
					left: "10",
					top: "45%",
					style: {
						fill: "#ffffff",
						text: (allchartvalue.value)+'%',
						font: "2.8rem"
					}
				}]
			} ],
			series: [{
				name: "水球图",
				type: "liquidFill",
				radius: "95%",
				data: [allchartvalue.value/100],
				color: [{
					type: "linear",
					x: 0,
					y: 1,
					x2: 0,
					y2: 0,
					colorStops: [{
							offset: 1,
							color: ["rgba(2,144,255,0.4)"], // 0% 处的颜色
						},
						{
							offset: 0,
							color: ["rgba(45,175,230,0.8)"], // 100% 处的颜色
						},
					],
					global: false, // 缺省为 false
				}, ],
				label: {
					formatter: "",
				},
				outline: {
					show: true,
					borderDistance: 0,
					itemStyle: {
						borderColor: new echarts.graphic.LinearGradient(
							0,
							1,
							0,
							0,
							[{
									offset: 1,
									color: "rgba(21, 80, 161, 0.01)",
								},
								{
			 					offset: 0,
									color: "rgba(15, 115, 238, 0.6)",
								},
							]
						),
						borderWidth: 3,
					},
				},
				backgroundStyle: {
					color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [{
							offset: 1,
							color: "rgba(15, 115, 238,0.3)",
						},
						{
							offset: 0.95,
							color: "rgba(15, 115, 238, 0.5)",
						},
						{
							offset: 0.8,
							color: "rgba(15, 115, 238, 0.3)",
						},
						{
							offset: 0.4,
							color: "rgba(21, 80, 161, 0.01)",
						}
					])
				}
			}]
		};
		for (let key in option) {
			allchartoption[key] = option[key];
		}
		allchart = $echarts.init(document.getElementById('allchart'));
		allchart.setOption(allchartoption);
	}
</script>

<style>
	.images {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}

	.images .img {
		width: 100%;
		height: 100%;
	}

	.images .bg {
		position: absolute;
		z-index: 2;
		right: 0vw;
		top: 0vw;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(to right, #ffffff00, #00bcd452);
	}

	.images .title_1 {
		writing-mode: tb-rl;
		font-size: 35px;
		letter-spacing: 0.6vw;
		position: absolute;
		z-index: 2;
		right: 1vw;
		top: 0vw;
		padding-top: 3vh;
		display: inline-block;
		height: 100%;
		background: linear-gradient(to bottom, #ff1100, #da00ff, #ff0157);
		-webkit-background-clip: text;
		color: transparent;
		/* color:#fff; */
		text-shadow: 5px 2px 6px #f8f8f833;
		-webkit-text-stroke: 0.5px #f8f8f899;
	}

	.images .title_2 {
		writing-mode: tb-rl;
		font-size: 30px;
		letter-spacing: 0.6vw;
		position: absolute;
		z-index: 2;
		right: 4vw;
		top: 0vw;
		padding-top: 1vh;
		text-align: center;
		display: inline-block;
		height: 100%;
		background: linear-gradient(to bottom, #ff1100, #da00ff, #ff0157);
		-webkit-background-clip: text;
		color: transparent;
		/* color:#fff; */
		text-shadow: 5px 2px 6px #f8f8f833;
		-webkit-text-stroke: 0.5px #f8f8f899;
	}

	.indexscroll {
		height: 25vh;
		width: 100%;
		overflow: hidden;
	}

	.indexscroll .item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1vh 0.8vh;
		font-size: 1.4rem;
		border-radius: 0.5vh;
	}

	.indexscroll .item:nth-child(even) {
		background-color: rgba(255, 255, 255, 0.1);
	}

	.indexscroll .item .date {
		width: 4vw;
	}

	.indexscroll .item .status {
		width: 3vw;
		color: #FF0157;
	}

	.baseitem {
		text-align: center;
	}

	.baseitem .value {
		font-size: 2.5rem;
		height: 5vh;
		line-height: 5vh;
	}

	.baseitem .label {
		font-size: 2rem;
		height: 3vh;
		line-height: 3vh;
	}
	
	.index .swiper-container {
		width: 100%;
		height: 24vh;
		margin: 0vw auto;
	}
	.index .swiper-slide {
		text-align: center;
		font-size: 1.8rem;
		background: #fff;
		/* Center slide text vertically */
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
	}
</style>
