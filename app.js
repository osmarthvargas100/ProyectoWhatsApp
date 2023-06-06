const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])
const flujoSiguiente = addKeyword(['1', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo siguiente']);


const flowInformacion = addKeyword(['1', 'uno', 'uno']).addAnswer(
    [
        '📄 👨‍⚕️ *Hola En la clínica Dental Sonrisas Felices* \n',
        'Hay atención dental domingos y feriados previa cita en la sede de Miraflores',
        '\n',
        'Asimismo; para mayor comodidad de nuestros clientes los horarios de los domingos son de 9am a 1pm, al mismo tiempo \n La clínica Dental Sonrisas Felices atiende emergencias dentales dichos días, por lo que uno nunca esta libre de accidentes dentales.\n',
        'Por ultimo; los tratamientos podrán ser abonados en efectivo o con tarjeta, también pueden saber de nosotros en nuestras redes sociales con el nombre Dental Sonrisas Felices\n',
        
        
    ],
    
)
.addAnswer(["\n *3-* Volver Menú principal."],
  { capture: true },
  (ctx, flow ) => {
    if (ctx.body === '3') {
        flow.gotoFlow(flowPrincipal);// Devolver al flujo anterior
    } 

  },
 )

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        '',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowSedes = addKeyword(['2', 'dos']).addAnswer(
    [
        '🏥 *Nuestra direcciones de nuestras sedes son:*\n',

        '*🗺️ Sede Miraflores:*\n',
        'Psj Los Pinos 190 oficina 701 Miraflores',

        '*🗺️ Sede San juan de lurigancho:*\n',
        'Av. el Muro Oeste 391, San Juan de Lurigancho 15442',

        '*🗺️ Sede Surco:\n*',
        'Av. Andrés Tinoco 119, Santiago de Surco 15039',
        
    ], 
)
 .addAnswer(["\n *3-*Menú principal."],
  { capture: true },
  (ctx, flow ) => {
    if (ctx.body === '3') {
        flow.gotoFlow(flowPrincipal);// Devolver al flujo anterior
    } 

  },
 )

const flowPagina = addKeyword(['3']).addAnswer(
    [
    '⭐ *Nuestra pagina de Facebook* ⭐\n',
    'https://www.facebook.com/odontologiaavanzadasanmarcos\n',

    '⭐ *Nuestra pagina de Instagram* ⭐\n',
    'https://www.instagram.com/clinicadentalodontolian/\n',

    ],
)
.addAnswer(["\n *3-*Menú principal."],
  { capture: true },
  (ctx, flow ) => {
    if (ctx.body === '3') {
        flow.gotoFlow(flowPrincipal);// Devolver al flujo anterior
    } 

  },
 )


const flowCita = addKeyword(['4', 'cuatro']).addAnswer(
    [
        ' 🗨️ *Para Reservar Alguna cita te dejamos nuestro numero*\n ',

        'Numero central: *932423454*'
    ],
)
.addAnswer(["\n *3-*Menú principal."],
  { capture: true },
  (ctx, flow ) => {
    if (ctx.body === '3') {
        flow.gotoFlow(flowPrincipal);// Devolver al flujo anterior
    } 

  },
 )
 const flowDespedida = addKeyword(['5', 'cinco']).addAnswer(
    [
        '👋 *Muchas Gracias ¡Vuelva  Pronto!*',
        
    ], 
)


const flowNuevaConversacion = addKeyword(['palabra clave'])
    .addAnswer(['Respuesta 1', 'Respuesta 2'], null, null, [flujoSiguiente]);

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('¡👨‍⚕️ Hola! Somos La empresa *Clínica Dental Sonrisas Felices*')
    .addAnswer(
        [
            'Elige la opcion que deseas:',
            '✅ *1* *Informacion de Citas*',
            '✅ *2* *Direccion de Nuestras Sedes*',
            '✅ *3* *Ver nuestras Redes Sociales*',
            '✅ *4* *¿Necesitas Alguna Cita? Te muestro nuestro numero*',
            '✅ *5* Salir'
        ],
        null,
        null,
        [flowInformacion, flowSedes, flowTuto, flowPagina, flowNuevaConversacion, flowCita,flowDespedida ]
    );

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()