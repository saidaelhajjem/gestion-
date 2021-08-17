import {Document} from './document';

export interface Modele {
    id?: string;
    nom?: string;
    is_actif?: boolean;
    auteur_firstname?: number;
    auteur_lastname?: number;
    createdat?: Date;
    documents? : Document[]
}
