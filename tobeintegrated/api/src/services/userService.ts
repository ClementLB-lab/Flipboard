import * as jwt from '../utils/jwt';
import UserManager from '../manager/userManager';
import User from '../models/User';
import Follower from '../models/Follower';
import validator from 'validator';
import Result from '../utils/result';
import * as pwdUtil from '../utils/password';
import * as emailUtil from '../utils/email';
import fs from 'fs';
import mime from 'mime'
import { noExtendLeft } from 'sequelize/types/lib/operators';

export default class UserService {

    private userManager = new UserManager()

    /**
     * Gets a user from a JWT
     * @return the user or null if jwt is invalid
     */
    public async getByJWT(token: jwt.Token): Promise<User> {
        if (!token)
            return null
        return this.getById(jwt.getUserIdFromToken(token));
    }

    /**
     * Gets a user from an ID
     * @return the user or null if no such user exists
     */
    public async getById(id: number, fields?: string): Promise<User> {
        if (!id)
            return null

        const result = await this.userManager.getById(id);

        return result

    }

    /**
     * Creates a new user with these field.
     * @param password The password in clear, it will hashed and salted
     */
    public async register(name: string, email: string, password: string): Promise<Result<jwt.Token, Object>> {
        let fieldsErrors: any = {};

        if (!name || !validator.isLength(name, { min: 3 }))
            fieldsErrors.name = "Le nom doit contenir au moins 3 charactères"
        if (!email || !validator.isEmail(email))
            fieldsErrors.email = "Email invalide"
        if (!password || !validator.isLength(password, { min: 8 }))
            fieldsErrors.password = "Le mot de passe doit contenir au moins 8 caractères"

        if (Object.keys(fieldsErrors).length)
            return Result.error(fieldsErrors)


        if (await this.userManager.getByEmail(email)) {
            fieldsErrors.email = "Email déjà utilisée"
            return Result.error(fieldsErrors)
        }

        const createdUser = await this.userManager.create(name, email, pwdUtil.hash(password))

        return Result.success(jwt.getTokenForUser(createdUser))
    }

    /**
     * Verify that the email and password match, if so generates a JWT
     *
     * @param password The password in clear
     */
    public async login(email: string, password: string): Promise<Result<jwt.Token, Object>> {
        const user = await this.userManager.getByEmail(email)

        if (!user)
            return Result.error({ email: "Email inconnue" })

        const match = await pwdUtil.checkMatch(password, user.passwordHash)
        if (!match)
            return Result.error({ password: "Mot de passe incorrect" })

        return Result.success(jwt.getTokenForUser(user))
    }

     /**
     * Verify that the email match
     *
     * @param email The email to find
     */
    public async forgotpwd(email: string): Promise<Result<jwt.Token, Object>> {
        if (!email)
            return Result.error("Adresse invalide")

        const user = await this.userManager.getByEmail(email)
        if (!user)
            return Result.error({ email: "Email inconnue" })
        const token = jwt.usePasswordHashToMakeToken(user)
        const url = emailUtil.getPasswordResetURL(user, token)
        const emailTemplate = emailUtil.resetPasswordTemplate(user, url)
        const sendEmail = () => {
            emailUtil.transporter.sendMail(emailTemplate, (err, info) => {
                if (err) {
                    console.error("Failed to send mail : " + err)
                    return Result.error("Une erreur s'est produit lors de l'envoi de l'email")
                } else
                    console.log("Sent mail to " + email)
            })
        }
        sendEmail()// Pourquoi tu fais ça dans un lambda ? meme si il return Result.error() tu return Result.success() juste après
        return Result.success()
    }

    public async resetpwd(password: string, password2: string, id: number, token: string): Promise<Result> {
        let fieldsErrors: any = {};

        if (!id || !token)
            return Result.error("Une erreur c'est produite lors de l'envoie de certaines données")

        if (!password || !validator.isLength(password, { min: 8 }))
            fieldsErrors.password = "Le mot de passe doit contenir au moins 8 caractères"

        if (password != password2)
            fieldsErrors.password = "Les 2 mots de passe doivent être identiques"

        if (Object.keys(fieldsErrors).length)
            return Result.error(fieldsErrors)

        const user = await this.userManager.getById(id);

        if (!user)
            return Result.error("Aucun compte n'est associé à l'id communiqué")

        const ret = jwt.decodeToken(user, token)

        if (ret == null)
            return Result.error("Le token est soit expiré, soit invalide")

        if (ret === user.id) {
            await this.userManager.updatePassword(user.email, pwdUtil.hash(password))
            return Result.success()
        }
        return Result.error("Les id ne correspondent pas")
    }

