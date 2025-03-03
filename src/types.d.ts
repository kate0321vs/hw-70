export interface Contact {
    name: string;
    phone: string;
    email: string;
    photo: string;
    id: string;
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

