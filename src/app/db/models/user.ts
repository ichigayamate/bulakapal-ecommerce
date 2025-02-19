import database from "@/app/db/config";
import {NewUser, UserSchema} from "@interfaces/users";
import {hashPassword} from "@scripts/api/bcrypt";
import {ConflictError} from "@scripts/api/custom-error";

export default class UserModel {
  static readonly collection = database.collection("users");

  /**
   * Find user by email
   * @param email
   */
  static async findByEmail(email: string) {
    return await this.collection.findOne({email});
  }

  /**
   * Create a new user
   * @param data - User data
   */
  static async create(data: NewUser) {
    UserSchema.parse(data);

    const user = await this.collection.findOne({
      $or: [{email: data.email}, {username: data.username}]
    })

    if (user) {
      throw new ConflictError("User already exists");
    }

    data.password = hashPassword(data.password);
    return await this.collection.insertOne(data);
  }
}