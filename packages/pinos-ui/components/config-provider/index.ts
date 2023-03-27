import { withInstall } from '@utils/with-install'
import _ConfigProvider from './config-provider'

export const IConfigProvider = withInstall(_ConfigProvider)
export { default as ConfigProvider } from './config-provider'
