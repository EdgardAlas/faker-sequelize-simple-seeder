import { Table } from './../Table.interface';

export const generateInsert = ({ columns, table }: Table) => {
  return `INSERT INTO ${table} (${columns.join(
    ', '
  )}) VALUES (${concatenateIndexesWithouLastCommad(columns)})`;
};
function concatenateIndexesWithouLastCommad(indexes: string[]) {
  let result = '';
  for (let i = 0; i < indexes.length - 1; i++) {
    result += '?,';
  }
  result += '?';
  return result;
}
