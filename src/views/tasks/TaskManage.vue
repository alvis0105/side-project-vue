<template>
  <div class="p-2">
    <el-row class="mb-4">
      <el-button type="primary" icon="Plus" @click="onAdd">
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
      @selection-change="onSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="account" label="任務類型" min-width="300" />
      <!-- <el-table-column prop="name" label="任務內容" min-width="250" /> -->
      <el-table-column label="建立時間" width="200">
        <template #header>
          <div class="flex items-center gap-1">
            <span>建立時間</span>
            <div class="flex flex-col">
              <el-icon
                class="pt-1 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'asc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('asc')"
              >
                <CaretTop />
              </el-icon>
              <el-icon
                class="pb-1 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'desc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('desc')"
              >
                <CaretBottom />
              </el-icon>
            </div>
          </div>
        </template>
        <template #default="scope">
          {{ scope.row.createdAt }}
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
import { ref, computed } from 'vue'

// 資料清單
const list = ref([
  { id: 1, account: '主要任務', name: '調整畫面及串接功能', createdAt: '2023-09-12 11:00:00' },
  { id: 2, account: '支線任務', name: '修正已知問題', createdAt: '2023-12-16 13:00:00' },
  { id: 3, account: 'side-project', name: '待新增3樣功能......等', createdAt: '2023-11-12 16:20:00' },
  { id: 3, account: '功能型工具', name: '待新增3樣功能......等', createdAt: '2023-11-12 16:20:00' },
])

// 已選中的資料
const selectedRows = ref([])
// 排序狀態（asc: 升序, desc: 降序）
const sortOrder = ref('account')

// 排序處理
const sortedList = computed(() => {
  return [...list.value].sort((a, b) => {
    if (sortOrder.value === 'asc') {
      return new Date(a.createdAt) - new Date(b.createdAt)
    } else if (sortOrder.value === 'desc') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    }
  })
})

// 激活排序圖標
const activateSort = (order) => {
  if (sortOrder.value !== order) {
    sortOrder.value = order
  }
}

// 控制模態框的顯示
const isDialogVisible = ref(false)
const dialogMessage = ref('')

const showDialog = (message) => {
  dialogMessage.value = message
  isDialogVisible.value = true
}

const closeDialog = () => {
  isDialogVisible.value = false
}

// 新增按鈕事件
const onAdd = () => {
  showDialog('新增按鈕點擊')
}

// 編輯按鈕事件
const onEdit = (row) => {
  showDialog(`編輯 ${row.name}`)
}

// 刪除選中資料按鈕事件
const handleDelete = () => {
  if (selectedRows.value.length === 0) {
    showDialog('未選擇任何資料')
    return
  }
  const confirmed = confirm(`確定刪除選中的 ${selectedRows.value.length} 筆資料嗎？`)
  if (confirmed) {
    deleteSelectedRows()
    showDialog('刪除成功')
  }
}

// 單行刪除按鈕事件
const onDelete = (row) => {
  const confirmed = confirm(`確定刪除 ${row.name} 的資料嗎？`)
  if (confirmed) {
    list.value = list.value.filter((item) => item.id !== row.id)
    showDialog('刪除成功')
  }
}

// 刪除選中資料
const deleteSelectedRows = () => {
  const selectedIds = selectedRows.value.map((row) => row.id)
  list.value = list.value.filter((item) => !selectedIds.includes(item.id))
  selectedRows.value = [] // 清空選中的資料
}

// 多選框改變事件
const onSelectionChange = (rows) => {
  selectedRows.value = rows
}
</script>
