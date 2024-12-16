<template>
  <div class="p-2">
    <el-row class="mb-4">
      <el-button type="primary" icon="Plus" @click="addTaskType">
        新增
      </el-button>
      <el-button
        :type="selectedRows.length > 0 ? 'danger' : ''"
        :class="selectedRows.length > 0 ? '' : 'opacity-50 cursor-not-allowed'"
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
      <el-table-column prop="name" label="任務名稱" min-width="80">
        <template #header>
          <div class="flex items-center">
            <div class="text-center">
              任務名稱
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
          <div v-if="isEditing(scope.row, null, 'name')">
            <el-input
              v-model="scope.row.name"
              size="small"
              ref="editableInput"
              @blur="stopEditing"
              @keyup.enter="confirmEditing"
            />
          </div>
          <div
            v-else
            class="cursor-pointer"
            @dblclick="startEditing(scope.row, null, 'name')"
          >
            <el-icon v-if="!scope.row.name" class="!icon-pen">
              <EditPen />
            </el-icon>
            <span :class="!scope.row.name ? 'ps-1 text-black text-opacity-30' : ''">
              {{ scope.row.name || '點擊輸入' }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="建立時間" min-width="100">
        <template #header>
          <div class="flex items-center gap-1">
            <span>開始時間</span>
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
            <el-icon v-if="!scope.row.createdAt" class="!icon-pen">
              <EditPen />
            </el-icon>
            <span :class="!scope.row.createdAt ? 'ps-1 text-black text-opacity-30' : ''">
              {{ scope.row.createdAt || '點擊輸入' }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="250">
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
    >
      <div>{{ dialogMessage }}</div>
      <template #footer>
        <el-button type="primary" @click="closeDialog">確認</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'
import { getTaskType } from '@/api'

// 控制模態框的顯示
const isDialogVisible = ref(false)
// 彈窗訊息
const dialogMessage = ref('')
// 已選中的資料
const selectedRows = ref([])
// 排序狀態（asc: 升序, desc: 降序）
const sortOrder = ref('account')
// 任務類型清單
const taskTypeList = ref([])
const editableInput = ref(null)
const sortType = ref()
const isDeleteConfirmed = ref(false)
// 編輯狀態管理
const editingStatus = ref({
  parentRow: null,
  row: null,
  field: ''
})

const isEditing = computed(() => {
  return (parentRow, row, field) =>
    editingStatus.value.parentRow === parentRow &&
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

const showDialog = (message) => {
  dialogMessage.value = message
  isDialogVisible.value = true
}

const closeDialog = () => {
  isDialogVisible.value = false
}

// 新增按鈕事件
const addTaskType = () => {
  const newId = taskTypeList.value.length + 1
  taskTypeList.value.push({ id: newId, name: '', createdAt: '' })
}

// 編輯按鈕事件
const onEdit = (row) => {
  showDialog(`編輯 ${row.name}`)
}

// 刪除選中資料按鈕事件
const deleteSelectedRows = () => {
  if (selectedRows.value.length === 0) {
    showDialog('未選擇任何資料')
    return
  }
  const confirmed = confirm(`確定刪除選中的 ${selectedRows.value.length} 筆資料嗎？`)
  if (confirmed) {
    const selectedIds = selectedRows.value.map((row) => row.id)
  
    // 同時過濾與重新分配 id
    taskTypeList.value = taskTypeList.value
      .filter((item) => !selectedIds.includes(item.id))
      .map((item, index) => ({
        ...item,
        id: index + 1, // 重新分配 id 從 1 開始
      }))

    selectedRows.value = [] // 清空選中的資料
    showDialog('刪除成功')
  }
}

// 單行刪除按鈕事件
const deleteRow = (row) => {
  const confirmed = confirm(`確定刪除 ${row.name} 的資料嗎？`)
  if (confirmed) {
    taskTypeList.value = taskTypeList.value
      .filter((item) => item.id !== row.id)
      .map((item, index) => ({
        ...item,
        id: index + 1, // 重新分配 id 從 1 開始
      }))
    showDialog('刪除成功')
  }
}

// 多選框改變事件
const onSelectionChange = (rows) => {
  selectedRows.value = rows
}

const getTaskTypeList = async() => {
  try {
    const res = await getTaskType()
    if (res.status === 'success' && res.code === 200) {
      const data = res.data
      data.forEach(item => {
        taskTypeList.value.push({
          id: item.id,
          name: item.type,
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
