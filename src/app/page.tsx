'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

// Inspecciones del Trabajo por region
const INSPECCIONES = [
  { id: 1, nombre: 'Inspeccion Arica y Parinacota', region: 'Arica y Parinacota', direccion: 'Patricio Lynch 240', telefono: '58 2232500', horario: 'Lunes a Viernes 08:30-14:00' },
  { id: 2, nombre: 'Inspeccion Tarapaca', region: 'Tarapaca', direccion: 'Serrano 389', telefono: '57 2418700', horario: 'Lunes a Viernes 08:30-14:00' },
  { id: 3, nombre: 'Inspeccion Antofagasta', region: 'Antofagasta', direccion: 'Washington 2615', telefono: '55 2651200', horario: 'Lunes a Viernes 08:30-14:00' },
  { id: 4, nombre: 'Inspeccion Atacama', region: 'Atacama', direccion: 'Atacama 580', telefono: '52 2213400', horario: 'Lunes a Viernes 08:30-14:00' },
  { id: 5, nombre: 'Inspeccion Coquimbo', region: 'Coquimbo', direccion: 'Balmaceda 398', telefono: '51 2311700', horario: 'Lunes a Viernes 08:30-14:00' },
  { id: 6, nombre: 'Inspeccion Valparaiso', region: 'Valparaiso', direccion: 'Blanco 1156', telefono: '32 2507700', horario: 'Lunes a Viernes 08:30-14:00' },
  { id: 7, nombre: 'Inspeccion Metropolitana Poniente', region: 'Metropolitana', direccion: 'Agustinas 1253', telefono: '2 2674 6100', horario: 'Lunes a Viernes 08:30-14:00' },
  { id: 8, nombre: 'Inspeccion Metropolitana Oriente', region: 'Metropolitana', direccion: 'San Antonio 427', telefono: '2 2674 6200', horario: 'Lunes a Viernes 08:30-14:00' },
  { id: 9, nombre: 'Inspeccion OHiggins', region: 'OHiggins', direccion: 'Cuevas 480', telefono: '72 2230600', horario: 'Lunes a Viernes 08:30-14:00' },
  { id: 10, nombre: 'Inspeccion Maule', region: 'Maule', direccion: '1 Sur 850', telefono: '71 2515500', horario: 'Lunes a Viernes 08:30-14:00' },
  { id: 11, nombre: 'Inspeccion Biobio', region: 'Biobio', direccion: 'OHiggins 740', telefono: '41 2861400', horario: 'Lunes a Viernes 08:30-14:00' },
  { id: 12, nombre: 'Inspeccion Araucania', region: 'Araucania', direccion: 'Bulnes 590', telefono: '45 2747500', horario: 'Lunes a Viernes 08:30-14:00' },
  { id: 13, nombre: 'Inspeccion Los Rios', region: 'Los Rios', direccion: 'Picarte 322', telefono: '63 2221700', horario: 'Lunes a Viernes 08:30-14:00' },
  { id: 14, nombre: 'Inspeccion Los Lagos', region: 'Los Lagos', direccion: 'Urmeneta 509', telefono: '65 2483600', horario: 'Lunes a Viernes 08:30-14:00' },
  { id: 15, nombre: 'Inspeccion Aysen', region: 'Aysen', direccion: 'Moraleda 369', telefono: '67 2232900', horario: 'Lunes a Viernes 08:30-14:00' },
  { id: 16, nombre: 'Inspeccion Magallanes', region: 'Magallanes', direccion: 'Jose Menendez 724', telefono: '61 2241500', horario: 'Lunes a Viernes 08:30-14:00' }
];

