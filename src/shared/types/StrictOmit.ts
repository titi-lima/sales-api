/**
 * I want to get type errors when I return more from a function than I expect.
 * biggest use case: I want to type-error returning a password from a function that returns a user.
 */
// eslint-disable-next-line no-unused-vars
export type StrictOmit<T, K extends string> = Omit<T, K> & { [P in K]?: never };
