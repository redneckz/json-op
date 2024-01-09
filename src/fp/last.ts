export const last = <T>(list: [T, ...T[]] | [...T[], T]): T => list[list.length - 1];
