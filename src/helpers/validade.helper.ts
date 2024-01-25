import { ObjectId } from "mongodb";

export const validObjectID = (value: string) => ObjectId.isValid(value);