// Tipos de contrato
const CONTRATOS = [
  { tipo: 'Indefinido', descripcion: 'Sin fecha de termino, mayor estabilidad laboral', caracteristicas: ['Estabilidad laboral', 'Indemnizacion por despido', 'Todos los beneficios legales'], plazo: 'Sin limite' },
  { tipo: 'Plazo Fijo', descripcion: 'Con fecha de termino definida, maximo 1 o 2 años', caracteristicas: ['Fecha de termino clara', 'Renovable hasta 2 veces', 'Se convierte en indefinido'], plazo: 'Max 1-2 años' },
  { tipo: 'Por Obra o Faena', descripcion: 'Dura lo que dure la obra o servicio especifico', caracteristicas: ['Trabajo especifico', 'Termina con la obra', 'Sin indemnizacion'], plazo: 'Duracion obra' },
  { tipo: 'Part-time', descripcion: 'Jornada reducida, menos de 30 horas semanales', caracteristicas: ['Jornada reducida', 'Proporcional beneficios', 'Flexible'], plazo: 'Variable' },
  { tipo: 'Honorarios', descripcion: 'Prestacion de servicios, sin relacion laboral', caracteristicas: ['Sin subordinacion', 'Sin beneficios laborales', 'Emite boletas'], plazo: 'Por servicio' },
  { tipo: 'Aprendizaje', descripcion: 'Para jovenes en formacion, con supervision', caracteristicas: ['Formacion laboral', 'Maximo 2 años', 'Supervision obligatoria'], plazo: 'Max 2 años' }
];

// Causales de despido
const CAUSALES_DESPIDO = [
  { articulo: 'Art. 159 N°1', causal: 'Mutuo acuerdo', indemnizacion: 'Segun acuerdo', descripcion: 'Ambas partes acuerdan terminar la relacion' },
  { articulo: 'Art. 159 N°2', causal: 'Renuncia voluntaria', indemnizacion: 'No corresponde', descripcion: 'El trabajador decide terminar la relacion' },
  { articulo: 'Art. 159 N°4', causal: 'Vencimiento plazo', indemnizacion: 'No corresponde', descripcion: 'Termino del contrato a plazo fijo' },
  { articulo: 'Art. 159 N°5', causal: 'Conclusion trabajo', indemnizacion: 'No corresponde', descripcion: 'Fin de la obra o faena' },
  { articulo: 'Art. 160', causal: 'Despido justificado', indemnizacion: 'No corresponde', descripcion: 'Incumplimiento grave del trabajador' },
  { articulo: 'Art. 161', causal: 'Necesidades empresa', indemnizacion: '1 mes por año (tope 11)', descripcion: 'Reestructuracion, modernizacion' },
  { articulo: 'Art. 161', causal: 'Desahucio', indemnizacion: '1 mes por año (tope 11)', descripcion: 'Trabajadores de exclusiva confianza' },
  { articulo: 'Art. 171', causal: 'Autodespido', indemnizacion: 'Segun causal + recargo', descripcion: 'Trabajador termina por incumplimiento empleador' }
];

// Derechos laborales
const DERECHOS = [
  { titulo: 'Contrato escrito', descripcion: '15 dias para firmar contrato desde inicio', icono: '📝' },
  { titulo: 'Sueldo minimo', descripcion: '$500.000 desde septiembre 2024', icono: '💰' },
  { titulo: 'Jornada maxima', descripcion: '45 horas semanales (40 hrs desde 2028)', icono: '⏰' },
  { titulo: 'Descanso semanal', descripcion: 'Al menos 1 dia de descanso a la semana', icono: '🌴' },
  { titulo: 'Vacaciones', descripcion: '15 dias habiles por año trabajado', icono: '✈️' },
  { titulo: 'Licencia medica', descripcion: 'Subsidio por incapacidad laboral', icono: '🏥' },
  { titulo: 'Fuero maternal', descripcion: 'Proteccion desde embarazo hasta 1 año despues', icono: '🤰' },
  { titulo: 'Sindicalizacion', descripcion: 'Derecho a formar y unirse a sindicatos', icono: '✊' }
];

// Glosario
const GLOSARIO = [
  { termino: 'AFP', definicion: 'Administradora de Fondos de Pensiones, donde se ahorran las cotizaciones para jubilacion' },
  { termino: 'Finiquito', definicion: 'Documento que pone fin a la relacion laboral y liquida lo adeudado' },
  { termino: 'Gratificacion', definicion: 'Parte de las utilidades que el empleador debe distribuir a trabajadores' },
  { termino: 'Horas extras', definicion: 'Tiempo trabajado sobre la jornada ordinaria, pago 50% adicional' },
  { termino: 'Licencia medica', definicion: 'Documento que acredita incapacidad temporal para trabajar' },
  { termino: 'Sueldo base', definicion: 'Remuneracion fija minima que recibe el trabajador' },
  { termino: 'Cotizaciones', definicion: 'Aportes obligatorios a prevision (AFP), salud (Fonasa/Isapre) y seguro cesantia' },
  { termino: 'Fuero laboral', definicion: 'Proteccion especial contra despido (maternal, sindical, etc.)' },
  { termino: 'Colacion', definicion: 'Asignacion para alimentacion, no imponible' },
  { termino: 'Movilizacion', definicion: 'Asignacion para transporte, no imponible' },
  { termino: 'Feriado irrenunciable', definicion: 'Dias en que comercio debe cerrar (1 mayo, 18-19 sept, 25 dic, 1 ene)' },
  { termino: 'Negociacion colectiva', definicion: 'Proceso donde sindicato negocia condiciones con empleador' }
];

