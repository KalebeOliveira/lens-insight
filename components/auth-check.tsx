'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Eye } from 'lucide-react'

export function AuthCheck() {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Verificar se existe uma API key válida
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/check-api-key', {
          method: 'GET',
        })
        
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleAccess = () => {
    if (isAuthenticated) {
      router.push('/dashboard')
    } else {
      router.push('/login')
    }
  }

  if (isLoading) {
    return (
      <Button
        size="lg"
        className="bg-emerald-500 hover:bg-emerald-600 text-white"
        disabled
      >
        <Eye className="w-5 h-5 mr-2" />
        Verificando...
      </Button>
    )
  }

  return (
    <Button
      size="lg"
      className="bg-emerald-500 hover:bg-emerald-600 text-white"
      onClick={handleAccess}
    >
      <Eye className="w-5 h-5 mr-2" />
      {isAuthenticated ? 'Acessar Plataforma' : 'Ver Demo Gratuita'}
    </Button>
  )
} 