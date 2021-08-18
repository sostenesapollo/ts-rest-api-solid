import { User } from "../../entities/User";

export class PostgresUsersRepository {
    private users: User[] = [];

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find(user=> user.email === email);
        
        return user
    }

    async save(user: User): Promise<void> {
        // Simulate store into postgresql
        this.users.push(user);
    }
}