<template>
    <div class="ww100 hh100 ba1 relative flex-col-cc">
        <div class="flex-col-cc w190 h106 ptb20 bgstl4 absolute tt8 ll4">
            <span class="pb16">智能钥匙外壳产线</span>
            <span class="f18">{{publicStore._public.productCheck?publicStore._public.productCheck.one_tis:'0'}}</span>
        </div>
        <div class="flex-col-cc w190 h106 ptb20 bgstl4 absolute tt50 ll4">
            <span class="pb16">智能钥匙底座产线</span>
            <span class="f18">{{publicStore._public.productCheck?publicStore._public.productCheck.two_tis:'0'}}</span>
        </div>
        <img src="@/assets/imgs/arrow1.png" class="absolute w133 tt11 ll15"/>
        <img src="@/assets/imgs/arrow2.png" class="absolute w133 tt50 ll15"/>
        <div class="layout-col2 flex-sc w190 h106 ptb20 bgstl4 absolute tt28 ll23">
            <span class="pb16">主线路板焊接线</span>
            <span class="f18">{{publicStore._public.productCheck?publicStore._public.productCheck.three_tis:'0'}}</span>
        </div>
        <img src="@/assets/imgs/arrow3.png" class="absolute w133 tt42 ll35"/>
        <div class="layout-col2 flex-sc w190 h106 ptb20 bgstl4 absolute tt28 ll44">
            <span class="pb16">总装测试线1</span>
            <span class="f18">{{publicStore._public.productCheck?publicStore._public.productCheck.four_tis:'0'}}</span>
        </div>
        <img src="@/assets/imgs/arrow3.png" class="absolute w133 tt42 ll55"/>
        <div class="layout-col2 flex-sc w190 h106 ptb20 bgstl4 absolute tt28 ll64">
            <span class="pb16">总装测试线2</span>
            <span class="f18">{{publicStore._public.productCheck?publicStore._public.productCheck.five_tis:'0'}}</span>
        </div>
        <img src="@/assets/imgs/arrow3.png" class="absolute w133 tt42 ll75"/>
        <div class="layout-col2 flex-sc w190 h106 ptb20 bgstl4 absolute tt28 ll84">
            <span class="pb16">总装测试线3</span>
            <span class="f18">{{publicStore._public.productCheck?publicStore._public.productCheck.six_tis:'0'}}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
const { proxy }: any = getCurrentInstance();
const publicStore = proxy.publicStore();
const state = reactive({
    ...publicStore.$state,
})
</script>
<style lang="scss" scoped>
.w190{
    width:190px;
}
.h106{
    height: 106px;
}
.w133{
    width:133px;
}
</style>