    public async resetCurrentPassword(token: jwt.Token, currentpassword: string, password: string, password2: string): Promise<Result<jwt.Token, Object>> {
        let fieldsErrors: any = {};

        if (!currentpassword || !password || !password2)
            fieldsErrors.password2 = "Vous n'avez pas rempli tous les champs\n"
        else if (!validator.isLength(password, { min: 8 }))
            fieldsErrors.password2 = "Le nouveau mot de passe doit contenir au moins 8 caractères\n"
        else if (password != password2)
            fieldsErrors.password2 = "Les 2 mots de passe doivent être identiques\n"

        if (Object.keys(fieldsErrors).length)
            return Result.error(fieldsErrors)

        const user = await this.getByJWT(token)
        console.log(user.id + " and " + user.name)

        if (!user)
            return Result.error("Aucun compte n'a été trouvé dans la bdd")

        const match = await pwdUtil.checkMatch(currentpassword, user.passwordHash)
        if (!match)
            return Result.error({ password2: "Mot de passe incorrect" })

            await this.userManager.updatePassword(user.email, pwdUtil.hash(password))
        return Result.success()
    }

    /**
     * Create a new subscription or delete an existing subscription
     * 
     * @param token The token of the user
     * @param profileId The id of the publisher
     * 
     * @return the error message or success
     */

    public async profileFollow(token: jwt.Token, profileId: number): Promise<Result> {
        const user = await this.getByJWT(token)

        if (!profileId || !user.id)
            return Result.error("id invalide")

        const publisher = await this.getById(profileId)
    
        if (!publisher)
            return Result.error("Ce publisher n'existe pas dans notre base de donnée")

        const follower = await this.userManager.getFollowingById(user.id, publisher.id)

        if (!follower) {
            const subscription = await this.userManager.newSubscription(user.id, publisher.id)
            if (subscription)
                await this.userManager.updateNbFollowers(publisher, publisher.followers + 1)
        }
        else {
            await this.userManager.deleteSubscription(user.id, profileId)
            await this.userManager.updateNbFollowers(publisher, publisher.followers - 1)
        }
        return Result.success()
    }

    /**
     * Gets a subscription with an id
     * 
     * @param token The token of the user
     * @param profileId The id of the publisher
     * 
     * @return the error message or success
     */
    public async getFollowingById(token: jwt.Token, profileId: number): Promise<Follower> {
        if (!token || !profileId)
            return null

        const user = await this.getByJWT(token)
        const publisher = await this.getById(profileId)

        if (!user || !publisher)
            return null

        const result = await this.userManager.getFollowingById(user.id, publisher.id)
        return result
    }

    /**
     * Update profile
     *
     * @param name The user's name
     * @param bio The user's bio
     * @param token The token of the user
     * 
     * @return the error message or success
     */
    public async editProfile(name: string, bio: string, token: jwt.Token): Promise<Result> {
        const user = await this.getByJWT(token)

        if (!user)
            return Result.error("Impossible de récupérer votre profil avec votre token de connexion.")

        await this.userManager.updateProfile(user, name, bio)
        return Result.success()
    }
    
    /**
     * Update avatar
     *
     * @param url The user's avatar url 
     * @param token The token of the user
     * 
     * @return the error message or success
     */
    public async uploadAvatar(url: string, token: jwt.Token): Promise<Result> {
        const user = await this.getByJWT(token)

        if (!user)
            return Result.error("Impossible de récupérer votre profil à partir de votre token de connexion.")
        if (url == undefined)
            return Result.error("L'url de l'image transmis à l'api n'est pas valide.")

        const image = await this.userManager.addNewUrlImage(user.id, url)

        if (!image)
            return Result.error("Un erreur s'est produite lors de l'ajout d'une nouvelle photo à votre collection.")

        await this.userManager.updateProfile(user, user.name, user.bio, url)
        return Result.success()
    }

    /**
     * Create a new magazine
     *
     * @param name The name
     * @param name The description
     * @param token The token of the user
     * 
     * @return the error message or success
     */
    public async createMagazine(name: string, description: string, token: jwt.Token): Promise<Result> {
        const user = await this.getByJWT(token)

        if (!user)
            return Result.error("Impossible de récupérer votre profil à partir de votre token de connexion.")
        if (name == undefined)
            return Result.error("Impossible de créer un magazine qui ne porte aucun nom.")

        const Magazine = await this.userManager.createMagazine(user.id, name, description)
        if (!Magazine)
            return Result.error("Le magazine n'a pas pu être créer.")

        await this.userManager.increaseNbMagazine(user, user.magazines + 1)
        return Result.success()
    }
}
