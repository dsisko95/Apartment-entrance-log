export interface ILogs {
    // Monitoring Model fields
    Id: number,
    Apartment_id: number,
    CityName: string,
    ApartmentAddress: string,
    ApartmentType: string,
    OwnerNameSurname: string,
    ClientNameSurname: string,
    Client_Identification_number: string,
    Date: Date,
    Status: string,
    Telephone: string,
    ApartmentNumber: number,
    // City Model fields
    Country: string,
    Name: string,
    // Owner Model fields
    Username: string,
    Role: string,
    // Apartments Model fields
    Address: string,
    Type: string,
    Number: string,
    // Clients Model fields
    Identification_number: number,
    Name_Surname: string,
    Telephone_number: string
}

