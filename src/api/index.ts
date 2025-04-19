// 首先导入所有模块
import * as infoManagement from './modules/infoManagement'
import * as dataAnalysis from './modules/dataAnalysis'
import * as powerAnalysis from './modules/powerAnalysis'
import * as processing from './modules/processing'
import * as propertyAnalysis from './modules/propertyAnalysis'

// 命名导出（保持原有）
export * from './modules/infoManagement'
export * from './modules/dataAnalysis'
export * from './modules/powerAnalysis'
export * from './modules/processing'
export * from './modules/propertyAnalysis'

// 新增默认导出
export default {
  infoManagement,
  dataAnalysis,
  powerAnalysis,
  processing,
  propertyAnalysis
}