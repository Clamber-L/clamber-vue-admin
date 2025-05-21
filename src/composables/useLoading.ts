import { ElLoading } from 'element-plus'
import { fourDotsSpinnerSvg } from '@/assets/svg/loading.ts'

export const loading = ElLoading.service({
    lock: true,
    background: 'rgba(0, 0, 0, 0)',
    svg: fourDotsSpinnerSvg,
    svgViewBox: '0 0 40 40'
})
