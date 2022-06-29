import { Component } from "vue";

export type TCpnConfig = {
  cpn: Component;
  span: number;
}[];

export type TPlainConfig = {
  cpn: string;
  span: number;
}[];
