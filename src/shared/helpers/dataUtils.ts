export const isNullOrUndefined = (object: any): boolean => {
  return object === null || object === undefined;
};
  
export const isNotNullAndUndefined = (object: any): boolean => {
  return object !== null && object !== undefined;
  };
  
export const isNumber = (object: any): boolean => {
  return typeof object === 'number';
};
  
export const isDate = (object: any): boolean => {
  return object instanceof Date;
};

export const isObject = (object: any): boolean => {
  return object instanceof Object;
};
  
export const isArray = (object: any): boolean => {
  return object instanceof Array;
};
  