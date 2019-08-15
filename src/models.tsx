
import moment from 'moment';
export interface TodoItem {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;
}

export function compareDates(a: TodoItem, b: TodoItem) {
  return moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf();
}