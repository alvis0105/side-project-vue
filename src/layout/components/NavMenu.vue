<template>
  <div class="flex flex-col h-full">
    <div
      v-if="props.navMenus.length <= 0"
      class="p-5"
    >
      <el-alert
        title="無子選單"
        center
        type="info"
        :closable="false"
      />
    </div>
    <div
      v-for="navMenu in props.navMenus"
      :key="navMenu"
    >
      <el-menu-item
        v-if="!hasChildren(navMenu)"
        :index="navMenu.path"
      >
        <a
          v-if="navMenu.meta && navMenu.meta.type === 'link'"
          :href="navMenu.path"
          target="_blank"
          @click.stop="()=>{}"
        />
        <template #title>
          <el-icon v-if="navMenu.meta && navMenu.meta.icon">
            <component :is="navMenu.meta.icon" />
          </el-icon>
          <span>{{ navMenu.meta.i18nTitle && $te(navMenu.meta.i18nTitle) ? $t(navMenu.meta.i18nTitle) : navMenu.meta.title }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu
        v-else
        :index="navMenu.path"
      >
        <template #title>
          <el-icon v-if="navMenu.meta && navMenu.meta.icon">
            <component :is="navMenu.meta.icon" />
          </el-icon>
          <span>{{ navMenu.meta.i18nTitle && $te(navMenu.meta.i18nTitle) ? $t(navMenu.meta.i18nTitle) : navMenu.meta.title }}</span>
        </template>
        <NavMenu :nav-menus="navMenu.children" />
      </el-sub-menu>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  navMenus: {
    type: Object,
    required: true,
  },
})

const hasChildren = (item) => {
  return item.children && !item.children.every(item => item.meta.hidden)
}
</script>
