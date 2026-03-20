// components/pagos/PagosPage.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar as CalendarIcon,
  Search,
  User,
  Phone,
  Mail,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  CreditCard,
  Banknote,
  Receipt,
  Printer,
  Download,
  FileText,
  ChevronLeft,
  ChevronRight,
  Filter,
  CalendarDays,
  Users,
  TrendingUp,
  Wallet,
  PiggyBank,
  History,
  Eye
} from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, isSameMonth } from "date-fns";
import { es } from "date-fns/locale";

// ================ INTERFACES ================
interface Alumno {
  id: number;
  nombre: string;
  apellido: string;
  cedula: string;
  email: string;
  telefono: string;
  grado: string;
  dojo: string;
  imagen?: string;
  pagos: Pago[];
}

interface Pago {
  id: number;
  mes: string;
  año: number;
  fechaPago?: string;
  monto: number;
  metodoPago?: 'efectivo' | 'transferencia' | 'tarjeta' | 'deposito';
  referencia?: string;
  estado: 'pendiente' | 'pagado' | 'atrasado' | 'moroso';
  fechaVencimiento: string;
}

interface ComprobantePago {
  id: number;
  alumnoId: number;
  alumnoNombre: string;
  mes: string;
  año: number;
  fechaPago: string;
  monto: number;
  metodoPago: string;
  referencia: string;
  comprobanteUrl?: string;
}

