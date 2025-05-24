
import { IRessource } from "./Ressource";
import { IUser } from "./User";

export interface IRessourcePartage {
    id: number;
    ressource: IRessource
    destinataire: IUser;
}