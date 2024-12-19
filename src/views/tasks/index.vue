<template>
  <div>
    <el-row class="mb-4">
      <el-button type="primary" icon="Plus" @click="newTask(taskList, 'task')">
        新增
      </el-button>
      <el-button
        :type="selectedRows.length ? 'danger' : ''"
        :class="selectedRows.length ? '' : 'opacity-50 cursor-not-allowed'"
        :disabled="selectedRows.length === 0"
        icon="Delete"
        @click="openModal('deleteSelectedRows', selectedRows)"
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
              @blur="confirmEditing"
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
                @click="newTask(scope.row, 'subTask')"
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
                      @blur="confirmEditing"
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
                      @blur="confirmEditing"
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
                      @blur="confirmEditing"
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
                      @blur="confirmEditing"
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
              @focus="startEditing(scope.row, null, 'taskType')"
              @change="confirmEditing"
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
              @blur="confirmEditing"
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
              @blur="confirmEditing"
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
              @click="openModal('default', scope.row)"
            />
            <el-button
              type="danger"
              icon="CloseBold"
              size="small"
              @click="openModal('deleteRow', scope.row)"
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
        <el-button type="primary" @click="closeModal">確認</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import { getTaskList, addTask, updateTask, deleteTask, deleteSubTask, deleteSelectedTasks } from '@/api'

// 任務清單
const taskList = ref([])

const taskTypeOptions = ref([
  { label: '主要任務', value: '主要任務' },
  { label: '支線任務', value: '支線任務' },
  { label: '功能型工具', value: '功能型工具' },
])

// 編輯狀態管理
const editingStatus = ref({
  row: null,
  field: ''
})

const editableInput = ref(null)
const selectedRows = ref([])
const sortOrder = ref('account')
const sortType = ref()
const isDialogVisible = ref(false)
const dialogMessage = ref('')
const originalRow = ref([])
const originalParentRow = ref([])
// 當前操作的目標項目和類型
const currentAction = ref()
const currentItem = ref()

// 彈窗相關
const isModalOpen = ref(false)
const modalTitle = ref('')
const modalDetail = ref('')
const cancelText = ref('取消')
const confirmText = ref('確認')

// 是否為初次新增
const isFirstAdd = ref(false)

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
  editingStatus.value = {
    parentRow: parentRow,
    row: row,
    field: field
  }
  originalRow.value = JSON.parse(JSON.stringify(row))
  originalParentRow.value = JSON.parse(JSON.stringify(parentRow))
  await nextTick()
  editableInput.value?.focus()
}

const confirmEditing = async () => {
  const parentRow = editingStatus.value.parentRow
  const row = editingStatus.value.row

  // 檢查原始值是否有變更
  const rowChanged = JSON.stringify(originalRow.value) !== JSON.stringify(row)
  const parentRowChanged = JSON.stringify(originalParentRow.value) !== JSON.stringify(parentRow)
  if (rowChanged || parentRowChanged) {
    if (!parentRow.isEdit) {
      await handleAdd(parentRow, row)
    } else {
      await handleUpdate(parentRow, row)
    }
  }
  editingStatus.value = { row: null, field: '' }
}

// 新增
const handleAdd = async(parentRow, row) => {
  try {
    const newId = taskList.value.length
    const params = {
      id: newId,
      isEdit: true,
      taskName: parentRow.taskName || '', // 任務名稱僅在 task 中有效
      taskType: parentRow.taskType || '', // 任務類型僅在 task 中有效
      startDate: parentRow.startDate || '', // 開始日期
      endDate: parentRow.endDate || '', // 結束日期
      subTasks: parentRow.subTasks || [ // 子任務結構
        {
          id: row.id,
          subTaskName: row.subTaskName || '',
          detail: row.detail || '',
          startDate: row.startDate || '',
          endDate: row.endDate || '',
        },
      ],
    }
    
    const res = await addTask({ newTask: params })
    if (res.status === 'success' && res.code === 200) {
      console.log('任務新增成功')
      await getTaskDetail()
    }
  } catch (error) {
    console.error(error)
  }
}

