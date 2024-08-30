const BASE_64_REGEX = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/;

export const isBase64 = (str: string) => {
    return BASE_64_REGEX.test(str);
};
