<template>
 <div class="flex items-center justify-center">
    <!-- <TheWelcome /> -->
    <header class="w-[200px] h-[200px]">
      <div>
        <h1>{{ config.TITLE }}</h1>
      </div>
    </header>
    <section>
      <div>
        <el-menu
          router
        >
          <NavMenu :nav-menus="menuList" />
        </el-menu>
      </div>
    </section>
    <div class="wrapper ms-5">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import config from '@/config'
import NavMenu from './components/NavMenu.vue'
import { ref, watch } from 'vue'
import { menuList } from '/mock/model/menu'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const layout = ref()
watch(() => route.name, () => {
  // 當路由名稱改變的時候，取 meta 裡的layout來判斷要套用哪個版型
  layout.value = route.meta.layout
  console.log('layout.value', layout.value)
  if (route.meta.transition === 'slide-in-right') {
    showSlide.value = true
  }
})

</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
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