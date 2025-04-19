import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Award } from "lucide-react";


export default function AdminPanel() {

  return (

    <>

      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Estudiantes</p>
                  <p className="text-3xl font-bold">128</p>
                </div>
                <div className="p-3 rounded-full bg-red-100 text-red-700">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 text-sm text-green-500">+12% desde el mes pasado</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Clases Activas</p>
                  <p className="text-3xl font-bold">24</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-700">
                  <Calendar className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 text-sm text-green-500">+4% desde el mes pasado</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Cinturones Negros</p>
                  <p className="text-3xl font-bold">18</p>
                </div>
                <div className="p-3 rounded-full bg-gray-800 text-white">
                  <Award className="h-6 w-6" />
                </div>
              </div>
              <div className="mt-4 text-sm text-green-500">+2 nuevos este mes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Ingresos Mensuales</p>
                  <p className="text-3xl font-bold">$8,540</p>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-700">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="mt-4 text-sm text-green-500">+8% desde el mes pasado</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Asistencia Semanal</CardTitle>
              <CardDescription>Número de estudiantes por día</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-end space-x-2">
                <div className="flex-1 bg-gray-200 rounded-t-md relative h-20 hover:bg-gray-300 transition-all">
                  <div className="absolute bottom-0 left-0 right-0 bg-red-600 rounded-t-md h-1/2"></div>
                  <div className="absolute -top-6 left-0 right-0 text-center text-sm font-medium">Lun</div>
                  <div className="absolute -bottom-6 left-0 right-0 text-center text-sm font-medium">42</div>
                </div>
                <div className="flex-1 bg-gray-200 rounded-t-md relative h-32 hover:bg-gray-300 transition-all">
                  <div className="absolute bottom-0 left-0 right-0 bg-red-600 rounded-t-md h-3/4"></div>
                  <div className="absolute -top-6 left-0 right-0 text-center text-sm font-medium">Mar</div>
                  <div className="absolute -bottom-6 left-0 right-0 text-center text-sm font-medium">68</div>
                </div>
                <div className="flex-1 bg-gray-200 rounded-t-md relative h-40 hover:bg-gray-300 transition-all">
                  <div className="absolute bottom-0 left-0 right-0 bg-red-600 rounded-t-md h-2/3"></div>
                  <div className="absolute -top-6 left-0 right-0 text-center text-sm font-medium">Mié</div>
                  <div className="absolute -bottom-6 left-0 right-0 text-center text-sm font-medium">56</div>
                </div>
                <div className="flex-1 bg-gray-200 rounded-t-md relative h-60 hover:bg-gray-300 transition-all">
                  <div className="absolute bottom-0 left-0 right-0 bg-red-600 rounded-t-md h-4/5"></div>
                  <div className="absolute -top-6 left-0 right-0 text-center text-sm font-medium">Jue</div>
                  <div className="absolute -bottom-6 left-0 right-0 text-center text-sm font-medium">72</div>
                </div>
                <div className="flex-1 bg-gray-200 rounded-t-md relative h-72 hover:bg-gray-300 transition-all">
                  <div className="absolute bottom-0 left-0 right-0 bg-red-600 rounded-t-md h-5/6"></div>
                  <div className="absolute -top-6 left-0 right-0 text-center text-sm font-medium">Vie</div>
                  <div className="absolute -bottom-6 left-0 right-0 text-center text-sm font-medium">85</div>
                </div>
                <div className="flex-1 bg-gray-200 rounded-t-md relative h-80 hover:bg-gray-300 transition-all">
                  <div className="absolute bottom-0 left-0 right-0 bg-red-600 rounded-t-md h-full"></div>
                  <div className="absolute -top-6 left-0 right-0 text-center text-sm font-medium">Sáb</div>
                  <div className="absolute -bottom-6 left-0 right-0 text-center text-sm font-medium">96</div>
                </div>
                <div className="flex-1 bg-gray-200 rounded-t-md relative h-16 hover:bg-gray-300 transition-all">
                  <div className="absolute bottom-0 left-0 right-0 bg-red-600 rounded-t-md h-1/3"></div>
                  <div className="absolute -top-6 left-0 right-0 text-center text-sm font-medium">Dom</div>
                  <div className="absolute -bottom-6 left-0 right-0 text-center text-sm font-medium">28</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Próximas Clases</CardTitle>
              <CardDescription>Clases programadas para hoy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Karate Infantil</p>
                      <p className="text-sm text-gray-500">9:00 - 10:30</p>
                    </div>
                    <div className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Cinturón Amarillo
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">Instructor:</span> Sensei García
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Karate Adultos</p>
                      <p className="text-sm text-gray-500">11:00 - 12:30</p>
                    </div>
                    <div className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full">Cinturón Verde</div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">Instructor:</span> Sensei Rodríguez
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Karate Avanzado</p>
                      <p className="text-sm text-gray-500">16:00 - 18:00</p>
                    </div>
                    <div className="bg-black text-white text-xs px-2 py-1 rounded-full">Cinturón Negro</div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">Instructor:</span> Sensei Martínez
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Kata Especial</p>
                      <p className="text-sm text-gray-500">19:00 - 20:30</p>
                    </div>
                    <div className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full">Todos los niveles</div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">Instructor:</span> Sensei López
                  </div>
                </div>
              </div>
              <Button className="w-full mt-4 bg-red-700 hover:bg-red-800">Ver todas las clases</Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Estudiantes Recientes</CardTitle>
              <CardDescription>Últimos estudiantes registrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Nombre</th>
                      <th className="text-left py-3 px-4">Edad</th>
                      <th className="text-left py-3 px-4">Cinturón</th>
                      <th className="text-left py-3 px-4">Fecha de Registro</th>
                      <th className="text-left py-3 px-4">Estado</th>
                      <th className="text-left py-3 px-4">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Ana Martínez</td>
                      <td className="py-3 px-4">12</td>
                      <td className="py-3 px-4">
                        <span className="bg-white border border-gray-300 text-gray-800 text-xs px-2 py-1 rounded-full">
                          Blanco
                        </span>
                      </td>
                      <td className="py-3 px-4">12/04/2023</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Activo</span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          Ver
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">Carlos López</td>
                      <td className="py-3 px-4">15</td>
                      <td className="py-3 px-4">
                        <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">Amarillo</span>
                      </td>
                      <td className="py-3 px-4">10/04/2023</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Activo</span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          Ver
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">María Rodríguez</td>
                      <td className="py-3 px-4">28</td>
                      <td className="py-3 px-4">
                        <span className="bg-white border border-gray-300 text-gray-800 text-xs px-2 py-1 rounded-full">
                          Blanco
                        </span>
                      </td>
                      <td className="py-3 px-4">08/04/2023</td>
                      <td className="py-3 px-4">
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                          Pendiente
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          Ver
                        </Button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">Juan Pérez</td>
                      <td className="py-3 px-4">35</td>
                      <td className="py-3 px-4">
                        <span className="bg-orange-200 text-orange-800 text-xs px-2 py-1 rounded-full">Naranja</span>
                      </td>
                      <td className="py-3 px-4">05/04/2023</td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Activo</span>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">
                          Ver
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

    </>

  )
}
