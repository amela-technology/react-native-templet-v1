// config.js
import { logger } from 'react-native-logs'
import { colorConsoleAfterInteractions } from 'react-native-logs/dist/transports/colorConsoleAfterInteractions'

const config = {
    transport: colorConsoleAfterInteractions,
}
const log = logger.createLogger(config)

if (__DEV__) {
    log.setSeverity('debug')
} else {
    log.setSeverity('error')
}

export default logger
