const scheme = 'visma-identity'

const acceptedPaths = {
    login: {
        source: 'string'
    },
    confirm: {
        source: 'string',
        paymentnumber: 'integer'
    },
    sign: {
        source: 'string',
        documentid: 'string'
    }
}

module.exports = { scheme, acceptedPaths }