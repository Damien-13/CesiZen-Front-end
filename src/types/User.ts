import { IRole } from "./Role";

export interface IUser {
    id: number;
    nom: string;
    prenom: string;
    email: string;
    password: string;
    pseudo: string;
    code_postal: string;
    ville: string;
    actif: boolean;
    role_id: number;

    role?: IRole;
}