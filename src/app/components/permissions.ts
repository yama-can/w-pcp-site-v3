export enum Permission {
	poster = 4,
	manager = 3,
	user_admin = 2,
	admin = 1,
	owner = 0,
}

export const PermissionName = {
	[Permission.poster]: 'Poster',
	[Permission.manager]: 'Manager',
	[Permission.user_admin]: 'User Administrator',
	[Permission.admin]: 'Administrator',
	[Permission.owner]: 'Owner',
}


export const containPermissions: { [key: number]: Permission[] } = {
	[Permission.poster]: [Permission.poster],
	[Permission.manager]: [Permission.poster, Permission.manager],
	[Permission.user_admin]: [],
	[Permission.admin]: [Permission.poster, Permission.manager, Permission.user_admin, Permission.admin],
	[Permission.owner]: [Permission.poster, Permission.manager, Permission.user_admin, Permission.admin, Permission.owner],
};

export function isContainPermission(permissions: number, permission: Permission) {
	let has = new Set<Permission>();
	for (let i = Permission.owner; i <= Permission.poster; i++) {
		if (permissions & (1 << i)) {
			containPermissions[i].forEach((value) => has.add(value));
		}
	}
	return (has.has(permission));
}
