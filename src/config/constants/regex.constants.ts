export const regexConstants: { [key: string]: RegExp } = {
  EMAIL: /^[^\s@]+@([^\s@.,]+\.)+[^@s.,]{2,}$/,
  PASSWORD: /^(?=.*[A-Za-z])(?=.*[@!%_*#?&])[A-za-z\d@$_!%*#?&]{8,}$/,
};
