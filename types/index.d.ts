export type User = {
    id: number;
    email: string;
    enabled: boolean;
    phone: string;
    address: string;
    firstname: string;
    lastname: string;
    deviceId: string;
    gender: "MALE" | "FEMALE";
  }

  export type Order = {
    id: number;
    orderAddress: string;
    orderDate: string;
    userId: number;
    delivered: boolean;
  }

  export type Field = {
    key: string;
    label: string;
  }

    export type OrderStatistic = {
        month: string;
        year: string;
        number: number;
        income: number;
    }