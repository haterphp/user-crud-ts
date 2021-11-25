import User from '../../entities/user.entity';

export class UsersService {

    private usersCollection: any;

    constructor() {
        this.usersCollection = User;
    }

    public async getUsers(){
        return await this.usersCollection.find({}).lean();
    }

    public async storeUser(body: any): Promise<any[]>{
        const user = new this.usersCollection(body);
        if(await this.usersCollection.count({ email: body.email })) return [true, null];
        await user.save();
        return [null, user];
    }

    public async findUserById(id: string){
        return await this.usersCollection.findOne({ id }).lean();
    }

    public async removeUser(id: string){
        await this.usersCollection.findOne({ id }).remove();
    }

    public async updateUser(id: string, body: any){
        const user = await this.usersCollection.findOne({ id });
        if(body.email !== user.email){
            if(await this.usersCollection.count({ email: body.email })) return [true, null];
        } else delete body.email;
        await this.usersCollection.update({ id }, body);
        return [null, user];
    }
}
