import { UseAuthContext } from "@/context/auth-context";
import { endpoints } from "@/lib/apiConfig";
import { api } from "@/lib/utils";
const url = "/url/my_urls";
export async function fetchUrls(accessToken: string | null) {
    if (accessToken === null) {
        throw new Error("No access token provided");
    }
    const url = endpoints.urls;
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };
        const response = await api.get(url, { headers });
        if (response.status === 200) {
            return response.data;
        }
        throw new Error(response.statusText);
}


//   const fetchUrls = async (key ) => {
//     const { data } = await axios.get()
//     return data
//   }

//   const {
//     status,
//     data,
//     error,
//     refetch,
//   } = useQuery(['Urls'], fetchUrls)