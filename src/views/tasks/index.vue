<template>
  <div>
    <el-row class="mb-4">
      <el-button type="primary" icon="Plus" @click="newTask(taskList, 'task')">
        {{ $t('common.add') }}
      </el-button>
      <el-button
        :type="selectedRows.length ? 'danger' : ''"
        :class="selectedRows.length ? '' : 'opacity-50 cursor-not-allowed'"
        :disabled="selectedRows.length === 0"
        icon="Delete"
        @click="openModal('deleteSelectedRows', selectedRows)"
      >
        {{ $t('common.delete') }}
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
      <el-table-column prop="id" width="80">
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
      <el-table-column prop="taskName" min-width="100">
        <template #header>
          <div class="flex items-center">
            <div class="text-center">
              {{ $t('menu.tasks.taskList.taskName') }}
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
              :placeholder="$t('menu.tasks.taskList.taskName')"
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
              {{ scope.row.taskName || $t('common.clickPlaceholder') }}
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
                {{ $t('common.add') }}
              </el-button>
            </div>
            <el-table
              :data="scope.row.subTasks"
              class="w-full mt-2"
              row-key="id"
              size="small"
            >
              <el-table-column prop="id" width="80">
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
              <el-table-column prop="subTaskName" min-width="80">
                <template #header>
                  <div class="flex items-center">
                    <div class="text-center">
                      {{ $t('menu.tasks.taskList.subTaskName') }}
                    </div>
                    <div class="flex flex-col ps-1">
                      <el-icon
                        class="pt-2 cursor-pointer hover:text-blue-500"
                        :class="sortOrder === 'asc' ? 'text-blue-500' : 'text-gray-400'"
                        @click="activateSort('asc', 'subTaskName')"
                      >
                        <CaretTop />
                      </el-icon>
                      <el-icon
                        class="pb-1 cursor-pointer hover:text-blue-500"
                        :class="sortOrder === 'desc' ? 'text-blue-500' : 'text-gray-400'"
                        @click="activateSort('desc', 'subTaskName')"
                      >
                        <CaretBottom />
                      </el-icon>
                    </div>
                  </div>
                </template>
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
                      {{ subScope.row.subTaskName || $t('common.clickPlaceholder') }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="detail" min-width="170">
                <template #header>
                  <div class="flex items-center">
                    <div class="text-center">
                      {{ $t('menu.tasks.taskList.detail') }}
                    </div>
                    <div class="flex flex-col ps-1">
                      <el-icon
                        class="pt-2 cursor-pointer hover:text-blue-500"
                        :class="sortOrder === 'asc' ? 'text-blue-500' : 'text-gray-400'"
                        @click="activateSort('asc', 'detail')"
                      >
                        <CaretTop />
                      </el-icon>
                      <el-icon
                        class="pb-1 cursor-pointer hover:text-blue-500"
                        :class="sortOrder === 'desc' ? 'text-blue-500' : 'text-gray-400'"
                        @click="activateSort('desc', 'detail')"
                      >
                        <CaretBottom />
                      </el-icon>
                    </div>
                  </div>
                </template>
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
                      {{ subScope.row.detail || $t('common.clickPlaceholder') }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="startDate" min-width="80">
                <template #header>
                  <div class="flex items-center">
                    <div class="text-center">
                      {{ $t('menu.tasks.taskList.startDate') }}
                    </div>
                    <div class="flex flex-col ps-1">
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
                      {{ subScope.row.startDate || $t('common.clickPlaceholder') }}
                    </span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="endDate" min-width="80">
                <template #header>
                  <div class="flex items-center">
                    <div class="text-center">
                      {{ $t('menu.tasks.taskList.endDate') }}
                    </div>
                    <div class="flex flex-col ps-1">
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
                      {{ subScope.row.endDate || $t('common.clickPlaceholder') }}
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
      <el-table-column prop="taskType" min-width="170">
        <template #header>
          <div class="flex items-center">
            <div class="text-center">
              {{ $t('menu.tasks.taskList.taskType') }}
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
              :placeholder="$t('menu.tasks.taskList.taskType')"
              @mousedown="() => startEditing(scope.row, null, 'taskType')"
              @change="() => confirmEditing()"
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
      <el-table-column prop="startDate" min-width="100">
        <template #header>
          <div class="flex items-center gap-1">
            <div class="text-center">
              {{ $t('menu.tasks.taskList.startDate') }}
            </div>
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
              {{ scope.row.startDate || $t('common.clickPlaceholder') }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="endDate" min-width="70">
        <template #header>
          <div class="flex items-center gap-1">
            <div class="text-center">
              {{ $t('menu.tasks.taskList.endDate') }}
            </div>
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
              {{ scope.row.endDate || $t('common.clickPlaceholder') }}
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
        <el-button type="primary" @click="closeModal">{{ $t('common.confirm') }}</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, watch } from 'vue'
import { getTaskList, addTask, updateTask, deleteTask, deleteSubTask, deleteSelectedTasks } from '@/api'
import { useI18n } from "vue-i18n"

const { t } = useI18n()

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
      case 'subTaskName':
        compareResult = a.subTaskName.localeCompare(b.subTaskName)
        break
      case 'detail':
        compareResult = a.detail.localeCompare(b.detail)
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
  console.log('parentRow', parentRow)
  editingStatus.value = {
    parentRow: parentRow,
    row: row,
    field: field,
  }

  // 設置原始值
  originalRow.value = row ? JSON.parse(JSON.stringify(row)) : null
  originalParentRow.value = parentRow ? JSON.parse(JSON.stringify(parentRow)) : null

  if (field !== 'taskType') {
    await nextTick()
    editableInput.value?.focus()
  }
}

const confirmEditing = async () => {
  const parentRow = editingStatus.value.parentRow
  const row = editingStatus.value.row

  if (!parentRow) {
    console.log('未設置 parentRow，無法完成編輯')
    return
  }

  const rowChanged = row && JSON.stringify(originalRow.value) !== JSON.stringify(row)
  const parentRowChanged = JSON.stringify(originalParentRow.value) !== JSON.stringify(parentRow)

  console.log('rowChanged:', rowChanged)
  console.log('parentRowChanged:', parentRowChanged)

  if (rowChanged || parentRowChanged) {
    try {
      if (!parentRow.isEdit) {
        await handleAdd(parentRow, row)
      } else {
        await handleUpdate(parentRow, row)
      }
    } catch (error) {
      console.error('編輯操作失敗:', error)
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
      taskName: parentRow.taskName || '',
      taskType: parentRow.taskType || '',
      startDate: parentRow.startDate || '',
      endDate: parentRow.endDate || '',
      subTasks: parentRow.subTasks || [
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

const onTaskTypeChange = async (newValue, parentRow) => {
  // 更新 parentRow 的 taskType
  parentRow.taskType = newValue

  // 儲存變更
  await startEditing(parentRow, null, 'taskType')
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
  console.log('item', item)

  switch (action) {
    case 'deleteSelectedRows':
      dialogMessage.value = `請確認是否刪除選中的 "${item.length}筆" 資料?`
      break
    case 'deleteRow':
      dialogMessage.value = `請確認是否刪除任務名稱: "${item.taskName}" ?`
      break
    default:
      dialogMessage.value = '請確認是否執行?'
      break
  }
}

const closeModal = async () => {
  const current = Array.isArray(currentItem.value) ? currentItem.value : [currentItem.value]
  const { emptyItems, nonEmptyItems } = deleteFilter(current, 'row')

  if (nonEmptyItems.length) {
    // 處理有值的項目 (呼叫 API)
    if (currentAction.value === 'deleteSelectedRows') {
      const ids = nonEmptyItems.map(item => item.id)
      await deleteSelectedRows(ids)
    } else if (currentAction.value === 'deleteRow') {
      await deleteRow(nonEmptyItems[0])
    }
  } else {
    // 處理無值的項目 (前端刪除)
    const emptyIds = emptyItems.map(item => item.id)
    taskList.value = taskList.value
      .filter(item => !emptyIds.includes(item.id))
      .map((item, index) => ({
        ...item,
        id: index + 1,
      }))
  }

  // 重置狀態
  modalTitle.value = ''
  modalDetail.value = ''
  isDialogVisible.value = false
  currentAction.value = ''
  currentItem.value = ''
}

const deleteFilter = (items, type) => {
  const emptyItems = []
  const nonEmptyItems = []

  if (type === 'subRow') {
    // 檢查是否除了 id 外其他欄位都有值
    const hasValues = Object.entries(items).some(([key, value]) => {
      // 忽略 id 欄位
      if (key === 'id') return false
      // 若值為陣列，需檢查是否非空陣列
      if (Array.isArray(value)) {
        return value.some(subValue => subValue !== '' && subValue !== null && subValue !== undefined)
      }
      // 若值非陣列，檢查是否為非空值
      return value !== '' && value !== null && value !== undefined
    })
    return hasValues
  } else {
    for (const item of items) {
      // 判斷是否有非空欄位
      const hasNonEmptyFields = Object.entries(item).some(([key, value]) => {
        if (key === 'id' || key === 'isEdit') return false

        if (Array.isArray(value)) {
          // 檢查 subTasks 中是否有有效值
          return value.some(subTask =>
            Object.entries(subTask).some(([subKey, subValue]) => {
              if (subKey === 'id') return false // 忽略 id
              return subValue !== '' && subValue !== null && subValue !== undefined
            })
          )
        }

        return value !== '' && value !== null && value !== undefined
      })

      // 分類為有值或無值
      if (hasNonEmptyFields) {
        nonEmptyItems.push(item)
      } else {
        emptyItems.push(item)
      }
    }
    return { emptyItems, nonEmptyItems }
  }
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
      detail: '',
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
        detail: '',
        startDate: '',
        endDate: ''
      }]
    })
    console.log('newTask新增taskList.value', taskList.value)
  }
}

