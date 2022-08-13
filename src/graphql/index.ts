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
import axios, { AxiosPromise, AxiosResponse } from "axios";
import { cancelToken } from "@/utils/cancelToken";
import * as app from "./query/app";
import * as selector from "./query/selector";
import * as dashboard from "./query/dashboard";
import * as topology from "./query/topology";
import * as trace from "./query/trace";
import * as log from "./query/log";
import * as profile from "./query/profile";
import * as alarm from "./query/alarm";
import * as event from "./query/event";
import * as ebpf from "./query/ebpf";
import * as demandLog from "./query/demand-log";

const query: { [key: string]: string } = {
  ...app,
  ...selector,
  ...dashboard,
  ...topology,
  ...trace,
  ...log,
  ...profile,
  ...alarm,
  ...event,
  ...ebpf,
  ...demandLog,
};
class Graphql {
  private queryData = "";
  public query(queryData: string) {
    this.queryData = queryData;
    return this;
  }
  public params(variablesData: unknown): AxiosPromise<void> {
    return axios
      .post(
        "/graphql",
        {
          query: query[this.queryData],
          variables: variablesData,
        },
        {
          cancelToken: cancelToken(),
          headers: {
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJkZXZlbG9wZXJfaWQiOiJzeXN0ZW0iLCJjcmVhdGVkX2F0IjoxNjYwMzY2MzU0NjUzLCJleHBpcmVzX2F0IjoxNjkxOTAyMzU0NjUzLCJpYXQiOjE2NjAzNjYzNTR9.LKKnNAa-QpfNq1jlUKiLMPkAYcHQ_hKd6bofmtFRAULkOMYx1IGUE6V-c79JEkvZF2hBDjwCJAHuy3qmUBye_4Y_Sgk9zBtNLKVtqJ0TaJhVBXytTiJ24S2hAb-USQTPE4-lhSCO_SYsoTtsY2zTvD0rCUW6Xt67UDAYwDwgcFkyrEmwVKzgRhWt6h8FGFZPxK-GbMSWCXZa4C_CtRdLEDAHCCPHDzEVcI2qsijxnhtTeK3Xp-kKmWcdpdGKh9cQO2Jkg3nhScbWrhn6Hk7MAj1bLgCp5-2VmhdFLyCzb79eIeNAbTwdjPWEfxz6nPlSQaLSvHIvlldUrC7fdnN-vrOd6sswW9EJBwjGJSgi7xhneO5p20s95Hb4EotPo-9yUzeE2_CmK2mhzVCBpvapRmtRrGbnCQN1xoevKAhuYJkL76qJKGG_SH5lFmzC9fwRUuE4lx0VZoNeQ82G0lRf15uZd9rerc8IzunHyeq3EofaBRBpJzWIINOlqD8DCePHdKYWXDk5EaQbFSscxgizuHd6T5bZKEl7ZZ1Iz4N5cm6pqzKdWv0-LPbyZi69PFFJl05WMIKgr4z-5gKq4JRKNLdrL4TerqnK9TZRWigwRw299nDXrmWI7y2k0AE3chvbS7j16xWEw4pqoQRpuJkDQwfPmHQ573O1I8ktSHKCMJs",
          },
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.errors) {
          res.data.errors = res.data.errors
            .map((e: { message: string }) => e.message)
            .join(" ");
        }
        return res;
      })
      .catch((err: Error) => {
        throw err;
      });
  }
}

export default new Graphql();
