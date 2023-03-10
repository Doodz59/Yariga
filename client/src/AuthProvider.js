import { AuthProvider } from "@pankod/refine-core";
import { useAuthenticated } from "@pankod/refine-core";

const { data, isSuccess, isLoading, isError, refetch } = useAuthenticated();
const mockUsers = [{ email: "john@mail.com" }, { email: "jane@mail.com" }];

const authProvider: AuthProvider = {
    login: ({ email, password }) => {
        // Suppose we actually send a request to the back end here.
        const user = mockUsers.find((item) => item.email === email);

        if (user) {
            localStorage.setItem("auth", JSON.stringify(user));
            return Promise.resolve();
        }

        return Promise.reject();
    },
    register: ({ email }) => {
        const user = mockUsers.find((user) => user.email === email);

        if (user) {
            return Promise.reject();
        }

        mockUsers.push({ email });

        return Promise.resolve();
    },
    checkAuth: () => {
        const user = localStorage.getItem("auth");

        if (user) {
            return Promise.resolve();
        }

        return Promise.reject();
    },
    logout: () => {
        localStorage.removeItem("auth");
        return Promise.resolve();
    },
    checkError: (error) => {
        if (error.status === 401 || error.status === 403) {
            return Promise.reject();
        }

        return Promise.resolve();
    },
    getUserIdentity: () => {
        const user = localStorage.getItem("auth");

        if (user) {
            const { email, roles } = JSON.parse(user);

            return Promise.resolve({ email, roles });
        }

        return Promise.reject();
    },
    
};

export default authProvider;