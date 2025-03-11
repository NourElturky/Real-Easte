import fetchInterceptor from "./fetch-interceptor";

const REQUEST_TYPE_GET = "GET";
const REQUEST_TYPE_POST = "POST";
const REQUEST_TYPE_PUT = "PUT";
const REQUEST_TYPE_DELETE = "DELETE";

type RequestMethod = [
  typeof REQUEST_TYPE_GET,
  typeof REQUEST_TYPE_POST,
  typeof REQUEST_TYPE_PUT,
  typeof REQUEST_TYPE_DELETE
][number];

class Fetcher {
  private static async _sendApiRequest<T>({
    url,
    method,
    body,
    formDataBody,
    headers,
  }: {
    url: string;
    method: RequestMethod;
    body?: Record<string, unknown>;
    formDataBody?: FormData;
    headers?: Record<string, string>;
  }) {
    const config: RequestInit = {
      method,
      headers: formDataBody
        ? { ...headers }
        : {
            ...headers,
            "Content-Type": "application/json",
          },
    };

    if (formDataBody) {
      config.body = formDataBody;
    } else if (body) {
      config.body = JSON.stringify(body);
      config.headers = {
        ...config.headers,
      };
    }

    const response = await fetchInterceptor.fetch(url, config);

    if (!response.ok) {
      const error = (await response.json()) as string;
      throw new Error(error);
    }

    return response.json() as Promise<T>;
  }

  private static _jsonToFormData(json: Record<string, unknown>): FormData {
    const formData = new FormData();

    const appendFormData = (data: unknown, parentKey?: string) => {
      if (
        data &&
        typeof data === "object" &&
        !(data instanceof Date) &&
        !(data instanceof File)
      ) {
        if (Array.isArray(data)) {
          data.forEach((value, index) => {
            appendFormData(value, `${parentKey}[${index}]`);
          });
        } else {
          Object.keys(data).forEach((key) => {
            appendFormData(
              (data as Record<string, unknown>)[key],
              parentKey ? `${parentKey}[${key}]` : key
            );
          });
        }
      } else {
        const value = data == null ? "" : data;
        formData.append(parentKey!, value as string | Blob);
      }
    };

    appendFormData(json);

    return formData;
  }

  static async get<T>(
    url: string,
    headers?: Record<string, string>
  ): Promise<T> {
    return this._sendApiRequest<T>({ url, method: REQUEST_TYPE_GET, headers });
  }

  static async post<T>(
    url: string,
    body: Record<string, unknown>,
    headers?: Record<string, string>
  ): Promise<T> {
    return this._sendApiRequest<T>({
      url,
      method: REQUEST_TYPE_POST,
      body,
      headers,
    });
  }

  static async postForm<T>(
    url: string,
    body: Record<string, unknown>,
    headers?: Record<string, string>
  ): Promise<T> {
    const formDataBody = this._jsonToFormData(body);
    return this._sendApiRequest<T>({
      url,
      method: REQUEST_TYPE_POST,
      formDataBody,
      headers,
    });
  }

  static async put<T>(
    url: string,
    body: Record<string, unknown>,
    headers?: Record<string, string>
  ): Promise<T> {
    return this._sendApiRequest<T>({
      url,
      method: REQUEST_TYPE_PUT,
      body,
      headers,
    });
  }

  static async putForm<T>(
    url: string,
    body: Record<string, unknown>,
    headers?: Record<string, string>
  ): Promise<T> {
    const formDataBody = this._jsonToFormData(body);
    return this._sendApiRequest<T>({
      url,
      method: REQUEST_TYPE_PUT,
      formDataBody,
      headers,
    });
  }

  static async delete<T>(
    url: string,
    headers?: Record<string, string>
  ): Promise<T> {
    return this._sendApiRequest<T>({
      url,
      method: REQUEST_TYPE_DELETE,
      headers,
    });
  }
}

export default Fetcher;
