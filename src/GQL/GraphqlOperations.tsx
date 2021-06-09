import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

import {
  FieldPolicy,
  FieldReadFunction,
  TypePolicies,
  TypePolicy,
} from '@apollo/client/cache';

import { gql } from '@apollo/client';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type IFollow = {
  __typename?: 'Follow';
  follower?: Maybe<IUser>;
  following?: Maybe<IUser>;
};

export type IMember = {
  __typename?: 'Member';
  room: IRoom;
  room_id: Scalars['String'];
  user: IUser;
  user_id: Scalars['String'];
  role: Scalars['Int'];
};

export type IMutation = {
  __typename?: 'Mutation';
  follow: Scalars['Boolean'];
  unfollow: Scalars['Boolean'];
  createRoom: IRoom;
  joinRoom: Scalars['Boolean'];
  leaveRoom: Scalars['Boolean'];
};

export type IMutationFollowArgs = {
  user_id: Scalars['Int'];
};

export type IMutationUnfollowArgs = {
  user_id: Scalars['Int'];
};

export type IMutationCreateRoomArgs = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type IMutationJoinRoomArgs = {
  room_id: Scalars['String'];
};

export type IQuery = {
  __typename?: 'Query';
  me: IUser;
  user: IUser;
  rooms: Array<IRoom>;
  room: IRoom;
};

export type IQueryUserArgs = {
  user_id: Scalars['Int'];
};

export type IQueryRoomArgs = {
  room_id: Scalars['String'];
};

export type IRoom = {
  __typename?: 'Room';
  id: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  members: Array<IMember>;
};

export type IRoomChangePayload = {
  __typename?: 'RoomChangePayload';
  event: Scalars['String'];
  room?: Maybe<IRoom>;
  room_id?: Maybe<Scalars['String']>;
};

export type ISubscription = {
  __typename?: 'Subscription';
  roomChange: IRoomChangePayload;
};

export type IUser = {
  __typename?: 'User';
  username: Scalars['String'];
  avatar: Scalars['String'];
  bio: Scalars['String'];
  id: Scalars['Int'];
  current_room?: Maybe<IMember>;
  follower_count: Scalars['Int'];
  following_count: Scalars['Int'];
  am_following: Scalars['Boolean'];
  following: Array<IFollow>;
  followers: Array<IFollow>;
};

export type IMeQueryVariables = Exact<{ [key: string]: never }>;

export type IMeQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'User' } & Pick<
    IUser,
    'username' | 'avatar' | 'bio' | 'id' | 'follower_count' | 'following_count'
  >;
};

