import { AxiosInstance } from 'axios'
import { provide, inject } from 'vue'
import { AppConfig } from '../ressources/model'
import { serviceContainer } from './Service.container'

export const ServiceContainerSymbol = Symbol('injector')

export function serviceDI(config: AppConfig, http: AxiosInstance) {
    return {
        useServiceContainerProvider() {
          provide(ServiceContainerSymbol, serviceContainer(config, http))
        },

        useServiceContainerContext() {
          return inject(ServiceContainerSymbol)
        }
    }
}