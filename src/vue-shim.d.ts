declare module "*.vue" {
  import { ComponentOptions } from "vue";
  const componentOptions: ComponentOptions;
  export default componentOptions;
}
declare module "sortablejs" {
  export interface Temp {
    new (arg1: any, arg2: any): any;
  }
  export class Temp {
    constructor(arg1: any, arg2: any);
  }
  export default Temp;
}
