/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from 'react-query'
import { ApiRegisterBody } from 'types/api'
import { api } from 'api'
import { AxiosError } from 'axios'

// Define a default query function that will receive the query key
export const useRegister = () =>
  useMutation<string, AxiosError, {key: string, body: ApiRegisterBody}>(
    (data) => api.auth.registerClient(data)
  )
