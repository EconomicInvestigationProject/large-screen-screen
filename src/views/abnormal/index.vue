<template>
  <div class="abnormal">
    <div class="abnormal_back">
      <el-icon @click="back"><CaretLeft /></el-icon>
      <span class="abnormal_back_span">重点人员管理</span>
    </div>
    <div class="abnormal_content">
      <div class="abnormal_content_button">
        <el-button type="default" @click="dialogTableVisible = true"
          >重点人员添加</el-button
        >
      </div>
      <el-table
        :data="tableData"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
        height="400px"
        class="abnormal_content_table"
      >
        <el-table-column prop="timeStamp" label="时间" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column label="操作">
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
  <div id="my-dialog">
    <el-dialog v-model="dialogTableVisible" title="添加重点人员">
      <el-form
        ref="abnormalFormRef"
        :rules="abnormalFormRules"
        :model="abnormalForm"
        label-width="120px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="abnormalForm.name" />
        </el-form-item>
        <el-form-item label="身份证件号" style="color: #fff" prop="idCard">
          <el-input v-model="abnormalForm.idCard" />
        </el-form-item>
        <el-form-item label="在小区状态" prop="status">
          <el-switch v-model="abnormalForm.status" />
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit(abnormalFormRef)">提交</el-button>
          <el-button @click="onCancel(abnormalFormRef)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import {
  keypersonnelStatistics,
  deleteRecord,
  addRecord,
} from "../../api/keypersonnel";
import { reactive } from "vue";
import { ElMessage } from "element-plus";
const router = useRouter();
const back = () => {
  router.push("/ManagementCenter");
};

// 控制节点
const abnormalFormRef = ref(null);
// 重点人员列表
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
  try {
    if (res === "删除成功") {
      ElMessage.success(res);
      getList();
    } else {
      ElMessage.info("操作失败");
    }
  } catch (error) {
    ElMessage.info(error);
  }
};

// 控制弹窗是否显示
const dialogTableVisible = ref(false);
// 定义表单结构
const abnormalForm = reactive({
  name: "",
  idCard: "",
  status: false,
});

// 重点人员提交校验
const abnormalFormRules = reactive({
  name: [{ required: true, message: "请输入人员姓名", trigger: "blur" }],
  idCard: [
    { required: true, message: "请输入身份证件号码", trigger: "blur" },
    {
      pattern: /^\d{17}(\d|x)$/i,
      message: "身份证号格式不正确",
      trigger: "blur",
    },
  ],
});

//新增重点人员功能
const onSubmit = (abnormalFormRef) => {
  abnormalFormRef.validate(async (valid) => {
    if (valid) {
      // 表单校验通过，可以执行提交等操作
      if (abnormalForm) {
        const res = await addRecord(abnormalForm);
        if (res === "添加成功") {
          abnormalForm.name = "";
          abnormalForm.idCard = "";
          abnormalForm.status = false;
          dialogTableVisible.value = false;
          ElMessage.success(res);
        }
      }
    } else {
      ElMessage.error("表单填写有误");
    }
  });
};

const onCancel = (abnormalFormRef) => {
  abnormalFormRef.resetFields();
  abnormalForm.name = "";
  abnormalForm.idCard = "";
  abnormalForm.status = false;
  dialogTableVisible.value = false;
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
  background-color: #010936;
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

.abnormal_back_span {
  margin-left: 1rem;
}

.abnormal_content {
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.abnormal_content_button {
  display: flex;
  width: 60%;
  margin: 1.2rem;
}

/* 使用类名或者标签选择器来选中 el-button 元素 */
.abnormal_content_button .el-button {
  background-color: rgba(0, 0, 0, 0); /* 设置背景色为透明 */
  color: #ffffff; /* 可选：设置文本颜色 */
}

/* 如果想要在按钮悬停时有一些效果，可以添加 hover 样式 */
.abnormal_content_button .el-button:hover {
  border: 1px solid #409efc; /* 设置悬停时的背景色为淡淡的透明色 */
  color: #409efc; /* 可选：设置文本颜色 */
}

.abnormal_content_table {
  width: 60%;
  --el-table-border-color: rgba(222, 253, 255, 0.16);
}

// 设置列表的样式
:deep(.el-table) {
  background-color: transparent;
}

:deep(.el-table) {
  color: #fff;
  box-shadow: 0 0 1.5vw #fff inset;
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

.el-table__fixed::before {
  background-color: transparent;
}

// 设置弹窗的样式
:deep(.my-dialog) {
  background-color: transparent;
}

// 使用深度是选择器也生效了
:deep(.el-dialog) {
  background: rgba(0, 0, 0, 0.2) !important;
  border: rgb(57, 140, 255) 1px solid;
  backdrop-filter: blur(3px);
}

.el-dialog__header,
:deep(.el-dialog__title) {
  color: #fff;
}

:deep(.el-form-item__label) {
  color: #fff;
}
.el-dialog__headerbtn {
  color: #fff;
}

.el-dialog .el-button {
  background-color: rgba(0, 0, 0, 0); /* 设置背景色为透明 */
  color: #ffffff; /* 可选：设置文本颜色 */
}

.el-dialog .el-button:hover {
  border: 1px solid #409efc; /* 设置悬停时的背景色为淡淡的透明色 */
  color: #409efc; /* 可选：设置文本颜色 */
}

:deep(.el-dialog__title) {
  color: rgb(255, 255, 255);
  font-weight: 900;
}

:deep(.el-dialog__header) {
  color: #fff;
  text-align: center;
  // box-shadow: 0 0 1.5vw #fff inset;
  box-shadow: 0 0 1.5vw rgb(57, 140, 255) inset;
  background-repeat: no-repeat;
  background-size: 2px 20px, 20px 2px;
}

:deep(.el-dialog__body) {
  padding: 20px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 0 0 1.5vw rgb(57, 140, 255) inset;
  background-repeat: no-repeat;
  background-size: 2px 20px, 20px 2px;
}

:deep(.el-form-item__content) {
  background-repeat: no-repeat;
  border-radius: 10px;
}

:deep(.planTitle) {
  padding: 0 0 0 20px;
  color: #8ae3e9;
  font-size: 18px;
  font-weight: 600;
}

:deep(.planContent) {
  color: #e6feff;
  font-size: 16px;
}

:deep(.el-dialog) :deep(.el-button--primary) {
  color: #fff;
  border-color: rgb(57, 140, 255);
  position: absolute;
  margin-left: 374px;
}
</style>