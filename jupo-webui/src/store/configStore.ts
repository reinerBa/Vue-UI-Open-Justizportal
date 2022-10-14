// SPDX-FileCopyrightText: © 2019 Oberverwaltungsgericht Rheinland-Pfalz <poststelle@ovg.jm.rlp.de>, Reiner Bamberger <4329883+reinerBa@users.noreply.github.com>
// SPDX-License-Identifier: EUPL-1.2
import { reactive, computed, watch, ref, readonly } from "vue"
import { AuthInfo } from '../libs/models/auth-info';
import { AppConfig } from '../libs/models/app-config';
import { AppOperator } from '../libs/models/app-operator';
const storeName = "jupo-config-store"

const _config: AppConfig = reactive(new AppConfig)
const _operatorConfig: AppOperator = reactive(new AppOperator)
export const configIsSet = ref(false)
export const operatorConfigIsSet = ref(false)
export const config = readonly(_config)
export const operatorConfig = readonly(_operatorConfig)

export const useStore = () => ({
    setOperatorConfig: (config: AppOperator) => { 
        _operatorConfig.contact = config.contact,
        _operatorConfig.headerTitle = config.headerTitle,
        _operatorConfig.homeWelcomeText = config.homeWelcomeText,
        _operatorConfig.impressum = config.impressum,
        _operatorConfig.privacyPolicyUrl = config.privacyPolicyUrl,
        _operatorConfig.supportEmail = config.supportEmail
        operatorConfigIsSet.value = true
    },
    setConfig: (config: AppConfig) => { 
        _config.tokenUrl = config.tokenUrl,
        _config.statisticUrl = config.statisticUrl,
        _config.dateienUrl = config.dateienUrl,
        _config.appInfo = config.appInfo,
        _config.akteneinsichtenUrl = config.akteneinsichtenUrl
        configIsSet.value = true
    }
})
