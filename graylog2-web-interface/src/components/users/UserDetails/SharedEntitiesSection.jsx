// @flow strict
import * as React from 'react';
import { useState } from 'react';
import * as Immutable from 'immutable';
import styled from 'styled-components';

import User from 'logic/users/User';
import mockedPermissions from 'logic/permissions/mocked';
import { EntityShareActions, type PaginatedUserSharesType } from 'stores/permissions/EntityShareStore';
import { DataTable, PaginatedList, Spinner } from 'components/common';

import SharedEntitiesFilter from './SharedEntitiesFilter';
import SharedEntitiesOverviewItem from './SharedEntitiesOverviewItem';

import SectionComponent from '../SectionComponent';

const TABLE_HEADERS = ['Entiy Name', 'Entity Type', 'Owner', 'Capability'];

type Props = {
  username: $PropertyType<User, 'username'>,
  paginatedUserShares: PaginatedUserSharesType,
};

const StyledPaginatedList = styled(PaginatedList)`
  .pagination {
    margin: 0;
  }
`;

const _onPageChange = (pagination, fetchSharedEntities, setLoading) => (page, perPage) => {
  setLoading(true);

  return fetchSharedEntities(page, perPage, pagination.query, pagination.additionalQueries).then(() => setLoading(false));
};

const _sharedEntityOverviewItem = (sharedEntity, context) => {
  const capability = context?.userCapabilities?.[sharedEntity.id];
  const capabilityTitle = mockedPermissions.availableCapabilities[capability];

  return <SharedEntitiesOverviewItem sharedEntity={sharedEntity} capabilityTitle={capabilityTitle} />;
};

const SharedEntitiesSection = ({ paginatedUserShares: initialPaginatedUserShares, username }: Props) => {
  const [loading, setLoading] = useState(false);
  const [paginatedUserShares, setPaginatedUserShares] = useState<PaginatedUserSharesType>(initialPaginatedUserShares);
  const { list, pagination, context } = paginatedUserShares || { list: Immutable.List(), pagination: { total: 0 } };

  const _fetchSharedEntities = (newPage, newPerPage, newQuery, additonalQueries) => {
    return EntityShareActions.searchPaginatedUserShares(username, newPage, newPerPage, newQuery, additonalQueries).then((newPaginatedUserShares) => {
      setPaginatedUserShares(newPaginatedUserShares);
    });
  };

  const _handleSearch = (newQuery: string, resetLoading: () => void) => _fetchSharedEntities(1, pagination.perPage, newQuery).then(resetLoading);
  const _handleSearchReset = () => _fetchSharedEntities(1, pagination.perPage, '');
  const _handleFilter = (param: string, value: string) => _fetchSharedEntities(1, pagination.perPage, pagination.query, { [param]: value });

  return (
    <SectionComponent title="Shared Entities" showLoading={loading}>
      {!paginatedUserShares && (
        <Spinner />
      )}
      {paginatedUserShares && (
        <>
          <p className="description">
            Found {pagination.total} entities which are shared with the user.
          </p>
          <StyledPaginatedList activePage={pagination.page}
                               onChange={_onPageChange(pagination, _fetchSharedEntities, setLoading)}
                               totalItems={pagination.total}>
            <DataTable className="table-hover"
                       customFilter={(
                         <SharedEntitiesFilter onSearch={_handleSearch}
                                               onReset={_handleSearchReset}
                                               onFilter={_handleFilter} />
                       )}
                       dataRowFormatter={(sharedEntity) => _sharedEntityOverviewItem(sharedEntity, context)}
                       filterKeys={[]}
                       headers={TABLE_HEADERS}
                       id="user-shared-entities"
                       rowClassName="no-bm"
                       rows={list.toJS()}
                       sortByKey="type" />
          </StyledPaginatedList>
        </>
      )}
    </SectionComponent>
  );
};

export default SharedEntitiesSection;