// ================ DATOS DE EJEMPLO ================
const alumnosPagosMock: Alumno[] = [
  {
    id: 1,
    nombre: "Juan",
    apellido: "Pérez",
    cedula: "12345678",
    email: "juan.perez@email.com",
    telefono: "555-1234",
    grado: "Verde",
    dojo: "Dojo Central",
    pagos: [
      { id: 1, mes: "Enero", año: 2025, monto: 25000, estado: 'pagado', metodoPago: 'transferencia', referencia: 'TR-001', fechaVencimiento: "2025-01-10", fechaPago: "2025-01-05" },
      { id: 2, mes: "Febrero", año: 2025, monto: 25000, estado: 'pagado', metodoPago: 'efectivo', fechaVencimiento: "2025-02-10", fechaPago: "2025-02-08" },
      { id: 3, mes: "Marzo", año: 2025, monto: 25000, estado: 'pagado', metodoPago: 'tarjeta', fechaVencimiento: "2025-03-10", fechaPago: "2025-03-03" },
    ]
  },
  {
    id: 2,
    nombre: "María",
    apellido: "Gómez",
    cedula: "87654321",
    email: "maria.gomez@email.com",
    telefono: "555-5678",
    grado: "Azul",
    dojo: "Dojo Central",
    pagos: [
      { id: 4, mes: "Enero", año: 2025, monto: 25000, estado: 'pagado', metodoPago: 'transferencia', referencia: 'TR-002', fechaVencimiento: "2025-01-10", fechaPago: "2025-01-07" },
      { id: 5, mes: "Febrero", año: 2025, monto: 25000, estado: 'atrasado', fechaVencimiento: "2025-02-10" },
      { id: 6, mes: "Marzo", año: 2025, monto: 25000, estado: 'pendiente', fechaVencimiento: "2025-03-10" },
    ]
  },
  {
    id: 3,
    nombre: "Carlos",
    apellido: "Rodríguez",
    cedula: "45678912",
    email: "carlos.rod@email.com",
    telefono: "555-9012",
    grado: "Marrón",
    dojo: "Dojo Norte",
    pagos: [
      { id: 7, mes: "Enero", año: 2025, monto: 25000, estado: 'pagado', metodoPago: 'efectivo', fechaVencimiento: "2025-01-10", fechaPago: "2025-01-04" },
      { id: 8, mes: "Febrero", año: 2025, monto: 25000, estado: 'moroso', fechaVencimiento: "2025-02-10" },
      { id: 9, mes: "Marzo", año: 2025, monto: 25000, estado: 'moroso', fechaVencimiento: "2025-03-10" },
    ]
  },
  {
    id: 4,
    nombre: "Ana",
    apellido: "López",
    cedula: "32165498",
    email: "ana.lopez@email.com",
    telefono: "555-3456",
    grado: "Naranja",
    dojo: "Dojo Sur",
    pagos: [
      { id: 10, mes: "Enero", año: 2025, monto: 25000, estado: 'pagado', metodoPago: 'transferencia', referencia: 'TR-003', fechaVencimiento: "2025-01-10", fechaPago: "2025-01-09" },
      { id: 11, mes: "Febrero", año: 2025, monto: 25000, estado: 'pagado', metodoPago: 'tarjeta', fechaVencimiento: "2025-02-10", fechaPago: "2025-02-02" },
      { id: 12, mes: "Marzo", año: 2025, monto: 25000, estado: 'atrasado', fechaVencimiento: "2025-03-10" },
    ]
  },
  {
    id: 5,
    nombre: "Luis",
    apellido: "Martínez",
    cedula: "78912345",
    email: "luis.martinez@email.com",
    telefono: "555-7890",
    grado: "Amarillo",
    dojo: "Dojo Central",
    pagos: [
      { id: 13, mes: "Enero", año: 2025, monto: 25000, estado: 'pagado', metodoPago: 'efectivo', fechaVencimiento: "2025-01-10", fechaPago: "2025-01-06" },
      { id: 14, mes: "Febrero", año: 2025, monto: 25000, estado: 'pendiente', fechaVencimiento: "2025-02-10" },
      { id: 15, mes: "Marzo", año: 2025, monto: 25000, estado: 'pendiente', fechaVencimiento: "2025-03-10" },
    ]
  },
  {
    id: 6,
    nombre: "Laura",
    apellido: "Fernández",
    cedula: "23456789",
    email: "laura.fernandez@email.com",
    telefono: "555-2345",
    grado: "Rojo",
    dojo: "Dojo Norte",
    pagos: [
      { id: 16, mes: "Enero", año: 2025, monto: 25000, estado: 'pagado', metodoPago: 'transferencia', referencia: 'TR-004', fechaVencimiento: "2025-01-10", fechaPago: "2025-01-03" },
      { id: 17, mes: "Febrero", año: 2025, monto: 25000, estado: 'pagado', metodoPago: 'tarjeta', fechaVencimiento: "2025-02-10", fechaPago: "2025-02-05" },
      { id: 18, mes: "Marzo", año: 2025, monto: 25000, estado: 'pagado', fechaVencimiento: "2025-03-10", fechaPago: "2025-03-01" },
    ]
  },
];

const comprobantesMock: ComprobantePago[] = [
  {
    id: 1,
    alumnoId: 1,
    alumnoNombre: "Juan Pérez",
    mes: "Marzo",
    año: 2025,
    fechaPago: "2025-03-03",
    monto: 25000,
    metodoPago: "Tarjeta de Crédito",
    referencia: "TC-123456"
  },
  {
    id: 2,
    alumnoId: 6,
    alumnoNombre: "Laura Fernández",
    mes: "Marzo",
    año: 2025,
    fechaPago: "2025-03-01",
    monto: 25000,
    metodoPago: "Transferencia Bancaria",
    referencia: "TR-789012"
  },
  {
    id: 3,
    alumnoId: 2,
    alumnoNombre: "María Gómez",
    mes: "Enero",
    año: 2025,
    fechaPago: "2025-01-07",
    monto: 25000,
    metodoPago: "Transferencia Bancaria",
    referencia: "TR-345678"
  },
];

type TabType = 'mes-actual' | 'comprobantes';

// Meses del año
const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Años disponibles (últimos 2 años + actual + próximo)
const años = [2024, 2025, 2026];

