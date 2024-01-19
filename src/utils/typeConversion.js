import { ref } from "vue";

// 重点人员类型
export const abnormalTypeArray = ref([
  {
    label: "非重点人员",
    value: 0
  },
  {
    label: "涉恐人员",
    value: 1
  },
  {
    label: "社稳人员",
    value: 2
  },
  {
    label: "重大刑事犯罪前科人员",
    value: 3
  },
  {
    label: "涉毒人员",
    value: 4
  },
  {
    label: "在逃人员",
    value: 5
  },
  {
    label: "肇事肇祸精神病人",
    value: 6
  },
  {
    label: "重点上访人员",
    value: 7
  },
  {
    label: "标记人员",
    value: 8
  }
])

// 转换重点人员类型
export const getAbnormalType = (value) => {
  const type = abnormalTypeArray.value.find((item) => item.value === value);
  return type ? type.label : "暂无分类"; // Default to "Unknown" if not found
};


// 人口类型
export const populationTypeArray = ref([
  {
    label: "流动人口",
    value: 1
  },
  {
    label: "常住人口",
    value: 2
  },
  {
    label: "实有人口",
    value: 3
  },
  {
    label: "陌生人",
    value: 4
  },
  {
    label: "异常行为",
    value: 5
  },
  {
    label: "搬入",
    value: 6
  },
  {
    label: "搬离",
    value: 7
  },
])

// 转换人口类型
export const getPopulationType = (value) => {
  const type = populationTypeArray.value.find((item) => item.value === value);
  return type ? type.label : "暂无分类"; // Default to "Unknown" if not found
};