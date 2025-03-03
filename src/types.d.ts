export interface Contact {
    id: string;
    name: string;
    phone: string;
    email: string;
    photo: string;
}

export interface ApiContact {
    name: string;
    phone: string;
    email: string;
    photo: string;
}

export interface ContactsListApi {
    [id: string]: ApiContact;
}

