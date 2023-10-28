<template>
  <div class = "flex flex-col min-h-screen font-Roboto" >
    <Header/>
    <RouterView/>
    <site-navigation/>

  </div>
</template>
<script>
import Header from "./components/Header.vue";
import { RouterView}  from "vue-router";
import SiteNavigation from "@/components/SiteNavigation.vue";

export default {
  name: "App",
  components: {
    Header
  },
};
</script>

<style lang="scss" scoped>

</style>