const { Identifier } = require('./Identifier')

const validUris = [
    'visma-identity://login?source=severa',
    'visma-identity://confirm?source=netvisor&paymentnumber=102226',
    'visma-identity://sign?source=vismasign&documentid=105ab44'
]

const invalidUris = [
    null,
    {},
    1,
    [],
    '',
    'fdsf=jt345g3j4g?ksadhfkj&dshjlkhgfd?sghsdksdf',
    'identity://login?source=severa',
    'visma-identity://loginsource=severa',
    'visma-identity://confirm?source=netvisorpaymentnumber=102226',
    'visma-identity://confirm?source=netvisor&paymentnumber=10222.6',
    'visma-identity://confirm?source=netvisor&paymentnumber=1a02226',
    'visma-identity://sign?source=vismasign&documentid105ab44',
    'visma-identity://login?source=severa&paymentnumber=102226',
    'visma-identity://confirm?source=netvisor'
]

const parsed = new Identifier('')

console.log('Valid:')

for (const uri of validUris) {
    parsed.resetInput(uri)
    console.log(`Path and parameters for URI ${uri}\n`, parsed.getPath(), parsed.getParameters(), '\n')
    if (!parsed.isValid()) throw Error('Should have been valid!')
}

console.log('\n\nInvalid:')

for (const uri of invalidUris) {
    parsed.resetInput(uri)
    console.log(`Path and parameters for URI ${uri}\n`, parsed.getPath(), parsed.getParameters(), '\n')
    if (parsed.isValid()) throw Error('Should NOT have been valid!')
}