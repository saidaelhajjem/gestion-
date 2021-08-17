export interface Reference {
    id: number;
    titre : string;
    is_actif?: boolean;
    format?: string;
    smart_tags?:any;
    references_associees?:any;
}
