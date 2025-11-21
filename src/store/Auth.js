import { useLocalStorage } from "@vueuse/core";

/**
 * @var {{ token: string, user: any }} account
 */
export const auth = useLocalStorage("account");