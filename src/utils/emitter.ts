import mitt from 'mitt';
import { formItem } from '@/components/form/type';

export interface Events {
  validate: undefined
  addFormItem: formItem
}

export const emitter = mitt<Events>();
