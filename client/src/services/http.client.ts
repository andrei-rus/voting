import { API_BASE_URL } from "../config";

export const GET = async (URL: string, OPTIONS: RequestInit) => {
  const data = await fetch(API_BASE_URL + URL, {...OPTIONS, credentials: 'include' });
  if(data.status>=400) {
    throw data
  }

  return data;
}

export const POST = async (URL: string, OPTIONS: RequestInit) => {
  const data = await fetch(API_BASE_URL + URL, {...OPTIONS, credentials: 'include', method: 'POST' });
  if(data.status>=400) {
    throw data
  }

  return data;
}