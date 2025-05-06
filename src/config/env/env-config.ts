import { createBaseConfig } from '../core/base-config'

/**
 * 根据环境变量动态配置 base-config
 * 开发环境：development
 * 生产环境：production
 */
export const envConfig = {
  systemInfo: createBaseConfig().systemInfo
  // 可以在这里添加其他动态配置
}