export default function TrabajoModule() {
  const [busqueda, setBusqueda] = useState('');
  const [seccionActiva, setSeccionActiva] = useState('buscador');

  // Calculadora sueldo liquido
  const [sueldoBruto, setSueldoBruto] = useState('500000');
  const [tieneColacion, setTieneColacion] = useState(false);
  const [tieneMovilizacion, setTieneMovilizacion] = useState(false);
  const [colacion, setColacion] = useState('50000');
  const [movilizacion, setMovilizacion] = useState('30000');

  const inspeccionesFiltradas = INSPECCIONES.filter(i =>
    i.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    i.region.toLowerCase().includes(busqueda.toLowerCase()) ||
    i.direccion.toLowerCase().includes(busqueda.toLowerCase())
  );

  const calcularSueldoLiquido = () => {
    const bruto = parseFloat(sueldoBruto) || 0;

    // Descuentos legales
    const afp = bruto * 0.1025; // 10.25% promedio AFP
    const salud = bruto * 0.07; // 7% salud
    const seguroCesantia = bruto * 0.006; // 0.6% seguro cesantia trabajador

    const totalDescuentos = afp + salud + seguroCesantia;
    const sueldoImponibleLiquido = bruto - totalDescuentos;

    // Agregar asignaciones no imponibles
    const asignacionColacion = tieneColacion ? (parseFloat(colacion) || 0) : 0;
    const asignacionMovilizacion = tieneMovilizacion ? (parseFloat(movilizacion) || 0) : 0;

    const totalLiquido = sueldoImponibleLiquido + asignacionColacion + asignacionMovilizacion;

    return {
      bruto,
      afp,
      salud,
      seguroCesantia,
      totalDescuentos,
      asignacionColacion,
      asignacionMovilizacion,
      totalLiquido
    };
  };

  const resultado = calcularSueldoLiquido();

  const secciones = [
    { id: 'buscador', nombre: 'Inspecciones', icono: '🔍' },
    { id: 'contratos', nombre: 'Contratos', icono: '📄' },
    { id: 'calculadora', nombre: 'Calculadora', icono: '🧮' },
    { id: 'despido', nombre: 'Despido', icono: '⚠️' },
    { id: 'derechos', nombre: 'Derechos', icono: '⚖️' },
    { id: 'glosario', nombre: 'Glosario', icono: '📖' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <span className="text-5xl mb-4 block">👷</span>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Trabajo - NewCooltura Informada
            </h1>
            <p className="text-blue-100">
              Inspecciones del Trabajo, contratos, calculadora de sueldo y derechos laborales
            </p>
          </motion.div>
        </div>
      </header>

      {/* Navegacion */}
      <nav className="sticky top-0 z-40 bg-slate-800/90 backdrop-blur border-b border-slate-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-2 py-3">
            {secciones.map((seccion) => (
              <button
                key={seccion.id}
                onClick={() => setSeccionActiva(seccion.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  seccionActiva === seccion.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                <span>{seccion.icono}</span>
                <span className="text-sm font-medium">{seccion.nombre}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Buscador de Inspecciones */}
        {seccionActiva === 'buscador' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-slate-800 rounded-2xl p-6 mb-6">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🔍</span> Buscador de Inspecciones del Trabajo
              </h2>
              <input
                type="text"
                placeholder="Buscar por region, ciudad o direccion..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-400 mt-2">
                {inspeccionesFiltradas.length} inspecciones encontradas
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {inspeccionesFiltradas.map((inspeccion, i) => (
                <motion.div
                  key={inspeccion.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700 hover:border-blue-500 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-white">{inspeccion.nombre}</h3>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                      {inspeccion.region}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-400">
                      <span className="text-gray-500">📍</span> {inspeccion.direccion}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gray-500">📞</span> {inspeccion.telefono}
                    </p>
                    <p className="text-gray-400">
                      <span className="text-gray-500">🕐</span> {inspeccion.horario}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Tipos de Contrato */}
        {seccionActiva === 'contratos' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📄</span> Tipos de Contrato de Trabajo
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CONTRATOS.map((contrato, i) => (
                <motion.div
                  key={contrato.tipo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-white">{contrato.tipo}</h3>
                    <span className="px-2 py-1 bg-indigo-500/20 text-indigo-400 text-xs rounded-full">
                      {contrato.plazo}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{contrato.descripcion}</p>
                  <ul className="space-y-1">
                    {contrato.caracteristicas.map((c, j) => (
                      <li key={j} className="text-xs text-gray-500 flex items-center gap-2">
                        <span className="text-blue-400">✓</span> {c}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-xl p-6">
              <h3 className="font-bold text-white mb-3">💡 Importante</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• El contrato debe ser por escrito dentro de 15 dias desde el inicio</li>
                <li>• Un contrato a plazo fijo renovado 2 veces se convierte en indefinido</li>
                <li>• Los honorarios NO generan relacion laboral ni derechos laborales</li>
                <li>• El empleador debe entregar copia del contrato al trabajador</li>
              </ul>
            </div>
          </motion.section>
        )}

        {/* Calculadora Sueldo Liquido */}
        {seccionActiva === 'calculadora' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>🧮</span> Calculadora de Sueldo Liquido
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-white mb-4">Datos del Sueldo</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Sueldo Bruto ($)</label>
                    <input
                      type="number"
                      value={sueldoBruto}
                      onChange={(e) => setSueldoBruto(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="colacion"
                      checked={tieneColacion}
                      onChange={(e) => setTieneColacion(e.target.checked)}
                      className="w-5 h-5 rounded bg-slate-700 border-slate-600"
                    />
                    <label htmlFor="colacion" className="text-gray-300">Tiene colacion</label>
                  </div>

                  {tieneColacion && (
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Monto Colacion ($)</label>
                      <input
                        type="number"
                        value={colacion}
                        onChange={(e) => setColacion(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="movilizacion"
                      checked={tieneMovilizacion}
                      onChange={(e) => setTieneMovilizacion(e.target.checked)}
                      className="w-5 h-5 rounded bg-slate-700 border-slate-600"
                    />
                    <label htmlFor="movilizacion" className="text-gray-300">Tiene movilizacion</label>
                  </div>

                  {tieneMovilizacion && (
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Monto Movilizacion ($)</label>
                      <input
                        type="number"
                        value={movilizacion}
                        onChange={(e) => setMovilizacion(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-white mb-4">Resultado</h3>

                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-slate-700">
                    <span className="text-gray-400">Sueldo Bruto</span>
                    <span className="text-white font-medium">${resultado.bruto.toLocaleString('es-CL')}</span>
                  </div>

                  <div className="text-sm text-gray-500 font-medium mt-4 mb-2">Descuentos Legales</div>

                  <div className="flex justify-between py-1">
                    <span className="text-gray-400 text-sm">AFP (10.25%)</span>
                    <span className="text-red-400 text-sm">-${Math.round(resultado.afp).toLocaleString('es-CL')}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400 text-sm">Salud (7%)</span>
                    <span className="text-red-400 text-sm">-${Math.round(resultado.salud).toLocaleString('es-CL')}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-400 text-sm">Seguro Cesantia (0.6%)</span>
                    <span className="text-red-400 text-sm">-${Math.round(resultado.seguroCesantia).toLocaleString('es-CL')}</span>
                  </div>

                  <div className="flex justify-between py-2 border-t border-slate-700">
                    <span className="text-gray-400">Total Descuentos</span>
                    <span className="text-red-400 font-medium">-${Math.round(resultado.totalDescuentos).toLocaleString('es-CL')}</span>
                  </div>

                  {(resultado.asignacionColacion > 0 || resultado.asignacionMovilizacion > 0) && (
                    <>
                      <div className="text-sm text-gray-500 font-medium mt-4 mb-2">Asignaciones No Imponibles</div>
                      {resultado.asignacionColacion > 0 && (
                        <div className="flex justify-between py-1">
                          <span className="text-gray-400 text-sm">Colacion</span>
                          <span className="text-green-400 text-sm">+${resultado.asignacionColacion.toLocaleString('es-CL')}</span>
                        </div>
                      )}
                      {resultado.asignacionMovilizacion > 0 && (
                        <div className="flex justify-between py-1">
                          <span className="text-gray-400 text-sm">Movilizacion</span>
                          <span className="text-green-400 text-sm">+${resultado.asignacionMovilizacion.toLocaleString('es-CL')}</span>
                        </div>
                      )}
                    </>
                  )}

                  <div className="flex justify-between py-3 bg-blue-500/20 rounded-lg px-3 mt-4">
                    <span className="text-white font-bold">Sueldo Liquido</span>
                    <span className="text-blue-400 font-bold text-xl">${Math.round(resultado.totalLiquido).toLocaleString('es-CL')}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mt-4">
                  * Calculo aproximado. AFP promedio 10.25%. No incluye impuesto a la renta.
                </p>
              </div>
            </div>
          </motion.section>
        )}

        {/* Causales de Despido */}
        {seccionActiva === 'despido' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>⚠️</span> Causales de Despido e Indemnizacion
            </h2>

            <div className="space-y-4">
              {CAUSALES_DESPIDO.map((causal, i) => (
                <motion.div
                  key={causal.articulo + causal.causal}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700"
                >
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-amber-500/20 text-amber-400 text-xs font-mono rounded">
                      {causal.articulo}
                    </span>
                    <h3 className="font-bold text-white">{causal.causal}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{causal.descripcion}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">Indemnizacion:</span>
                    <span className={`text-sm font-medium ${
                      causal.indemnizacion === 'No corresponde'
                        ? 'text-red-400'
                        : 'text-green-400'
                    }`}>
                      {causal.indemnizacion}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-6">
              <h3 className="font-bold text-white mb-3">⚖️ Tus Derechos ante el Despido</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• El finiquito debe ser ratificado ante ministro de fe (notario, inspector del trabajo)</li>
                <li>• Tienes 60 dias para reclamar por despido injustificado</li>
                <li>• La indemnizacion por años de servicio tiene tope de 11 años (90 UF por año)</li>
                <li>• Si el despido es injustificado, puedes obtener recargo del 30% a 100%</li>
              </ul>
            </div>
          </motion.section>
        )}

        {/* Derechos Laborales */}
        {seccionActiva === 'derechos' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>⚖️</span> Derechos Laborales Fundamentales
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {DERECHOS.map((derecho, i) => (
                <motion.div
                  key={derecho.titulo}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800 rounded-xl p-5 border border-slate-700 text-center"
                >
                  <span className="text-3xl mb-3 block">{derecho.icono}</span>
                  <h3 className="font-bold text-white mb-2">{derecho.titulo}</h3>
                  <p className="text-sm text-gray-400">{derecho.descripcion}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-white mb-4">📋 Donde Denunciar</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400">1.</span>
                    <div>
                      <span className="text-white font-medium">Direccion del Trabajo</span>
                      <p className="text-gray-400">www.dt.gob.cl - Denuncias laborales</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400">2.</span>
                    <div>
                      <span className="text-white font-medium">Inspeccion del Trabajo</span>
                      <p className="text-gray-400">Presencial en tu region</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-blue-400">3.</span>
                    <div>
                      <span className="text-white font-medium">Tribunales Laborales</span>
                      <p className="text-gray-400">Demandas judiciales</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-bold text-white mb-4">🚨 Practicas Ilegales</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">✗</span> No pagar cotizaciones
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">✗</span> Pagar menos del minimo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">✗</span> No entregar contrato escrito
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">✗</span> Despedir por embarazo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">✗</span> Acoso laboral o sexual
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-red-400">✗</span> No pagar horas extras
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>
        )}

        {/* Glosario */}
        {seccionActiva === 'glosario' && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span>📖</span> Glosario Laboral
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {GLOSARIO.map((item, i) => (
                <motion.div
                  key={item.termino}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-slate-800 rounded-xl p-4 border border-slate-700"
                >
                  <h3 className="font-bold text-blue-400 mb-1">{item.termino}</h3>
                  <p className="text-sm text-gray-400">{item.definicion}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700 mt-12 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Trabajo - Un modulo de{' '}
            <a href="https://newcool-informada.vercel.app" className="text-blue-400 hover:underline">
              NewCooltura Informada
            </a>
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Conoce tus derechos laborales
          </p>
        </div>
      </footer>
    </div>
  );
}
