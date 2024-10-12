<template>
  <div class="page">
    <div class="menu-container">
      <n-menu
        :value="active"
        :options="menus"
        :root-indent="36"
        :indent="12"
        :on-update:value="change"
      ></n-menu>
    </div>
    <div class="body-container">
      <show-home v-if="chooseMenu.type === 'default'" />
      <show-only-js v-else-if="chooseMenu.type === 'only-js'" :path="chooseMenu.path" />
      <show-only-html v-else-if="chooseMenu.type === 'only-html'" :path="chooseMenu.path" />
      <show-only-ts v-else-if="chooseMenu.type === 'only-ts'" :path="chooseMenu.path" />
    </div>
  </div>
</template>
<script setup>
import {onBeforeMount, ref, h, computed} from "vue";
import { NIcon } from 'naive-ui'
import { BookOutline as BookIcon,  HomeOutline as HomeIcon, } from '@vicons/ionicons5'
import { ShowOnlyJs, ShowOnlyHtml, ShowOnlyTs, ShowHome } from "@/components"

const menus = ref([])
const active = ref()
const chooseMenu = computed(() => menus.value.find((item) => item?.key === active.value) || {})

function change(key) {
  active.value = key
}

onBeforeMount(() => {
  const modules = import.meta.glob(`/public/source/**/description.json`)
  const promises = Object.keys(modules).map((key) => ({
    promise: modules[key](),
    key,
  })).sort((a, b) => {
    const reg = /\/step(\d+)\//
    const [,aIndex] = a.key.match(reg)
    const [,bIndex] = b.key.match(reg)
    return +aIndex - +bIndex;
  })
  Promise.all(promises.map(item => item.promise)).then((res, index) => {
    menus.value = [{
      label: '首页',
      key: 'home',
      type: 'default',
      icon: renderIcon(HomeIcon),
    }].concat(res.map((item, index) => ({
      ...item.default,
      key: promises[index].key,
      label: item.default.name,
      icon: renderIcon(item.default.icon || BookIcon),
      path: promises[index].key.replace('/description.json', ''),
    })))
    // [active.value] = menus.value
    active.value = 'home'
  })
})

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
</script>

<style scoped>
.page {
  width: 100%;
  height: 100%;
  display: flex;
}
.menu-container {
  height: 100%;
  background-color: #f0f0f0;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
  overflow-x: hidden;
  overflow-y: auto;
}
.body-container {
  flex: 1;
  height: 100%;
}
</style>
