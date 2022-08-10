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
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJkZXZlbG9wZXJfaWQiOiJzeXN0ZW0iLCJjcmVhdGVkX2F0IjoxNjYwMDk3MzE1NDAzLCJleHBpcmVzX2F0IjoxNjkxNjMzMzE1NDAzLCJpYXQiOjE2NjAwOTczMTV9.PvPXbBWsqJH0I1Bdh0Tl61h1IRofrukdnKVFad92yRWR6bLT1mxQR6WeXZj_ZZnaakrgzY_x3ojJg-dgAcINU4Q8iyDqDShM8fTlhT1WkzfZAFNBAFyGP6bMzTycAH2hyCRRi6rUrK-16gSL5cSopUtya0SVWKr_aSh96lEQCFUDKg9fLwNu3vGTXhNbhpnoshABwOXVMnwvet73R8BU8gIeKjI953xyN9Xqp7mV4wNZGC3ZjzrLQ0kVGY3AYYSoeqHzlYwKA-S5yuGlsnGyjyJqpBhOuYCfMWNmE_WJ_km2ikuBIkR9ZwLZ5E1hBBklKOG-paxQyQ13HnzIhGe5IgA5CGZ3P-6wH6ckI1ZUdSo8Cm4xUEXekwcLX2pHluUWX0qkHKDAwB3tgvhbN5_zTJPWRr1QFmfhckt-7YV8YieDhGT4aJdav78KhwKEb5esNumYYNrUFYUmhHDqniR3nZAjhDwl0zoK3eVdxU3SZq2py5SUPxSUFnIhJVS6kapHdwrPS8fFZxMHt0RwyxjkOsQgsvfVcwc8cbCx6kGaZdFawyKe9PtAe6b58zrO-mzuCm7OzA0q_pT0qZsRjh7ybDF9P1Qy6m_jeG6L7duI9J60iK9LpljACAG7qt5LyPT0t8Aqv-gE704Rc-dTASi3V44yroA7Br_-qIYTw5ux_QA",
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
