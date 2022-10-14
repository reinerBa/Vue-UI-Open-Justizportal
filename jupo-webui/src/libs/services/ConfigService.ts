// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
import { useStore } from "../../store/configStore"
import { AppConfig } from "../models/app-config"
import { AppOperator } from "../models/app-operator"

export default async function () {
    var promise1 = fetch('/assets/config.json')
    var promise2 = fetch('/assets/operator-config.json')
    var [configResponse, operatorConfigResponse] = await Promise.all([promise1, promise2])
    var appConfig: AppConfig = await configResponse.json()
    var operatorConfig: AppOperator = await operatorConfigResponse.json()

    useStore().setOperatorConfig(operatorConfig)
    useStore().setConfig(appConfig)
  }