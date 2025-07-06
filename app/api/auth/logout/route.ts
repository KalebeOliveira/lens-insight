import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Cierre de sesión exitoso'
    })

    // Remover cookie de sessão
    response.cookies.set('session_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0, // Expira imediatamente
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
} 