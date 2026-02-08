import { createI18n } from 'vue-i18n'
import { storage } from "@/utils/storage"
import en from './en'
import cn from './cn'
 
//引入的不同语言文件
const messages = {
  en, cn
}
 
const i18n:any = createI18n( {
  legacy: false,         // 使用 Composition API 模式，则需要将其设置为false
  globalInjection: true, //全局生效$t
  locale: 'cn',          // 设置默认值
  fallbackLocale: 'en',
  messages               //ES6解构
})
 
export default i18n;