export default function Payments() {
  const [activeTab, setActiveTab] = useState<TabType>('mes-actual');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlumno, setSelectedAlumno] = useState<Alumno | null>(null);
  const [showPagoModal, setShowPagoModal] = useState(false);
  const [showComprobanteModal, setShowComprobanteModal] = useState(false);
  const [selectedComprobante, setSelectedComprobante] = useState<ComprobantePago | null>(null);

  // Filtrar alumnos por búsqueda
  const filteredAlumnos = alumnosPagosMock.filter(alumno => {
    const searchLower = searchTerm.toLowerCase();
    return alumno.nombre.toLowerCase().includes(searchLower) ||
           alumno.apellido.toLowerCase().includes(searchLower) ||
           alumno.cedula.includes(searchTerm);
  });

  // Obtener estado de pago para un alumno en el mes seleccionado
  const getEstadoPago = (alumno: Alumno): { estado: string; clase: string; icon: any } => {
    const pagoMes = alumno.pagos.find(p => 
      p.mes === meses[selectedMonth] && p.año === selectedYear
    );

    if (!pagoMes) {
      return { 
        estado: 'Sin registro', 
        clase: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: AlertCircle
      };
    }

    switch(pagoMes.estado) {
      case 'pagado':
        return { 
          estado: 'Al día', 
          clase: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle
        };
      case 'atrasado':
        return { 
          estado: 'Debe este mes', 
          clase: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock
        };
      case 'moroso':
        return { 
          estado: 'Moroso', 
          clase: 'bg-red-100 text-red-800 border-red-200',
          icon: XCircle
        };
      case 'pendiente':
        return { 
          estado: 'Pendiente', 
          clase: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: AlertCircle
        };
      default:
        return { 
          estado: pagoMes.estado, 
          clase: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: AlertCircle
        };
    }
  };

  // Obtener color de fondo de la tarjeta según estado
  const getCardBorderColor = (estado: string) => {
    switch(estado) {
      case 'Al día': return 'border-green-400 bg-green-50/30';
      case 'Debe este mes': return 'border-yellow-400 bg-yellow-50/30';
      case 'Moroso': return 'border-red-400 bg-red-50/30';
      default: return 'border-gray-300';
    }
  };

  // Navegación del calendario de meses
  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  // Formatear fecha
  const formatFecha = (fecha?: string) => {
    if (!fecha) return 'No registrada';
    return format(new Date(fecha), "dd/MM/yyyy");
  };

  // Formatear moneda
  const formatMoneda = (monto: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(monto);
  };

  // Estadísticas del mes
  const estadisticasMes = {
    totalAlumnos: filteredAlumnos.length,
    alDia: filteredAlumnos.filter(a => getEstadoPago(a).estado === 'Al día').length,
    debeEsteMes: filteredAlumnos.filter(a => getEstadoPago(a).estado === 'Debe este mes').length,
    morosos: filteredAlumnos.filter(a => getEstadoPago(a).estado === 'Moroso').length,
    pendientes: filteredAlumnos.filter(a => getEstadoPago(a).estado === 'Pendiente').length,
    totalRecaudado: filteredAlumnos
      .filter(a => getEstadoPago(a).estado === 'Al día')
      .reduce((acc, a) => {
        const pago = a.pagos.find(p => p.mes === meses[selectedMonth] && p.año === selectedYear);
        return acc + (pago?.monto || 25000);
      }, 0)
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Pagos</h1>
          <p className="text-gray-600 mt-2">
            Administra las mensualidades y comprobantes de pago de los alumnos
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 p-1 bg-gray-100 rounded-xl border border-gray-300 max-w-md">
        <Button
          variant={activeTab === 'mes-actual' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('mes-actual')}
          className={`flex-1 rounded-lg transition-all duration-300 ${
            activeTab === 'mes-actual' 
              ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-md' 
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          <CalendarDays className="h-4 w-4 mr-2" />
          Mes Actual
        </Button>
        <Button
          variant={activeTab === 'comprobantes' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('comprobantes')}
          className={`flex-1 rounded-lg transition-all duration-300 ${
            activeTab === 'comprobantes' 
              ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-md' 
              : 'text-gray-700 hover:bg-gray-200'
          }`}
        >
          <Receipt className="h-4 w-4 mr-2" />
          Comprobantes
        </Button>
      </div>

      {/* Contenido según tab */}
      {activeTab === 'mes-actual' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Columna izquierda: Lista de alumnos (2/3) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <Card className="border border-gray-300 shadow-sm">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{estadisticasMes.totalAlumnos}</div>
                    <div className="text-xs text-gray-600">Total alumnos</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-green-300 bg-green-50/30 shadow-sm">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-700">{estadisticasMes.alDia}</div>
                    <div className="text-xs text-green-600">Al día</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-yellow-300 bg-yellow-50/30 shadow-sm">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-700">{estadisticasMes.debeEsteMes}</div>
                    <div className="text-xs text-yellow-600">Debe este mes</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-red-300 bg-red-50/30 shadow-sm">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-700">{estadisticasMes.morosos}</div>
                    <div className="text-xs text-red-600">Morosos</div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border border-blue-300 bg-blue-50/30 shadow-sm">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-700">
                      {formatMoneda(estadisticasMes.totalRecaudado)}
                    </div>
                    <div className="text-xs text-blue-600">Recaudado</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Búsqueda */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar alumno por nombre o cédula..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300"
              />
            </div>

            {/* Grid de alumnos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAlumnos.map((alumno) => {
                const { estado, clase, icon: Icon } = getEstadoPago(alumno);
                const borderColor = getCardBorderColor(estado);
                
                return (
                  <Card 
                    key={alumno.id} 
                    className={`border-2 ${borderColor} hover:shadow-lg transition-all duration-300 cursor-pointer`}
                    onClick={() => {
                      setSelectedAlumno(alumno);
                      setShowPagoModal(true);
                    }}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-red-500 p-0.5">
                            <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                              <User className="h-6 w-6 text-amber-600" />
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900">
                              {alumno.nombre} {alumno.apellido}
                            </h3>
                            <p className="text-sm text-gray-600">{alumno.grado}</p>
                          </div>
                        </div>
                        <Badge className={clase}>
                          <Icon className="h-3 w-3 mr-1" />
                          {estado}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-700">{alumno.telefono}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-gray-500" />
                          <span className="text-gray-700 truncate">{alumno.email}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Mensualidad</span>
                          <span className="font-bold text-gray-900">{formatMoneda(25000)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Columna derecha: Calendario de meses (1/3) */}
          <div className="lg:col-span-1">
            <Card className="border border-gray-300 shadow-sm sticky top-6">
              <CardContent className="p-6">
                {/* Selector de año */}
                <div className="flex justify-between items-center mb-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedYear(selectedYear - 1)}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900">{selectedYear}</h3>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedYear(selectedYear + 1)}
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Navegación de mes */}
                <div className="flex justify-between items-center mb-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevMonth}
                    className="border-gray-300"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-center">
                    <span className="text-lg font-semibold text-gray-900">
                      {meses[selectedMonth]}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextMonth}
                    className="border-gray-300"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Grid de meses */}
                <div className="grid grid-cols-3 gap-2">
                  {meses.map((mes, index) => {
                    const isCurrentMonth = index === selectedMonth;
                    const isPastMonth = index < selectedMonth && selectedYear === new Date().getFullYear();
                    
                    return (
                      <Button
                        key={mes}
                        variant={isCurrentMonth ? 'default' : 'ghost'}
                        onClick={() => setSelectedMonth(index)}
                        className={`
                          h-16 flex flex-col items-center justify-center transition-all duration-200
                          ${isCurrentMonth 
                            ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-md' 
                            : 'text-gray-700 hover:bg-gray-100'
                          }
                        `}
                      >
                        <span className="text-xs">{mes.substring(0, 3)}</span>
                        <span className="text-lg font-bold">{index + 1}</span>
                      </Button>
                    );
                  })}
                </div>

                {/* Leyenda */}
                <div className="mt-6 pt-4 border-t border-gray-200 space-y-2">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Estados de pago</h4>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-700">Al día</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <span className="text-xs text-gray-700">Debe este mes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span className="text-xs text-gray-700">Moroso (2+ meses)</span>
                  </div>
                </div>

                {/* Resumen del mes */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Resumen {meses[selectedMonth]}</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Al día:</span>
                      <span className="font-semibold text-green-600">{estadisticasMes.alDia}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Debe este mes:</span>
                      <span className="font-semibold text-yellow-600">{estadisticasMes.debeEsteMes}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Morosos:</span>
                      <span className="font-semibold text-red-600">{estadisticasMes.morosos}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold pt-2">
                      <span className="text-gray-900">Recaudado:</span>
                      <span className="text-gray-900">{formatMoneda(estadisticasMes.totalRecaudado)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tab: Comprobantes de Pago */}
      {activeTab === 'comprobantes' && (
        <div className="space-y-6">
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar comprobante por alumno o referencia..."
                className="pl-10 bg-white border-gray-300"
              />
            </div>
            <Select defaultValue="todos">
              <SelectTrigger className="w-full sm:w-48 border-gray-300">
                <SelectValue placeholder="Filtrar por mes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los meses</SelectItem>
                {meses.map((mes) => (
                  <SelectItem key={mes} value={mes.toLowerCase()}>{mes}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Grid de comprobantes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comprobantesMock.map((comprobante) => (
              <Card 
                key={comprobante.id} 
                className="border border-gray-300 hover:border-amber-400 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => {
                  setSelectedComprobante(comprobante);
                  setShowComprobanteModal(true);
                }}
              >
                <CardContent className="p-0">
                  <div className="bg-gradient-to-r from-amber-50 to-red-50 p-5 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-500 to-red-500 p-0.5">
                        <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                          <Receipt className="h-6 w-6 text-amber-600" />
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Pagado
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mt-3">{comprobante.alumnoNombre}</h3>
                  </div>

                  <div className="p-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">Período</p>
                        <p className="font-semibold text-gray-900">{comprobante.mes} {comprobante.año}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Monto</p>
                        <p className="font-bold text-lg text-gray-900">{formatMoneda(comprobante.monto)}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <CalendarDays className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">Pagado: {formatFecha(comprobante.fechaPago)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CreditCard className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{comprobante.metodoPago}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">Ref: {comprobante.referencia}</span>
                      </div>
                    </div>

                    <div className="pt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100">
                        <Eye className="h-4 w-4 mr-2" />
                        Ver
                      </Button>
                      <Button size="sm" className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
                        <Download className="h-4 w-4 mr-2" />
                        PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Modal de Configuración de Pago */}
      <Dialog open={showPagoModal} onOpenChange={setShowPagoModal}>
        <DialogContent className="max-w-2xl bg-white border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Registrar Pago - {selectedAlumno?.nombre} {selectedAlumno?.apellido}
            </DialogTitle>
          </DialogHeader>
          
          {selectedAlumno && (
            <div className="space-y-6 py-4">
              {/* Información del alumno */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-amber-500 to-red-500 p-0.5">
                  <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                    <User className="h-8 w-8 text-amber-600" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {selectedAlumno.nombre} {selectedAlumno.apellido}
                  </h3>
                  <p className="text-gray-600">C.I: {selectedAlumno.cedula}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                      {selectedAlumno.grado}
                    </Badge>
                    <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                      {selectedAlumno.dojo}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Selector de mes */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-gray-900">Mes a pagar</Label>
                  <Select defaultValue={meses[selectedMonth]}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {meses.map((mes) => (
                        <SelectItem key={mes} value={mes}>{mes}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-900">Año</Label>
                  <Select defaultValue={selectedYear.toString()}>
                    <SelectTrigger className="border-gray-300">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {años.map((año) => (
                        <SelectItem key={año} value={año.toString()}>{año}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Método de pago */}
              <div className="space-y-2">
                <Label className="text-gray-900">Método de pago</Label>
                <Select defaultValue="efectivo">
                  <SelectTrigger className="border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="efectivo">Efectivo</SelectItem>
                    <SelectItem value="transferencia">Transferencia Bancaria</SelectItem>
                    <SelectItem value="tarjeta">Tarjeta de Crédito/Débito</SelectItem>
                    <SelectItem value="deposito">Depósito</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Referencia */}
              <div className="space-y-2">
                <Label className="text-gray-900">Número de referencia</Label>
                <Input 
                  placeholder="Ej: TR-123456, Dep-789, etc."
                  className="border-gray-300"
                />
              </div>

              {/* Fecha de pago */}
              <div className="space-y-2">
                <Label className="text-gray-900">Fecha de pago</Label>
                <Input 
                  type="date"
                  defaultValue={format(new Date(), "yyyy-MM-dd")}
                  className="border-gray-300"
                />
              </div>

              {/* Monto */}
              <div className="space-y-2">
                <Label className="text-gray-900">Monto</Label>
                <Input 
                  type="number"
                  defaultValue="25000"
                  className="border-gray-300"
                />
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPagoModal(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cancelar
                </Button>
                <Button className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white">
                  Registrar Pago
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Comprobante */}
      <Dialog open={showComprobanteModal} onOpenChange={setShowComprobanteModal}>
        <DialogContent className="max-w-3xl bg-white border-0 shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">
              Comprobante de Pago
            </DialogTitle>
          </DialogHeader>
          
          {selectedComprobante && (
            <div className="space-y-6 py-4">
              {/* Comprobante visual */}
              <div className="border-2 border-gray-300 rounded-xl p-8 bg-gradient-to-br from-white to-gray-50">
                {/* Header del comprobante */}
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-300">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">DOJO KENZENDO</h2>
                    <p className="text-gray-600">RUT: 76.123.456-7</p>
                    <p className="text-gray-600">comprobantes@dojokenzendo.cl</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-gradient-to-r from-amber-600 to-red-600 text-white border-0 px-4 py-2">
                      COMPROBANTE DE PAGO
                    </Badge>
                    <p className="text-sm text-gray-600 mt-2">N° {selectedComprobante.id.toString().padStart(6, '0')}</p>
                  </div>
                </div>

                {/* Información del alumno */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Alumno</p>
                    <p className="font-bold text-gray-900">{selectedComprobante.alumnoNombre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Período</p>
                    <p className="font-bold text-gray-900">{selectedComprobante.mes} {selectedComprobante.año}</p>
                  </div>
                </div>

                {/* Detalle del pago */}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Concepto</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead>Referencia</TableHead>
                      <TableHead className="text-right">Monto</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Mensualidad {selectedComprobante.mes}</TableCell>
                      <TableCell>{selectedComprobante.metodoPago}</TableCell>
                      <TableCell>{selectedComprobante.referencia}</TableCell>
                      <TableCell className="text-right font-bold">{formatMoneda(selectedComprobante.monto)}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                {/* Totales */}
                <div className="mt-6 pt-4 border-t border-gray-300">
                  <div className="flex justify-end">
                    <div className="w-64">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Subtotal:</span>
                        <span className="font-medium">{formatMoneda(selectedComprobante.monto)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">IVA (19%):</span>
                        <span className="font-medium">{formatMoneda(selectedComprobante.monto * 0.19)}</span>
                      </div>
                      <div className="flex justify-between pt-2 border-t border-gray-300">
                        <span className="font-bold text-gray-900">Total:</span>
                        <span className="font-bold text-xl text-amber-700">
                          {formatMoneda(selectedComprobante.monto * 1.19)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 text-center text-sm text-gray-500 border-t border-gray-300">
                  <p>Fecha de emisión: {formatFecha(selectedComprobante.fechaPago)}</p>
                  <p className="mt-1">Este comprobante es válido como constancia de pago</p>
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowComprobanteModal(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Cerrar
                </Button>
                <Button className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white">
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimir
                </Button>
                <Button className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Descargar PDF
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}