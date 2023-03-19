export interface Table {
  table: string;
  columns: string[];
}

export interface SeedTable extends Table {
  values?: () => any[];
  count?: number;
  isDependent?: boolean;
  generateFromArray?: boolean;
  array?: any[];
  pos?: number[];
  dependencies?: string[];
  dependentOrder?: number;
}
