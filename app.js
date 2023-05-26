const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])
const flujoSiguiente = addKeyword(['1', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo siguiente']);


const flowDocs = addKeyword(['1', 'uno', 'uno']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowGracias = addKeyword(['2', 'dos']).addAnswer(
    [
        '🚀 Puedes aportar tu granito de arena a este proyecto',
        '[*opencollective*] https://opencollective.com/bot-whatsapp',
        '[*buymeacoffee*] https://www.buymeacoffee.com/leifermendez',
        '[*patreon*] https://www.patreon.com/leifermendez',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['3']).addAnswer(
    ['🤪 Únete al discord', 'https://link.codigoencasa.com/DISCORD', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)
const flowBebidas = addKeyword(['4', 'cuatro']).addAnswer(
    [
        '🚀 BEBIDAS',
    ],
    null,
    null,
    [flowSecundario]
)
const flowPostres = addKeyword(['5', 'cinco']).addAnswer(
    [
        '🚀 POSTRES',
    ],
    null,
    null,
    [flowSecundario]
)

const flowNuevaConversacion = addKeyword(['palabra clave'])
    .addAnswer(['Respuesta 1', 'Respuesta 2'], null, null, [flujoSiguiente]);

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('¡Hola! Somos La empresa *Dientecitos*')
    .addAnswer(
        [
            'Elige la opcion que deseas:',
            '👉 *1* *Informacion de Citas*',
            '👉 *2* *Direccion de Nuestras Sedes*',
            '👉 *3* *Ver nuestra Pagina de Facebook*',
            '👉 *4* *¿Necesitas Alguna Cita? Te muestro nuestro numero*',
        ],
        null,
        null,
        [flowDocs, flowGracias, flowTuto, flowDiscord, flowNuevaConversacion, flowBebidas, flowPostres]
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
