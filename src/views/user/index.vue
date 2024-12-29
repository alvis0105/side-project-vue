<template>
  <div class="p-2">
    <el-row class="mb-4">
      <el-button
        type="primary"
        icon="Plus"
        @click="newUser"
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
        label="No."
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
        min-width="150"
      >
        <template #header>
          <div class="flex items-center">
            <div class="text-center">
              {{ $t('menu.system.user.userName') }}
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
              :placeholder="$t('menu.system.user.userName')"
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
        prop="account"
        min-width="180"
      >
        <template #header>
          <div class="flex items-center">
            <div class="text-center">
              {{ $t('menu.system.user.account') }}
            </div>
            <div class="flex flex-col ps-1">
              <el-icon
                class="pt-2 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'asc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('asc', 'account')"
              >
                <CaretTop />
              </el-icon>
              <el-icon
                class="pb-1 cursor-pointer hover:text-blue-500"
                :class="sortOrder === 'desc' ? 'text-blue-500' : 'text-gray-400'"
                @click="activateSort('desc', 'account')"
              >
                <CaretBottom />
              </el-icon>
            </div>
          </div>
        </template>
        <template #default="scope">
          <div v-if="isEditing(scope.row, 'account')">
            <el-input
              ref="editableInput"
              v-model="scope.row.account"
              size="small"
              :placeholder="$t('menu.system.user.account')"
              @blur="confirmEditing"
              @keyup.enter="confirmEditing"
            />
          </div>
          <div
            v-else
            class="cursor-pointer"
            @dblclick="startEditing(scope.row, 'account')"
          >
            <el-icon
              v-if="!scope.row.account"
              class="!icon-pen"
            >
              <EditPen />
            </el-icon>
            <span :class="!scope.row.account ? 'ps-1 text-black text-opacity-30' : ''">
              {{ scope.row.account || $t('common.clickPlaceholder') }}
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
              {{ $t('menu.system.user.createdAt') }}
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
              @click="openModal('default')"
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
import { ref, computed, onMounted, nextTick } from 'vue'
import { getUsers, addUser, updateUser, deleteUser } from '@/api'
import { getCurrentDate } from '@/utils/date'
import BaseModal from '@/components/BaseModal.vue'

// 已選中的資料
const selectedRows = ref([])
// 排序狀態（asc: 升序, desc: 降序）
const sortOrder = ref('account')
// 任務類型清單
const userList = ref([])
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
  return [...userList.value].sort((a, b) => {
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
      case 'account':
        compareResult = a.account.localeCompare(b.account)
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

const newUser = () => {
  isFirstAdd.value = true
  const newId = userList.value.length
  userList.value.push({
    id: newId,
    name: '',
    account: '',
    createdAt: getCurrentDate()
  })
}

// 新增
const handleAdd = async(row) => {
  try {
    const newId = userList.value.length
    const params = {
      id: newId,
      name: row.name,
      account: row.account,
      createdAt: row.createdAt,
    }
    const res = await addUser(params)
    if (res.status === 'success' && res.code === 200) {
      console.log('成功新增使用者')
      isFirstAdd.value = false
    }
  } catch (error) {
    console.error(error)
  }
}

// 修改
const handleUpdate = async(row) => {
  try {
    const id = row.id
    const params = {
      name: row.name,
      account: row.account,
      createdAt: row.createdAt,
    }
    const res = await updateUser(id, params)
    if (res.status === 'success' && res.code === 200) {
      console.log('任務類型-修改成功')
    }
  } catch (error) {
    console.log(error)
  }
}

// 刪除選中資料
const deleteSelectedRows = async() => {
  try {
    const selectedIds = selectedRows.value.map((row) => row.id)
    const res = await deleteUser(selectedIds)
    if (res.status === 'success' && res.code === 200) {
      // 同時過濾與重新分配 id
      userList.value = userList.value
        .filter((item) => !selectedIds.includes(item.id))
        .map((item, index) => ({
          ...item,
          id: index + 1, // 重新分配 id 從 1 開始
        }))
      selectedRows.value = [] // 清空選中的資料
      console.log('成功刪除選定使用者')
    }
  } catch (error) {
    console.error(error)
  }
}

// 單行刪除
const deleteRow = async (row) => {
  try {
    const res = await deleteUser(row.id)
    if (res.status === 'success' && res.code === 200) {
      userList.value = userList.value
        .filter((item) => item.id !== row.id)
        .map((item, index) => ({
          ...item,
          id: index + 1, // 重新分配 id 從 1 開始
        }))
      }
      console.log('成功刪除單行使用者')
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

const getUsersList = async() => {
  try {
    const res = await getUsers()
    if (res.status === 'success' && res.code === 200) {
      const data = res.data
      data.forEach(item => {
        userList.value.push({
          id: item.id,
          name: item.name,
          account: item.account,
          createdAt: item.createdAt
        })
      })
    }
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getUsersList()
})
</script>
