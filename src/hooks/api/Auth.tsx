/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery } from 'react-query'
import { ApiOrganizationBody, ApiRegisterBody, StackeholderResponse } from 'types/api'
import { api } from 'api'
import { AxiosError } from 'axios'

export const useRegister = () =>
  useMutation<StackeholderResponse, AxiosError, ApiRegisterBody>((data) => api.auth.registerClient(data))

export const useLogin = () =>
  useMutation<StackeholderResponse, AxiosError, any>((data: any) => api.auth.verifyClient(data))

export const registerOrganization = () =>
  useMutation<any, AxiosError, ApiOrganizationBody>((body: any) => api.auth.registerOrganization(body))

export const deleteOrganization = () => useQuery('deleteOrganization', () => api.auth.deleteOrganization())
