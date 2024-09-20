type LoginUserDto = {
    email: string;
    password: string;
};

export function isLoginUserDto(object: any): object is LoginUserDto {
    return 'email' in object &&
        typeof object.email === 'string' &&
        'password' in object &&
        typeof object.password === 'string';
}