// 修改
const handleUpdate = async(parentRow, row) => {
  try {
    const params = {
      id: parentRow.id,
      taskName: parentRow.taskName || '', // 任務名稱僅在 task 中有效
      taskType: parentRow.taskType || '', // 任務類型僅在 task 中有效
      startDate: parentRow.startDate || '', // 開始日期
      endDate: parentRow.endDate || '', // 結束日期
      subTasks: parentRow.subTasks || [ // 子任務結構
        {
          id: row.id,
          subTaskName: row.subTaskName || '',
          detail: row.detail || '',
          startDate: row.startDate || '',
          endDate: row.endDate || '',
        },
      ],
    }
    const res = await updateTask(parentRow.id, params)
    if (res.status === 'success' && res.code === 200) {
      console.log('任務修改成功')
      await getTaskDetail()
    }
  } catch (error) {
    console.log(error)
  }
}

const toggleExpand = (row) => {
  row.expanded = !row.expanded
}

const onTaskTypeChange = async(parentRow, row, field) => {
  // 在這裡處理當下拉選單值改變時的邏輯
  await startEditing(parentRow, row, field)
  await confirmEditing()
}

// 排序
const activateSort = (order, type) => {
  sortType.value = type
  if (sortOrder.value !== order) {
    sortOrder.value = order
  }
}

const openModal = (action, item) => {
  isDialogVisible.value = true
  currentAction.value = action
  currentItem.value = item

  switch (action) {
    case 'deleteSelectedRows':
      dialogMessage.value = `請確認是否刪除選中的 "${item.length}筆" 資料?`
      break
    case 'deleteRow':
      dialogMessage.value = `請確認是否刪除 "${item.name}" ?`
      break
    default:
      dialogMessage.value = '請確認是否執行?'
      break
  }
}

const closeModal = async() => {
  // 列表上方刪除單筆或多筆的方法
  if (currentAction.value === 'deleteSelectedRows') {
    await deleteSelectedRows()
  } else if (currentAction.value === 'deleteRow') {
    await deleteRow(currentItem.value)
  }
  isDialogVisible.value = false
  modalTitle.value = ''
  modalDetail.value = ''
  currentAction.value = ''
  currentItem.value = ''
}

// 在對話框關閉時，重置刪除狀態
const handleBeforeClose = () => {
  isDialogVisible.value = false
}

const newTask = (row, formType) => {
  if (formType === 'subTask') {
    const newId = row.subTasks.length + 1
    row.subTasks.push({
      id: newId,
      subTaskName: '',
      startDate: '',
      endDate: ''
    })
  } else {
    const newId = row.length + 1
    taskList.value.push({
      id: newId,
      isEdit: false,
      taskName: '',
      taskType: '',
      startDate: '',
      endDate: '',
      subTasks: [{ 
        id: 1,
        subTaskName: '',
        startDate: '',
        endDate: ''
      }]
    })
  }
}

// 刪除細項
const deleteSubRow = async (parentRow, selectedRow) => {
  try {
    const res = await deleteSubTask(parentRow.id, selectedRow.id) // 傳入任務 ID 和細項 ID
    if (res.status === 'success' && res.code === 200) {
      console.log('刪除任務細項成功')
      await getTaskDetail()
    }
  } catch (error) {
    console.error('刪除細項失敗:', error)
  }
}

// 單行刪除事件
const deleteRow = async(row) => {
  try {
    const res = await deleteTask(row.id)
    if (res.status === 'success' && res.code === 200) {
      console.log('任務刪除成功')
      await getTaskDetail()
    }
  } catch (error) {
    console.error(error)
  }
}

// 刪除選中資料
const deleteSelectedRows = async() => {
  try {
    const selectedIds = selectedRows.value.map((row) => row.id)
    const res = await deleteSelectedTasks(selectedIds)
    if (res.status === 'success' && res.code === 200) {
      selectedRows.value = [] // 清空選中的資料
      console.log('選定任務刪除成功')
      await getTaskDetail()
    }
  } catch (error) {
    console.error(error)
  }
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
        isEdit: item.isEdit,
        taskName: item.taskName, // 確認 taskName 對應正確的 key
        taskType: item.taskType,
        startDate: item.startDate,
        endDate: item.endDate,
        subTasks: item.subTasks || [], // 額外屬性: 是否有子任務
        expanded: false,
      }))
      console.log('撈取任務資料成功', taskList.value)
    }
  } catch (error) {
    console.error('撈取任務清單失敗:', error)
  }
}

onMounted(() => {
  getTaskDetail()
})
</script>
