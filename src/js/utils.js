import {
	ElMessage
} from 'element-plus'
import {
	ElMessageBox
} from 'element-plus'

export default {
	name: "utils",
	/**
	 * 保存界面配置参数
	 * @param {Object} config
	 */
	saveConfig: (config) => {
		localStorage.setItem("config", JSON.stringify(config));
	},
	showerror: (msg) => {
		ElMessage.error(msg);
	},
	showconfirm: (msg) => {
		ElMessageBox.confirm(
				msg,
				'提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			)
			.then(() => {
				ElMessage({
					type: 'success',
					message: '退出成功',
				})
			})
			.catch(() => {})
	},
	/**
	 * 创建图表标题
	 * @param {Object} title
	 */
	createChartTitle: (title) => {
		return {
			show:true,
			text: title,
			textStyle: {
				color: "#fff",
				fontWeight: 'normal'
			},
			x: 'center',
			y: '5vh'
		}
	},
	/**
	 * 创建图表背景
	 * @param {Object} title
	 */
	createChartGaid: (left, right, top, bottom) => {
		return {
			left: left ? left : '30vh',
			right: right ? right : '10vh',
			top: top ? top : '10vh',
			bottom: bottom ? bottom : '40vh'
		}
	},
	/**
	 * 创建图表背景
	 * @param {Object} title
	 */
	createChartBaseOption: function(title, left, right, top, bottom, categorys)  {
		return {
			title: this.createChartTitle(title),
			tooltip: {
				show: true,
				trigger: 'axis'
			},
			grid: this.createChartGaid(left, right, top, bottom),
			xAxis: {
				type: 'category',
				axisLine: {
					show: true,
					lineStyle: {
						color: this.getChartXColor()
					}
				},
				axisLabel: {
					color: this.getChartXTextColor()
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: false
				},
				boundaryGap: false,
				data: categorys
			},
			yAxis: {
				type: 'value',
				axisLabel: {
					color: this.getChartYTextColor(),
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: this.getChartXColor()
					}
				},
				splitLine: {
					lineStyle: {
						color: this.getChartYColor(),
						type: 'dashed'
					},
				}
			}
		}
	},
	/**
	 * 获取x轴颜色
	 * @param {Object} title
	 */
	getChartXColor: () => {
		return '#2196f344'
	},
	/**
	 * 获取x轴文本颜色
	 * @param {Object} title
	 */
	getChartXTextColor: () => {
		return '#2196f3'
	},
	/**
	 * 获取y轴颜色
	 * @param {Object} title
	 */
	getChartYColor: () => {
		return '#2196f344'
	},
	/**
	 * 获取y轴文本颜色
	 * @param {Object} title
	 */
	getChartYTextColor: () => {
		return '#2196f3'
	},
	random: (max) => {
		return (Math.random(max) * max).toFixed(0);
	}
}

Date.prototype.format = function(fmt)  {
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k])
				.length)));
		}
	}
	return fmt;
}
