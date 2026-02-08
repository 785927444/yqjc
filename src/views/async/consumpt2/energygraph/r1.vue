<template>
    <div class="layout-col">
        <div class="h40 ww100 flex-sc relative mb10">
            <div class="ww100 hh100 flex-sc absolute">
                <div class="flex-sc flex1 hh100">
                <span class="hh100 flex-cc plr30 cursor" 
                :class="state.active==v.value?'bs4 white':'i14 bgstl2'" 
                v-for="(v, i) in state.actives" :key="i"
                @click.stop="state.active=v.value">{{v.name}}</span>
                </div>
            </div>
        </div>
        <div class="flex1 ww100 hh100 ba1" id="graph_data_nl">

        </div>
    </div>
</template>

<script setup lang="ts">
  const { proxy }: any = getCurrentInstance();
  const publicStore = proxy.publicStore();
  const configStore = proxy.configStore();
  const state = reactive({
    ...publicStore.$state,
    active:0,
    actives:[
        {name:"年",value:0},
        {name:"月",value:1},
        {name:"日",value:2},
    ],
  })

  function handleClick(action:string,item:any){

  }
</script>