export const MeDocument = gql`
  query Me {
    me {
      username
      avatar
      bio
      id
      follower_count
      following_count
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<IMeQuery, IMeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<IMeQuery, IMeQueryVariables>(
    MeDocument,
    options
  );
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    IMeQuery,
    IMeQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<IMeQuery, IMeQueryVariables>(
    MeDocument,
    options
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<IMeQuery, IMeQueryVariables>;
export type FollowKeySpecifier = (
  | 'follower'
  | 'following'
  | FollowKeySpecifier
)[];
export type FollowFieldPolicy = {
  follower?: FieldPolicy<any> | FieldReadFunction<any>;
  following?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MemberKeySpecifier = (
  | 'room'
  | 'room_id'
  | 'user'
  | 'user_id'
  | 'role'
  | MemberKeySpecifier
)[];
export type MemberFieldPolicy = {
  room?: FieldPolicy<any> | FieldReadFunction<any>;
  room_id?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  user_id?: FieldPolicy<any> | FieldReadFunction<any>;
  role?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type MutationKeySpecifier = (
  | 'follow'
  | 'unfollow'
  | 'createRoom'
  | 'joinRoom'
  | 'leaveRoom'
  | MutationKeySpecifier
)[];
export type MutationFieldPolicy = {
  follow?: FieldPolicy<any> | FieldReadFunction<any>;
  unfollow?: FieldPolicy<any> | FieldReadFunction<any>;
  createRoom?: FieldPolicy<any> | FieldReadFunction<any>;
  joinRoom?: FieldPolicy<any> | FieldReadFunction<any>;
  leaveRoom?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type QueryKeySpecifier = (
  | 'me'
  | 'user'
  | 'rooms'
  | 'room'
  | QueryKeySpecifier
)[];
export type QueryFieldPolicy = {
  me?: FieldPolicy<any> | FieldReadFunction<any>;
  user?: FieldPolicy<any> | FieldReadFunction<any>;
  rooms?: FieldPolicy<any> | FieldReadFunction<any>;
  room?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoomKeySpecifier = (
  | 'id'
  | 'name'
  | 'description'
  | 'members'
  | RoomKeySpecifier
)[];
export type RoomFieldPolicy = {
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  name?: FieldPolicy<any> | FieldReadFunction<any>;
  description?: FieldPolicy<any> | FieldReadFunction<any>;
  members?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type RoomChangePayloadKeySpecifier = (
  | 'event'
  | 'room'
  | 'room_id'
  | RoomChangePayloadKeySpecifier
)[];
export type RoomChangePayloadFieldPolicy = {
  event?: FieldPolicy<any> | FieldReadFunction<any>;
  room?: FieldPolicy<any> | FieldReadFunction<any>;
  room_id?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type SubscriptionKeySpecifier = (
  | 'roomChange'
  | SubscriptionKeySpecifier
)[];
export type SubscriptionFieldPolicy = {
  roomChange?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type UserKeySpecifier = (
  | 'username'
  | 'avatar'
  | 'bio'
  | 'id'
  | 'current_room'
  | 'follower_count'
  | 'following_count'
  | 'am_following'
  | 'following'
  | 'followers'
  | UserKeySpecifier
)[];
export type UserFieldPolicy = {
  username?: FieldPolicy<any> | FieldReadFunction<any>;
  avatar?: FieldPolicy<any> | FieldReadFunction<any>;
  bio?: FieldPolicy<any> | FieldReadFunction<any>;
  id?: FieldPolicy<any> | FieldReadFunction<any>;
  current_room?: FieldPolicy<any> | FieldReadFunction<any>;
  follower_count?: FieldPolicy<any> | FieldReadFunction<any>;
  following_count?: FieldPolicy<any> | FieldReadFunction<any>;
  am_following?: FieldPolicy<any> | FieldReadFunction<any>;
  following?: FieldPolicy<any> | FieldReadFunction<any>;
  followers?: FieldPolicy<any> | FieldReadFunction<any>;
};
export type TypedTypePolicies = TypePolicies & {
  Follow?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | FollowKeySpecifier
      | (() => undefined | FollowKeySpecifier);
    fields?: FollowFieldPolicy;
  };
  Member?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MemberKeySpecifier
      | (() => undefined | MemberKeySpecifier);
    fields?: MemberFieldPolicy;
  };
  Mutation?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | MutationKeySpecifier
      | (() => undefined | MutationKeySpecifier);
    fields?: MutationFieldPolicy;
  };
  Query?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | QueryKeySpecifier
      | (() => undefined | QueryKeySpecifier);
    fields?: QueryFieldPolicy;
  };
  Room?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | RoomKeySpecifier | (() => undefined | RoomKeySpecifier);
    fields?: RoomFieldPolicy;
  };
  RoomChangePayload?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | RoomChangePayloadKeySpecifier
      | (() => undefined | RoomChangePayloadKeySpecifier);
    fields?: RoomChangePayloadFieldPolicy;
  };
  Subscription?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?:
      | false
      | SubscriptionKeySpecifier
      | (() => undefined | SubscriptionKeySpecifier);
    fields?: SubscriptionFieldPolicy;
  };
  User?: Omit<TypePolicy, 'fields' | 'keyFields'> & {
    keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier);
    fields?: UserFieldPolicy;
  };
};
