import HwtList from "@/components/WelcomePage/HwtList.vue";
import InformList from "@/components/WelcomePage/InformList.vue";
import NotifyList from "@/components/WelcomePage/NotifyList.vue";
import LessonList from "@/components/WelcomePage/LessonList.vue";
import LessonTopList from "@/components/WelcomePage/LessonTopList.vue";

import { ref, onMounted } from "vue";
import localCache from "@/utils/localCache";
import Sortable from "sortablejs";

import type { TCpnConfig, TPlainConfig } from "@/hooks/types";

const cpnMap = {
  HwtList,
  InformList,
  NotifyList,
  LessonList,
  LessonTopList,
};

export default function usePageSort(plainConfig: TPlainConfig) {
  const localCpnCache = localCache.getCache("cpn-cache");
  const components = localCpnCache
    ? toCpnConfig(localCpnCache)
    : toCpnConfig(plainConfig);
  const cpnCacheRef = ref(components);
  onMounted(() => {
    var el = document.querySelector(".welcome-index .el-row");
    var sortable = new Sortable(el, {
      animation: 150,
      onEnd: function ({ oldIndex, newIndex }: any) {
        // replace position: oldIndex <=> newIndex
        [cpnCacheRef.value[oldIndex], cpnCacheRef.value[newIndex]] = [
          cpnCacheRef.value[newIndex],
          cpnCacheRef.value[oldIndex],
        ];
        localCache.setCache("cpn-cache", toPlainConfig(cpnCacheRef.value));
      },
    });
  });
  return [components];
}

export function toCpnConfig(plainConfig: TPlainConfig): TCpnConfig {
  const cpnConfig: TCpnConfig = [];
  for (const c of plainConfig) {
    for (const [key, cpn] of Object.entries(cpnMap)) {
      if (c.cpn === key) {
        cpnConfig.push({
          cpn,
          span: c.span,
        });
      }
    }
  }
  return cpnConfig;
}

export function toPlainConfig(cpnConfig: TCpnConfig): TPlainConfig {
  const plainConfig: TPlainConfig = [];
  for (const c of cpnConfig) {
    for (const [key, cpn] of Object.entries(cpnMap)) {
      if (c.cpn.name === key) {
        plainConfig.push({
          cpn: key,
          span: c.span,
        });
      }
    }
  }
  return plainConfig;
}
