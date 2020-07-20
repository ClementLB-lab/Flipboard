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
     * 
     * @param token The token generated with JsonWebToken
     * 
     * @return the user or null if jwt is invalid
     */
    public async getByJWT(token: jwt.Token): Promise<User> {
        if (!token)
            return null
        return this.getById(jwt.getUserIdFromToken(token));
    }

    /**
     * Gets a user from an ID
     * 
     * @param id The user ID
     * 
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
     * 
     * @param name The name of the user
     * @param email The email of the user
     * @param password The password in clear, it will hashed and salted
     */
    public async register(name: string, email: string, password: string): Promise<Result<jwt.Token, Object>> {

        if (!name || !validator.isLength(name, { min: 3 }))
            return Result.error("Le nom doit contenir au moins 3 charactères");
        if (!email || !validator.isEmail(email))
        return Result.error("Email invalide");
        if (!password || !validator.isLength(password, { min: 8 }))
        return Result.error("Le mot de passe doit contenir au moins 8 caractères");
        if (await this.userManager.getByEmail(email))
            return Result.error("Email déjà utilisée");


        const createdUser = await this.userManager.create(name, email, pwdUtil.hash(password))

        return Result.success(jwt.getTokenForUser(createdUser))
    }

    /**
     * Verify that the email and password match, if so generates a JWT
     *
     * @param email The email of the user
     * @param password The password in clear
     */
    public async login(email: string, password: string): Promise<Result<jwt.Token, Object>> {
        const user = await this.userManager.getByEmail(email)

        if (!user)
            return Result.error("Email inconnue")

        const match = await pwdUtil.checkMatch(password, user.passwordHash)
        if (!match)
            return Result.error("Mot de passe incorrect")

        return Result.success(jwt.getTokenForUser(user))
    }

     /**
     * Verifies that the email exists in the database and then sends an email to this address.
     *
     * @param email The email to search in the database
     */
    public async forgotpwd(email: string): Promise<Result<jwt.Token, Object>> {
        if (!email)
            return Result.error("Adresse invalide")

        const user = await this.userManager.getByEmail(email)
        if (!user)
            return Result.error("Email inconnue")
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

        if (!id || !token)
            return Result.error("Une erreur c'est produite lors de l'envoie de certaines données")

        if (!password || !validator.isLength(password, { min: 8 }))
        return Result.error("Le mot de passe doit contenir au moins 8 caractères");

        if (password != password2)
        return Result.error("Les 2 mots de passe doivent être identiques");

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

        if (!currentpassword || !password || !password2)
        return Result.error("Vous n'avez pas rempli tous les champs\n");
        else if (!validator.isLength(password, { min: 8 }))
        return Result.error("Le nouveau mot de passe doit contenir au moins 8 caractères\n");
        else if (password != password2)
        return Result.error("Les 2 mots de passe doivent être identiques\n");

        const user = await this.getByJWT(token)
        console.log(user.id + " and " + user.name)

        if (!user)
            return Result.error("Aucun compte n'a été trouvé dans la bdd")

        const match = await pwdUtil.checkMatch(currentpassword, user.passwordHash)
        if (!match)
            return Result.error("Mot de passe incorrect")

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
     * Update a user's profile
     *
     * @param name The user's name
     * @param email The user's email
     * @param bio The user's bio
     * @param token The token of the user
     * @param isPrivate Account restrictions
     * 
     * @return the error message or success
     */
    public async editProfile(name: string, email: string, bio: string, token: jwt.Token, isPrivate: boolean): Promise<Result> {
        const user = await this.getByJWT(token)

        if (!user)
            return Result.error("Impossible de récupérer votre profil avec votre token de connexion.")
        if (!name || !email)
            return Result.error("Vous devez obligatoirement avoir un nom et un email valide.")
        if (emailUtil.validateEmail(email) == false)
            return Result.error("L'email que vous avez transmit n'a pas un format valide.")
        await this.userManager.updateProfile(user, name, email, bio, isPrivate)
        return Result.success()
    }
    
    /**
     * Update a user's avatar
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

        await this.userManager.updateProfile(user, user.name, user.email, user.bio, user.private, url)
        return Result.success()
    }

    /**
     * Gets a user from an ID
     * 
     * @param id The user ID
     * 
     * @return the user or null if no such user exists
     */
    public async getFollowers(id: number): Promise<Follower[]> {
        if (!id)
            return null

        const followers = await this.userManager.getFollowers(id);

        return followers;
    }


    /**
     * Create a new magazine
     *
     * @param name The name
     * @param description Characteristics of Magazine
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

        const search = await this.userManager.getMagazine(user.id, name)
        if (search)
            return Result.error("Vous avez déjà un magazine qui s'appelle " + name)

        const Magazine = await this.userManager.createMagazine(user.id, name, description)
        if (!Magazine)
            return Result.error("Le magazine n'a pas pu être créer.")

        await this.userManager.increaseNbMagazine(user, user.magazines + 1)
        return Result.success()
    }


    /**
     * Delete account
     *
     * @param password The password in clear
     * @param token The token of the user
     * 
     * @return the error message or success
     */
    public async deleteAccount(password:string, token: jwt.Token): Promise<Result> {
        const user = await this.getByJWT(token)

        if (!user)
            return Result.error("Impossible de récupérer votre profil à partir de votre token de connexion.")

        const match = await pwdUtil.checkMatch(password, user.passwordHash)
        if (!match)
            return Result.error("Mot de passe incorrect")

        await this.userManager.deleteAccount(user)
        return Result.success()
    }


    
    /**
     * Defines whether the account will be visible to other users
     *
     * @param token The token of the user
     * @param isPrivate visibility (boolean)
     * 
     * @return the error message or success
     */
    public async setAccess(token: jwt.Token, isPrivate: boolean): Promise<Result> {
        const user = await this.getByJWT(token)

        if (!user)
            return Result.error("Impossible de récupérer votre profil à partir de votre token de connexion.")

        await this.userManager.setAccess(user, isPrivate)
        return Result.success()
    }
}
