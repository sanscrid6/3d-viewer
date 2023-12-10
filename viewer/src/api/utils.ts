export const base = 'http://localhost:8888/api/v1';

type RequestData = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  body?: Record<string, string | number> | FormData;
  params?: Record<string, string | number>;
};

type RefreshTokenRequest = {
  accessToken: string;
  refreshToken: string;
};

type RefreshTokenResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
};

export const asset = (path: string) => 'http://localhost:8888/media' + path;

export async function requestWithCredentials<T>({
  method,
  url,
  body,
  params,
}: RequestData) {
  const u = new URL(base + url);
  const token = localStorage.getItem('accessToken');

  for (const [key, value] of Object.entries(params ?? {})) {
    u.searchParams.set(key, value.toString());
  }

  let reqBody = null;
  let contentType = {};

  if (body instanceof FormData) {
    reqBody = body;
    // contentType['Content-Type'] = 'multipart/form-data';
  } else if (body != null) {
    reqBody = JSON.stringify(body);
    contentType = {
      'Content-Type': 'application/json',
    };
  }

  const res = await fetch(u.toString(), {
    method,
    body: reqBody,
    headers: {
      ...contentType,
      Authorization: `Bearer ${token}`,
    },
  });

  const text = await res.text();
  let data = null;

  if (!text) {
    data = null as T;
  } else {
    data = JSON.parse(text) as T;
  }

  if (!res.ok) {
    throw {
      code: res.status,
      statusText: res.statusText,
      message: (data as { message: string }).message,
    };
  }

  return data;
}

export async function refresh(data: RefreshTokenRequest) {
  const res = await requestWithCredentials<RefreshTokenResponse>({
    method: 'POST',
    url: '/identity/refresh',
    params: data,
  });

  return res!;
}

export async function request<T>(r: RequestData, depth = 0): Promise<T> {
  if (depth === 3) {
    throw new Error('max depth reached');
  }

  try {
    return await requestWithCredentials<T>(r);
  } catch (e: unknown) {
    // if (e && typeof e === 'object' && 'code' in e && e.code === 401) {
    //   depth += 1;

    //   const accessToken = localStorage.getItem('accessToken')!;
    //   const refreshToken = localStorage.getItem('refreshToken')!;

    //   const { accessToken: at, refreshToken: rt } = await refresh({
    //     accessToken,
    //     refreshToken,
    //   });

    //   localStorage.setItem('accessToken', at);
    //   localStorage.setItem('refreshToken', rt);

    //   return await request<T>(r, depth);
    // }

    throw e;
  }
}
