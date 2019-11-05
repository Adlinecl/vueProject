import {get, post } from '@/api/http'

export const getList = p => post('/api/PersonRandom/GetPersonRandomPageList', p)
export const addItem = p => post('/api/PersonRandom/GetPersonRandomPageList', p)
export const editItem = p => post('/api/PersonRandom/GetPersonRandomPageList', p)
export const deleteItem = p => post('/api/PersonRandom/GetPersonRandomPageList', p)
export const importDate = p => post('/api/PersonRandom/GetPersonRandomPageList', p)
export const randomTable = p => post('/api/PersonRandom/GetPersonRandomPageList', p)
