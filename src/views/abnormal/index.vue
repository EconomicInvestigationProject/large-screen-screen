<template>
  <div class="abnormal">
    <div class="abnormal_back">
      <el-icon @click="back"><CaretLeft /></el-icon>
    </div>
    <div class="abnormal_content">
      <div class="abnormal_content_top">
        <el-icon><WarnTriangleFilled /></el-icon>
        <span class="abnormal_content_top_span">重点人员管理</span>
      </div>
      <div class="abnormal_content_button">
        <el-button type="default">重点人员添加</el-button>
      </div>
      <el-table :data="tableData" class="abnormal_content_table">
        <el-table-column fixed prop="timeStamp" label="时间" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column fixed="right" label="操作" width="120">
          <template #default="scope">
            <el-button
              link
              type="primary"
              @click="deleteAbnormal(scope.row)"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { keypersonnelStatistics, deleteRecord } from "../../api/keypersonnel";
import { ElMessage } from "element-plus";
const router = useRouter();
const back = () => {
  router.push("/index");
};
const tableData = ref([]);
// 小区重点人员
const getList = async () => {
  const res = await keypersonnelStatistics();
  if (res) {
    let data = [];
    data = res;
    data.forEach((item) => {
      if (item.status === "in") {
        item.status = "进入小区";
      } else if (item.status === "out") {
        item.status = "离开小区";
      }
    });
    tableData.value = data;
  }
};

// 删除小区重点人员
const deleteAbnormal = async (item) => {
  const res = await deleteRecord({ idCard: item.idCard });
  if (res === "删除成功") {
    ElMessage.success(res);
  }else{
    ElMessage.info('操作失败')
  }
};

onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped>
.abnormal {
  display: flex;
  flex-direction: column;
  height: 92.5vh;
  overflow: hidden;
  margin: 0px;
  padding: 0;
}

.abnormal_back {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 10rem;
  font-size: 2rem;
  height: 5rem;
}
.abnormal_content {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.abnormal_content_top {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.8rem;
  height: 10rem;
  width: 60%;
}

.abnormal_content_top_span {
  margin-left: 1rem;
}

.abnormal_content_button {
  display: flex;
  width: 60%;
  margin: 1.2rem;
}

.abnormal_content_table {
  width: 60%;
  --el-table-border-color: rgba(222, 253, 255, 0.16);
}

:deep(.el-table) {
  background-color: transparent;
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

.el-table__fixed::before {
  background-color: transparent;
}
</style>