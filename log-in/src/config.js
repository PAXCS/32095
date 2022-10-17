export default {
    PORT: process.env.PORT || 8080,

    mongoLocal: {
        client: 'mongodb',
        cnxStr: 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0'
    },
    
    mongoRemote: {
        client: 'mongodb',
        cnxStr: 'mongodb+srv://cpax:lpPbv8sf78PHOzbi@cluster0.2qm6piw.mongodb.net/myFirstDatabase?appName=mongosh+1.6.0'
    },
    
    fileSystem: {
        path: './DB'
    }
}