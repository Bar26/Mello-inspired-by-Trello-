import io from 'socket.io-client'

export const SOCKET_EMIT_BOARD_UPDATE='board-updated'
export const SOCKET_ON_CHANGE_BOARD='update-board'
export const SOCKET_EMIT_ACTIVITY_ADDED='activity-added'
export const SOCKET_EMIT_UPDATED_BOARD='updated-board'
export const SOCKET_EMIT_UPDATE_BOARD='update-board'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030'
export const socketService = createSocketService()

socketService.setup()

function createSocketService() {
  var socket = null;
  const socketService = {
    setup() {
      socket = io(baseUrl)
    },
    on(eventName, cb) {
      socket.on(eventName, cb)
    },
    off(eventName, cb = null) {
      if (!socket) return;
      if (!cb) socket.removeAllListeners(eventName)
      else socket.off(eventName, cb)
    },
    emit(eventName, data) {
      socket.emit(eventName, data)
    },
    terminate() {
      socket = null
    },

  }
  return socketService
}

