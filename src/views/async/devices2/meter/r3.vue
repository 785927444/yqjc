<template>
    <div class="layout-col">
        <!-- 标题 -->
        <aa-title title="电表统计情况"><template #right-content></template></aa-title>
        <!-- 内容 -->
        <div class="layout-row">
            <div class="flex2 hh100 flex-ss warp ba1 p15 i15">
                <div class="ww hh50 p8">
                    <div class="ww100 hh100 p2 rad2">
                        <div class="layout-row octagon">
                            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                                <span class="pt5 pb5">总数量<span></span></span>
                                <span class="pb5 f16 fw white">{{!isNull(publicStore._public.homeInfo)&&publicStore._public.homeInfo.sum?publicStore._public.homeInfo.sum:'0'}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ww hh50 p8">
                    <div class="ww100 hh100 p2 rad2">
                        <div class="layout-row octagon">
                            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                                    <span class="pt5 pb5">通信正常<span></span></span>
                                    <span class="pb5 f16 fw white">{{!isNull(publicStore._public.homeInfo)&&publicStore._public.homeInfo.offline0?publicStore._public.homeInfo.offline0:'0'}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ww hh50 p8">
                    <div class="ww100 hh100 p2 rad2">
                        <div class="layout-row octagon">
                            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                                    <span class="pt5 pb5">通信异常<span></span></span>
                                    <span class="pb5 f16 fw white">{{!isNull(publicStore._public.homeInfo)&&publicStore._public.homeInfo.sum&&publicStore._public.homeInfo.offline0?publicStore._public.homeInfo.sum-publicStore._public.homeInfo.offline0:'0'}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ww hh50 p8">
                    <div class="ww100 hh100 p2 rad2">
                        <div class="layout-row octagon">
                            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                                    <span class="pt5 pb5">通信故障<span></span></span>
                                    <span class="pb5 f16 fw white">{{!isNull(publicStore._public.homeInfo)&&publicStore._public.homeInfo.sum&&publicStore._public.homeInfo.offline0&&publicStore._public.homeInfo.offline1?
                                     publicStore._public.homeInfo.sum - publicStore._public.homeInfo.offline0 - publicStore._public.homeInfo.offline1:'0'}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="ww hh50 p8">
                    <div class="ww100 hh100 p2 rad2">
                        <div class="layout-row octagon">
                            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                                    <span class="pt5 pb5">开机设备<span></span></span>
                                    <span class="pb5 f16 fw white">{{!isNull(publicStore._public.homeInfo)?
                                    publicStore._public.homeInfo['20221']&&publicStore._public.homeInfo['20223']?publicStore._public.homeInfo['20221']+publicStore._public.homeInfo['20223']:
                                    publicStore._public.homeInfo['20221']?publicStore._public.homeInfo['20221']:
                                    publicStore._public.homeInfo['20223']?publicStore._public.homeInfo['20223']:'0':'0'}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ww hh50 p8">
                    <div class="ww100 hh100 p2 rad2 ">
                        <div class="layout-row octagon">
                            <div class="flex-col-cc flex-sc bgbox11 plr5 ptb5 ww100">
                                    <span class="pt5 pb5">关机设备<span></span></span>
                                    <span class="pb5 f16 fw white">{{!isNull(publicStore._public.homeInfo)?
                                    publicStore._public.homeInfo['20220']&&publicStore._public.homeInfo['20222']?publicStore._public.homeInfo['20220']+publicStore._public.homeInfo['20222']:
                                    publicStore._public.homeInfo['20220']?publicStore._public.homeInfo['20220']:
                                    publicStore._public.homeInfo['20222']?publicStore._public.homeInfo['20222']:'0':'0'}}</span>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <!-- 底部 -->
        <aa-foot></aa-foot>
    </div>
</template>

<script setup lang="ts">
const { proxy }: any = getCurrentInstance();
const publicStore = proxy.publicStore();
const state = reactive({
    ...publicStore.$state,
})

</script>

<style scoped lang="scss">
.ww { width: 33.3%;}
.hh { height: 33.3%;}
</style>