import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {

    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute(data: ICreateUserRequestDTO) {
        const userAleradyExists = await this.usersRepository.findByEmail(data.email)

        if(userAleradyExists) {
            throw new Error("User already exists");
        }

        const user = new User(data);

        await this.usersRepository.save(user);

        this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe do Meu App',
                email: 'Equipe@meuapp.com'
            },
            subject: 'Seja Bem-vindo à plataforma',
            body: '<p>Você já pode fazer login em nossa plataforma.</p>'
        })
    }
}