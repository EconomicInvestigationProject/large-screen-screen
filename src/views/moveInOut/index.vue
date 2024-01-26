<template>
  <div class="moveInOut">
    <div class="moveInOut_top">
      <div class="moveInOut_top_left">
        <el-icon size="20" @click="back"><CaretLeft /></el-icon>
        <span class="moveInOut_back_span">新入/搬离</span>
      </div>
      <div class="moveInOut_top_right">
        <el-select
          v-model="community"
          placeholder="请选择小区"
          style="width: 240px"
          @change="handleSelectChange"
        >
          <el-option
            v-for="item in communityTypeArray"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </div>
    <div class="moveInOut_content">
      <div class="moveInOut_content_top">
        <div class="moveInOut_content_top_left">
          <span class="moveInOut_content_top_right_span">搬入总数</span>
          <span>{{ TotalMovedInCount }}</span>
        </div>
        <div class="moveInOut_content_top_right">
          <span class="moveInOut_content_top_right_span">搬离总数</span>
          <span>{{ TotalMovedOutCount }}</span>
        </div>
      </div>
      <div class="moveInOut_content_button">
        <div
          class="moveInOut_content_button_item moveInOut_content_button_trajectory"
        >
          人员查询:
        </div>
        <el-select
          v-model="moveType"
          placeholder="请选择类型"
          style="width: 240px"
        >
          <el-option
            v-for="item in moveTypeArray"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <div
          class="moveInOut_content_button_date moveInOut_content_button_item"
        >
          <el-date-picker
            v-model="date"
            type="datetimerange"
            start-placeholder="开始日期"
            :picker-options="pickerOptions"
            end-placeholder="结束日期"
            format="YYYY/MM/DD hh:mm:ss"
            value-format="YYYY-MM-DD h:m:s"
            style="width: 100%"
          />
        </div>
        <el-button
          color="#fff"
          class="moveInOut_content_button_search moveInOut_content_button_item"
          @click="getPageData"
        >
          搜索
        </el-button>
      </div>
      <el-table
        :data="tableData"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        height="400px"
        class="moveInOut_content_table"
      >
        <el-table-column prop="name" label="照片">
          <template #default="scope">
            <el-avatar :size="60" :src="scope.row.facePath" />
          </template>
        </el-table-column>
        <el-table-column prop="faceId" label="FaceId" min-width="150" />
        <el-table-column prop="userKeyType" label="类型">
          <template #default="scope">
            {{ getAbnormalType(scope.row.userKeyType) }}
          </template>
        </el-table-column>
        <el-table-column prop="community" label="社区" min-width="120" />
        <el-table-column prop="building" label="楼号-单元" min-width="120" />
        <el-table-column prop="floor" label="楼层" min-width="120" />
        <el-table-column prop="userType" label="类别">
          <template #default="scope">
            {{ getPopulationType(scope.row.userType) }}</template
          >
        </el-table-column>
        <el-table-column prop="timeStamp" label="时间" min-width="120" />
        <el-table-column prop="name" label="姓名" min-width="120" />
        <el-table-column prop="idCard" label="身份证" min-width="120" />
      </el-table>
      <el-pagination
        class="custom-pagination"
        :page-size="pageSize"
        :pager-count="10"
        :page-count="pageCount"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
    
    <script setup>
import { onMounted, ref, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getTotal, getMoveInoutPage } from "../../api/moveInout";
import { getAbnormalType, getPopulationType } from "../../utils/typeConversion";
import { ElMessage } from "element-plus";
const router = useRouter();
const route = useRoute();
const back = () => {
  router.back();
};

// 选中小区
const community = ref("");
// 小区列表
const communityTypeArray = ref([
  {
    label: "全部",
    value: "",
  },
  {
    label: "贤文花园新南区",
    value: "贤文花园新南区",
  },
  {
    label: "金龙怡心苑",
    value: "金龙怡心苑",
  },
]);
const TotalMovedInCount = ref("0");
const TotalMovedOutCount = ref("0");

