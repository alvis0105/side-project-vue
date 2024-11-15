<template>
  <div>
    <div v-if="props.navMenus.length<=0" style="padding:20px;">
      <el-alert
        title="無子集選單"
        center
        type="info"
        :closable="false"
      />
    </div>
    <div v-for="navMenu in props.navMenus" :key="navMenu">
      <el-menu-item v-if="!hasChildren(navMenu)" :index="navMenu.path">
        <a
          v-if="navMenu.meta&&navMenu.meta.type=='link'"
          :href="navMenu.path"
          target="_blank"
          @click.stop="()=>{}"
        />
        <!-- <el-icon v-if="navMenu.meta&&navMenu.meta.icon"><component :is="useIconRender(navMenu.meta.icon) || useIconRender('ep-menu')" /></el-icon> -->
        <template #title>
          <span>{{ navMenu.meta.i18nTitle && $te(navMenu.meta.i18nTitle) ? $t(navMenu.meta.i18nTitle) : navMenu.meta.title }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu v-else :index="navMenu.path">
        <template #title>
          <!-- <el-icon v-if="navMenu.meta&&navMenu.meta.icon"><component :is="useIconRender(navMenu.meta.icon) || useIconRender('ep-menu')" /></el-icon> -->
          <span>{{ navMenu.meta.i18nTitle && $te(navMenu.meta.i18nTitle) ? $t(navMenu.meta.i18nTitle) : navMenu.meta.title }}</span>
        </template>
        <NavMenu :nav-menus="navMenu.children" />
      </el-sub-menu>
    </div>
  </div>
</template>

<script setup>
// import { useIconRender } from '@/hooks'

const props = defineProps({
  navMenus: {
    type: Object,
    required: true,
  },
})

function hasChildren(item) {
  return item.children && !item.children.every(item => item.meta.hidden)
}
</script>
