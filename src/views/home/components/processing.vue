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
            <a-tag v-if="record.status === 1" color="blue">进行中</a-tag>
            <a-tag v-else-if="record.status === 2" color="green">已完成</a-tag>
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
                <img src="" alt="" />
                <a-popconfirm
                  title="确认删除此任务吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="(e) => handleConfirm(record.id, e)"
                >
                  <a-button type="link" danger>删除</a-button>
                </a-popconfirm>
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
        :data-source="dataTwo"
        :pagination="paginationTwo"
      >
        <template #bodyCell="{ column, record }">
          <!-- 自定义名称列 -->
          <template v-if="column.key != 'role' && column.key != 'operation'">
            {{ record[column.dataIndex] }}
          </template>

          <template v-if="column.key === 'role'">
            <a-tag v-if="record.role === 3" color="red">管理员</a-tag>
            <a-tag v-else-if="record.role === 2" color="blue">编辑</a-tag>
            <a-tag v-else-if="record.role === 1" color="blue">查看</a-tag>
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
                <img src="" alt="" />
                <a-popconfirm
                  title="确认删除此任务吗？"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="(e) => handleConfirmTwo(record.id, e)"
                >
                  <a-button type="link" danger>删除</a-button>
                </a-popconfirm>
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
      <a-form-item label="任务名称" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="数据类型" name="type">
        <a-select v-model:value="formState.type" placeholder="请选择状态">
          <a-select-option value="专利">专利</a-select-option>
          <a-select-option value="论文">论文</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="负责人" name="manager">
        <a-input v-model:value="formState.manager" />
      </a-form-item>
      <a-form-item label="状态" name="status">
        <a-select v-model:value="formState.status" placeholder="请选择状态">
          <a-select-option :value="1">进行中</a-select-option>
          <a-select-option :value="2">已完成</a-select-option>
        </a-select>
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
        <a-input v-model:value="formStateTwo.name" />
      </a-form-item>
      <a-form-item label="角色" name="role">
        <a-select v-model:value="formStateTwo.role" placeholder="请选择角色">
          <a-select-option :value="1">查看</a-select-option>
          <a-select-option :value="2">编辑</a-select-option>
          <a-select-option :value="3">管理员</a-select-option>
        </a-select>
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
  getDataTwo();
});
// table
// 分页配置
const pagination = ref({
  current: 1, // 当前页码
  pageSize: 10, // 每页显示条数
  total: 0,
  onChange: (page, pageSize) => {
    // 页码改变回调
    pagination.value.current = page;
    pagination.value.pageSize = pageSize;
    getData();
  },
});

const paginationTwo = ref({
  current: 1, // 当前页码
  pageSize: 10, // 每页显示条数
  total: 0,
  onChange: (page, pageSize) => {
    // 页码改变回调
    paginationTwo.value.current = page;
    paginationTwo.value.pageSize = pageSize;
    getDataTwo();
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
    dataIndex: "manager",
    key: "manager",
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
const data = ref();
const getData = async () => {
  try {
    const params = {
      page: pagination.value.current,
      pageSize: pagination.value.pageSize,
    };
    const res = await api.processing.getDataPatentList(params);
    data.value = res?.data.list;
    pagination.value.total = res?.data.total;
  } catch (e) {}
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
const dataTwo = ref();
const getDataTwo = async () => {
  try {
    const params = {
      page: paginationTwo.value.current,
      pageSize: paginationTwo.value.pageSize,
    };
    const res = await api.processing.getTeamMemberList(params);
    dataTwo.value = res?.data.list;
    paginationTwo.value.total = res?.data.total;
  } catch (e) {}
};
// table 编辑
const updataPatentTable = (row) => {
  modalValue.value = "更新任务";
  modalVisible.value = true;
  Object.assign(formState, row); // 正确更新响应式对象
};
const updataTeamMemberTable = (row) => {
  modalValue.value = "更新团队成员";
  modalVisible.value = true;
  Object.assign(formStateTwo, row); // 正确更新响应式对象
};
// 弹窗
const modalVisible = ref(false);
const modalValue = ref("");
const setModal1Visible = (open) => {
  modal1Visible.value = open;
};
const formState = reactive({
  name: "",
  type: "",
  manager: "",
  status: 1,
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
      await api.processing.createDataPatent(params);
      getData();
    } else if (modalValue.value === "添加成员") {
      const params = { ...formStateTwo };
      await api.processing.createTeamMember(params);
      getDataTwo();
    } else if (modalValue.value === "更新任务") {
      const params = { ...formState };
      await api.processing.updateDataPatent(params);
      getData();
    } else {
      const params = { ...formStateTwo };
      await api.processing.updateTeamMember(params);
      getDataTwo();
    }
    handleCancel();
  } catch (e) {}
};
const handleCancel = () => {
  // 重置表单
  Object.assign(formState, {
    name: "",
    type: "",
    manager: "",
    status: 1,
  });

  Object.assign(formStateTwo, {
    name: "",
    role: null,
  });

  // 关闭弹窗
  modalVisible.value = false;
  activeModalType.value = "";
};
// 删除
const handleConfirm = async (id, e) => {
  try {
    await api.processing.deleteDataPatent(id);
    getData();
  } catch (e) {}
};
const handleConfirmTwo = async (id, e) => {
  try {
    await api.processing.deleteTeamMember(id);
    getDataTwo();
  } catch (e) {}
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
