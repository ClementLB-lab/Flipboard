import User from "../models/User";
import Follower from "../models/Follower";
import ImageLink from "../models/ImageLink";
import Magazine from "../models/Magazine";
import Favorite from "../models/Favorite";

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

    public async updateProfile(user: any, name: string, bio: string, avatarUrl?: string): Promise<void> {
        user.name = name
        user.bio = bio
        if (avatarUrl)
            user.avatarUrl = avatarUrl

        await user.save()
    }

    public async addNewUrlImage(ownerId: number, path: string): Promise<ImageLink> {
        return ImageLink.create({ ownerId, path })
    }

    public async createMagazine(ownerId: number, name: string, description: string): Promise<Magazine> {
        return Magazine.create({ ownerId, name, description })
    }

    public async increaseNbMagazine(user: any, nbMagazines: number): Promise<void> {
        user.magazines = nbMagazines
        await user.save()
    }

    public async getFollowers(userId: number): Promise<Follower[]> {
        return Follower.findAll({ where: { publisherId: userId } })
    }

    public async deleteAccount(user: any): Promise<void> {
        Favorite.destroy({ where: { userId: user.id } })
        Follower.destroy({ where: { publisherId: user.id } })
        Follower.destroy({ where: { followerId: user.id } })
        Magazine.destroy({ where: { ownerId: user.id } })
        ImageLink.destroy({ where: { ownerId: user.id } })
        await User.destroy({ where: { id: user.id } })
    }
}