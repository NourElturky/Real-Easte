type RequestInterceptor = (config: RequestInit) => Promise<RequestInit>;
type ResponseInterceptor = (response: Response) => Response | Promise<Response>;

class FetchInterceptor {
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private token: string | null = null;

  intercept = {
    request: {
      use: (interceptor: RequestInterceptor) => {
        this.requestInterceptors.push(interceptor);
      },
    },
    response: {
      use: (interceptor: ResponseInterceptor) => {
        this.responseInterceptors.push(interceptor);
      },
    },
  };

  fetch = async (url: string, config: RequestInit = {}): Promise<Response> => {
    // Apply request interceptors
    let interceptedConfig = { ...config };
    for (const interceptor of this.requestInterceptors) {
      interceptedConfig = await interceptor(interceptedConfig);
    }

    // Perform the fetch
    let response = await fetch(url, interceptedConfig);

    // Apply response interceptors
    for (const interceptor of this.responseInterceptors) {
      response = await interceptor(response);
    }

    return response;
  };

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }
}

const fetchInterceptor = new FetchInterceptor();

// Request interceptor: Add common headers and cached session token
fetchInterceptor.intercept.request.use(async (config) => {
  const token = fetchInterceptor.getToken();

  if (!token) {
    // const session = await getSession();
    // token = session?.user?.token || null;
    // if (token) fetchInterceptor.setToken(token);
  }

  return {
    ...config,
    headers: token
      ? {
          ...config.headers,
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        }
      : {
          ...config.headers,
          Accept: "application/json",
        },
  };
});

// Response interceptor: Handle common errors
fetchInterceptor.intercept.response.use(async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 401) {
      //   await signOut({
      //     callbackUrl: "/login",
      //   });
      if (!("document" in globalThis)) return response;
      window.location.href = "/api/auth/signin";
    }
    throw new Error(
      JSON.stringify({
        message: errorData?.message,
        errors: errorData?.errors,
      }) || "An error occurred"
    );
  }
  return response;
});

export default fetchInterceptor;
