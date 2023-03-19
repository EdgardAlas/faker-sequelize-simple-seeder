import { Table } from './../Table.interface';
export const generateDelete = ({ table }: Table) => {
  return `DELETE FROM ${table}`;
};
