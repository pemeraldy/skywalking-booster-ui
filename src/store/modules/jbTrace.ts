/**
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { defineStore } from "pinia";
import { store } from "@/store";
// import { Trace, Span } from "@/types/trace";

interface jbTraceStates {
  activeFilter: string;
  displayMode: string;
  currentView: string;
}

export const jbTraceStore = defineStore({
  id: "jb-trace",
  state: (): jbTraceStates => ({
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
