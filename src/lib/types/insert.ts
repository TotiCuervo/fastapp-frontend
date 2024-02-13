type Insert<T, K extends keyof T = keyof T> = Omit<Partial<T>, 'id'> & Required<Pick<T, K>>

export default Insert
