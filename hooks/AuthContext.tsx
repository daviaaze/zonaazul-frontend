import React, { createContext, useState } from 'react'

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthContextData {
  signed: boolean;
  user: object | null;
  seller: object | null;
  signIn(data:any): Promise<void>;
  signOut(): Promise<void>;
}

export default function AuthProvider ({ children }) {
  const [user, setUser] = useState<object | null>(null)
  const [seller, setSeller] = useState<object | null>(null)

  async function signIn (data:any) {
    const response = await auth.signIn(data)

    setUser(response.user)

    api.default.headers.Authorization = `Bearer ${response.token}`
  }

  async function signOut () {

  }

  return (
    <AuthContext.Provider value={{ signed: !!user || !!seller, user, seller, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
