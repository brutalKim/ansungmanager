//전역 type

import { LargeNumberLike } from 'crypto';
import { Request } from 'express';

type Manager={
    id:string;
    pw?:string;
    name?:string;
};

type Category={
    no?:number;
    name:string;
    description?:string;
}

type Customer={
    no?:number;
    name?:string;
    address?:string;
    tel:string;
}

type Delivery={
    no:number;
    status:string;
    img:string|null;
    comment:string|null;
    completed_at:string|null;
    manager:string;
}

type Salelog={
    no:number;
    customer:number | null;
    sale_price:number;
    manager:string;
    quantity:number;
    date:string;
}

type Product = {
  no?:number;
  category?:number;
  name:string;
  purchase_price:number;
  sale_price:number;
  stock?:number;
  size?:string;
}

declare global {
  namespace Express {
    interface Request {
      manager?:Manager
    }
  }
}