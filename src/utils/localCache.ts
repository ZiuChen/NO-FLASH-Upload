class LocalCache {
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  getCache(key: string) {
    const r = window.localStorage.getItem(key);
    if (r) {
      return JSON.parse(r);
    } else {
      return r;
    }
  }
  deleteCache(key: string) {
    window.localStorage.removeItem(key);
  }
  clearCache() {
    window.localStorage.clear();
  }
}

export default new LocalCache();
