/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from 'react-query'
import { ApiLoginBody, ApiRegisterBody, StackeholderResponse } from 'types/api'
import { api } from 'api'
import { AxiosError } from 'axios'

// Define a default query function that will receive the query key
export const useRegister = () =>
  useMutation<StackeholderResponse, AxiosError, ApiRegisterBody>((data) => api.auth.registerClient(data))

export const useLogin = () => useMutation<StackeholderResponse, AxiosError, ApiLoginBody>((key) => api.auth.verifyClient(key))
