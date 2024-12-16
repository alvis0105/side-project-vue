<template>
  <div>
    <el-row class="mb-4">
      <el-button type="primary" icon="Plus" @click="addTask(list)">
        新增
      </el-button>
      <el-button
        :type="selectedRows.length ? 'danger' : ''"
        :class="selectedRows.length ? '' : 'opacity-50 cursor-not-allowed'"
        :disabled="selectedRows.length === 0"
        icon="Delete"
        @click="deleteSelectedRows"
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
      <el-table-column prop="id" label="No." width="80">
        <template #header>
          <div class="flex items-center justify-center">
            <div class="text-center">
              No.
            </div>
            <div class="flex flex-col ps-1">
              <el-icon
                class="pt-2 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'asc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('asc', 'id')"
              >
                <CaretTop />
              </el-icon>
              <el-icon
                class="pb-1 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'desc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('desc', 'id')"
              >
                <CaretBottom />
              </el-icon>
            </div>
          </div>
        </template>
        <template #default="scope">
          <div class="flex justify-center">
            {{ scope.row.id }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="taskName" label="任務名稱" min-width="80">
        <template #header>
          <div class="flex items-center">
            <div class="text-center">
              任務名稱
            </div>
            <div class="flex flex-col ps-1">
              <el-icon
                class="pt-2 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'asc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('asc', 'taskName')"
              >
                <CaretTop />
              </el-icon>
              <el-icon
                class="pb-1 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'desc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('desc', 'taskName')"
              >
                <CaretBottom />
              </el-icon>
            </div>
          </div>
        </template>
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
            <el-icon v-if="!scope.row.taskName" class="!icon-pen">
              <EditPen />
            </el-icon>
            <span :class="!scope.row.taskName ? 'ps-1 text-black text-opacity-30' : ''">
              {{ scope.row.taskName || '點擊輸入' }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column type="expand" min-width="50">
        <template #default="scope">
          <!-- 摺疊內容 -->
          <div class="flex flex-col gap-2 p-4 border bg-opacity-70 bg-surface-5">
            <div class="flex items-center gap-2">
              <el-button
                type="primary"
                icon="Plus"
                size="small"
                @click="addTask(scope.row, 'sub')"
              >
                新增細項
              </el-button>
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
              <el-table-column prop="subTaskName" label="細項名稱" min-width="50">
                <template #default="subScope">
                  <div v-if="isEditing(scope.row, subScope.row, 'subTaskName')">
                    <el-input
                      ref="editableInput"
                      v-model="subScope.row.subTaskName"
                      size="small"
                      @blur="stopEditing"
                      @keyup.enter="confirmEditing"
                    />
                  </div>
                  <div
                    v-else
                    class="cursor-pointer"
                    @dblclick="startEditing(scope.row, subScope.row, 'subTaskName')"
                  >
                    <el-icon v-if="!subScope.row.subTaskName" class="!icon-pen">
                      <EditPen />
                    </el-icon>
                    <span :class="!subScope.row.subTaskName ? 'ps-1 text-black text-opacity-30' : ''">
                      {{ subScope.row.subTaskName || '點擊輸入' }}
                    </span>
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
                      placeholder="新增細項內容"
                      @blur="stopEditing"
                      @keyup.enter="confirmEditing"
                    />
                  </div>
                  <div
                    v-else
                    class="cursor-pointer"
                    @dblclick="startEditing(scope.row, subScope.row, 'detail')"
                  >
                    <el-icon v-if="!subScope.row.detail" class="!icon-pen">
                      <EditPen />
                    </el-icon>
                    <span :class="!subScope.row.detail ? 'ps-1 text-black text-opacity-30' : ''">
                      {{ subScope.row.detail || '點擊輸入' }}
                    </span>
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
                    <el-icon v-if="!subScope.row.startDate" class="!icon-pen">
                      <EditPen />
                    </el-icon>
                    <span :class="!subScope.row.startDate ? 'ps-1 text-black text-opacity-30' : ''">
                      {{ subScope.row.startDate || '點擊輸入' }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="endDate" label="截止時間" min-width="50">
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
                    <el-icon v-if="!subScope.row.endDate" class="!icon-pen">
                      <EditPen />
                    </el-icon>
                    <span :class="!subScope.row.endDate ? 'ps-1 text-black text-opacity-30' : ''">
                      {{ subScope.row.endDate || '點擊輸入' }}
                    </span>
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
                      @click="deleteSubRow(scope.row, subScope.row)"
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
      <el-table-column prop="taskType" label="任務類型" min-width="270">
        <template #header>
          <div class="flex items-center">
            <div class="text-center">
              任務類型
            </div>
            <div class="flex flex-col ps-1">
              <el-icon
                class="pt-2 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'asc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('asc', 'taskType')"
              >
                <CaretTop />
              </el-icon>
              <el-icon
                class="pb-1 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'desc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('desc', 'taskType')"
              >
                <CaretBottom />
              </el-icon>
            </div>
          </div>
        </template>
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
      <el-table-column prop="startDate" label="開始時間" min-width="100">
        <template #header>
          <div class="flex items-center gap-1">
            <span>開始時間</span>
            <div class="flex flex-col">
              <el-icon
                class="pt-2 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'asc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('asc', 'startDate')"
              >
                <CaretTop />
              </el-icon>
              <el-icon
                class="pb-1 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'desc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('desc', 'startDate')"
              >
                <CaretBottom />
              </el-icon>
            </div>
          </div>
        </template>
        <template #default="scope">
          <div v-if="isEditing(scope.row, null, 'startDate')">
            <el-input
              v-model="scope.row.startDate"
              size="small"
              ref="editableInput"
              @blur="stopEditing"
              @keyup.enter="confirmEditing"
            />
          </div>
          <div
            v-else
            class="cursor-pointer"
            @dblclick="startEditing(scope.row, null, 'startDate')"
          >
            <el-icon v-if="!scope.row.startDate" class="!icon-pen">
              <EditPen />
            </el-icon>
            <span :class="!scope.row.startDate ? 'ps-1 text-black text-opacity-30' : ''">
              {{ scope.row.startDate || '點擊輸入' }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="endDate" label="截止時間" min-width="70">
        <template #header>
          <div class="flex items-center gap-1">
            <span>截止時間</span>
            <div class="flex flex-col">
              <el-icon
                class="pt-2 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'asc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('asc', 'endDate')"
              >
                <CaretTop />
              </el-icon>
              <el-icon
                class="pb-1 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'desc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('desc', 'endDate')"
              >
                <CaretBottom />
              </el-icon>
            </div>
          </div>
        </template>
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
            <el-icon v-if="!scope.row.endDate" class="!icon-pen">
              <EditPen />
            </el-icon>
            <span :class="!scope.row.endDate ? 'ps-1 text-black text-opacity-30' : ''">
              {{ scope.row.endDate || '點擊輸入' }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150">
        <template #default="scope">
          <div class="flex justify-end">
            <el-button
              type="success"
              icon="View"
              size="small"
              @click="viewDetail(scope.row)"
            />
            <el-button
              type="danger"
              icon="CloseBold"
              size="small"
              @click="deleteRow(scope.row)"
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
      @closed="handleBeforeClose"
    >
      <div>{{ dialogMessage }}</div>
      <template #footer>
        <el-button type="primary" @click="closeDialog">確認</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { getTaskList } from '@/api'

// 資料清單
const list = ref([
  {
    id: 1,
    taskName: 'A專案開發',
    taskType: '主要任務',
    startDate: '2023-01-12',
    endDate: '2023-08-25',
    subTasks: [
      { id: 1, subTaskName: 'API 規劃', detail: '針對API進行優化並且.....', startDate: '2023-02-12', endDate: '2023-03-13' },
      { id: 2, subTaskName: 'UI 設計', detail: '', startDate: '2023-07-01', endDate: '2023-09-23' },
      { id: 3, subTaskName: '功能開發', detail: '', startDate: '2023-08-26', endDate: '2023-10-03' },
      { id: 4, subTaskName: '套件研究', detail: '', startDate: '2023-03-25', endDate: '2023-07-11' },
    ],
    expanded: false,
  },
  {
    id: 2,
    taskName: 'vue3練習題',
    taskType: '支線任務',
    startDate: '2023-12-16',
    endDate: '2023-11-20',
    subTasks: [
      { id: 1, subTaskName: '題目撰寫', detail: '', startDate: '2023-12-16', endDate: '2023-12-18' },
    ],
    expanded: false,
  },
  {
    id: 3,
    taskName: '數值計算器',
    taskType: '功能型工具',
    startDate: '2023-11-12',
    endDate: '2023-12-14',
    subTasks: [
      { id: 1, subTaskName: 'UI 設計', detail: '', startDate: '2023-11-12', endDate: '2023-11-13' },
    ],
    expanded: false,
  },
  {
    id: 4,
    taskName: '套件升級',
    taskType: '支線任務',
    startDate: '2023-09-01',
    endDate: '2023-11-12',
    subTasks: [
      { id: 1, subTaskName: 'eslint升級', detail: '', startDate: '2023-10-02', endDate: '2023-12-13' },
      { id: 2, subTaskName: 'nodejs', detail: '', startDate: '2023-10-05', endDate: '2023-11-16' },
    ],
    expanded: false,
  },
])
const taskList = ref([])

const taskTypeOptions = ref([
  { label: '主要任務', value: '主要任務' },
  { label: '支線任務', value: '支線任務' },
  { label: '功能型工具', value: '功能型工具' },
])

// 編輯狀態管理
const editingStatus = ref({
  parentRow: null,
  row: null,
  field: ''
})

const editableInput = ref(null)
const selectedRows = ref([])
const sortOrder = ref('account')
const sortType = ref()
const isDialogVisible = ref(false)
const dialogMessage = ref('')
const isDeleteConfirmed = ref(false)

// 計算屬性
const isEditing = computed(() => {
  return (parentRow, row, field) =>
    editingStatus.value.parentRow === parentRow &&
    editingStatus.value.row === row &&
    editingStatus.value.field === field
})

// 排序
const sortedList = computed(() => {
  return [...taskList.value].sort((a, b) => {
    let compareResult = 0
    switch (sortType.value) {
      case 'startDate':
        compareResult = new Date(a.startDate) - new Date(b.startDate)
        break
      case 'endDate':
        compareResult = new Date(a.endDate) - new Date(b.endDate)
        break
      case 'id':
        compareResult = a.id - b.id
        break
      case 'taskName':
        compareResult = a.taskName.localeCompare(b.taskName)
        break
      case 'taskType':
        compareResult = a.taskType.localeCompare(b.taskType)
        break
      default:
        compareResult = 0
    }

    // 統一的升序/降序控制
    return sortOrder.value === 'asc' ? compareResult : -compareResult
  })
})

// 方法
const startEditing = async (parentRow, row, field) => {
  editingStatus.value = { parentRow, row, field }
  await nextTick()
  editableInput.value?.focus()
}

const stopEditing = () => {
  editingStatus.value = { parentRow: null, row: null, field: '' }
}

const confirmEditing = () => {
  stopEditing()
}

const toggleExpand = (row) => {
  row.expanded = !row.expanded
}

const onTaskTypeChange = (row) => {
  // 在這裡處理當下拉選單值改變時的邏輯
  console.log(`任務類型更新為：${row.taskType}`)
}

// 排序
const activateSort = (order, type) => {
  sortType.value = type
  if (sortOrder.value !== order) {
    sortOrder.value = order
  }
}

const showDialog = (message) => {
  dialogMessage.value = message
  isDialogVisible.value = true
}

const closeDialog = () => {
  isDialogVisible.value = false
  // 列表上方刪除單筆或多筆的方法
  if (isDeleteConfirmed.value && selectedRows.value.length) {
    const selectedIds = selectedRows.value.map((row) => row.id)
    // 同時過濾與重新分配 id
    taskList.value = taskList.value
      .filter((item) => !selectedIds.includes(item.id))
      .map((item, index) => ({
        ...item,
        id: index + 1, // 重新分配 id 從 1 開始
      }))
  } else {
    // 列表最右側刪除單筆的方法
    taskList.value = taskList.value
      .filter((item) => item.id !== selectedRows.value.id)
      .map((item, index) => ({
        ...item,
        id: index + 1, // 重新分配 id 從 1 開始
      }))
  }
}

// 在對話框關閉時，重置刪除狀態
const handleBeforeClose = () => {
  isDeleteConfirmed.value = false
  isDialogVisible.value = false
}

const addTask = (row, formType) => {
  if (formType === 'sub') {
    const newId = row.subTasks.length + 1
    row.subTasks.push({ id: newId, subTaskName: '', startDate: '', endDate: '' })
  } else {
    const newId = row.length + 1
    taskList.value.push({ id: newId, taskName: '', taskType: '', startDate: '', endDate: '', subTasks: [{ id: 1, subTaskName: '', startDate: '', endDate: '' }] })
  }
}

const viewDetail = (row) => {
  showDialog('功能待定')
}

const deleteSubRow = (parentTask, subTask) => {
  parentTask.subTasks = parentTask.subTasks
    .filter((task) => task.id !== subTask.id)
    .map((item, index) => ({
      ...item,
      id: index + 1, // 重新分配 id 從 1 開始
    }))
}

const deleteRow = (row) => {
  isDeleteConfirmed.value = true
  selectedRows.value = row
  showDialog('確認刪除?')
}

const deleteSelectedRows = () => {
  isDeleteConfirmed.value = true
  showDialog('確認刪除?')
}

const onSelectionChange = (rows) => {
  selectedRows.value = rows
}

const getTaskDetail = async () => {
  try {
    const res = await getTaskList()
    if (res.status === 'success' && res.code === 200) {
      // 使用 map 來重新處理資料並一次賦值
      taskList.value = res.data.map((item) => ({
        id: item.id,
        taskName: item.taskName, // 確認 taskName 對應正確的 key
        taskType: item.taskType,
        startDate: item.startDate,
        endDate: item.endDate,
        subTasks: item.subTasks || [], // 額外屬性: 是否有子任務
        expanded: false,
      }))
    }
  } catch (error) {
    console.error('獲取任務清單失敗:', error)
  }
}

onMounted(() => {
  getTaskDetail()
})
</script>
