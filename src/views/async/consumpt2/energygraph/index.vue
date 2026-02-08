<template>
    <div class="layout-col overlay">
       <img class="ww100" src="@/assets/imgs/aac.png">
    </div>
</template>
<script lang="ts" setup>
    import r1 from "./r1.vue";
    const { proxy }:any = getCurrentInstance();
	const publicStore = proxy.publicStore()
	const state = reactive({
		...publicStore.$state,
	})
</script>