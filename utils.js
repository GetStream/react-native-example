// @flow
import type { UserResponse } from './types';
export function goToProfile(id: string) {
  // TODO: implement
  console.log('user id: ', id);
}

export function userOrDefault(user: UserResponse | 'NotFound') {
  if (user === 'NotFound') {
    return {
      id: 'NotFound',
      data: { name: 'Unknown', profileImage: undefined },
    };
  }
  return user;
}

export function activityOrDefault(user: UserResponse | 'NotFound') {
  if (user === 'NotFound') {
    return {
      id: 'NotFound',
      data: { name: 'Unknown', profileImage: undefined },
    };
  }
  return user;
}
