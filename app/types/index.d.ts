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