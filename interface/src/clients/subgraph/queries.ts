import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
}

export interface BlockChangedFilter {
  number_gte: Scalars['Int'];
}

export interface Block_Height {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
}

export interface Gravatar {
  __typename?: 'Gravatar';
  displayName: Scalars['String'];
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
  owner: Scalars['Bytes'];
}

export interface Gravatar_Filter {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  displayName?: InputMaybe<Scalars['String']>;
  displayName_contains?: InputMaybe<Scalars['String']>;
  displayName_contains_nocase?: InputMaybe<Scalars['String']>;
  displayName_ends_with?: InputMaybe<Scalars['String']>;
  displayName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  displayName_gt?: InputMaybe<Scalars['String']>;
  displayName_gte?: InputMaybe<Scalars['String']>;
  displayName_in?: InputMaybe<Array<Scalars['String']>>;
  displayName_lt?: InputMaybe<Scalars['String']>;
  displayName_lte?: InputMaybe<Scalars['String']>;
  displayName_not?: InputMaybe<Scalars['String']>;
  displayName_not_contains?: InputMaybe<Scalars['String']>;
  displayName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  displayName_not_ends_with?: InputMaybe<Scalars['String']>;
  displayName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  displayName_not_in?: InputMaybe<Array<Scalars['String']>>;
  displayName_not_starts_with?: InputMaybe<Scalars['String']>;
  displayName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  displayName_starts_with?: InputMaybe<Scalars['String']>;
  displayName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  id_gt?: InputMaybe<Scalars['ID']>;
  id_gte?: InputMaybe<Scalars['ID']>;
  id_in?: InputMaybe<Array<Scalars['ID']>>;
  id_lt?: InputMaybe<Scalars['ID']>;
  id_lte?: InputMaybe<Scalars['ID']>;
  id_not?: InputMaybe<Scalars['ID']>;
  id_not_in?: InputMaybe<Array<Scalars['ID']>>;
  imageUrl?: InputMaybe<Scalars['String']>;
  imageUrl_contains?: InputMaybe<Scalars['String']>;
  imageUrl_contains_nocase?: InputMaybe<Scalars['String']>;
  imageUrl_ends_with?: InputMaybe<Scalars['String']>;
  imageUrl_ends_with_nocase?: InputMaybe<Scalars['String']>;
  imageUrl_gt?: InputMaybe<Scalars['String']>;
  imageUrl_gte?: InputMaybe<Scalars['String']>;
  imageUrl_in?: InputMaybe<Array<Scalars['String']>>;
  imageUrl_lt?: InputMaybe<Scalars['String']>;
  imageUrl_lte?: InputMaybe<Scalars['String']>;
  imageUrl_not?: InputMaybe<Scalars['String']>;
  imageUrl_not_contains?: InputMaybe<Scalars['String']>;
  imageUrl_not_contains_nocase?: InputMaybe<Scalars['String']>;
  imageUrl_not_ends_with?: InputMaybe<Scalars['String']>;
  imageUrl_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  imageUrl_not_in?: InputMaybe<Array<Scalars['String']>>;
  imageUrl_not_starts_with?: InputMaybe<Scalars['String']>;
  imageUrl_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  imageUrl_starts_with?: InputMaybe<Scalars['String']>;
  imageUrl_starts_with_nocase?: InputMaybe<Scalars['String']>;
  owner?: InputMaybe<Scalars['Bytes']>;
  owner_contains?: InputMaybe<Scalars['Bytes']>;
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
  owner_not?: InputMaybe<Scalars['Bytes']>;
  owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
}

export enum Gravatar_OrderBy {
  DisplayName = 'displayName',
  Id = 'id',
  ImageUrl = 'imageUrl',
  Owner = 'owner',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export interface Query {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  gravatar?: Maybe<Gravatar>;
  gravatars: Gravatar[];
}

export interface Query_MetaArgs {
  block?: InputMaybe<Block_Height>;
}

export interface QueryGravatarArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface QueryGravatarsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Gravatar_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Gravatar_Filter>;
}

export interface Subscription {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  gravatar?: Maybe<Gravatar>;
  gravatars: Gravatar[];
}

export interface Subscription_MetaArgs {
  block?: InputMaybe<Block_Height>;
}

export interface SubscriptionGravatarArgs {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
}

export interface SubscriptionGravatarsArgs {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Gravatar_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Gravatar_Filter>;
}

export interface _Block_ {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
}

/** The type for the top-level _meta field */
export interface _Meta_ {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export const GravatarsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'Gravatars' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'gravatars' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'id' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'owner' },
                },
                {
                  kind: 'Field',
                  name: {
                    kind: 'Name',
                    value: 'displayName',
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'imageUrl' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GravatarsQuery, GravatarsQueryVariables>;
export type GravatarsQueryVariables = Exact<{ [key: string]: never }>;

export interface GravatarsQuery {
  __typename?: 'Query';
  gravatars: Array<{
    __typename?: 'Gravatar';
    id: string;
    owner: any;
    displayName: string;
    imageUrl: string;
  }>;
}

export const subgraphEndpoint = 'http://127.0.0.1:8000/subgraphs/name/subgraph';
