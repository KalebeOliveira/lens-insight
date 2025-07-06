import { NextRequest, NextResponse } from 'next/server'

// Credenciais mockadas
const MOCK_USERS = [
  {
    email: 'admin@lensinsights.com',
    password: '4(PE4P=_2j8W',
    name: 'Administrador',
    role: 'admin'
  },
  {
    email: 'user@lensinsights.com',
    password: 'h6XM-W7U0wz/',
    name: 'Usuário',
    role: 'user'
  }
]

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Validação básica
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email y contraseña son obligatorios' },
        { status: 400 }
      )
    }

    // Verificar credenciais
    const user = MOCK_USERS.find(
      u => u.email === email && u.password === password
    )

    if (!user) {
      return NextResponse.json(
        { error: 'Email o contraseña incorrectos' },
        { status: 401 }
      )
    }

    // Criar token de sessão (simulado)
    const sessionToken = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    
    // Retornar dados do usuário (sem senha)
    const userWithoutPassword = {
      email: user.email,
      name: user.name,
      role: user.role
    }

    // Definir cookie de sessão
    const response = NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'Inicio de sesión exitoso'
    })

    response.cookies.set('session_token', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 dias
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 