import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getCookie, setCookie } from "cookies-next"
import { useEffect, useCallback } from "react"
import { CONFIG } from "site.config"
import { queryKey } from "src/constants/queryKey"
import { SchemeType } from "src/types"

type SetScheme = (scheme: SchemeType) => void

const useScheme = (): [SchemeType, SetScheme] => {
  const queryClient = useQueryClient()
  const followsSystemTheme = CONFIG.blog.scheme === "system"

  const { data } = useQuery({
    queryKey: queryKey.scheme(),
    enabled: false,
    initialData: (CONFIG.blog.scheme === "system"
      ? "light"
      : CONFIG.blog.scheme) as SchemeType,
  })

  const setScheme = useCallback(
    (scheme: SchemeType) => {
      setCookie("scheme", scheme)
      queryClient.setQueryData(queryKey.scheme(), scheme)
    },
    [queryClient]
  )

  useEffect(() => {
    if (typeof window === "undefined") return

    const cachedScheme = getCookie("scheme") as SchemeType
    if (cachedScheme && cachedScheme !== data) {
      setScheme(cachedScheme)
      return
    }

    if (!cachedScheme && followsSystemTheme) {
      const defaultScheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"
      if (defaultScheme !== data) {
        setScheme(defaultScheme)
      }
    }
  }, []) // Empty dependency array to run only once

  return [data, setScheme]
}

export default useScheme
