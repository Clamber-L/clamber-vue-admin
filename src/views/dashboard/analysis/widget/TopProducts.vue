<template>
    <div class="custom-card art-custom-card top-products">
        <div class="custom-card-header">
            <span class="title">热门产品</span>
        </div>

        <div class="custom-card-body">
            <art-table :data="products" style="width: 100%" :pagination="false">
                <el-table-column prop="name" label="名称" width="200" />
                <el-table-column prop="popularity" label="热度">
                    <template #default="scope">
                        <el-progress
                            :percentage="scope.row.popularity"
                            :color="getColor(scope.row.popularity)"
                            :stroke-width="5"
                            :show-text="false" />
                    </template>
                </el-table-column>
                <el-table-column prop="sales" label="销量" width="80">
                    <template #default="scope">
                        <span
                            :style="{
                                color: getColor(scope.row.popularity),
                                backgroundColor: `rgba(${hexToRgb(getColor(scope.row.popularity))}, 0.08)`,
                                border: '1px solid',
                                padding: '3px 6px',
                                borderRadius: '4px',
                                fontSize: '12px'
                            }"
                            >{{ scope.row.sales }}</span
                        >
                    </template>
                </el-table-column>
            </art-table>
        </div>
    </div>
</template>

<script setup lang="ts">
import { hexToRgb } from '@/utils/color'
import { computed } from 'vue'

// 使用 computed 来创建响应式的产品数据
const products = computed(() => [
    {
        name: '家居装饰系列',
        popularity: 10,
        sales: '10%'
    },
    {
        name: '迪士尼公主粉色包 18',
        popularity: 29,
        sales: '29%'
    },
    {
        name: '浴室用品',
        popularity: 65,
        sales: '65%'
    },
    {
        name: '苹果智能手表',
        popularity: 32,
        sales: '32%'
    },
    {
        name: '健身追踪器',
        popularity: 78,
        sales: '78%'
    },
    {
        name: '无线耳机',
        popularity: 41,
        sales: '41%'
    }
])

const getColor = (percentage: number) => {
    if (percentage < 25) return '#00E096'
    if (percentage < 50) return '#0095FF'
    if (percentage < 75) return '#884CFF'
    return '#FE8F0E'
}
</script>

<style lang="scss" scoped>
.custom-card {
    height: 330px;
    overflow-y: scroll;

    // 隐藏滚动条
    &::-webkit-scrollbar {
        display: none;
    }

    &-body {
        padding: 0 6px;
    }
}

@media (width <= 1200px) {
    .custom-card {
        height: auto;
    }
}
</style>
