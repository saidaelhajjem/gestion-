export interface Employer {
    id?: number;
    is_actif?: boolean;
    raison_sociale?: string;
    siren?: string;
    nom_dirigeant?: string;
    prenom_dirigeant?: string;
    adresse_num_voie?: string;
    adresse_type_voie?: string;
    adresse_nom_voie?: string;
    adresse_complement?: string;
    adresse_code_postal?: string;
    adresse_ville?: string;
}