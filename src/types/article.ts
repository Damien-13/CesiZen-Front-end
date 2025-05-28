import { IRelationType } from "./RelationType";
import { IarticleCategorie } from "./articleCategorie";
import { IarticleType } from "./articleType";
import { IUser } from "./User";

export interface Iarticle {
    id: number;
    titre: string;
    description: string;
    nom_fichier: string;
    restreint: boolean;
    url: string;
    valide: boolean;
    created_at: string;

    user: IUser;
    article_categorie: IarticleCategorie;
    article_type: IarticleType;
    relation_type: IRelationType;
}