// 刪除細項任務
const deleteSubRow = async (parentRow, selectedRow) => {
  const hasValues = deleteFilter(selectedRow, 'subRow') // 判斷是否有值

  // 共用的前端刪除邏輯
  const removeSubTask = () => {
    parentRow.subTasks = parentRow.subTasks
      .filter(subTask => subTask.id !== selectedRow.id)
      .map((item, index) => ({
        ...item,
        id: index + 1
      }))
  }

  if (!hasValues) {
    removeSubTask()
    console.log('僅前端刪除細項任務')
    return
  }

  try {
    // 呼叫 API 刪除
    const res = await deleteSubTask(parentRow.id, selectedRow.id)
    if (res.status === 'success' && res.code === 200) {
      removeSubTask()
      console.log('刪除細項任務成功')
      // 若需同步資料，可重新撈取
      // getTaskDetail()
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
      taskList.value = taskList.value
        .filter((item) => item.id !== row.id)
        .map((item, index) => ({
          ...item,
          id: index + 1,
        }))
      console.log('任務刪除成功')
      // 若需同步資料，可重新撈取
      // getTaskDetail()
    }
  } catch (error) {
    console.error(error)
  }
}

watch(taskList, (task) => {
  console.log('監聽taskList.value', task)
})

// 刪除選中資料
const deleteSelectedRows = async(ids) => {
  try {
    const selectedIds = selectedRows.value.map((row) => row.id)
    console.log('selectedIds', selectedIds)
    const res = await deleteSelectedTasks(ids)
    if (res.status === 'success' && res.code === 200) {
      console.log('刪除前taskList', taskList.value)
      taskList.value = taskList.value
        .filter((item) => !selectedIds.includes(item.id))
        .map((item, index) => ({
          ...item,
          id: index + 1,
        }))
      console.log('刪除後taskList', taskList.value)
      selectedRows.value = [] // 清空taskList', 選中的資料
      console.log('選定任務刪除成功')
      // 若需同步資料，可重新撈取
      // getTaskDetail()
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
