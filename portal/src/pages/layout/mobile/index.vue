<template>
  <div class="page">
    <nav-bar class="header" :title="chooseMenu.label">
      <template #left>
        <van-icon @click="openMenu" name="list-switch" />
      </template>
    </nav-bar>
    <div class="body-container">
      <show-home v-if="chooseMenu.type === 'default'" />
      <show-only-js v-else-if="chooseMenu.type === 'only-js'" :path="chooseMenu.path" />
      <show-only-html v-else-if="chooseMenu.type === 'only-html'" :path="chooseMenu.path" />
      <show-only-ts v-else-if="chooseMenu.type === 'only-ts'" :path="chooseMenu.path" />
    </div>
    <div class="menu-container" :data-visible="showMenu.toString()">
      <div class="menu-mask" @click="closeMenu"></div>
      <div class="menu-body">
        <div class="menu-header">
          <div>导航</div>
          <van-icon class="van-icon" @click="closeMenu" name="close" />
        </div>
        <div class="menu-content">
          <van-sidebar class="van-sidebar" v-model="activeIndex">
            <van-sidebar-item v-for="item in menus" :key="item.path" :title="item.label" @click="change(item.key)" />
          </van-sidebar>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import {computed, onBeforeMount, ref} from 'vue'
import { NavBar, Icon as VanIcon, Sidebar as VanSidebar, SidebarItem as VanSidebarItem } from 'vant'
import { ShowOnlyJs, ShowOnlyHtml, ShowOnlyTs, ShowHome } from "@/components/mobile"

const showMenu = ref('default')

function closeMenu() {
  showMenu.value = 'false'
}

const menus = ref([])
const active = ref()
const chooseMenu = computed(() => menus.value.find((item) => item?.key === active.value) || {})
const activeIndex = computed(() => menus.value.findIndex((item) => item?.key === active.value) >= 0 ? menus.value.findIndex((item) => item?.key === active.value) : 0)

function openMenu() {
  showMenu.value = 'true'
}

function change(key) {
  active.value = key
  closeMenu()
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
    }].concat(res.map((item, index) => ({
      ...item.default,
      key: promises[index].key,
      label: item.default.name,
      path: promises[index].key.replace('/description.json', ''),
    })))
    active.value = 'home'
  })
})

</script>
<style>

@keyframes showContainer {
  from {
    opacity: 0;
    z-index: 2;
  }
  to {
    opacity: 1;
    z-index: 2;
  }
}

@keyframes hideContainer {
  from {
    opacity: 1;
    z-index: 2;
  }
  to {
    opacity: 0;
    z-index: -2;
  }
}

@keyframes showBody {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes hideBody{
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
<style scoped>
.page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.header {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #fff;
}

.body-container {
  position: relative;
  flex: 1;
  z-index: 1;
  background-color: #f0f0f0;
}

.menu-container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  transition: transform 0.3s;
}

.menu-container[data-visible="default"] {
  z-index: -2;
  opacity: 0;
}

.menu-container[data-visible="true"] {
  animation-name: showContainer;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  animation-timing-function: ease-in-out;
}

.menu-container[data-visible="false"] {
  animation-name: hideContainer;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  animation-timing-function: linear;
}

.menu-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}


.menu-body {
  position: relative;
  top: 0;
  left: 0;
  width: 80%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #fff;
  box-shadow: -2px 0 8px 1px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.menu-container[data-visible="true"] .menu-body {
  transform: translateX(-100%);
  animation-name: showBody;
  animation-duration: 0.3s;
  animation-fill-mode: forwards;
  animation-delay: 0.3s;
  animation-timing-function: ease-in-out;
}

.menu-container[data-visible="default"] .menu-body {
  transform: translateX(-100%);
}

.menu-header {
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: #fff;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
  height: 46px;
  line-height: 46px;
  padding: 0 16px;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
}

.menu-header .van-icon {
  cursor: pointer;
  position: absolute;
  right: 16px;
  color: #999;
}

.menu-content {
  width: 100%;
}

.menu-content .van-sidebar {
  width: 100%;
}
</style>
