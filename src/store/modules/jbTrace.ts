import { store } from "@/store";
import { defineStore } from "pinia";

interface jbTraceState {
  displayMode: string;
  currentView: string;
  activeFilter: string;
}

export const jbTraceStore = defineStore({
  id: "jb-trace",
  state: (): jbTraceState => ({
    displayMode: "List",
    currentView: "traceList",
    activeFilter: "",
  }),
  actions: {
    setDisplayMode(data: string) {
      this.displayMode = data;
    },
    setCurrentView(data: string) {
      this.currentView = data;
    },
    setActiveFilter(data: string) {
      if (!data) this.activeFilter = "";
      this.activeFilter = data;
    },
  },
});

export function useJbTraceStore(): any {
  return jbTraceStore(store);
}
