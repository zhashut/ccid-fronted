<template>
  <div class="processing">
    <div class="table" style="flex: 1">
      <div class="header">
        <div>数据任务管理</div>
        <a-button type="primary" @click="handleColumns"
          >+ <span style="margin-left: 10px">新建任务</span></a-button
        >
      </div>
      <a-table :columns="columns" :data-source="data" :pagination="pagination">
        <template #bodyCell="{ column, record }">
          <!-- 自定义名称列 -->
          <template
            v-if="
              column.key != 'type' &&
              column.key != 'status' &&
              column.key != 'operation'
            "
          >
            {{ record[column.dataIndex] }}
          </template>

          <template v-if="column.key === 'type'">
            <a-tag v-if="record.type === '专利'" color="blue">{{
              record.type
            }}</a-tag>
            <a-tag v-else-if="record.type === '论文'" color="green">{{
              record.type
            }}</a-tag>
            <a-tag v-else color="orange">{{ record.type }}</a-tag>
          </template>

          <template v-if="column.key === 'status'">
            <a-tag v-if="record.status === '已完成'" color="blue">{{
              record.status
            }}</a-tag>
            <a-tag v-else-if="record.status === '未完成'" color="pink">{{
              record.status
            }}</a-tag>
            <a-tag v-else color="blue">{{ record.status }}</a-tag>
          </template>

          <template v-if="column.key === 'operation'">
            <div style="display: flex; gap: 10px">
              <div
                class="controls"
                style="color: #1677ff"
                @click="updataPatentTable(record)"
              >
                <img src="" alt="" /> <span>编辑</span>
              </div>
              <div class="controls" style="color: red">
                <img src="" alt="" /> <span>删除</span>
              </div>
            </div>
          </template>
        </template>
      </a-table>
    </div>
    <div class="table" style="width: 600px">
      <div class="header">
        <div>团队成员</div>
        <a-button type="primary" @click="handleColumnsTwo"
          >+ <span style="margin-left: 10px">添加成员</span></a-button
        >
      </div>
      <a-table
        :columns="columnsTwo"
        :data-source="data"
        :pagination="pagination"
      >
        <template #bodyCell="{ column, record }">
          <!-- 自定义名称列 -->
          <template v-if="column.key != 'role' && column.key != 'operation'">
            {{ record[column.dataIndex] }}
          </template>

          <template v-if="column.key === 'role'">
            <a-tag v-if="record.type === '管理员'" color="red">{{
              record.type
            }}</a-tag>
            <a-tag v-else color="blue">{{ record.type }}</a-tag>
          </template>

          <template v-if="column.key === 'operation'">
            <div style="display: flex; gap: 10px">
              <div
                class="controls"
                style="color: #1677ff"
                @click="updataTeamMemberTable(record)"
              >
                <img src="" alt="" /> <span>编辑</span>
              </div>
              <div class="controls" style="color: red">
                <img src="" alt="" /> <span>删除</span>
              </div>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>
  <!-- 弹窗 -->
  <a-modal
    v-model:open="modalVisible"
    :title="modalValue"
    style="top: 30px"
    @ok="setModal1Visible(false)"
  >
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      style="margin-top: 40px; margin-left: -40px"
      v-if="modalValue === '新建任务' || modalValue === '更新任务'"
    >
      <a-form-item label="专利ID" name="id">
        <a-input v-model:value="formState.id" />
      </a-form-item>
      <a-form-item label="专利名称" name="title">
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item label="申请人" name="applicant">
        <a-input v-model:value="formState.applicant" />
      </a-form-item>
      <a-form-item label="技术领域" name="field">
        <a-input v-model:value="formState.field" />
      </a-form-item>
    </a-form>

    <a-form
      :model="formStateTwo"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      style="margin-top: 40px; margin-left: -40px"
      v-else
    >
      <a-form-item label="姓名" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="角色" name="role">
        <a-input
          v-model:value="formState.role"
          aria-placeholder="1:查看, 2:编辑, 3:管理"
        />
      </a-form-item>
    </a-form>

    <template #footer>
      <a-button @click="handleCancel">取消</a-button>
      <a-button type="primary" @click="handleSubmit">确定</a-button>
    </template>
  </a-modal>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import api from "@/api/index";

onMounted(() => {
  getData();
});
// table
// 分页配置
const pagination = ref({
  current: 1, // 当前页码
  pageSize: 10, // 每页显示条数
  onChange: (page, pageSize) => {
    // 页码改变回调
    pagination.value.current = page;
    pagination.value.pageSize = pageSize;
  },
});
const columns = [
  {
    title: "任务ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "任务名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "数据类型",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "负责人",
    dataIndex: "personCharge",
    key: "personCharge",
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
];
// 模拟数据生成
const data = ref([]);
const getData = () => {
  try {
    const res = api.processing.getDataPatentList();
    console.log("res", res);
    data.value = res.data.list;
  } catch (e) {
    console.log("res", e);
  }
};
const columnsTwo = [
  {
    title: "成员ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "角色",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
];

// table 编辑
const updataPatentTable = (row) => {
  modalValue.value = "更新任务";
  modalVisible.value = true;
  Object.assign(formState, row); // 正确更新响应式对象
  console.log("updatePatentTable", row);
};
const updataTeamMemberTable = (row) => {
  modalValue.value = "更新团队成员";
  modalVisible.value = true;
  Object.assign(formStateTwo, row); // 正确更新响应式对象
  console.log("updateTeamMemberTable", row);
};
// 弹窗
const modalVisible = ref(false);
const modalValue = ref("");
const setModal1Visible = (open) => {
  modal1Visible.value = open;
};
const formState = reactive({
  id: "",
  title: "",
  applicant: "",
  field: "",
});
const formStateTwo = reactive({
  name: "",
  role: "",
});
const handleColumns = () => {
  modalValue.value = "新建任务";
  modalVisible.value = true;
};
const handleColumnsTwo = () => {
  modalValue.value = "添加成员";
  modalVisible.value = true;
};
const handleSubmit = async () => {
  try {
    if (modalValue.value === "新建任务") {
      const params = { ...formState };
      const res = await api.processing.createDataPatent();
      console.log("handleSubmit 成功", params);
    } else if (modalValue.value === "添加成员") {
      const params = { ...formStateTwo };
      const res = await api.processing.createTeamMember();
      console.log("handleSubmit 成功", params);
    } else if (modalValue.value === "更新任务") {
      const params = { ...formState };
      const res = await api.processing.updateDataPatent();
      console.log("handleSubmit 更新任务", params);
    } else {
      const params = { ...formStateTwo };
      const res = await api.processing.updateTeamMember();
      console.log("handleSubmit 更新团队成员", params);
    }
    handleCancel();
  } catch (e) {
    console.log("handleSubmit 错误", e);
  }
};
const handleCancel = () => {
  // 重置表单
  Object.assign(formState, {
    id: "",
    title: "",
    applicant: "",
    field: "",
  });

  Object.assign(formStateTwo, {
    name: "",
    role: null,
  });

  // 关闭弹窗
  modalVisible.value = false;
  activeModalType.value = "";
};
</script>

<style lang="scss" scoped>
.processing {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .table {
    padding: 16px;
    background-color: white;
  }
  .controls {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    img {
      width: 15px;
    }
  }
}
</style>
