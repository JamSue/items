// src/vue-shim.d.ts
// 用于告诉 TypeScript 如何处理 .vue 文件
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
