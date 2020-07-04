import User from "../models/User";
import Follower from "../models/Follower";


export default class UserManager {

    public async getByEmail(email: string): Promise<User> {
        return User.findOne({ where: { email: email } })
    }

    public async getById(userId: number): Promise<User> {
        return User.findOne({ where: { id: userId } })
    }

    public async create(name: string, email: string, passwordHash: string): Promise<User> {
        return User.create({ name, email, passwordHash })
    }

    public async updatePassword(email: string, passwordHash: string): Promise<void> {
        let user = await this.getByEmail(email)

        user.passwordHash = passwordHash

        await user.save()
    }

    public async newSubscription(followerId: number, publisherId: number): Promise<Follower> {
        return Follower.create({ publisherId, followerId })
    }

    public async deleteSubscription(followerId: number, publisherId: number): Promise<void> {
        await Follower.destroy({ where: { publisherId: publisherId, followerId: followerId } })
    }

    public async getFollowingById(followerId: number, publisherId: number): Promise<Follower> {
        return Follower.findOne({ where: { publisherId: publisherId, followerId: followerId } })
    }

    public async updateNbFollowers(user: any, newNbOfFollowers: number): Promise<void> {
        user.followers = (newNbOfFollowers < 0) ? 0 : newNbOfFollowers
        await user.save()
    }

    public async updateProfile(user: any, name: string, bio: string): Promise<void> {
        user.name = name
        user.bio = bio

        await user.save()
    }
}
