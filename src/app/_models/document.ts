export interface Document {
  id?: string;
  nom?: string;
  modele_nom?: string;
  contenu?: string;
  is_actif?: boolean;
  auteur_lastname?: string;
  auteur_firstname?: string;
  type_document_id?: number;
  type_document_libelle?: string;
  balise_reference_fermante?: string;
  balise_reference_ouvrante?: string;
  modele_id?: number;
  conditions: any[];
  references: any[];
  smart_tags: any[];
  createdAt?: Date;
  updatedAt?: Date;
}
