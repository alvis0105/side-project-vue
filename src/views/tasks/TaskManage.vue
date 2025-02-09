<template>
  <div class="p-2">
    <el-row class="mb-4">
      <el-button
        type="primary"
        icon="Plus"
        @click="newTaskType"
      >
        {{ $t('common.add') }}
      </el-button>
      <!-- <el-button
        :type="selectedRows.length ? 'danger' : ''"
        :class="selectedRows.length ? '' : 'opacity-50 cursor-not-allowed'"
        :disabled="selectedRows.length === 0"
        icon="Delete"
        @click="openModal('deleteSelectedRows', selectedRows)"
      >
        {{ $t('common.delete') }}
      </el-button> -->
    </el-row>
    <el-table
      :data="sortedList"
      :border="false"
      class="w-full"
      :resizable="false"
      @selection-change="onSelectionChange"
    >
      <el-table-column
        type="selection"
        width="35"
      />
      <el-table-column
        prop="id"
        width="80"
      >
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
      <el-table-column
        prop="name"
        min-width="80"
      >
        <template #header>
          <div class="flex items-center">
            <div class="text-center">
              {{ $t('menu.system.taskManage.taskName') }}
            </div>
            <div class="flex flex-col ps-1">
              <el-icon
                class="pt-2 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'asc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('asc', 'name')"
              >
                <CaretTop />
              </el-icon>
              <el-icon
                class="pb-1 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'desc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('desc', 'name')"
              >
                <CaretBottom />
              </el-icon>
            </div>
          </div>
        </template>
        <template #default="scope">
          <div v-if="isEditing(scope.row, 'name')">
            <el-input
              ref="editableInput"
              v-model="scope.row.name"
              size="small"
              :placeholder="$t('menu.tasks.taskList.taskName')"
              @blur="confirmEditing"
              @keyup.enter="confirmEditing"
            />
          </div>
          <div
            v-else
            class="cursor-pointer"
            @dblclick="startEditing(scope.row, 'name')"
          >
            <el-icon
              v-if="!scope.row.name"
              class="!icon-pen"
            >
              <EditPen />
            </el-icon>
            <span :class="!scope.row.name ? 'ps-1 text-black text-opacity-30' : ''">
              {{ scope.row.name || $t('common.clickPlaceholder') }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="createdAt"
        min-width="100"
      >
        <template #header>
          <div class="flex items-center gap-1">
            <div class="text-center">
              {{ $t('menu.system.taskManage.createdAt') }}
            </div>
            <div class="flex flex-col">
              <el-icon
                class="pt-2 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'asc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('asc', 'createdAt')"
              >
                <CaretTop />
              </el-icon>
              <el-icon
                class="pb-1 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'desc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('desc', 'createdAt')"
              >
                <CaretBottom />
              </el-icon>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column width="250">
        <template #default="scope">
          <div class="flex justify-end">
            <el-button
              type="success"
              icon="Edit"
              size="small"
              @click="onEdit(scope.row)"
            />
            <el-button
              type="danger"
              icon="CloseBold"
              size="small"
              @click="openModal('deleteRow', scope.row)"
            />
          </div>
        </template>
      </el-table-column> -->
    </el-table>

    <!-- 顯示通知模態框 -->
    <BaseModal
      v-model="isModalOpen"
      :title="modalTitle"
      :detail="modalDetail"
      :cancel-text="cancelText"
      :confirm-text="confirmText"
      :have-cancel-btn="true"
      @close-modal="closeModal"
      @confirm="handleConfirm"
    >
      <template #confirmButton>
        <button
          class="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          @click="handleConfirm"
        >
          確認
        </button>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { getTaskType, addTaskType, updateTaskType, deleteTaskType } from '@/api'
import { getCurrentDate } from '@/utils/date'
import BaseModal from '@/components/BaseModal.vue'

// 已選中的資料
const selectedRows = ref([])
// 排序狀態（asc: 升序, desc: 降序）
const sortOrder = ref('account')
// 任務類型清單
const taskTypeList = ref([])
const editableInput = ref(null)
const sortType = ref()
const originalValues = ref([])

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

// 編輯狀態管理
const editingStatus = ref({
  row: null,
  field: ''
})

const isEditing = computed(() => {
  return (row, field) =>
    editingStatus.value.row === row &&
    editingStatus.value.field === field
})

// 排序
const sortedList = computed(() => {
  return [...taskTypeList.value].sort((a, b) => {
    let compareResult = 0
    switch (sortType.value) {
      case 'createdAt':
        compareResult = new Date(a.createdAt) - new Date(b.createdAt)
        break
      case 'id':
        compareResult = a.id - b.id
        break
      case 'name':
        compareResult = a.name.localeCompare(b.name)
        break
      default:
        compareResult = 0
    }

    // 統一的升序/降序控制
    return sortOrder.value === 'asc' ? compareResult : -compareResult
  })
})

// 排序
const activateSort = (order, type) => {
  sortType.value = type
  if (sortOrder.value !== order) {
    sortOrder.value = order
  }
}

const startEditing = async (row, field) => {
  editingStatus.value = {
    row: row,
    field: field
  }
  originalValues.value = JSON.parse(JSON.stringify(row))
  await nextTick()
  editableInput.value?.focus()
}

const confirmEditing = async () => {
  const row = editingStatus.value.row

  // 檢查原始值是否有變更
  const hasChanged = JSON.stringify(originalValues.value) !== JSON.stringify(row)

  if (isFirstAdd.value && hasChanged) {
    handleAdd(row)
  } else if (hasChanged) {
    handleUpdate(row)
  }
  editingStatus.value = { row: null, field: '' }
}

const newTaskType = () => {
  isFirstAdd.value = true
  const newId = taskTypeList.value.length
  taskTypeList.value.push({
    id: newId,
    name: '',
    createdAt: getCurrentDate()
  })
}

// 新增按鈕事件
const handleAdd = async(row) => {
  try {
    const newId = taskTypeList.value.length
    const params = {
      id: newId,
      name: row.name,
      createdAt: row.createdAt,
    }
    const res = await addTaskType(params)
    if (res.status === 'success' && res.code === 200) {
      isFirstAdd.value = false
    }
  } catch (error) {
    console.error(error)
  }
}

const handleUpdate = async(row) => {
  try {
    const id = row.id
    const params = {
      name: row.name,
      createdAt: row.createdAt,
    }
    const res = await updateTaskType(id, params)
    if (res.status === 'success' && res.code === 200) {
      console.log('任務類型-修改成功')
    }
  } catch (error) {
    console.log(error)
  }
}

// 編輯按鈕事件
// const onEdit = () => {
//   isModalOpen.value = true
// }

// 刪除選中資料按鈕事件
const deleteSelectedRows = async() => {
  try {
    const selectedIds = selectedRows.value.map((row) => row.id)
    const res = await deleteTaskType(selectedIds)
    if (res.status === 'success' && res.code === 200) {
      // 同時過濾與重新分配 id
      taskTypeList.value = taskTypeList.value
        .filter((item) => !selectedIds.includes(item.id))
        .map((item, index) => ({
          ...item,
          id: index + 1, // 重新分配 id 從 1 開始
        }))
      selectedRows.value = [] // 清空選中的資料
    }
  } catch (error) {
    console.error(error)
  }
}

// 單行刪除按鈕事件
const deleteRow = async (row) => {
  try {
    const res = await deleteTaskType(row.id)
    if (res.status === 'success' && res.code === 200) {
      taskTypeList.value = taskTypeList.value
        .filter((item) => item.id !== row.id)
        .map((item, index) => ({
            ...item,
            id: index + 1, // 重新分配 id 從 1 開始
          }))
        }
  } catch (error) {
    console.error(error)
  }
}

// 多選框改變事件
const onSelectionChange = (rows) => {
  selectedRows.value = rows
}

// const openModal = (action, item) => {
//   isModalOpen.value = true
//   currentAction.value = action
//   currentItem.value = item

//   switch (action) {
//     case 'deleteSelectedRows':
//       modalTitle.value = '刪除檔案'
//       modalDetail.value = `請確認是否刪除選中的 "${item.length}筆" 資料?`
//       break
//     case 'deleteRow':
//       modalTitle.value = '刪除檔案'
//       modalDetail.value = `請確認是否刪除 "${item.name}" ?`
//       break
//     default:
//       modalTitle.value = '提示'
//       modalDetail.value = '請確認是否執行?'
//       break
//   }
// }

// 確認按鈕依照判斷式執行相應動作
const handleConfirm = async() => {
  if (currentAction.value === 'deleteSelectedRows') {
    await deleteSelectedRows()
  } else if (currentAction.value === 'deleteRow') {
    await deleteRow(currentItem.value)
  }
  closeModal()
}

// 關閉並重置狀態
const closeModal = () => {
  isModalOpen.value = false
  modalTitle.value = ''
  modalDetail.value = ''
  currentAction.value = ''
  currentItem.value = ''
}

const getTaskTypeList = async() => {
  try {
    const res = await getTaskType()
    if (res.status === 'success' && res.code === 200) {
      const data = res.data
      data.forEach(item => {
        taskTypeList.value.push({
          id: item.id,
          name: item.name,
          createdAt: item.createdAt
        })
      })
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getTaskTypeList()
})
</script>
