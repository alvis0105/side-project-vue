<template>
  <div class="flex flex-col h-full bg-neutral-97">
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
        <template #title>
          <el-icon v-if="navMenu.meta && navMenu.meta.icon">
            <component :is="icons[navMenu.meta.icon]" />
          </el-icon>
          <span>{{ navMenu.meta.i18nTitle && $te(navMenu.meta.i18nTitle) ? $t(navMenu.meta.i18nTitle) : navMenu.meta.title }}</span>
        </template>
      </el-menu-item>
      <el-sub-menu v-else :index="navMenu.path">
        <template #title>
          <el-icon v-if="navMenu.meta && navMenu.meta.icon">
            <component :is="icons[navMenu.meta.icon]" />
          </el-icon>
          <span>{{ navMenu.meta.i18nTitle && $te(navMenu.meta.i18nTitle) ? $t(navMenu.meta.i18nTitle) : navMenu.meta.title }}</span>
        </template>
        <NavMenu :nav-menus="navMenu.children" />
      </el-sub-menu>
    </div>
  </div>
</template>

<script setup>
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// 將所有圖示元件存入字典供動態渲染
const icons = Object.keys(ElementPlusIconsVue).reduce((iconMap, key) => {
  iconMap[key.toLowerCase()] = ElementPlusIconsVue[key]
  return iconMap
}, {})
console.log('icons', icons)

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
