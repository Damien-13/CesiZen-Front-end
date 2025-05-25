
import { Iarticle } from "./article";
import { IUser } from "./User";

export interface IarticlePartage {
    id: number;
    article: Iarticle
    destinataire: IUser;
}