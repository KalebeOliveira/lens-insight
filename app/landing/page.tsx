import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  BarChart3,
  Brain,
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  FileText,
  Shield,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/lens-insights.png"
                alt="Lens Insight"
                width={80}
                height={20}
                // className="h-20 w-auto"
              />
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#problema" className="text-gray-600 hover:text-blue-600">
                Problema
              </a>
              <a href="#solucion" className="text-gray-600 hover:text-blue-600">
                Solución
              </a>
              <a
                href="#beneficios"
                className="text-gray-600 hover:text-blue-600"
              >
                Beneficios
              </a>
              <a href="#precios" className="text-gray-600 hover:text-blue-600">
                Precios
              </a>
              <a href="#contacto" className="text-gray-600 hover:text-blue-600">
                Contacto
              </a>
            </nav>
            <Button className="bg-blue-800 hover:bg-blue-900" asChild>
              <Link href={"/"}>Prueba Gratuita</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-800 via-blue-700 to-emerald-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-emerald-500 hover:bg-emerald-600">
              <Zap className="w-4 h-4 mr-1" />
              Tecnología de Vanguardia
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Convierte el Caos de Tickets en{" "}
              <span className="text-emerald-400">Claridad Inteligente</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Deja de apagar incendios. Nuestra IA detecta patrones, anticipa
              problemas y transforma tu soporte en una máquina de prevención
              inteligente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
                asChild
              >
                <Link href={"/"}>
                  <Eye className="w-5 h-5 mr-2" />
                  Ver Demo Gratuita
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-800 bg-transparent"
              >
                <a href="#solucion">Conocer Más</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problema" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              El Problema que Todas las Empresas Enfrentan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Miles de tickets diarios tratados como problemas aislados, sin ver
              el panorama completo ni las causas reales.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
                <CardTitle className="text-red-700">
                  Apagando Incendios
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-red-600">
                  Resuelven problemas uno por uno, sin entender por qué se
                  repiten los mismos errores una y otra vez.
                </p>
              </CardContent>
            </Card>

            <Card className="border-amber-200 bg-amber-50">
              <CardHeader>
                <Clock className="w-12 h-12 text-amber-500 mb-4" />
                <CardTitle className="text-amber-700">Tiempo Perdido</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-600">
                  Equipos frustrados gastando horas en problemas que podrían
                  haberse evitado con la información correcta.
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 bg-gray-50">
              <CardHeader>
                <DollarSign className="w-12 h-12 text-gray-500 mb-4" />
                <CardTitle className="text-gray-700">Costos Ocultos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Recursos desperdiciados en problemas recurrentes que impactan
                  la productividad y satisfacción del cliente.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="solucion" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Tu Detective Inteligente de Tickets
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Una solución que no solo resuelve, sino que anticipa, aprende y
              previene.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Así Funciona Nuestra Magia
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-800 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      1. Recopila Datos
                    </h4>
                    <p className="text-gray-600">
                      Integra automáticamente con tus sistemas existentes,
                      Excel, o cualquier fuente de tickets que uses.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      2. Analiza Inteligentemente
                    </h4>
                    <p className="text-gray-600">
                      Procesa tiempo de resolución, costos, patrones y
                      tendencias de forma automática y continua.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      3. Visualiza Claramente
                    </h4>
                    <p className="text-gray-600">
                      Tableros intuitivos que muestran métricas clave,
                      tendencias y problemas más comunes de un vistazo.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      4. Anticipa Problemas
                    </h4>
                    <p className="text-gray-600">
                      Detecta causas raíz comunes y emite alertas instantáneas
                      para prevenir problemas masivos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="bg-gradient-to-br from-blue-800 to-emerald-500 rounded-xl p-6 text-white mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Dashboard en Tiempo Real</h4>
                  <Badge className="bg-emerald-400 text-emerald-900">
                    LIVE
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-2xl font-bold">847</div>
                    <div className="text-sm opacity-90">Tickets Resueltos</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="text-2xl font-bold">2.3h</div>
                    <div className="text-sm opacity-90">Tiempo Promedio</div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium">
                      Alerta: Patrón Detectado
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-amber-600 border-amber-300"
                  >
                    3 tickets similares
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-medium">
                      Problema Anticipado
                    </span>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-emerald-600 border-emerald-300"
                  >
                    Resuelto
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Security Feature */}
          <Card className="bg-gradient-to-r from-gray-800 to-gray-700 text-white">
            <CardHeader className="text-center">
              <Shield className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <CardTitle className="text-2xl">
                Seguridad Total Garantizada
              </CardTitle>
              <CardDescription className="text-gray-300 text-lg">
                Instalación local en tus sistemas. Nosotros nunca accedemos a
                tus datos.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-300 max-w-2xl mx-auto">
                Tu información sensible permanece 100% en tu infraestructura.
                Solo tú tienes control total sobre tus datos de tickets y
                análisis.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Resultados que Transforman tu Negocio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              De apagar incendios a prevenir problemas. El cambio que tu empresa
              necesita.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-emerald-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <TrendingUp className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                <CardTitle className="text-emerald-700">
                  Menos Repeticiones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Reduce hasta 60% los problemas recurrentes identificando
                  causas raíz.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Zap className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-blue-700">
                  Resolución Rápida
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Acelera la resolución con insights predictivos y alertas
                  tempranas.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-amber-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <DollarSign className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                <CardTitle className="text-amber-700">Ahorro Real</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Optimiza recursos y reduce costos operativos
                  significativamente.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                <CardTitle className="text-purple-700">
                  Satisfacción Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Equipos más felices y clientes más satisfechos con el
                  servicio.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precios" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Planes que se Adaptan a tu Empresa
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Desde startups hasta grandes corporaciones. Encuentra el plan
              perfecto para transformar tu soporte.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <Card className="bg-gray-800 border-gray-700 relative overflow-hidden">
              <div className="absolute top-4 left-4">
                <Badge className="bg-pink-500 hover:bg-pink-600 text-white">
                  Prueba Gratuita
                </Badge>
              </div>
              <CardHeader className="pt-12">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-800 to-emerald-500 rounded-full"></div>
                  <span className="text-gray-300 font-medium">Starter</span>
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  Básico
                </CardTitle>
                <div className="text-white">
                  <span className="text-3xl font-bold">$0</span>
                  <span className="text-gray-400 ml-2">por 30 días</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Después, $299*** al mes
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Hasta 1,000 tickets/mes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Dashboard básico</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Reportes estándar</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Cancela cuando quieras</span>
                  </li>
                </ul>
                <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white mt-6">
                  Probar 30 días Gratis
                </Button>
                <p className="text-xs text-gray-500 text-center mt-4">
                  $0 por 30 días. Después, $299*** al mes. Cancela en cualquier
                  momento.
                  <br />
                  *** + impuestos aplicables.
                </p>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="bg-gray-800 border-gray-700 relative overflow-hidden">
              <div className="absolute top-4 left-4">
                <Badge className="bg-purple-500 hover:bg-purple-600 text-white">
                  Más Popular
                </Badge>
              </div>
              <CardHeader className="pt-12">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-800 to-emerald-500 rounded-full"></div>
                  <span className="text-gray-300 font-medium">
                    Professional
                  </span>
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  Empresas
                </CardTitle>
                <div className="text-white">
                  <span className="text-3xl font-bold">$599</span>
                  <span className="text-gray-400 ml-2">al mes</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Facturación anual disponible
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Hasta 10,000 tickets/mes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>IA predictiva avanzada</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Alertas en tiempo real</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Integraciones ilimitadas</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Soporte prioritario</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Cancela cuando quieras</span>
                  </li>
                </ul>
                <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white mt-6">
                  Comenzar Plan Empresas
                </Button>
                <p className="text-xs text-gray-500 text-center mt-4">
                  $599*** al mes. Descuento del 20% con facturación anual.
                  <br />
                  *** + impuestos aplicables.
                </p>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="bg-gray-800 border-gray-700 relative overflow-hidden">
              <div className="absolute top-4 left-4">
                <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
                  Enterprise
                </Badge>
              </div>
              <CardHeader className="pt-12">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-800 to-emerald-500 rounded-full"></div>
                  <span className="text-gray-300 font-medium">Enterprise</span>
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-2">
                  Corporativo
                </CardTitle>
                <div className="text-white">
                  <span className="text-3xl font-bold">$1,299</span>
                  <span className="text-gray-400 ml-2">al mes</span>
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Múltiples equipos y departamentos
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Tickets ilimitados</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Múltiples departamentos</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>API personalizada</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Implementación dedicada</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Soporte 24/7</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Cancela cuando quieras</span>
                  </li>
                </ul>
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white mt-6">
                  Obtener Plan Corporativo
                </Button>
                <p className="text-xs text-gray-500 text-center mt-4">
                  Para empresas con múltiples equipos. Precios personalizados
                  disponibles.
                  <br />
                  *** + impuestos aplicables.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">
              ¿Necesitas más de 50,000 tickets al mes?
              <a
                href="#contacto"
                className="text-emerald-400 hover:text-emerald-300 ml-1"
              >
                Contáctanos para precios personalizados
              </a>
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>Instalación local segura</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4" />
                <span>Sin compromisos a largo plazo</span>
              </span>
              <span className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Soporte incluido en todos los planes</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para Transformar tu Soporte?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Prueba nuestra versión básica GRATIS con tus propios datos. Solo
            paga si quieres las funciones avanzadas de predicción.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-800 hover:bg-gray-100"
              asChild
            >
              <Link href={"/"}>
                <Eye className="w-5 h-5 mr-2" />
                Comenzar Prueba Gratuita
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-800 bg-transparent"
            >
              Agendar Demo Personalizada
            </Button>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            Sin tarjeta de crédito • Configuración en 5 minutos • Soporte
            incluido
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/lens-insights.png"
                  width={140}
                  height={20}
                  alt="Lens Insight"
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-gray-400">
                Convirtiendo el caos de tickets en claridad inteligente.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Características
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Integraciones
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Seguridad
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Precios
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Acerca de
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Carreras
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white">
                    Documentación
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Centro de Ayuda
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Estado del Sistema
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Lens Insight. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
