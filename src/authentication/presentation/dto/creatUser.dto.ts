type CreateUserDto = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export function isCreateUserDto(object: any): object is CreateUserDto {
    return 'firstname' in object &&
        typeof object.firstname === 'string' &&
        'lastname' in object &&
        typeof object.lastname === 'string' &&
        'email' in object &&
        typeof object.email === 'string' &&
        'password' in object &&
        typeof object.password === 'string';
}