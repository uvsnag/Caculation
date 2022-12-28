export const productAttributesMapping = {
    id: 'id',
    name: 'name',
    type: 'type',
    sub_type: 'sub_type',
    num_today: 'num_today',
    num_yesterday: 'num_yesterday',
    total: 'total',
  };
  
  export interface Product {
    id: string,
    name: string,
    type: string,
    sub_type: string,
    num_today: string,
    num_yesterday: string,
    total: string,
  }