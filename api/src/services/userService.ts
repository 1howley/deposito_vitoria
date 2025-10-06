class UserService {
    async createUser() {
        console.log("Creating")
        return {
            ok: true
        }
    }
}

export { UserService }