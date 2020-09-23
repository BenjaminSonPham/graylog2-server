// @flow strict
import Reflux from 'reflux';
import * as Immutable from 'immutable';

import AuthenticationBackend, { type AuthenticationBackendJSON } from 'logic/authentication/AuthenticationBackend';
import { singletonActions } from 'views/logic/singleton';
import type { RefluxActions } from 'stores/StoreTypes';
import AuthenticationUser from 'logic/authentication/AuthenticationUser';
import type { PaginationType } from 'stores/PaginationTypes';

export type AuthenticationBackendCreate = {
  title: $PropertyType<AuthenticationBackendJSON, 'title'>,
  description: $PropertyType<AuthenticationBackendJSON, 'description'>,
  config: {
    type: string,
    ...any,
  },
};

export type AuthenticationBackendUpdate = {
  id: $PropertyType<AuthenticationBackendJSON, 'id'>,
  title: $PropertyType<AuthenticationBackendJSON, 'title'>,
  description: $PropertyType<AuthenticationBackendJSON, 'description'>,
  config: {
    type: string,
    ...any,
  },
};

export type PaginatedBackends = {
  context: {
    activeBackend: ?string,
  },
  list: Immutable.List<AuthenticationBackend>,
  pagination: PaginationType,
};

export type PaginatedAuthUsers = {
  list: Immutable.List<AuthenticationUser>,
  pagination: PaginationType,
};

export type ConnectionTestPayload = {
  backend_configuration: AuthenticationBackendCreate,
  backend_id: ?string,
};
export type ConnectionTestResult = {
  success: boolean,
  message: string,
  errors: Array<string>,
};

export type LoginTestPayload = {
  backend_id: ?string,
  backend_configuration: AuthenticationBackendCreate & {
    user_login: {
      username: string,
      password: string,
    },
  },
};

export type LoginTestResult = {
  success: boolean,
  message: string,
  result: {
    type: string,
    user_exists: boolean,
    login_success: boolean,
    user_details: {
      uid: string,
      uidNumber: number,
      gidNumber: number,
      cn: string,
      objectClass: Array<string>,
    },
  },
};

export type ActionsType = {
  create: (AuthenticationBackendCreate) => Promise<void>,
  update: (id: string, AuthenticationBackendUpdate) => Promise<void>,
  load: (id: string) => Promise<?AuthenticationBackend>,
  loadActive: () => Promise<?AuthenticationBackend>,
  delete: (authBackendId: ?$PropertyType<AuthenticationBackend, 'id'>, authBackendTitle: $PropertyType<AuthenticationBackend, 'title'>) => Promise<void>,
  testConnection: (payload: ConnectionTestPayload) => Promise<?ConnectionTestResult>,
  testLogin: (payload: LoginTestPayload) => Promise<?LoginTestResult>,
  enableUser: (userId: string, username: string) => Promise<void>,
  disableUser: (userId: string, username: string) => Promise<void>,
  setActiveBackend: (authBackendId: ?$PropertyType<AuthenticationBackend, 'id'>, authBackendTitle: $PropertyType<AuthenticationBackend, 'title'>) => Promise<void>,
  loadBackendsPaginated: (page: number, perPage: number, query: string) => Promise<?PaginatedBackends>,
  loadUsersPaginated: (page: number, perPage: number, query: string) => Promise<?PaginatedAuthUsers>,
};

const AuthenticationActions: RefluxActions<ActionsType> = singletonActions(
  'Authentication',
  () => Reflux.createActions({
    create: { asyncResult: true },
    update: { asyncResult: true },
    load: { asyncResult: true },
    loadActive: { asyncResult: true },
    delete: { asyncResult: true },
    testConnection: { asyncResult: true },
    testLogin: { asyncResult: true },
    loadBackendsPaginated: { asyncResult: true },
    loadUsersPaginated: { asyncResult: true },
    enableUser: { asyncResult: true },
    disableUser: { asyncResult: true },
  }),
);

export default AuthenticationActions;
