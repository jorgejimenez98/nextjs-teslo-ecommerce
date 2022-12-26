import mongoose from 'mongoose'

/* 
 * 0 = Disconnected
 * 1 = Connected
 * 2 = Connecting
 * 3 = Disconnecting
 */
const mongoConnection = {
    isConnected: 0
}

export const connect = async () => {
    if (mongoConnection.isConnected === 1) { 
        console.log('DB Connected')
        return 
    }

    if (mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState
        if (mongoConnection.isConnected === 1) {
            console.log('Usando conexion anterior')
            return 
        }
        await mongoose.disconnect()
    }

    await mongoose.connect(process.env.MONGO_DB_CONNECTION || '')
    mongoConnection.isConnected = 1
    console.log('Conectado a Mongo DV', process.env.MONGO_DB_CONNECTION)
}

export const disconnect = async () => {
    if (process.env.NODE_ENV === 'development') return
    if (mongoConnection.isConnected === 0) return 
    await mongoose.disconnect()
    console.log('Desonectado de Mongo DB')
}