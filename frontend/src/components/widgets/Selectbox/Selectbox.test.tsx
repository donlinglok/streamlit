/**
 * @license
 * Copyright 2018-2021 Streamlit Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react"
import { mount } from "src/lib/test_util"
import { WidgetStateManager } from "src/lib/WidgetStateManager"

import { Select as UISelect } from "baseui/select"
import { Selectbox as SelectboxProto } from "src/autogen/proto"
import Selectbox, { Props } from "./Selectbox"

jest.mock("src/lib/WidgetStateManager")

const sendBackMsg = jest.fn()

const getProps = (elementProps: Partial<SelectboxProto> = {}): Props => ({
  element: SelectboxProto.create({
    id: "1",
    label: "Label",
    default: 0,
    options: ["a", "b", "c"],
    ...elementProps,
  }),
  width: 0,
  disabled: false,
  widgetMgr: new WidgetStateManager(sendBackMsg),
})

describe("Selectbox widget", () => {
  const props = getProps()
  const wrapper = mount(<Selectbox {...props} />)

  it("renders without crashing", () => {
    expect(wrapper.find(UISelect).length).toBeTruthy()
  })

  it("should set widget value on did mount", () => {
    expect(props.widgetMgr.setIntValue).toHaveBeenCalledWith(
      props.element.id,
      props.element.default,
      { fromUi: false }
    )
  })
})
