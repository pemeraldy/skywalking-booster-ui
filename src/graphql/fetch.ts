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
import axios, { AxiosResponse } from "axios";
import { cancelToken } from "@/utils/cancelToken";

async function query(param: {
  queryStr: string;
  conditions: { [key: string]: unknown };
}) {
  const res: AxiosResponse = await axios.post(
    "/graphql",
    { query: param.queryStr, variables: { ...param.conditions } },
    {
      cancelToken: cancelToken(),
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJkZXZlbG9wZXJfaWQiOiJzeXN0ZW0iLCJjcmVhdGVkX2F0IjoxNjU2MjQ0OTI4NDA0LCJleHBpcmVzX2F0IjoxNjg3NzgwOTI4NDA0LCJpYXQiOjE2NTYyNDQ5Mjh9.VMyM2PHN6DeCsTPKSB2gidnaehdIh2u5gYaXcgNl6oyOEHaaYExSVbeKUfS_hXV3YBC0-d3KvKu9-fYe3xRxxiZqKhP7Jx7My5svIGyWM-Zn-zOkuc_3GQZgBR7XiM5RRa66989vr1EkzwYJbidtGTZrO5akYH7n6FSVyZL1NTIUH5mCTynzHZGIpO4HH6-WuSrAvrePcLIqDrAlBihe4_QBhzvx_Wvf8v3YkqxXV-ken_0WtQABLGtuhzTGNaoKXxTP93gNA9teHiEHHeIt-Nl-tazhTDSCopI3-eX_pbVwNwtegx-w36w7aGzjoqkx0Ggz9tPiZQVZel0O6i5zlrIj2ODK3ezA0rD7gLzaFM9a7JzwNLzDigKL_cB3kcokK9KuwooA1hBHZzKHr_QM47u8cpdw04J7QWHbZ5Z7GTdHIqnMGKrxWZYZvFEDGHzy6yLN42KFUXZT6CiLYWqGwEcIKtY6vT-DztCNIBoHgsom0miyhPzHicMBEfyhBH66AZNpfHNbN4pFTZLpuc7OGG3ZPyhRVruCK61lPARRg9SomyQoB9yhGBQw4R9XFA5YKAf8hFpO0mME3bGCERTEXbk0BIBkQWnKVksnGgYeyIIBh2zgS6RV-n8u08UywQgyHnlDRxDIYzj6DEhrTt7lmTj6mlq9cNiSfZ5t9Ap99tA",
      },
    }
  );
  if (res.data.errors) {
    res.data.errors = res.data.errors
      .map((e: { message: string }) => e.message)
      .join(" ");
  }
  return res;
}

export default query;
