<template>
    <div class="flex-sc ba9 relative">
        <div class="ww100 flex-sc">
            <span class="flex-cc plr15 pb15 pt15 cursor relative i14" 
            :class="getActiveClass(v)?'bs4 white':''" 
            v-for="(v, i) in menuData" :key="i"
            @click.stop="handleClickStop(v)" @mouseover="handleMouseOver(v,i)" @mouseout="handleMouseOut(v,i)">
              <div v-if="v.children" class="flex-sc">
                  {{v.name}}
                  <img src="@/assets/imgs/dropdown.png" class="ml10"/>
                  <div class="absolute flex-col ww100 hh100 l0 z10 pt50" v-show="state.activeDropDown==i">
                    <span v-for="(item, j) in v.children" @click.stop="handleSubItemClick(item)" :key="`${i}-${j}`" class="ptb10 pl15 bob-i22-1" :class="item.path==route.path?'bgi1 i23':'bgi23'">{{item.name}}</span>
                  </div>
              </div>
              <span v-else>
                {{v.name}}
              </span>
            </span>
        </div>
        <div class="hh100 absolute flex-sc r10">
          <img src="@/assets/imgs/bread-l.png"/>
          <span>
            <span class="ft-gray1">{{ mainMainName }}</span>
            <span class="plr8 ft-gray1">/</span>
            <span :class="state.active.split('-').length>1?'ft-gray1':'fw'">{{ getActiveItemName() }}</span>
            <span class="plr8 ft-gray1" v-if="state.active.split('-').length>1">/</span>
            <span class="fw" v-if="state.active.split('-').length>1">{{ getSubName() }}</span>
          </span>
          <img src="@/assets/imgs/bread-r.png"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
  const { proxy }: any = getCurrentInstance();
  const publicStore = proxy.publicStore();
  const configStore = proxy.configStore();
  const route = useRoute()
  const props = defineProps({
    mainMainName:{
      type:String,
      required:true
    },
    menuData:{
      type:[Object],
      default:()=>[]
    },
    defalutActive:{
      type:String
    }
  });
  const state = reactive({
    ...publicStore.$state,
    active: '',
    activeDropDown:-1,
  });

  onMounted(()=>{
    if(props.defalutActive){
      state.active = props.defalutActive;
    }
  })
  function handleClickStop(item:any){
    if(!item.children){
      state.active = item.value;
      proxy.toPath(item.path)
      return;
    }
    const one = item.children[0];
    state.active = one.value;
  }

  function getActiveItemName(){
    const active = state.active;
    if(!active){
      return "";
    }
    let strs = active.split("-");
    //console.log(publicStore)
    return props.menuData[parseInt(strs[0])-1]["name"];
  }

  function getActiveClass(item:any){
    if(!item.children){
      return item.value==state.active;
    }
    return item.children.filter((ix:any)=>ix.value==state.active)[0]!=undefined
  }

  function handleSubItemClick(subItem:any){
    state.active = subItem.value
    if(subItem.path){
      proxy.toPath(subItem.path);
    }
  }

  async function handleMouseOver(item:any,index:Number){
    await nextTick();
    state.activeDropDown = index;
  }

  function handleMouseOut(item:any,index:Number){
    state.activeDropDown = -1;
  }

  function getSubName(){
    const active = state.active;
    let strs = active.split("-");
    if(strs.length<=1){
      return "";
    }
    return  props.menuData[parseInt(strs[0])-1]["children"][parseInt(strs[1])-1]["name"]
  }

</script>