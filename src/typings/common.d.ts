// common type file, you can not export the type in common.d.ts
// not export can use
export interface ObjTy {
  [propName: string]: any
}
export interface KV {
  dictKey: number | string
  dictValue: any
}
