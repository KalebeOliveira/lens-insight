import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    
    if (!apiKey || apiKey === 'sk-your_openai_api_key_here') {
      return NextResponse.json(
        { 
          configured: false, 
          error: 'API Key de OpenAI não configurada' 
        },
        { status: 400 }
      )
    }

    // Testar se a API key é válida fazendo uma requisição simples
    const response = await fetch('https://api.openai.com/v1/models', {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })

    if (!response.ok) {
      if (response.status === 401) {
        return NextResponse.json(
          { 
            configured: false, 
            error: 'API Key de OpenAI inválida' 
          },
          { status: 401 }
        )
      } else if (response.status === 429) {
        return NextResponse.json(
          { 
            configured: true, 
            error: 'Limite de requisições excedido' 
          },
          { status: 429 }
        )
      } else {
        return NextResponse.json(
          { 
            configured: false, 
            error: 'Erro ao verificar API Key' 
          },
          { status: 500 }
        )
      }
    }

    return NextResponse.json(
      { 
        configured: true, 
        message: 'API Key configurada corretamente' 
      }
    )

  } catch (error) {
    console.error('Error checking API key:', error)
    return NextResponse.json(
      { 
        configured: false, 
        error: 'Erro interno ao verificar API Key' 
      },
      { status: 500 }
    )
  }
} 