/**
 * @throws Error
 */
const checkCsrfToken = async (token: string, headers: Headers): Promise<void> => {
  const cookiesHeader = headers.get('cookie')
  if (!cookiesHeader) throw new Error("CSRF token error")

  const cookies = cookiesHeader.split(";")
  if (!cookies.length) throw new Error("CSRF token error")

  for (const cookie of cookies) {
    if (cookie.includes("XSRF-TOKEN")) {
      const csrfToken = cookie.split("=")[1]
      if (token.trim() === csrfToken.trim()) {
        return
      }
    }
  }
  throw new Error("CSRF token error")
}

export default checkCsrfToken