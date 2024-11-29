<template>
  <section class="h-full">
    <div class="flex flex-col h-full">
      <header class="flex items-center justify-start w-full p-5 text-font24">
        <h1>{{ config.TITLE }}</h1>
      </header>
      <div class="flex h-full border">
        <div class="flex flex-col h-full">
          <el-menu
            router
            class="h-full"
          >
            <NavMenu :nav-menus="menuList" />
          </el-menu>
          <div class="flex justify-center mt-auto border el-menu-item" @click="logout">
            <el-icon><SwitchButton /></el-icon>
            <button>
              登出
            </button>
          </div>
        </div>
        <div class="w-full p-5">
          <router-view class="w-full h-full" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { SwitchButton } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { menuList } from '/mock/model/menu'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
import NavMenu from './components/NavMenu.vue'
import config from '@/config'

const userStore = useUserStore() // 獲取 userStore 實例
const router = useRouter()
const route = useRoute()
const layout = ref()

const logout = () => {
  userStore.logout()
  router.push('/login')
}

</script>

<style scoped>
header {
  line-height: 1.5;
  /* max-height: 100vh; */
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