// 根据不同小区显示不同数据
const handleSelectChange = async () => {
  let params = { community: community.value };
  const res = await getTotal(params);
  if (res) {
    TotalMovedInCount.value = res.TotalMovedInCount;
    TotalMovedOutCount.value = res.TotalMovedOutCount;
    getPageData();
  }
};

// 人员列表
const tableData = ref([]);
//搬入搬离类型
const moveType = ref("");
// 搬入搬离类型
const moveTypeArray = ref([
  {
    label: "全部",
    value: "",
  },
  {
    label: "搬入",
    value: "搬入",
  },
  {
    label: "搬离",
    value: "搬离",
  },
]);

// 查询日期
const date = ref([]);

// 计算属性，格式化日期
const formattedDate = (item) => {
  const selectedDate = new Date(item);
  const year = selectedDate.getFullYear();
  const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
  const day = String(selectedDate.getDate()).padStart(2, "0");
  const hours = String(selectedDate.getHours()).padStart(2, "0");
  const minutes = String(selectedDate.getMinutes()).padStart(2, "0");
  const seconds = String(selectedDate.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 设置对应的日期查询样式
const pickerOptions = reactive({
  disabledDate(time) {
    return time.getTime() < Date.now();
  },
  styles: {
    color: "#fff", // 设置日期文字颜色为白色
    backgroundColor: "#fff", // 设置日期选择器面板背景颜色为深灰色
  },
});

//实现分页查询
const currentPage = ref(1); //当前页数
const pageSize = ref(10); //每页显示条目个数
const pageCount = ref(1); //总页数
const total = ref(10); //总条数

// 初始化分页
const getPageData = async () => {
  let startDate = "";
  let endDate = "";
  if (date.value && date.value.length > 0) {
    startDate = date && formattedDate(date.value[0]);
    endDate = date && formattedDate(date.value[1]);
  } else {
    startDate = "";
    endDate = "";
  }
  const params = {
    community: community.value,
    moveType: moveType.value,
    pageSize: pageSize.value,
    currentPage: currentPage.value,
    startDate: startDate,
    endDate: endDate,
  };
  try {
    const res = await getMoveInoutPage(params);
    if (res && res.data) {
      let data = res.data;
      data.forEach((item) => {
        item.facePath = "http://218.56.104.54:9001" + item.facePath;
      });
      currentPage.value = res.currentPage;
      total.value = parseInt(res.total);
      pageCount.value = parseInt(res.pageCount);
      tableData.value = data;
    }
  } catch (error) {
    ElMessage.info(error);
  }
};

//分页查询
const handleCurrentChange = async (item) => {
  currentPage.value = item;
  let startDate = "";
  let endDate = "";
  if (date.value && date.value.length > 0) {
    startDate = date && formattedDate(date.value[0]);
    endDate = date && formattedDate(date.value[1]);
  } else {
    startDate = "";
    endDate = "";
  }
  const params = {
    community: community.value,
    moveType: moveType.value,
    pageSize: pageSize.value,
    currentPage: currentPage.value,
    startDate: startDate,
    endDate: endDate,
  };
  try {
    const res = await getMoveInoutPage(params);
    if (res && res.data) {
      let data = res.data;
      data.forEach((item) => {
        item.facePath = "http://218.56.104.54:9001" + item.facePath;
      });
      currentPage.value = res.currentPage;
      total.value = parseInt(res.total);
      pageCount.value = parseInt(res.pageCount);
      tableData.value = data;
    }
  } catch (error) {
    ElMessage.info(error);
  }
};

onMounted(() => {
  handleSelectChange();
  getPageData();
});
</script>
    
    <style lang="scss" scoped>
.moveInOut {
  display: flex;
  flex-direction: column;
  height: 92.5vh;
  overflow: hidden;
  background-color: #010936;
  margin: 0px;
  padding: 0;
}

.moveInOut_top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 2rem;
  height: 5rem;
  margin: 0 2rem;
}

.moveInOut_top_span {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.moveInOut_content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.moveInOut_content_top {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.moveInOut_content_top_left,
.moveInOut_content_top_right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
  border: 2px solid #fff;
  margin: 2rem 0 4rem 0;
}

.el-select :deep(.el-input__wrapper) {
  background-color: transparent !important;
  color: #fff !important;
}

:deep(.el-input__inner) {
  color: #fff;
}

.moveInOut_content_button {
  display: flex;
  flex-wrap: wrap; /* 允许自动换行 */
  flex-direction: row;
  width: 60%;
  margin: 3rem 0 2rem 0;
}

.moveInOut_content_button_item {
  margin-right: 20px;
  margin-bottom: 10px;
}

/* 当视图宽度小于600像素时应用的样式 */
@media screen and (max-width: 630px) {
  .moveInOut_content_button {
    min-width: auto;
  }
  .moveInOut_content_button_item {
    margin: 10px 0;
  }
}

.moveInOut_content_button_switch :deep(.el-switch__label) {
  min-width: 120px;
  color: #fff !important;
}

.moveInOut_content_button :deep(.el-input__wrapper) {
  background-color: transparent !important;
  color: #fff !important;
}

.moveInOut_content_button :deep(.el-input__inner) {
  color: #fff;
}

.moveInOut_content_button_date {
  margin-left: 10px;
  width: 300px;
}

.moveInOut_content_button_search {
  margin-left: 10px;
}

/* 使用类名或者标签选择器来选中 el-button 元素 */
.moveInOut_content_button .el-button {
  background-color: rgba(0, 0, 0, 0); /* 设置背景色为透明 */
  color: #ffffff; /* 可选：设置文本颜色 */
}

/* 如果想要在按钮悬停时有一些效果，可以添加 hover 样式 */
.moveInOut_content_button .el-button:hover {
  border: 1px solid #409efc; /* 设置悬停时的背景色为淡淡的透明色 */
  color: #409efc; /* 可选：设置文本颜色 */
}

.moveInOut_content_table {
  width: 60%;
  --el-table-border-color: rgba(222, 253, 255, 0.16);
}

// 设置列表的样式
:deep(.el-table) {
  background-color: transparent;
}

:deep(.el-table) {
  color: #fff;
  box-shadow: 0 0 0.2vw #fff inset;
}

:deep(.el-table__body-wrapper) {
  background-repeat: no-repeat;
  background-size: 2px 20px;
}

:deep(.el-table__expanded-cell) {
  background-color: transparent;
  color: #ffffff;
}

:deep(.el-table th) {
  background-color: rgba(0, 238, 246, 0.08) !important;
  color: #ffffff;
}

:deep(.el-table tr) {
  background-color: transparent !important;
  color: #ffffff;
}

:deep(.el-table td) {
  background-color: transparent !important;
}

:deep(.el-table__fixed)::before {
  background-color: transparent;
}

v-deep .el-table::-webkit-scrollbar {
  width: 12px;
}

v-deep .el-table::-webkit-scrollbar-thumb {
  background-color: #f7f4f4;
  border-radius: 10px;
}

v-deep .el-table::-webkit-scrollbar-track {
  background-color: #fff;
}

:deep(.el-form-item__content) {
  background-repeat: no-repeat;
  border-radius: 10px;
}

:deep(.el-pagination) {
  margin-top: 20px;
  --el-pagination-bg-color: #010936;
  --el-pagination-button-disabled-color: #fff;
  --el-pagination-text-color: #fff;
}
:deep(.el-pagination) button {
  color: #fff;
  background-color: transparent !important;
}

:deep(.el-pagination) button:hover {
  color: var(--el-pagination-hover-color);
}

:deep(.el-pagination) button:disabled {
  background-color: transparent !important;
}

:deep(.el-pagination) .btn-next .el-icon {
  font-size: 18px;
}
:deep(.el-pagination) .btn-prev .el-icon {
  font-size: 18px;
}

:deep(.el-pagination) .el-pager li {
  color: #fff;
}

:deep(.el-pagination) .el-pager li.is-active {
  color: var(--el-pagination-hover-color);
}

.moveInOut_content_button_trajectory {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}
</style>