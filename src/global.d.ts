interface IAxiosRequest<D> {
  data: D;
  route: string;
  auth?: boolean;
  normal?: boolean;
  authToken?: string;
  method: "POST" | "PUT" | "GET" | "PATCH" | "put" | "post" | "get" | "patch";
}

interface IUseCaseIcon {
  color?: string | color;
}
