import { GET_PRODUCTS } from 'graphqlSchema/queries/productQueries';
import {
  GetCustomerAllProductsResponse,
  GetCustomerQuery,
  GetCustomerResponse,
  updateCartItemRequest,
  updateCartItemResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  CreateCustomerRequest,
  GetCustomerProductResponse,
  CreateCustomerResponse,
  CustomerSignInRequest,
  GetCustomerProductParams,
  CustomerSignInResponse,
  addToCartRequest,
  AddToCartResponse,
  deleteCartItemRequest,
  deleteCartItemResponse,
  Cart,
} from 'models';

import { User } from 'utils/types';
import client from '../graphqlSchema/apollo-client';

export async function getUserGraphQl(): Promise<User[] | undefined> {
  const { data } = await client.query({
    query: GET_PRODUCTS,
  });
  return data as User[];
}

export async function signInGraphql(
  data: CustomerSignInRequest
): Promise<CustomerSignInResponse | undefined> {
  return undefined;
}

export async function signUpGraphql(
  data: CreateCustomerRequest
): Promise<CreateCustomerResponse | undefined> {
  return undefined;
}

export async function forgotPasswordGraphql(
  data: ForgotPasswordRequest
): Promise<ForgotPasswordResponse | undefined> {
  return undefined;
}

export async function getPublicProductsGraphql(): Promise<
  GetCustomerAllProductsResponse | undefined
> {
  return undefined;
}

export async function getPublicProductByIdGraphql(
  productId: GetCustomerProductParams
): Promise<GetCustomerProductResponse | undefined> {
  return undefined;
}

export async function getFeaturedProductsGraphql(): Promise<
  GetCustomerAllProductsResponse | undefined
> {
  return undefined;
}

export async function getCartGraphql(): Promise<Cart | undefined> {
  return undefined;
}

export async function addToCartGraphql(
  productId: addToCartRequest
): Promise<AddToCartResponse | undefined> {
  return undefined;
}

export async function getSignedInUserGraphql(
  isEmail: boolean,
  data: GetCustomerQuery
): Promise<GetCustomerResponse | undefined> {
  return undefined;
}
export async function deleteCartItemGraphql(
  productId: deleteCartItemRequest
): Promise<deleteCartItemResponse | undefined> {
  return undefined;
}

export async function updateCartGraphql(
  item: updateCartItemRequest
): Promise<updateCartItemResponse | undefined> {
  return undefined;
}

export async function deleteAllFromCartGraphql(): Promise<
  deleteCartItemResponse | undefined
> {
  return undefined;
}