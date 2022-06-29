import { getRouteAuthority } from './utils';

describe('getRouteAuthority tests', () => {
  it('should return authority for each route', (): void => {
    const routes = [
      { path: '/user', name: 'user', authority: ['user'], exact: true },
      { path: '/admin', name: 'admin', authority: ['admin'], exact: true },
    ];
    expect(getRouteAuthority('/user', routes)).toEqual(['user']);
    expect(getRouteAuthority('/admin', routes)).toEqual(['admin']);
  });

  it('should return inherited authority for unconfigured route', (): void => {
    const routes = [
      { path: '/nested', authority: ['admin', 'user'], exact: true },
      { path: '/nested/user', name: 'user', exact: true },
    ];
    expect(getRouteAuthority('/nested/user', routes)).toEqual(['admin', 'user']);
  });

  it('should return authority for configured route', (): void => {
    const routes = [
      { path: '/nested', authority: ['admin', 'user'], exact: true },
      { path: '/nested/user', name: 'user', authority: ['user'], exact: true },
      { path: '/nested/admin', name: 'admin', authority: ['admin'], exact: true },
    ];
    expect(getRouteAuthority('/nested/user', routes)).toEqual(['user']);
    expect(getRouteAuthority('/nested/admin', routes)).toEqual(['admin']);
  });

  it('should return authority for substring route', (): void => {
    const routes = [
      { path: '/nested', authority: ['user', 'users'], exact: true },
      { path: '/nested/users', name: 'users', authority: ['users'], exact: true },
      { path: '/nested/user', name: 'user', authority: ['user'], exact: true },
    ];
    expect(getRouteAuthority('/nested/user', routes)).toEqual(['user']);
    expect(getRouteAuthority('/nested/users', routes)).toEqual(['users']);
  });
});
