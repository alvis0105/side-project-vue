<template>
  <div class="p-2">
    <el-row class="mb-4">
      <el-button type="primary" icon="Plus" @click="addTask">
        新增
      </el-button>
      <el-button
        :type="selectedRows.length > 0 ? 'danger' : ''"
        :class="selectedRows.length > 0 ? '' : 'opacity-50 cursor-not-allowed'"
        :disabled="selectedRows.length === 0"
        icon="Delete"
        @click="handleDelete"
      >
        刪除
      </el-button>
    </el-row>
    <el-table
      :data="sortedList"
      :border="false"
      class="w-full"
      :resizable="false"
      row-key="id"
      @selection-change="onSelectionChange"
    >
      <el-table-column type="selection" width="35" />
      <el-table-column prop="id" label="No." width="50">
        <template #header>
          <div class="text-center">
            No.
          </div>
        </template>
        <template #default="scope">
          <div class="flex justify-center">
            {{ scope.row.id }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="taskName" label="任務名稱" min-width="80">
        <template #default="scope">
          <div v-if="isEditing(scope.row, null, 'taskName')">
            <el-input
              v-model="scope.row.taskName"
              size="small"
              ref="editableInput"
              @blur="stopEditing"
              @keyup.enter="confirmEditing"
            />
          </div>
          <div
            v-else
            class="cursor-pointer"
            @dblclick="startEditing(scope.row, null, 'taskName')"
          >
            {{ scope.row.taskName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column type="expand" min-width="50">
        <template #expand-icon="{ expanded }">
          <el-icon :size="20">
            <ArrowUp v-if="expanded" />
            <ArrowDown v-else />
          </el-icon>
        </template>
        <template #default="scope">
          <!-- 摺疊內容 -->
          <div class="flex flex-col gap-2 p-4 border bg-surface-5">
            <!-- 內部表格內容保持不變 -->
            <div class="flex items-center gap-2">
              <el-button
                type="primary"
                icon="Plus"
                size="small"
                @click="addSubTask(scope.row)"
              >
                新增細項
              </el-button>
              <el-input
                v-model="newSubTask[scope.row.id]"
                placeholder="輸入新細項名稱"
                size="small"
              />
            </div>
            <el-table
              :data="scope.row.subTasks"
              class="w-full mt-2"
              row-key="id"
              size="small"
            >
              <el-table-column prop="id" label="No." width="70">
                <template #header>
                  <div class="text-center">
                    No.
                  </div>
                </template>
                <template #default="subScope">
                  <div class="flex justify-center">
                    {{ subScope.row.id }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="細項名稱" min-width="50">
                <template #default="subScope">
                  <div v-if="isEditing(scope.row, subScope.row, 'name')">
                    <el-input
                      ref="editableInput"
                      v-model="subScope.row.name"
                      size="small"
                      @blur="stopEditing"
                      @keyup.enter="confirmEditing"
                    />
                  </div>
                  <div
                    v-else
                    class="cursor-pointer"
                    @dblclick="startEditing(scope.row, subScope.row, 'name')"
                  >
                    {{ subScope.row.name }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="detail" label="細項內容" min-width="150">
                <template #default="subScope">
                  <div v-if="isEditing(scope.row, subScope.row, 'detail')">
                    <el-input
                      ref="editableInput"
                      v-model="subScope.row.detail"
                      size="small"
                      @blur="stopEditing"
                      @keyup.enter="confirmEditing"
                    />
                  </div>
                  <div
                    v-else
                    class="cursor-pointer"
                    @dblclick="startEditing(scope.row, subScope.row, 'detail')"
                  >
                    {{ subScope.row.detail }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="startDate" label="開始時間" min-width="50">
                <template #default="subScope">
                  <div v-if="isEditing(scope.row, subScope.row, 'startDate')">
                    <el-input
                      ref="editableInput"
                      v-model="subScope.row.startDate"
                      size="small"
                      @blur="stopEditing"
                      @keyup.enter="confirmEditing"
                    />
                  </div>
                  <div
                    v-else
                    class="cursor-pointer"
                    @dblclick="startEditing(scope.row, subScope.row, 'startDate')"
                  >
                    {{ subScope.row.startDate }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="endDate" label="預計完成時間" min-width="50">
                <template #default="subScope">
                  <div v-if="isEditing(scope.row, subScope.row, 'endDate')">
                    <el-input
                      v-model="subScope.row.endDate"
                      size="small"
                      ref="editableInput"
                      @blur="stopEditing"
                      @keyup.enter="confirmEditing"
                    />
                  </div>
                  <div
                    v-else
                    class="cursor-pointer"
                    @dblclick="startEditing(scope.row, subScope.row, 'endDate')"
                  >
                    {{ subScope.row.endDate }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column width="50">
                <template #default="subScope">
                  <div class="flex justify-end">
                    <el-icon
                      class="cursor-pointer hover:!bg-danger hover:!text-white me-2"
                      color="red"
                      :size="20"
                      @click="onDeleteSubTask(scope.row, subScope.row)"
                    >
                      <CloseBold />
                    </el-icon>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="taskType" label="任務類型" min-width="200">
        <template #default="scope">
          <div class="me-5">
            <el-select
              v-model="scope.row.taskType"
              class="w-full"
              size="small"
              placeholder="選擇任務類型"
              @change="onTaskTypeChange(scope.row)"
            >
              <el-option
                v-for="option in taskTypeOptions"
                :key="option.value"
                :label="option.label"
                :value="option.value"
              />
            </el-select>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="開始時間" min-width="100">
        <template #default="scope">
          <div v-if="isEditing(scope.row, null, 'createdAt')">
            <el-input
              v-model="scope.row.createdAt"
              size="small"
              ref="editableInput"
              @blur="stopEditing"
              @keyup.enter="confirmEditing"
            />
          </div>
          <div
            v-else
            class="cursor-pointer"
            @dblclick="startEditing(scope.row, null, 'createdAt')"
          >
            {{ scope.row.createdAt }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="endDate" label="預計完成時間" min-width="100">
        <template #default="scope">
          <div v-if="isEditing(scope.row, null, 'endDate')">
            <el-input
              v-model="scope.row.endDate"
              size="small"
              ref="editableInput"
              @blur="stopEditing"
              @keyup.enter="confirmEditing"
            />
          </div>
          <div
            v-else
            class="cursor-pointer"
            @dblclick="startEditing(scope.row, null, 'endDate')"
          >
            {{ scope.row.endDate }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="250">
        <template #default="scope">
          <div class="flex justify-end">
            <el-button
              type="success"
              icon="View"
              size="small"
              @click="onEdit(scope.row)"
            />
            <el-button
              type="danger"
              icon="CloseBold"
              size="small"
              @click="onDelete(scope.row)"
            />
          </div>
        </template>
      </el-table-column>
    </el-table>

    <!-- 顯示通知模態框 -->
    <el-dialog
      v-model="isDialogVisible"
      title="提示"
      width="30%"
      :show-close="false"
    >
      <div>{{ dialogMessage }}</div>
      <template #footer>
        <el-button type="primary" @click="closeDialog">確認</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

// 資料清單
const list = ref([
  {
    id: 1,
    taskName: 'A專案開發',
    taskType: '主要任務',
    createdAt: '2023-01-12',
    endDate: '2023-12-25',
    subTasks: [
      { id: 1, name: 'API 規劃', detail: '針對API進行優化並且.....', startDate: '2023-02-12', endDate: '2023-03-13' },
      { id: 2, name: 'UI 設計', detail: '', startDate: '2023-07-01', endDate: '2023-09-23' },
      { id: 3, name: '功能開發', detail: '', startDate: '2023-08-26', endDate: '2023-10-03' },
      { id: 4, name: '套件研究', detail: '', startDate: '2023-03-25', endDate: '2023-07-11' },
    ],
    expanded: false,
  },
  {
    id: 2,
    taskName: 'vue3練習題',
    taskType: '支線任務',
    createdAt: '2023-12-16',
    endDate: '2023-12-20',
    subTasks: [
      { id: 1, name: '題目撰寫', detail: '', startDate: '2023-12-16', endDate: '2023-12-18' },
    ],
    expanded: false,
  },
  {
    id: 3,
    taskName: '數值計算器',
    taskType: '功能型工具',
    createdAt: '2023-11-12',
    endDate: '2023-11-14',
    subTasks: [
      { id: 1, name: 'UI 設計', detail: '', startDate: '2023-11-12', endDate: '2023-11-13' },
    ],
    expanded: false,
  },
])

const toggleExpand = (row) => {
  row.expanded = !row.expanded
}

const taskTypeOptions = ref([
  { label: '主要任務', value: '主要任務' },
  { label: '支線任務', value: '支線任務' },
  { label: '功能型工具', value: '功能型工具' },
])

const onTaskTypeChange = (row) => {
  // 在這裡處理當下拉選單值改變時的邏輯
  console.log(`任務類型更新為：${row.taskType}`)
}

// 編輯狀態管理
const editingCell = ref({ parentRow: null, row: null, field: '' })
const editableInput = ref(null)

const isEditing = (parentRow, row, field) => {
  return (
    editingCell.value.parentRow === parentRow &&
    editingCell.value.row === row &&
    editingCell.value.field === field
  )
}

const startEditing = async (parentRow, row, field) => {
  editingCell.value = { parentRow, row, field }
  await nextTick()
  if (editableInput.value) {
    editableInput.value.focus()
  }
}

const stopEditing = () => {
  editingCell.value = { parentRow: null, row: null, field: '' }
}

const confirmEditing = () => {
  stopEditing()
}

// 其他功能保持不變
const selectedRows = ref([])
const newSubTask = ref({})
const sortOrder = ref('asc')
const isDialogVisible = ref(false)
const dialogMessage = ref('')

const sortedList = computed(() => {
  return [...list.value].sort((a, b) => {
    if (sortOrder.value === 'asc') {
      return new Date(a.createdAt) - new Date(b.createdAt)
    } else if (sortOrder.value === 'desc') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })
})

const showDialog = (message) => {
  dialogMessage.value = message
  isDialogVisible.value = true
}

const closeDialog = () => {
  isDialogVisible.value = false
}

const addSubTask = (row) => {
  const subTaskName = newSubTask.value[row.id]
  if (!subTaskName) {
    showDialog('請輸入細項名稱')
    return
  }
  const newId = row.subTasks.length + 1
  row.subTasks.push({ id: newId, name: subTaskName, startDate: '', endDate: '' })
  newSubTask.value[row.id] = ''
}

// const onEditSubTask = (parentTask, subTask) => {
//   showDialog(`編輯細項：${subTask.name}`)
// }

const onDeleteSubTask = (parentTask, subTask) => {
  parentTask.subTasks = parentTask.subTasks.filter((task) => task.id !== subTask.id)
}

const onEdit = (row) => {
  showDialog('功能待定')
}

const onDelete = (row) => {
  const confirmed = confirm(`確定刪除選中的 ${selectedRows.value.length} 筆資料嗎？`)
  if (confirmed) {
    list.value = list.value.filter((item) => item.id !== row.id)
    showDialog('刪除成功')
  }
}

const handleDelete = () => {
  if (selectedRows.value.length === 0) {
    showDialog('未選擇任何資料')
    return
  }
  const confirmed = confirm(`確定刪除選中的 ${selectedRows.value.length} 筆資料嗎？`)
  if (confirmed) {
    const selectedIds = selectedRows.value.map((row) => row.id)
    list.value = list.value.filter((item) => !selectedIds.includes(item.id))
    selectedRows.value = []
    showDialog('刪除成功')
  }
}

const onSelectionChange = (rows) => {
  selectedRows.value = rows
}
</script>
